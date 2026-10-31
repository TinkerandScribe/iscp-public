# bounded_retry

Tiny retry helper for gxp harness demos. Not a product surface.

## Loop

`run(fn, n, budget=None)` tries `fn` at most **n** times (`n >= 1`). Each try consumes one budget unit when a budget is supplied. Hard ceiling: the loop cannot run past `n` and never waits.

- **success** — `fn` returned.
- **pivot** — two consecutive exceptions with the same type and message (anti-loop). Stop immediately.
- **failure** — `n` reached without success, or budget `remaining > 0` failed before an attempt.

Time is **O(n)** attempts, **O(1)** extra memory besides the last exception key.

## What the tests protect

| Case | Guard |
|------|--------|
| success first try | happy path, attempts=1 |
| success after one fail | retry actually retries |
| identical-exception pivot | anti-loop; does not burn the rest of n |
| mixed exceptions | different type/message is not a pivot |
| N=1 | ceiling of one; no infinite retry |
| last allowed try succeeds | n is inclusive |
| budget exhaustion | binary allow-call; distinct from pivot |
| report fields | attempts / outcome / failed_criteria always present |
