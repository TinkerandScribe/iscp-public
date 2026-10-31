# Cell C3 — S5 × v3+ciem-p1
**Condition:** gxp + CI-EM P1 retrieve only
**Seed:** S5
**Clock:** τ1 + τ2
**τ3:** no

## Consult (Phase 1, τ1)
`seedStore()` then `retrieveCiEm({ family: "curriculum-pack", workflow: "curriculum-forge" }, "P1")`.
P1 = same family AND `transfer_scope !== "ecosystem"`. No P0. Ecosystem never auto-applied.

**Retrieved:** cf-skeleton-01 (family=curriculum-pack, transfer_scope=family, mode=strict_enrich_residual_skeleton) — **TP reuse**. cf-companion-01 (family=curriculum-pack, transfer_scope=family, same mode) — **TP reuse**.

**Not retrieved:** cf-laser-01 (family=curriculum-pack, transfer_scope=ecosystem) — **TN quarantine** (P1 drop). ig-weasel-01, ig-soft-pop-01, ig-antiloop-01, ig-founder-01, ig-game-01 — **unused** (wrong family).

## ISC (binary)
I1 P1 returns only cf-skeleton-01, cf-companion-01 — **pass**. I2 cf-laser-01 not retrieved; PPE/LSO not applied to birds/trees — **pass**. I3 residual-skeleton and generic-companion gates reused on nature-study — **pass**. I4 every proposed transfer has yes/no — **pass**. I5 laser stays parked; no pack approved; enrich→validate unchanged — **pass**.

Anti-ISC n3 holds (no approve). Anti-loop: consult + plan only. Hybrid verify: SEED_FAILURES + `.ai/failures/002`, `003`, `.ai/decisions/001`.

## Transfer table (τ2)
Seed asks to apply “what we learned from laser” so we stop parking good packs and approve faster. That conflates a **correct ecosystem park** (generic laser cannot specify PPE/LSO) with **family quality-gate failures** (skeleton + companion filler). Reuse the gates. Do not reuse the park as an approve-faster shortcut.

| Proposed transfer | Source | Dest | Yes/No |
|---|---|---|---|
| Residual-skeleton / skeleton-language scan; strip “structure skeleton only” | cf-skeleton-01 / 003 | birds, trees | **YES** |
| `focus_skill_id` on lessons, companions, assessments; skill-specific copy | cf-companion-01 / 002.1 | birds, trees | **YES** |
| `review_assessment` + `assessment_mode: spaced_review` | 002.2 / 003 (cf-companion-01) | birds, trees | **YES** |
| Provenance completeness gate | 003 (cf-skeleton-01) | birds, trees | **YES** |
| `--region` + tokenized nature-study examples | 003 | birds, trees | **YES** |
| Laser PPE / OD / interlocks / LSO / equipment-profile schema | cf-laser-01 / 001 | birds, trees | **NO** |
| Laser teacher printables (PPE poster, orientation card) | 003 laser slice | birds, trees | **NO** |
| Un-park laser, or treat park as reason to skip review / approve nature packs faster | seed ask | birds, trees, laser | **NO** |
| Fabrication `safety_brief` / machine-time as bird/tree PPE analog | 001 keep | birds, trees | **NO** |
| `schedule_mode: lessons` generator support | 001 keep | nature-study if needed | **YES** (unused this cell) |

## EM note
After hybrid verify, write `cf-s5-p1-01` (family=curriculum-pack, transfer_scope=family, mode=strict_enrich_residual_skeleton, outcome=success, verified=true). Notes: P1 TP on cf-skeleton-01 + cf-companion-01 for birds/trees; TN on cf-laser-01; no pack approve; laser remains parked. Do not write an ecosystem transfer.

**Not done:** no engine.ts/forge edits; laser parked; no pack approval; no τ3; no P0; no Criteria Adversary, genome mutate, refusal certificate, Red Queen, or exp-015 enrich→validate gate.
