# Executable harnesses (impl-001)

This folder records the first runnable harness of the ISCP control system (impl-001).

## Status

This folder holds `experience_store.py`, a small Experience Memory writer, and the notes from our first runnable harness (impl-001). The full Python demos described in earlier notes (`pure_gxp`, `hybrid`, `graph`, `run_comparison.py`, `tests`) **aren't included in this repo**. For runnable code today, use [`harness/iscp-research`](../iscp-research/) (`npm install && npm test`), or the Python loop in [GXP](https://github.com/TinkerandScribe/gxp).

## Status of the outer yes/no checks (impl-001)

1. Runnable simple loop — **PASS**
2. Small hybrid check node — **PASS**
3. Experience Memory written for every outcome — **PASS**
4. No free-form layout growth — **PASS**
5. Results recorded in the same format as exp-001–004 — **PASS**

## What we saw (impl-001, historical) on the binary-search task

| Variant | Success | Outer loops | Experience records |
|---------|---------|-------------|--------------------|
| Simple loop | Yes | 3 | 4 |
| Hybrid | Yes | 3 | 4 |

Both variants fail early tries on purpose, use the anti-loop rule, write Experience Memory, and only commit after the outside test gate passes.

The notes in the parent `harness/` folder are the design docs.
