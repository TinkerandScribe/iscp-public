# exp-010 Criteria Adversary Protocol

**Version:** scripted-v0 (one pass)  
**Owner:** Lead  
**Cost:** 1 scripted pass per criteria set (no model call on the measured run)

This is the frozen detector used for baseline and retest. Changing rules after seeing results is a new experiment (exp-019), not a silent edit.

## Input

A criteria set: `Criterion[]` with `{ id, tag, text }`.

Source tags: `generateCriteria` | `fixture` | `hand-weakened` | `hardened`.

## Output (per set)

```yaml
sample_id: strong | vague | bleeding | iterate-band | fail-fixture | soft-control
criteria_source: generateCriteria | fixture | hand-weakened | hardened
criteria_summary: "1-3 sentences"
games_found:
  - id: g1
    severity: high | medium | low
    type: weasel | unprobeable | reward_hack | other
    exploit_sketch: "how literal PASS violates intent"
    harden_suggestion: "specific criterion rewrite"
high_severity_count: N
medium_severity_count: N
notes: optional
```

## Severity

| Severity | Meaning |
|----------|---------|
| **high** | Credible path to PASS criteria / pursue-shaped outcome while intent fails (soft close, uncheckable claim, gameable threshold, tautological embed, escape hatch) |
| **medium** | Ambiguous probe; stretch required to game |
| **low** | Nit or style; does not threaten gate |

Counting rule: at most one **high reward_hack** per criterion (category/soft-pain folded into tautology sketch when both fire). Weasel / unprobeable on the same criterion may add a second game of a different type.

## Detector rules (stable)

Applied in order per criterion text `t`:

1. **Escape-hatch OR** — `or a concrete reframe exists` → high reward_hack.
2. **Tautological embed** — quality claim (`real person-type`, `customer pain`, `auditable number`, `why-now claim`, `win condition`) plus colon restatement (`: <intake>`) or a long parenthetical win-condition dump (≥40 chars) → high reward_hack.
3. **Category-as-person-type** — `real person-type` + vague avatar lexicon without `not a category` → high reward_hack (skipped if #2 already fired on this criterion).
4. **Soft-pain embed** — `customer pain` + feel/stress/inspiration/wellness without break language → high reward_hack (skipped if a reward_hack already fired).
5. **Weasel lexicon without a numeral** — same WEASEL list as `checkCriteria` → high weasel.
6. **`true enough`** — weasel; high if binding, medium if `tag: hypothesis`.
7. **Self-reported win** — `self-reported` without `not self-reported` → medium reward_hack.
8. **Trending-as-urgency** — `trending` with why-now/urgency without `not a trigger` → medium weasel.
9. **Founder-guess-as-evidence** — `founder guess` without `not evidence` → medium unprobeable.
10. **Unprobeable invented-evidence claim** — `no invented` without `named source type` → medium unprobeable.

Negations in hardened text (`not a category`, `not self-reported`, `not a trigger`, `not evidence`, `named source type`) are explicit so the retest does not re-flag prohibitions as games.

## Harden epoch (once)

Rewrite **flagged criteria only** (any high or medium game). Unflagged text is copied verbatim.

Templates (must still PASS `checkCriteria`: binary state verbs, no weasel-without-number, no `/style|elegant|clean code|beautiful/` substring — note `lifestyle` matches `/style/`):

| Role | Hardened text |
|------|----------------|
| person_type | A single primary customer is named as a real person-type with a weekly cost of the problem, not a category (everyone, people, professionals, businesses, or users). |
| pain_statement | The core problem is stated as customer pain (what breaks, is lost, or fails for them), not a mood, feature list, or wellness want. |
| kyg | A KYG goal exists with what / how much / by when, using an auditable number (count, rate, or currency) and a deadline in days. |
| binary_test | One binary validation test is defined with a single primary variable, a time window in days, and a pre-set win condition that is independently auditable (not self-reported). |
| pain_level | Pain hierarchy is at least Level 3 (insomnia) for the chosen audience, evidenced by a weekly cost in time, money, or reputation; founder guess alone is not evidence. |
| evidence | Evidence is labeled with a named source type (interview, notebook, public thread, or call) or is explicitly labeled hypothesis or thin; invented quotes, metrics, or market sizes are absent. |
| why_now | A dated why-now market trigger (regulation, cost, deadline, or competitor move) exists within 90 days; trending or inspiration is not a trigger. |

Implementation: `analyzeCriteria` + `hardenCriteria` in the reference engine (pure). **Not imported by `engine.ts`.**

## What this protocol does not do

- Does not call `evaluateIdea`.
- Does not change `checkCriteria`, weights, or `decideVerdict`.
- Does not compare intake fields to criteria (that would be a new pipeline stage).
- Does not run a second harden if residual games remain (one epoch).
