# Hierarchical Experience Memory for gxp

**GXP-v2 implementation slice** — incremental, optional upgrade of the Experience Memory substrate.

## Status
- Pure Python, zero required third-party dependencies for the hierarchical JSONL path
- Drop-in compatible with the original ExperienceStore API
- Satisfies the Ideal State Criteria defined for the Memory Engineering layer
- Ready for contribution to [TinkerandScribe/gxp](https://github.com/TinkerandScribe/gxp)

## What it provides
- Hierarchical parent-child structure (leaf verified outcomes → trajectory parents)
- Write path that **only** accepts records after a verification gate
- Retrieval that returns leaf + parent hierarchical context
- Simple append-only audit log
- Quarantine-ready design
- Clear extension points for future Lance / quantized embedding / Mojo backends

## Quick start

```python
from memory.hierarchical_experience_store import create_store, ExperienceRecord, Outcome

store = create_store("my-store", require_verified=True)

rec = ExperienceRecord(
    session="exp-003",
    node="contradiction_handler",
    iteration=1,
    outcome=Outcome.FAILURE,
    failed_criteria=["no_contradiction"],
    root_cause="conflicting prior experience",
    notes="detected and quarantined",
)
store.write(rec, verified=True)

parent_id = store.create_trajectory(
    session="exp-003",
    summary="Contradiction handling trajectory",
    leaf_records=[rec],
    tags=["contradiction"],
)

# Original API still works
fails = store.query_relevant_failures(criteria_tags=["no_contradiction"])

# New hierarchical API
enriched = store.query_hierarchical(criteria_tags=["no_contradiction"])
```

## Files
- `memory/hierarchical_experience_store.py` — main implementation
- `memory/backends/vector_backend.py` — optional quantized path + Mojo stubs
- `tests/test_hierarchical_experience_store.py` — verification tests
- `docs/HOW_TO_HIERARCHICAL_MEMORY.md` — usage notes

## Verification
All Ideal State Criteria tests pass.

## Next possible increments
- Optional Lance / Arrow backend
- Quantized embedding index (SQ8 / binary)
- Mojo acceleration of ranking / compaction kernels
- Full encryption-at-rest integration

This implementation stays strictly inside the four builder invariants and the Memory Engineering layer of gxp.
