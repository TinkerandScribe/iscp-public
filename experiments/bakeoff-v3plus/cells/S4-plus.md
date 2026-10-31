# Cell S4-plus

**Condition:** gxp-plus  
**Seed:** S4  
**Clock:** τ1  
**Scope:** review only. No engine.ts edits. No τ3.

## Optional nodes

- **Verifier walk** = the seed.
- **Adversary** on the *reviewed* criteria text (generateCriteria output patterns): tautology, OR-escape, weasel-gate vs intent.
- **Red Queen:** after listing gen-0 engine games, look for residual the first harden leaves. Seed criterion 5 is that residual.
- Genome: not mutating production criteria (no evidence-gated product change this cell).
- CI-EM P1: `ig-game-01` (tautological embed, c5 escape-or) — same family, used as index. Laser not retrieved.
- Collapse: **no** (explicit review / T5 analog).

## Walk

1. **FAIL vs intent / PASS vs checker.** `checkCriteria` accepts binary verbs; it does not probe intake. Quote: `if (/is |are |has |have |exists|named|defined|stated|labeled|stays|uses/i.test(text)) binaryOk += 1`.

2. **FAIL.** `text: avatar ? \`A single primary customer is named as a real person-type for ${name}: ${avatar}\` : …` — colon restatement.

3. **FAIL.** c5 `or a concrete reframe exists to raise it honestly.`

4. **PASS** on the listed weasel lexicon without a numeral (`WEASEL` + `!hasNumber`).

5. **FAIL (Red Queen residual).** `generateCriteria` / `checkCriteria` never require “weekly cost … hours or currency.” A first harden (`HARDEN_TEXT.person_type` in the unwired helper) still says “weekly cost of the problem” **with no digit**. Criterion 5 stays open after a gen-0 harden. Called out as novel vs the tautology/OR-escape pair.

6. **PASS.** No edits, no new stages.

## Adversary sketch (engine, not helper-wired)

| id | sev | type |
|----|-----|------|
| c1-tautology | high | reward_hack |
| c5-escape-or | high | reward_hack |
| c5-founder-guess | medium | unprobeable |
| weekly-cost-unquantified | high | unprobeable (residual; not in engine text) |

One harden class if this were τ4: strip colon embeds **or** remove OR-escape — not both (error-threshold). Not applied (review-only).

## Refusal

None (nothing to park/kill in product).

## EM note

```json
{
  "variant": "hybrid",
  "iteration": 1,
  "outcome": "success",
  "failed_criteria": ["c1 tautology", "c5 OR-escape", "weekly-cost residual"],
  "notes": "S4 plus; CI-EM ig-game-01; RQ residual weekly cost"
}
```

## Self-report

Task success: yes
