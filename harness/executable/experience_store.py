"""
Experience Memory with both write and read paths.
Used by the coordination graph so later iterations can avoid
repeating known failure patterns.
"""

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional
from enum import Enum
import json
import time
from pathlib import Path


class Outcome(str, Enum):
    SUCCESS = "success"
    FAILURE = "failure"
    PIVOT = "pivot"


@dataclass
class ExperienceRecord:
    session: str
    node: str
    iteration: int
    outcome: Outcome
    failed_criteria: List[str] = field(default_factory=list)
    root_cause: str = ""
    action_taken: str = ""
    code_artifact: str = ""
    timestamp: float = field(default_factory=time.time)

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["outcome"] = self.outcome.value
        return d


class ExperienceStore:
    """Write + read Experience Memory."""

    def __init__(self, log_path: Optional[Path] = None):
        self.records: List[ExperienceRecord] = []
        self.log_path = log_path or Path(
            "/home/workdir/artifacts/gxp-harness/logs/experience_store.jsonl"
        )

    def write(self, record: ExperienceRecord) -> None:
        self.records.append(record)
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        with self.log_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record.to_dict()) + "\n")

    def query_relevant_failures(
        self,
        criteria_tags: Optional[List[str]] = None,
        limit: int = 5,
    ) -> List[ExperienceRecord]:
        """
        Return recent failure / pivot records, optionally filtered
        by overlapping failed_criteria tags.
        """
        failures = [
            r for r in self.records
            if r.outcome in (Outcome.FAILURE, Outcome.PIVOT)
        ]
        if criteria_tags:
            tags = set(criteria_tags)
            failures = [
                r for r in failures
                if tags.intersection(set(r.failed_criteria)) or not r.failed_criteria
            ]
        return failures[-limit:]

    def known_failure_patterns(self) -> List[str]:
        """Flattened list of root causes seen so far (for simple avoidance)."""
        return [
            r.root_cause for r in self.records
            if r.outcome in (Outcome.FAILURE, Outcome.PIVOT) and r.root_cause
        ]

    def dump(self) -> List[Dict[str, Any]]:
        return [r.to_dict() for r in self.records]
