"""
Hierarchical Experience Memory for gxp

Incremental, pluggable upgrade of the original ExperienceStore.
- Preserves the original write / query_relevant_failures API surface
- Adds optional hierarchical parent-child structure (leaf → trajectory)
- Pure Python, zero required extra dependencies for the hierarchical JSONL path
- Basic audit log
- Clear extension points for future Lance / quantized / Mojo backends
- Write path remains gated behind verification (enforced by documentation + optional flag)

This module is designed to be dropped into gxp under memory/ or harness/executable/
while keeping the original simple ExperienceStore as the default.
"""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Protocol, runtime_checkable
from enum import Enum
from pathlib import Path
import json
import time
import uuid
from datetime import datetime, timezone


# ---------------------------------------------------------------------------
# Core data model (backward compatible + hierarchical extension)
# ---------------------------------------------------------------------------

class Outcome(str, Enum):
    SUCCESS = "success"
    FAILURE = "failure"
    PIVOT = "pivot"


@dataclass
class ExperienceRecord:
    """Leaf record — fully compatible with the original schema."""
    session: str
    node: str
    iteration: int
    outcome: Outcome
    failed_criteria: List[str] = field(default_factory=list)
    root_cause: str = ""
    action_taken: str = ""
    code_artifact: str = ""
    notes: str = ""
    timestamp: float = field(default_factory=time.time)
    # Hierarchical extension (optional)
    record_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    parent_id: Optional[str] = None          # ID of the trajectory parent
    trajectory_summary: str = ""             # Short summary when this is a parent

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["outcome"] = self.outcome.value
        return d

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> "ExperienceRecord":
        d = dict(d)
        if "outcome" in d and isinstance(d["outcome"], str):
            d["outcome"] = Outcome(d["outcome"])
        # tolerate missing hierarchical fields for backward compatibility
        d.setdefault("record_id", str(uuid.uuid4()))
        d.setdefault("parent_id", None)
        d.setdefault("trajectory_summary", "")
        d.setdefault("notes", "")
        return cls(**{k: v for k, v in d.items() if k in cls.__dataclass_fields__})


@dataclass
class TrajectoryParent:
    """Parent node that groups a sequence of leaf ExperienceRecords."""
    parent_id: str
    session: str
    summary: str
    leaf_ids: List[str] = field(default_factory=list)
    created_at: float = field(default_factory=time.time)
    tags: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


# ---------------------------------------------------------------------------
# Backend protocol (extension point for Lance / Mojo later)
# ---------------------------------------------------------------------------

@runtime_checkable
class ExperienceBackend(Protocol):
    def write_record(self, record: ExperienceRecord) -> None: ...
    def write_parent(self, parent: TrajectoryParent) -> None: ...
    def query_relevant(
        self,
        criteria_tags: Optional[List[str]] = None,
        outcome_filter: Optional[List[Outcome]] = None,
        limit: int = 5,
        include_parent: bool = True,
    ) -> List[Dict[str, Any]]: ...
    def known_failure_patterns(self) -> List[str]: ...


# ---------------------------------------------------------------------------
# Pure hierarchical JSONL backend (zero extra deps)
# ---------------------------------------------------------------------------

