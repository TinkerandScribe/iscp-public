# Phase 2 campaign: criteria tools and control-system mechanisms

**Status:** Phase 2a + 2b ran 2026-08-25. exp-010–014, 016–020 **KEEP**; exp-015 **SHADOW** (topology proposal rejected).  
**Parent tracking:** internal issue #3 (not public; see [iscp-public](https://github.com/TinkerandScribe/iscp-public))  
**Discipline:** ISCP four builder rules (old name: gxp)  
**Date opened:** 2026-08-25

## Goal

Measure **benefit vs cost** of control-system tools that close gaps left by Phase 1, ISA-style Ideal State work, loop engineering, and anti-loop patterns. Also **test** evolutionary-biology predictions that inform Criteria Genome policy. Do not treat those predictions as metaphors only.

Primary questions:
1. *Which tools improve reliability enough to justify cost — without free-form layout change?*
2. *Which evolutionary constraints (error threshold, epistasis, canalization, Red Queen, gated transfer) hold under measurement on our golden sets?*

## Phase 2a — tool ladder (do these in order)

| Exp | Tool | Depends on | Primary surface |
|-----|------|------------|-----------------|
| [exp-010](exp-010.md) | Criteria Adversarial Loop | Harness only | the reference engine `generateCriteria` / `checkCriteria` |
| [exp-011](exp-011.md) | Criteria Genome (versioned ISC + fitness) | exp-010 signal | the reference engine criteria objects + memory schema |
| [exp-012](exp-012.md) | Criterion-Indexed Experience Memory (CI-EM) | exp-011 ids | the reference engine rejects + curriculum-forge `.ai/failures/` |
| [exp-013](exp-013.md) | Negative ISC + Refusal Certificates | exp-012 write path | anti-loop kills, parked packs |
| [exp-014](exp-014.md) | Multi-Timescale Control Clocks (τ1–τ4) | process only | session discipline across repos |
| [exp-015](exp-015.md) | Topology Futures (shadow A/B only) | exp-012 weight | curriculum-forge enrich→validate |

## Phase 2b — evolutionary-biology tests

Run only after the substrate exists (usually after exp-011; exp-020 after exp-012). These **test** evo-bio claims. They do not assume the claims as law.

| Exp | Hypothesis | Depends on | Primary surface |
|-----|------------|------------|-----------------|
| [exp-016](exp-016.md) | **Mutational load / error threshold** — capped concurrent change keeps contracts better than high load | exp-011 | the reference engine genome snapshots |
| [exp-017](exp-017.md) | **Epistasis** — joint criterion hardens ≠ additive single hardens | exp-010 + exp-011 | criterion pairs |
| [exp-018](exp-018.md) | **Canalization** — core genome more stable under intake noise than full genome | exp-011 core/peripheral split | paraphrased SAMPLE_IDEAS |
| [exp-019](exp-019.md) | **Red Queen** — multi-generation adversary; escape curve over time | exp-010 harden path | criteria lineages |
| [exp-020](exp-020.md) | **Transfer fitness** — gated HGT (`transfer_scope`) beats open transfer on precision | exp-012 | the reference engine ↔ curriculum-forge scenarios |

**Hard rule:** If experiment N fails its pre-registered benefit/cost gate, do **not** spend on N+1 in the same ladder. Phase 2b may skip an exp if its dependency failed, but must not silently assume the evo claim.

## Shared measurement model

### Benefit axes
- Held-out task success (yes/no + score/verdict contracts)
- Outer loops / soft rewrites to a terminal state
- Criteria game escapes (weasel, untestable, reward hacks)
- Probe false-PASS rate
- Failure capture quality (structured, criterion-indexed, reusable)
- Correct transfer without contamination
- Evo-bio specific: load drop delta, interaction leftover, stability rate, escape curve, transfer precision/recall

### Cost axes
- Tokens / $ per successful terminal state
- Wall-clock
- Human attention minutes
- Complexity tax (files, failure modes, mental load)
- False KILL / over-refusal rate
- Regression on previously green packs

### Decision rule (write this before every exp)
Ship into baseline only if: **primary benefit ≥ threshold AND primary cost ≤ threshold AND no anti-ISC regressions on the held-out set.** Else keep shadow / abandon. For 2b, “ship” means **encode as standing genome/CI-EM policy** — or **drop the evo claim** if data rejects it.

## Golden sets (freeze before exp-010)

