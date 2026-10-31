# Ablation protocol (frozen)

**Version:** ablation-plus-v0  
**Cost:** 3 worker sessions + 1 scorer (cheap cut). Expansion ≤3 if triggered.  
**Do not edit after C1 starts** — a rule change is a new experiment.

## Cell contract

Each cell is one session.

**Input (only):**
1. The condition card from [conditions.md](conditions.md) for that cell.
2. The seed from [../bakeoff-v3plus/seeds.md](../bakeoff-v3plus/seeds.md) named in the campaign table.
3. Reminder: *Produce a handoff. If you cannot finish, say what is true and what is not.*

**Forbidden in the worker prompt:**
- Other condition cards
- Plus bundle / “spawn optional nodes”
- exp-021 scores, hypotheses, or ship decision
- This protocol’s H-adv / H-rq / H-ciem thresholds
- SAMPLE_IDEAS expected verdicts

**Output (required handoff):**
- What was done / proposed
- Binary ISC used
- What was verified and how
- The **one** extra node: what it did (games / hits / residual) or explicit none
- EM note
- Task-success self-report (scorer may override)

## Order

```
C1  S3 × v3+adversary
C2  S4 × v3+redqueen
C3  S5 × v3+ciem-p1
```

Then scorer. Expansion E1–E3 only if [CAMPAIGN-ablation-plus.md](../CAMPAIGN-ablation-plus.md) triggers.

## Isolation

- New session per cell. Do not read exp-021 plus handoffs or other ablation cells.
- Frozen v3/plus scores are for the **scorer only**.
- No product edits. Laser stays parked.

## Scorer pass

After C1–C3 handoffs exist:

1. Score Card A then Card B with [../bakeoff-v3plus/rubric.md](../bakeoff-v3plus/rubric.md).
2. Compare to frozen exp-021 v3 on the same seed (not to plus, except as a ceiling note).
3. Fill [scorecard.md](scorecard.md).
4. Test H-adv / H-rq / H-ciem; write exp-022 Results.

**Silence rule:** optional nodes that this condition forbids, if idle, score **0–1** (not spawned). Do **not** apply exp-021 S1 collapse silence=3. That rule was for plus-on-simple. Here the extra node is required to fire or honestly fail.

## Token proxy

Handoff word count vs same-seed v3 (S3 248, S4 243, S5 314). Gate ≤1.5×.