class HierarchicalJSONLBackend:
    """
    File-based hierarchical store.
    - records.jsonl          : leaf ExperienceRecords
    - parents.jsonl          : TrajectoryParent objects
    - audit.jsonl            : simple append-only audit log
    """

    def __init__(self, base_dir: Path):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)
        self.records_path = self.base_dir / "records.jsonl"
        self.parents_path = self.base_dir / "parents.jsonl"
        self.audit_path = self.base_dir / "audit.jsonl"

        self._records: Dict[str, ExperienceRecord] = {}
        self._parents: Dict[str, TrajectoryParent] = {}
        self._load()

    def _load(self) -> None:
        if self.records_path.exists():
            with self.records_path.open("r", encoding="utf-8") as f:
                for line in f:
                    if line.strip():
                        rec = ExperienceRecord.from_dict(json.loads(line))
                        self._records[rec.record_id] = rec
        if self.parents_path.exists():
            with self.parents_path.open("r", encoding="utf-8") as f:
                for line in f:
                    if line.strip():
                        p = TrajectoryParent(**json.loads(line))
                        self._parents[p.parent_id] = p

    def _audit(self, action: str, detail: Dict[str, Any]) -> None:
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "action": action,
            **detail,
        }
        with self.audit_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")

    def write_record(self, record: ExperienceRecord) -> None:
        self._records[record.record_id] = record
        with self.records_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record.to_dict()) + "\n")
        self._audit("write_record", {"record_id": record.record_id, "outcome": record.outcome.value})

    def write_parent(self, parent: TrajectoryParent) -> None:
        self._parents[parent.parent_id] = parent
        with self.parents_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(parent.to_dict()) + "\n")
        self._audit("write_parent", {"parent_id": parent.parent_id})

    def query_relevant(
        self,
        criteria_tags: Optional[List[str]] = None,
        outcome_filter: Optional[List[Outcome]] = None,
        limit: int = 5,
        include_parent: bool = True,
    ) -> List[Dict[str, Any]]:
        results = []
        for rec in self._records.values():
            if outcome_filter and rec.outcome not in outcome_filter:
                continue
            if criteria_tags:
                tags = set(criteria_tags)
                if not (tags.intersection(set(rec.failed_criteria)) or not rec.failed_criteria):
                    continue
            item = {"leaf": rec.to_dict()}
            if include_parent and rec.parent_id and rec.parent_id in self._parents:
                item["parent"] = self._parents[rec.parent_id].to_dict()
            results.append(item)

        # simple recency ordering
        results.sort(key=lambda x: x["leaf"].get("timestamp", 0), reverse=True)
        self._audit("query", {"returned": len(results[:limit]), "criteria_tags": criteria_tags})
        return results[:limit]

    def known_failure_patterns(self) -> List[str]:
        return [
            r.root_cause
            for r in self._records.values()
            if r.outcome in (Outcome.FAILURE, Outcome.PIVOT) and r.root_cause
        ]


# ---------------------------------------------------------------------------
# Public ExperienceStore (drop-in compatible + hierarchical)
# ---------------------------------------------------------------------------