**the reference engine**
- Strong insomnia offer → score 80, PURSUE
- Vague lifestyle idea → score 28, KILL
- Bleeding-neck B2B → score 75, PURSUE
- Iterate-band freelancer → ITERATE at pass 0/1; KILL at max passes
- FAIL custom criteria on strong intake → KILL

**curriculum-forge**
- Schema validate on approved birds/trees enriched packs
- `--strict-enrich` quality gates
- Laser safety remains PARKED (layout-discipline fixture)

## Evolutionary-biology constraints (defaults until 2b measures them)

1. **Purifying selection default** — no evidence, no change
2. **Error-threshold cap** — one mechanism change per experiment epoch (test: exp-016) — **KEEP after 016**
3. **Core vs peripheral genome** — universal gates change slower than domain probes (test: exp-018) — **KEEP as policy; canalization advantage not clear**
4. **Gated horizontal transfer** — CI-EM `transfer_scope` with quarantine (test: exp-020) — **KEEP P1 default**
5. **Punctuated topology** — graph rewrites only at τ3 after CI-EM weight + shadow epoch — **KEEP ritual; 015 proposal rejected**
6. **Epistasis awareness** — multi-criterion hardens may need pair checks (test: exp-017) — **dropped for current detector (all additive)**
7. **Red Queen** — adversary is ongoing, not one-shot (test: exp-019) — **KEEP periodic re-run**

## Out of scope (whole campaign)

- Full product rewrite of the reference engine or curriculum-forge
- Ungated self-changing layout
- Multi-agent concurrent graph before CI-EM exists
- Paid infrastructure / new SaaS surface
- Claiming Phase 2 complete without held-out measurements
- Treating untested evo metaphors as proven law

## Status

### Phase 2a
- [x] exp-010 Criteria Adversarial Loop — **KEEP** (2026-08-25; 21→0 high-severity games; helper not wired)
- [x] exp-011 Criteria Genome — **KEEP** (stable ids + evidence-gated c5 harden; adapter; not wired)
- [x] exp-012 CI-EM — **KEEP** (8 seeds; TP anti-loop reuse; TN laser quarantine)
- [x] exp-013 Negative ISC + Refusal Certificates — **KEEP** (n1–n3; 0 false KILL on strong)
- [x] exp-014 Multi-Timescale Clocks — **KEEP** (0 unscoped τ3/τ4 across 11 runs)
- [x] exp-015 Topology Futures (shadow) — **SHADOW / reject-proposal** (golden ISC delta 0; laser stays parked)

### Phase 2b (evo-bio)
- [x] exp-016 Mutational load / error threshold — **KEEP** (A wins 2/3 axes; cap standing)
- [x] exp-017 Epistasis — **KEEP finding** (all additive; pair-check not required)
- [x] exp-018 Canalization — **KEEP** core={c6,c7} as policy; advantage not clear
- [x] exp-019 Red Queen — **KEEP** periodic re-run (novel high at gen 2)
- [x] exp-020 Transfer fitness (gated HGT) — **KEEP** P1 default (prec 1.00 vs P0 0.71)

### Standing policy (encode these; do not wire layout)

- Genome: `mutate` one class, evidence required, core lock on c6/c7
- CI-EM: write verified records; retrieve with **P1**; laser `ecosystem`
- Anti-ISC n1–n3 + Refusal Certificates at refusal events
- Clocks τ1–τ4 tagged on every exp
- τ3 only after shadow A/B; 015-style duplicate confidence gate **rejected**
- Red Queen: fresh adversary pack after harden epochs, not one-shot
- **Not wired** into `engine.ts` / forge pipeline this campaign (helpers + tests only)

## Phase 3 (does not reopen these gates)

Live bakeoff **bare vs ISCP thin vs ISCP plus**: [CAMPAIGN-bakeoff-v3plus.md](CAMPAIGN-bakeoff-v3plus.md) · [exp-021](exp-021.md) — **KEEP plus as typed default**.

Ablation **one plus step at a time**: [CAMPAIGN-ablation-plus.md](CAMPAIGN-ablation-plus.md) · [exp-022](exp-022.md) — **KEEP** adversary, Red Queen, CI-EM P1, refusal certificates.

exp-015 stays rejected. Helpers not wired.

---
*Opened under ISCP / gxp rules as Phase 2 of the control-system research program. Ran 2026-08-25.*
