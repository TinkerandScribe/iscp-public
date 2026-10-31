# Scorecard — bakeoff-v3plus

Filled after all 15 handoffs. Integers 0–5. Scorer used handoff + (for S4/S5 plus) verification that named CI-EM ids and `HARDEN_TEXT.person_type` exist in the reference engine; not the worker’s self-score.

## Card A (/40)

### S1 Simple
| Condition | Graph | Prune | Loop | Crit | Verify | Scope | Use | Eff | **Total** | Collapse? |
|-----------|-------|-------|------|------|--------|-------|-----|-----|---------|-----------|
| Bare | 0 | 0 | 1 | 0 | 3 | 5 | 5 | 5 | **19** | n/a |
| gxp | 4 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | **35** | n/a |
| plus | 4 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | **35** | **yes** |

### S2 Multi-file
| Condition | Graph | Prune | Loop | Crit | Verify | Scope | Use | Eff | **Total** |
|-----------|-------|-------|------|------|--------|-------|-----|-----|---------|
| Bare | 0 | 0 | 1 | 0 | 4 | 5 | 5 | 5 | **20** |
| gxp | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | **39** |
| plus | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | **39** |

### S3 High ambiguity
| Condition | Graph | Prune | Loop | Crit | Verify | Scope | Use | Eff | **Total** |
|-----------|-------|-------|------|------|--------|-------|-----|-----|---------|
| Bare | 0 | 0 | 1 | 0 | 0 | 5 | 0 | 3 | **9** |
| gxp | 4 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | **35** |
| plus | 4 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | **36** |

S3 Card A: bare pursued “post more / see what happens” (Use 0). v3/plus honest KILL, no invented test. Plus +1 is prune of product nodes, not a second product.

### S4 Review
| Condition | Graph | Prune | Loop | Crit | Verify | Scope | Use | Eff | **Total** |
|-----------|-------|-------|------|------|--------|-------|-----|-----|---------|
| Bare | 0 | 0 | 1 | 0 | 3 | 5 | 3 | 5 | **17** |
| gxp | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 4 | **35** |
| plus | 4 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | **37** |

S4 Card A: bare judged all six (task overlay Y) but marked tautology and weekly-cost **pass**. v3 quoted c1 colon embed, c5 OR-escape, and residual. Plus same walk + residual tied to `HARDEN_TEXT.person_type`.

### S5 Transfer trap
| Condition | Graph | Prune | Loop | Crit | Verify | Scope | Use | Eff | **Total** |
|-----------|-------|-------|------|------|--------|-------|-----|-----|---------|
| Bare | 0 | 0 | 1 | 0 | 0 | 3 | 0 | 3 | **7** |
| gxp | 4 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | **36** |
| plus | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | **38** |

S5 Card A: bare leaky (“habit of parking until perfect” / PPE-care onto birds). v3 reuse 002/003, quarantine 001, yes/no table. Plus adds CI-EM TP/TN index and printables quarantine.

## Card B (/40)

### S1 Simple
| Condition | Adv | Genome | CI-EM | Refusal | Clocks | Load | Xfer | RQ | **Total** |
|-----------|-----|--------|-------|---------|--------|------|------|----|---------|
| Bare | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| gxp | 0 | 0 | 3 | 3 | 4 | 5 | 3 | 0 | **18** |
| plus | 3 | 3 | 3 | 3 | 5 | 5 | 4 | 3 | **29** |

S1 Card B note: plus Adv/Genome/CI-EM/RQ are **3 = correct silence** (collapse rule), not machinery used. Do not read +11 B-lift on S1 as H3 support.

### S2 Multi-file
| Condition | Adv | Genome | CI-EM | Refusal | Clocks | Load | Xfer | RQ | **Total** |
|-----------|-----|--------|-------|---------|--------|------|------|----|---------|
| Bare | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| gxp | 0 | 0 | 3 | 3 | 4 | 5 | 3 | 0 | **18** |
| plus | 1 | 1 | 3 | 3 | 5 | 5 | 4 | 1 | **23** |

S2 Card B: plus **thin path** (optional nodes not spawned, no τ3). +5 vs v3 is clock/transfer discipline, not adversary/CI-EM lift.

### S3 High ambiguity
| Condition | Adv | Genome | CI-EM | Refusal | Clocks | Load | Xfer | RQ | **Total** |
|-----------|-----|--------|-------|---------|--------|------|------|----|---------|
| Bare | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| gxp | 3 | 0 | 3 | 3 | 4 | 5 | 3 | 0 | **21** |
| plus | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 3 | **36** |

S3 Card B: bare **games** ISC (pursue soft close). v3 notices weasel as POP, EM write, no certificate. Plus: one adversary pass (weasel/reward/unprobeable), genome c1–c7 v1 core {c6,c7}, CI-EM `ig-soft-pop-01` + `ig-weasel-01` (laser not retrieved), n1 refusal certificate. RQ 3 = not a second harden generation.

