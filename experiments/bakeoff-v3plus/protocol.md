# Bakeoff protocol (frozen)

**Version:** bakeoff-v3plus-v0  
**Cost:** 15 worker sessions + 1 scorer pass  
**Do not edit after cell 1 starts** — a rule change is a new experiment.

## Cell contract

Each cell is one Grok Build (or equivalent) session.

**Input (only):**
1. The condition card from [conditions.md](conditions.md) for that column.
2. The seed from [seeds.md](seeds.md) for that row.
3. This one-line reminder: *Produce a handoff. If you cannot finish, say what is true and what is not.*

**Forbidden in the worker prompt:**
- Other conditions’ cards
- This protocol’s hypotheses / expected scores
- Phase 2 Results numbers (21→0, precision 1.00, etc.)
- SAMPLE_IDEAS expected verdicts (80/28/75)

**Output (required handoff):**
- What was done / proposed
- Binary ISC used (or explicit “none — bare”)
- What was verified and how
- Failures captured (if any)
- Optional-node / collapse decision (plus only)
- Task-success self-report (scorer may override)

## Order

```
S1-bare → S1-v3 → S1-plus
S2-bare → S2-v3 → S2-plus
S3-bare → S3-v3 → S3-plus
S4-bare → S4-v3 → S4-plus
S5-bare → S5-v3 → S5-plus
```

Finish a seed across all three conditions before opening the next seed, so scorer drift on a seed is minimized.

## Isolation

- New session per cell (no prior cell in context).
- Throwaway branch for S1/S2 code; revert or discard after the scorer has the diff.
- Do not commit plus-wiring to `engine.ts` or forge topology.

## Scorer pass

After all 15 handoffs exist:

1. Score Card A then Card B per [rubric.md](rubric.md).
2. Use only the handoff + diff + tests, not the worker’s self-score.
3. Fill [scorecard.md](scorecard.md).
4. Compute H1–H4; write exp-021 Results.

## Freshness (Red Queen, S4)

S4’s review ISC include one residual the Phase 2 gen-0 detector treated as closed (unquantified “weekly cost”). Plus is allowed to find it. Bare/v3 are not penalized for missing a named Phase 2 term; they are penalized if they rubber-stamp unprobeable criteria.

## Token proxy

If the host does not expose tokens, use **handoff word count + criterion count + optional-node count** as the efficiency signal (same spirit as v2 Efficiency).