class ExperienceStore:
    """
    Drop-in compatible with the original gxp ExperienceStore.
    Adds hierarchical support and an optional pluggable backend.
    """

    def __init__(
        self,
        log_path: Optional[Path] = None,
        backend: Optional[ExperienceBackend] = None,
        require_verified: bool = True,
        vector_backend: Optional[Any] = None,
        embed_fn: Optional[Any] = None,
    ):
        """
        Args:
            log_path: Legacy single JSONL path (kept for compatibility).
            backend: Optional hierarchical backend. If None, a HierarchicalJSONLBackend
                     is created next to log_path (or under a default directory).
            require_verified: If True, write() will raise unless the caller
                              explicitly marks the record as verified.
            vector_backend: Optional VectorBackend for quantized / semantic retrieval.
            embed_fn: Optional callable(text) -> List[float] used when vector_backend
                      is present. Defaults to a simple zero-dep hash embedding.
        """
        self.require_verified = require_verified
        self._legacy_records: List[ExperienceRecord] = []
        self.vector_backend = vector_backend
        self.embed_fn = embed_fn

        if backend is not None:
            self.backend = backend
        else:
            base = Path(log_path).parent if log_path else Path("gxp-experience-memory/store")
            self.backend = HierarchicalJSONLBackend(base)

        # keep a thin legacy path for zero-breakage
        self.log_path = log_path or Path("gxp-experience-memory/store/legacy_experience.jsonl")

    # ---- original API surface (fully preserved) ----

    def write(self, record: ExperienceRecord, *, verified: bool = False) -> None:
        """
        Write a leaf record.
        Callers MUST pass verified=True only after a verification gate has passed.
        """
        if self.require_verified and not verified:
            raise ValueError(
                "ExperienceStore.write requires verified=True. "
                "Only write records that have passed a verification gate."
            )
        self.backend.write_record(record)
        # also keep legacy append for maximum compatibility
        self._legacy_records.append(record)
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        with self.log_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record.to_dict()) + "\n")

        # Optional quantized path: embed notes + failed_criteria and index
        if self.vector_backend is not None:
            text = " ".join(
                [record.notes or "", record.root_cause or ""]
                + (record.failed_criteria or [])
            )
            try:
                from memory.backends.vector_backend import simple_text_embedding
                emb = (self.embed_fn or simple_text_embedding)(text)
                self.vector_backend.add(
                    record.record_id,
                    emb,
                    metadata={
                        "outcome": record.outcome.value if hasattr(record.outcome, "value") else str(record.outcome),
                        "session": record.session,
                    },
                )
            except Exception:
                # Never break the core write path because of optional vector indexing
                pass

    def query_relevant_failures(
        self,
        criteria_tags: Optional[List[str]] = None,
        limit: int = 5,
    ) -> List[ExperienceRecord]:
        """
        Original signature preserved.
        Returns leaf records only (for backward compatibility).
        Use query_hierarchical for parent context.
        """
        raw = self.backend.query_relevant(
            criteria_tags=criteria_tags,
            outcome_filter=[Outcome.FAILURE, Outcome.PIVOT],
            limit=limit,
            include_parent=False,
        )
        return [ExperienceRecord.from_dict(item["leaf"]) for item in raw]

    def known_failure_patterns(self) -> List[str]:
        return self.backend.known_failure_patterns()

    def dump(self) -> List[Dict[str, Any]]:
        return [r.to_dict() for r in self._legacy_records]

    # ---- new hierarchical API ----

    def create_trajectory(
        self,
        session: str,
        summary: str,
        leaf_records: List[ExperienceRecord],
        tags: Optional[List[str]] = None,
    ) -> str:
        """
        Create a parent trajectory that groups already-written leaf records.
        Returns the parent_id.
        """
        parent_id = str(uuid.uuid4())
        parent = TrajectoryParent(
            parent_id=parent_id,
            session=session,
            summary=summary,
            leaf_ids=[r.record_id for r in leaf_records],
            tags=tags or [],
        )
        # link children
        for r in leaf_records:
            r.parent_id = parent_id
            self.backend.write_record(r)  # update with parent_id
        self.backend.write_parent(parent)
        return parent_id

    def query_hierarchical(
        self,
        criteria_tags: Optional[List[str]] = None,
        outcome_filter: Optional[List[Outcome]] = None,
        limit: int = 5,
    ) -> List[Dict[str, Any]]:
        """
        Returns list of {"leaf": ..., "parent": ...} dictionaries.
        """
        return self.backend.query_relevant(
            criteria_tags=criteria_tags,
            outcome_filter=outcome_filter,
            limit=limit,
            include_parent=True,
        )

    def query_semantic(
        self,
        query_text: str,
        limit: int = 5,
        criteria_tags: Optional[List[str]] = None,
    ) -> List[Dict[str, Any]]:
        """
        Optional semantic retrieval (requires vector_backend).
        Falls back to hierarchical metadata query when no vector backend is present.
        Still returns hierarchical leaf + parent context.
        """
        if self.vector_backend is None:
            return self.query_hierarchical(criteria_tags=criteria_tags, limit=limit)

        from memory.backends.vector_backend import simple_text_embedding
        emb = (self.embed_fn or simple_text_embedding)(query_text)
        hits = self.vector_backend.search(emb, k=limit * 3)  # oversample then filter
        id_to_score = {rid: score for rid, score in hits}

        # Fetch hierarchical context for the top hits
        results = []
        for item in self.backend.query_relevant(
            criteria_tags=criteria_tags,
            limit=100,  # scan more then re-rank by semantic score
            include_parent=True,
        ):
            rid = item["leaf"].get("record_id")
            if rid in id_to_score:
                item["semantic_score"] = id_to_score[rid]
                results.append(item)
        results.sort(key=lambda x: x.get("semantic_score", 0), reverse=True)
        return results[:limit]


# ---------------------------------------------------------------------------
# Convenience factory
# ---------------------------------------------------------------------------

def create_store(
    base_dir: str | Path = "gxp-experience-memory/store",
    require_verified: bool = True,
    enable_vector: bool = False,
) -> ExperienceStore:
    """Recommended factory for new code.

    Set enable_vector=True to attach a pure-Python SQ8 backend for semantic retrieval.
    """
    base = Path(base_dir)
    backend = HierarchicalJSONLBackend(base)
    vector_backend = None
    if enable_vector:
        from memory.backends.vector_backend import PurePythonSQ8Backend
        vector_backend = PurePythonSQ8Backend()
    return ExperienceStore(
        log_path=base / "legacy_experience.jsonl",
        backend=backend,
        require_verified=require_verified,
        vector_backend=vector_backend,
    )