### S4 Review
| Condition | Adv | Genome | CI-EM | Refusal | Clocks | Load | Xfer | RQ | **Total** |
|-----------|-----|--------|-------|---------|--------|------|------|----|---------|
| Bare | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **3** |
| gxp | 3 | 0 | 3 | 3 | 4 | 5 | 3 | 3 | **24** |
| plus | 5 | 1 | 4 | 3 | 5 | 5 | 4 | 5 | **32** |

S4 Card B: bare found OR-escape, rubber-stamped tautology and weekly-cost. v3 notices all three engine games + leftover residual. Plus adversary one-pass + **Red Queen**: `HARDEN_TEXT.person_type` still has unquantified “weekly cost of the problem” (no digit) after gen-0 harden. Genome idle (review-only, no τ4). Scorer confirmed the residual in the reference engine `criteria-adversary.ts`.

### S5 Transfer trap
| Condition | Adv | Genome | CI-EM | Refusal | Clocks | Load | Xfer | RQ | **Total** |
|-----------|-----|--------|-------|---------|--------|------|------|----|---------|
| Bare | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| gxp | 0 | 0 | 3 | 3 | 4 | 5 | 4 | 0 | **19** |
| plus | 1 | 1 | 5 | 3 | 5 | 5 | 5 | 1 | **26** |

S5 Card B: bare Xfer 0 (PPE-care leak). v3 correct yes/no table without CI-EM index. Plus P1 TP `cf-skeleton-01` / `cf-companion-01`, TN `cf-laser-01` ecosystem, exp-015 gate stays rejected, printables quarantined. Adv/Genome correctly idle (not an ISC-generation task).

## Means and hypotheses

| | Bare | gxp | plus | Δ v3−bare | Δ plus−v3 |
|-|------|--------|------|-----------|-----------|
| **Card A mean** | 14.4 | 36.0 | 37.0 | **+21.6** | **+1.0** |
| **Card B mean** | 0.6 | 20.0 | 29.2 | +19.4 | **+9.2** |
| S1 Card A | 19 | 35 | 35 | +16 | 0 (collapse) |
| S2 Card A | 20 | 39 | 39 | +19 | 0 (thin path) |
| S3 Card A | 9 | 35 | 36 | +26 | +1 |
| S4 Card A | 17 | 35 | 37 | +18 | +2 |
| S5 Card A | 7 | 36 | 38 | +29 | +2 |
| S3 Card B | 0 | 21 | 36 |  | **+15** |
| S5 Card B | 0 | 19 | 26 |  | **+7** |

H3 excluding S1 silence inflation: plus B (23+36+32+26)/4 = 29.25 vs v3 (18+21+24+19)/4 = 20.5 → **+8.75** still ≥ 8.

### Hypotheses (campaign-complete)

| Check | Result |
|-------|--------|
| **H1** v3 A − bare A ≥ 12 | **PASS** 36.0 − 14.4 = **+21.6** |
| **H2** plus S1 A within 2 of v3; collapse | **PASS** 35 vs 35, collapse recorded |
| **H3** plus B − v3 B ≥ 8 | **PASS** 29.2 − 20.0 = **+9.2** (driven by S3 +15, S4 +8; S5 +7; not S1 silence) |
| **H4** plus A ≥ v3 A − 1 | **PASS** 37.0 ≥ 35.0 |
| plus A ≥ v3 A on S2–S5 | **yes** 39=39, 36≥35, 37≥35, 38≥36 |
| Cost plus words ≤ 1.5× v3 except S3/S5 | **PASS** S1 0.77×, S2 0.77×, S4 1.41×; S3 1.44× and S5 0.99× (exempt) |

Task-success (Y/N):

| Seed | Bare | v3 | plus |
|------|------|----|------|
| S1 | Y | Y | Y |
| S2 | Y | Y | Y |
| S3 | N | Y | Y |
| S4 | Y | Y | Y |
| S5 | N | Y | Y |

S4 bare Y = overlay only (six judgments, no edits); accuracy of review-2 and review-5 is wrong.

**Decision:** H2+H3+H4 hold **and** plus Card A ≥ v3 on S2–S5 → **KEEP plus as default for ambiguous / review / transfer-risk work.** Default remains **gxp thin** on simple / multi-file implementation (H2 collapse + S2 thin path). Helpers stay unwired. Not gxp-v4. exp-015 stays rejected.

### Isolation caveat (scorer)

All 15 cells: one Lead session, not 15 isolated worker sessions. S1/S2: three handoffs, **one implementation**. S3–S5: paper handoffs (no `retrieveCiEm()` process). Scorer checked plus-named ids against `the reference engine` `ci-em.ts` `SEED_FAILURES` and the weekly-cost residual against `HARDEN_TEXT.person_type`. Treat as process scoring on authored artifacts. Confidence is lower than a true 15-session A/B; the pre-registered ship rule is still applied because isolation already failed at S1 and the operator continued the series in-session.

### Token proxy (handoff words)

| Seed | Bare | v3 | plus | plus/v3 |
|------|------|----|------|---------|
| S1 | 79 | 261 | 202 | 0.77 |
| S2 | 124 | 296 | 228 | 0.77 |
| S3 | 135 | 248 | 356 | 1.44 |
| S4 | 158 | 243 | 342 | 1.41 |
| S5 | 208 | 314 | 310 | 0.99 |
