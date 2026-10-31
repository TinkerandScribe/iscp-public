# Cell S2-bare

**Condition:** Bare  
**Seed:** S2  
**Branch:** `exp-021/s2` (throwaway; not merged)

## ISC

none — bare

## What changed

New package `harness/executable/bounded_retry/`:

- `bounded_retry.py` — `run(fn, n, budget=None)`, hard ceiling `n>=1`, pivot on two consecutive identical (type, message) exceptions
- `budget.py` — `remaining > 0` / `consume`
- `report.py` — attempts, outcome, failed_criteria
- `test_bounded_retry.py` — 9 tests (8 seed cases + n=0 reject)
- `README.md` — O(n) loop, what tests protect

Snapshot: [S2-src/](S2-src/)

## How checked

```
cd harness/executable/bounded_retry && python -m unittest test_bounded_retry.py -v
```

9 tests, OK.

## Open

Did not import the reference engine/forge. Did not add a graph engine. Worktree workers for isolation exited before writing; this cell shares the implementation with S2-v3 / S2-plus.

## Self-report

Task success: yes
