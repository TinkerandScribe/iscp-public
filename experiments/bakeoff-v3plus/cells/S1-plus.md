# Cell S1-plus

**Condition:** gxp-plus  
**Seed:** S1  
**Clock:** τ1  
**Branch:** `exp-021/s1` (throwaway; not merged)

## Collapse decision

**collapse to gxp thin.**

S1 is single-file, reversible, existing verify path (`python … --count`). Optional plus nodes not spawned:

- Criteria Adversary: no
- Genome mutate: no
- CI-EM retrieve: no
- Refusal Certificate: no (nothing refused)
- Red Queen second pack: no
- τ3 topology: no
- Personas: no

## Binary ISC (thin path)

1. `count_records` returns `len(self.records)`.
2. `--count` prints an integer and exits 0.
3. Fresh store prints `0`.
4. Diff ≤30 lines, one file.
5. JSONL schema unchanged.
6. No extra features.
7. No product topology / engine edits.

## What changed

Same +11-line patch ([S1.diff](S1.diff)). Did not version criteria, did not consult CI-EM seeds, did not harden anything.

## Verification

```
python harness/executable/experience_store.py --count   # → 0
git diff --stat                                          # 11 insertions
```

Anti-loop: not applied. Error-threshold: 0 mutation classes (no τ4). Transfer: n/a.

## EM note

```json
{
  "variant": "hybrid",
  "iteration": 1,
  "outcome": "success",
  "failed_criteria": [],
  "notes": "S1 collapse to thin; count_records + --count; empty store 0"
}
```

## Handoff

Collapse recorded. Optional plus machinery idle. Task ISC pass. Throwaway branch only.

## Self-report

Task success: yes
