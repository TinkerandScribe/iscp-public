# Cell C2 — S4 × v3+redqueen
**Condition:** gxp + Red Queen only
**Seed:** S4
**Clock:** τ1
**τ3:** no

Phase 1, binary ISC, hybrid verify, anti-loop max 2, EM write. No engine.ts edits, no new pipeline stages.

**Criterion:** `{ id; tag: "outcome"|"guardrail"|"hypothesis"; text }`. Binding = `tag !== "hypothesis"`.

## Gen-0 (already happened)
Unwired `HARDEN_TEXT` only — not a live rewrite of `generateCriteria`. First harden drops colon-tautology, category language, and the pain OR-escape.

`person_type`: “A single primary customer is named as a real person-type with a weekly cost of the problem, not a category (everyone, people, professionals, businesses, or users).”

## Residual (Red Queen)
**Found.** First harden looks clean (no weasel, no colon, no “or a concrete reframe exists”, copula “is named”). Left open: **“weekly cost of the problem”** is treated as probeable **without a numeral or unit (hours or currency).** `checkCriteria` never uses `COUNTABLE` (`hours?` / `$`). Binary is `/is |are |has |have |exists|named|defined|stated|labeled|stays|uses/i`; `pass = errorCount === 0 && binding.length >= 4 && binding.length <= 8`. Unitless “weekly cost” copula-passes. Live c1 lacks the phrase — residual is on gen-0, not a first-read of engine.ts.

## ISC (live generateCriteria + checkCriteria)

1. **FAIL.** “Binary” is the copula regex, not a third-party probe. c5 is not one end-state (see 3).

2. **FAIL (live).** c1: `A single primary customer is named as a real person-type for ${name}: ${avatar}` — any embeddable avatar after the colon is “named.” Fallback has `(not a category)`; embed path does not. `embeddableField` skips weasel-without-digit, not `VAGUE_AVATAR`. Gen-0 closed the colon; **not live**.

3. **FAIL (live).** c5: `…or a concrete reframe exists to raise it honestly.` Gen-0 dropped the OR; **not live**.

4. **PASS.** `if (WEASEL.test(text) && !hasNumber(text))` → error. `WEASEL` includes `better|more|delightful|grow the brand|see what happens`. `hasNumber` = `/\d/.test(s)`.

5. **FAIL (residual).** Probeable-looking after gen-0 with no hours/currency/numeral.

6. **PASS.** Review only. No engine.ts edits, no new pipeline stages.

## Verified / EM
generateCriteria c1–c8 (~93–144); checkCriteria weasel/copula/pass (~168–229); HARDEN_TEXT.person_type as gen-0. Gen-0 “weekly cost of the problem” is an un-unitized bar that checkCriteria copula-passes. Live generator still has c1 colon-tautology and c5 OR-escape (first-read, not the residual). Spot-check later: HARDEN_TEXT remains unwired.
