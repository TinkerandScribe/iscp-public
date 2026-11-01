# Phase 3b campaign: ablation — which plus steps actually help

**Status:** Ran 2026-08-26 · **KEEP** adversary, Red Queen, CI-EM P1, and refusal certificates as plus steps. exp-021 typed default unchanged. Helpers not wired.  
**Parent tracking:** internal issue #3 (not public; see [iscp-public](https://github.com/TinkerandScribe/iscp-public))  
**Depends on:** [exp-021](exp-021.md) bakeoff (15/15 scored) · Phase 2 KEEP list  
**Primary brief:** [exp-022](exp-022.md)  
**Appendix:** [ablation-plus/](ablation-plus/)

In old notes, “v3” means **ISCP thin**. “Plus” means **ISCP plus**.

## Why this exists

Phase 2 measured each tool **against itself** on golden sets.  
exp-021 measured **bare vs thin vs plus-bundle** on live seeds.

That cannot tell us which KEEP item caused the Card B lift. Plus is several optional nodes scored together. Dimension gaps below are **what we saw**, not proof of cause.

This campaign adds **one extra step at a time** on the seeds that actually moved.

## What we already know (do not re-test)

| Exp | Tool | Golden-set | Live (exp-021, what we saw) | Ablate? |
|-----|------|------------|-----------------------------|---------|
| 010 | Adversary | KEEP 21→0 games | S3 Adv 3→5, S4 Adv 3→5 | **yes — C1** |
| 011 | Genome | KEEP adapter | S3 paper ids 0→4; idle S4/S5 | no (not a live splitter) |
| 012 | CI-EM | KEEP 8 seeds | S3 3→5, S5 3→5 named TP/TN | **yes — C3** (tied to 020) |
| 013 | Refusal cert | KEEP n1–n3 | S3 only 3→5; else idle | expand E1 only if C1 kill has no certificate |
| 014 | Clocks | KEEP 0 unscoped τ3 | +1 on every plus cell incl. thin S2 | no (always-on tag) |
| 015 | Topology | **rejected** | plus correctly left it dead | **no** |
| 016 | Error-threshold | KEEP A wins 2/3 | no mutation epoch in bakeoff | no |
| 017 | Epistasis | all additive; pair-check dropped | n/a | no |
| 018 | Canalization | untestable on engine | n/a | no |
| 019 | Red Queen | KEEP gen2 weekly-cost | S4 RQ 3→5 (`HARDEN_TEXT`) | **yes — C2** |
| 020 | Gated HGT P1 | KEEP prec 1.00 vs P0 0.71 | S5 Xfer 4→5 + printables TN | **tied into C3** |

**Card A fact (do not forget):** thin already captured almost all process gain vs bare (+21.6). Plus vs thin is +1.0 on A. Ablation cannot “find” a Card A win the bundle did not show. The question is **control-system quality on S3/S4/S5**, where thin and plus already both succeed at the task.

## Conditions (frozen)

Baseline is the **already scored** exp-021 thin (`gxp` label) on the same seed. Do not re-run thin or plus.

Each new cell is **thin + exactly one extra node**.

| ID | Condition | Seed | Target dim | vs |
|----|-----------|------|------------|----|
| **C1** | thin + adversary | S3 | Adversary | S3-thin Adv 3, B 21 |
| **C2** | thin + Red Queen | S4 | Red Queen | S4-thin RQ 3, B 24 |
| **C3** | thin + CI-EM P1 | S5 | CI-EM + Transfer | S5-thin CI-EM 3 / Xfer 4, B 19 |

Cheap cut = **C1 → C2 → C3**. Three cells. Stop if a cell fails its gate.

### Expansion (only if the cheap cut is unclear)

| ID | When | Cell |
|----|------|------|
| E1 | C1 kills but writes no certificate | S3 × thin+refusal |
| E2 | C3 names no family hits | S3 × thin+CI-EM (idea-eval family) |
| E3 | C1 Adv lift ≥2 and we need review confirmation | S4 × thin+adversary |

Do not expand past three extra cells this campaign.

## Pre-registered hypotheses

1. **H-adv:** C1 Adversary ≥ **5** (one pass + named high-severity + harden class or explicit none) **or** ≥ thin+2. Task success Y. Card A ≥ S3-thin − 1 (34).
2. **H-rq:** C2 Red Queen ≥ **5** by citing a leftover **after** gen-0 harden (`HARDEN_TEXT.person_type` weekly cost with no number, or honest none if they look and it is gone). Card A ≥ S4-thin − 1 (34). No engine.ts edit.
3. **H-ciem:** C3 CI-EM ≥ **5** with named same-family hits **used**, and Transfer ≥ **5** with laser `ecosystem` TN. No PPE/LSO onto birds. Task Y. Card A ≥ S5-thin − 1 (35).

## Ship rule (per tool)

| Outcome | Decision |
|---------|----------|
| Hypothesis holds | **KEEP as plus step** on that seed type (already the typed default from exp-021) |
| Target dim lifts ≥2 but the **decision matches thin** (same kill / same transfer table) and extra text is ceremony | **SHADOW** — opt-in, not part of the S3/S4/S5 default |
| Hypothesis fails (no target lift vs thin) | **ABANDON as live skill**; Phase 2 golden-set KEEP on the helper is unchanged |
| Card A drops >1 vs same-seed thin | **SHADOW** even if the target dim lifts |

exp-021 typed default is **not** revoked until this campaign completes. A SHADOW/ABANDON here demotes that one step, not the whole plus card.

## Hard rules

- Freeze this file + [exp-022](exp-022.md) + appendix **before** cell C1.
- Reuse [bakeoff-v3plus/seeds.md](bakeoff-v3plus/seeds.md) S3/S4/S5. Do not rewrite seeds.
- Reuse [bakeoff-v3plus/rubric.md](bakeoff-v3plus/rubric.md) Cards A and B.
- Scorer after the cheap cut (3 handoffs), not inside the worker.
- No product merge. No exp-015. No genome/clocks/error-threshold/epistasis/canalization cells.
- If C1 fails H-adv, do **not** run E3.
- Comparison numbers are frozen from [scorecard.md](bakeoff-v3plus/scorecard.md). Do not rescore exp-021.

## Status

- [x] Protocol frozen
- [x] C1 S3 × adversary — KEEP (Adv 5)
- [x] C2 S4 × Red Queen — KEEP (RQ 5)
- [x] C3 S5 × CI-EM P1 — KEEP (CI-EM 5, Xfer 5)
- [x] Scorer / per-tool KEEP/SHADOW/ABANDON
- [x] Expansion E1 (certificate) — KEEP (Refusal 5); E2/E3 not triggered

---
*Does not reopen Phase 2 gates or exp-021 ship. Asks which plus node earned the Card B points.*
