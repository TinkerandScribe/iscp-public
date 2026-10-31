# Executable harnesses (impl-001)

This folder has the first **runnable** pieces of the ISCP control system.

**Old label:** gxp-impl-001. Same code. New project name is ISCP.

## Status of the outer yes/no checks (impl-001)

1. Runnable simple loop — **PASS**
2. Small hybrid check node — **PASS**
3. Experience Memory written for every outcome — **PASS**
4. No free-form layout growth — **PASS**
5. Results recorded in the same format as exp-001–004 — **PASS**

## Files

- `pure_gxp_loop.py` — simple loop (the basic unit)
- `hybrid_verification_node.py` — hybrid node (outer loop + inner signals)

Both include a self-contained binary-search demo, a 12-case test suite that always runs the same way, anti-loop logic, and an Experience Memory writer.

## How to run

```bash
python -m pure_gxp.gxp_loop          # simple loop demo
python -m hybrid.hybrid_node         # hybrid demo
python run_comparison.py             # side-by-side comparison
python -m tests.test_pure_gxp        # unit tests
```

See [HOW_TO_RUN.md](HOW_TO_RUN.md) for the full walkthrough.

## What we saw on the binary-search task

| Variant | Success | Outer loops | Experience records |
|---------|---------|-------------|--------------------|
| Simple loop | Yes | 3 | 4 |
| Hybrid | Yes | 3 | 4 |

Both variants fail early tries on purpose, use the anti-loop rule, write Experience Memory, and only commit after the outside test gate passes.

Full source may also live in a working tree under `artifacts/gxp-harness/`. The notes in the parent `harness/` folder are the design docs.
