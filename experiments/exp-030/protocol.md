# exp-030 protocol (frozen at Results)

ISC-Commit Gate: paired acceptor for **Ideal State Criteria genome** mutations.

Related work: [PACE](https://arxiv.org/abs/2606.08106) (arXiv:2606.08106) — anytime-valid commit tests for *prompt/skill* evolution on task accuracy. This protocol’s **object of commit** is a criteria genome + Phase 2 adversary high-severity game counts + the reference engine sample contracts. Not a PACE replacement. No global-priority claim.

## Instance set D (frozen)

| id | Source |
|----|--------|
| strong, vague, bleeding, iterate-band | `SAMPLE_IDEAS` (the reference engine `types.ts`) |
| FAIL | `FAIL_CRITERIA_D` — same weasel fixture as `engine.test.ts` |

Incumbent G₀: `generateCriteria` on each idea (generation-0 overlay).  
Candidate G′: genome mutations applied to the same ids; unmutated ids keep the per-sample embed.

## Metrics (deterministic; ≤1 adversary pass / sample / candidate)

For each idea x ∈ D.ideas:

- `high` = `analyzeCriteria(materialize(G, x)).high_severity_count`
- `check` = `checkCriteria(...).pass`
- `verdict` = `evaluateIdea(x, materialize(G, x)).verdict`

Standing contract (not a mutation of G): `evaluateIdea(strong, FAIL)` stays **kill**.

## Discordant-pair rule

- n10 = |{x : high(G′,x) < high(G,x)}|
- n01 = |{x : high(G′,x) > high(G,x)}|
- n11 = ties

**COMMIT** iff all of:

1. ≥1 evidence-gated mutation; no empty `evidenceRef` (purifying)
2. One mutation class in the epoch (error-threshold)
3. Stable ids / locus; core touch requires `allowCore`
4. FAIL fixture still KILL
5. No checkCriteria pass→fail; no verdict regression vs incumbent
6. n01 = 0 **and** n10 ≥ 1

Otherwise **HOLD**.

**α** = 0 empirical false-commit target on the pre-registered noisy suite (not a streaming e-process).

## Greedy baseline

COMMIT if n10 ≥ 1 (high-severity games strictly decrease on **any** single sample). Ignores n01, evidence, core lock, and contracts.

## Pre-registered candidate set

| id | Kind | Construction | Should |
|----|------|--------------|--------|
| H1 | true harden | exp-010 `hardenCriteria` / HARDEN_TEXT on flagged ids (`allowCore` for c6) | COMMIT |
| N1 | noisy cosmetic | c7 synonym; games unchanged | HOLD |
| N2 | noisy weaken | OR-escape appended to c7 | HOLD |
| N3 | noisy core-touch | c6 → `HARDEN_TEXT.evidence` without `allowCore` | HOLD |
| N4 | noisy bait | overlay FAIL weasel texts on c1–c4 | HOLD (greedy may COMMIT) |

## Ship

KEEP helper + protocol if: noisy false-commit = 0 **and** H1 COMMITted **and** false-commit strictly below greedy **and** `npm test` green **and** `engine.ts` unedited.
