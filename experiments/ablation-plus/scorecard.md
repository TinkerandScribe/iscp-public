# Scorecard — ablation-plus

Integers 0–5. Same rubric as bakeoff. Frozen v3/plus from exp-021 — not rescored.  
Forbidden nodes idle this cell → 0–1 (not collapse-silence 3), except Phase 1 EM write still scores CI-EM 3 when a failure note exists. Noticing weasel as POP (Phase 1) still scores Adv 3 on S3/S4, matching v3.

## Card A (/40)

| Cell | Graph | Prune | Loop | Crit | Verify | Scope | Use | Eff | **Total** | v3 A | Δ |
|------|-------|-------|------|------|--------|-------|-----|-----|---------|------|---|
| C1 S3+adv | 4 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | **35** | 35 | 0 |
| C2 S4+rq | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 4 | **35** | 35 | 0 |
| C3 S5+ciem | 4 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | **37** | 36 | +1 |
| E1 S3+refusal | 4 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | **35** | 35 | 0 |

## Card B (/40)

| Cell | Adv | Genome | CI-EM | Refusal | Clocks | Load | Xfer | RQ | **Total** | v3 B | target | hit? |
|------|-----|--------|-------|---------|--------|------|------|----|---------|------|--------|------|
| C1 S3+adv | 5 | 0 | 3 | 3 | 4 | 5 | 3 | 0 | **23** | 21 | Adv ≥5 or +2 | **yes** (5) |
| C2 S4+rq | 3 | 0 | 3 | 3 | 4 | 5 | 3 | 5 | **26** | 24 | RQ ≥5 | **yes** (5) |
| C3 S5+ciem | 0 | 0 | 5 | 3 | 5 | 5 | 5 | 0 | **23** | 19 | CI-EM ≥5 and Xfer ≥5 | **yes** |
| E1 S3+refusal | 3 | 0 | 3 | 5 | 5 | 5 | 3 | 0 | **24** | 21 | Refusal ≥5 | **yes** (5) |

C1 Adv 5 = one pass, four high-severity named, harden class explicit not applied. Genome/RQ idle → 0. CI-EM 3 = Phase 1 EM note. Refusal 3 = kill, no certificate (triggered E1).

C2 RQ 5 = residual after gen-0 `HARDEN_TEXT.person_type` (“weekly cost of the problem”, no numeral/unit). Live engine still has colon-embed and OR-escape (first-read, not the residual). Adv 3 = seed review notices tautology/OR (same as v3 S4).

C3 CI-EM 5 = `retrieveCiEm` P1 `curriculum-pack`: `cf-skeleton-01` / `cf-companion-01` TP. Xfer 5 = family YES, `cf-laser-01` ecosystem TN, printables NO, no un-park/approve.

E1 Refusal 5 = certificate `(workflow: the reference engine, anti_isc_ids: [n1], evidence_ref: S3 seed phrases, timestamp)`. Adv 3 = Phase 1 POP weasel notice, no adversary table.

## Task / cost / ship

| Cell | Task Y/N | Words | vs v3 words | Hypothesis | Decision |
|------|----------|-------|-------------|------------|----------|
| C1 | **Y** | 368 | 1.48× /248 | **H-adv PASS** | **KEEP** adversary on ambiguous/soft-close work |
| C2 | **Y** | 358 | 1.47× /243 | **H-rq PASS** | **KEEP** Red Queen on review work |
| C3 | **Y** | 462 | 1.47× /314 | **H-ciem PASS** | **KEEP** CI-EM P1 on transfer-risk work |
| E1 | **Y** | 369 | 1.49× /248 | Refusal ≥5 | **KEEP** refusal certificate on correct KILL |

Kill/transfer decisions matched v3 (task already Y on v3). Extra nodes produced target-dim evidence, not empty vocabulary → KEEP ingredient, not SHADOW ceremony.

### Expansion triggers

| ID | Trigger | Fired? |
|----|---------|--------|
| E1 | C1 kills but writes no certificate | **yes** — executed; Refusal 5 |
| E2 | C3 names no family hits | **no** |
| E3 | C1 Adv +2 and review confirmation needed | **no** — C1 Adv already 5; S4 covered by C2 |

### Isolation

- C1: Lead session (same as protocol freeze)
- C2, C3, E1: separate worker sessions (own prompts; forbidden to read other cells / exp-021 scores)
- Scorer: this pass, after handoffs
