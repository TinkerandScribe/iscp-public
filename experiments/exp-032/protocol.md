# exp-032 protocol (frozen at Results)

One operator surface for τ4 mutate vs τ2 refuse. Thin orchestration over KEEP helpers from exp-030 and exp-031. Not wired. Skill paragraph **merged** into [`skills/iscp/SKILL.md`](../../skills/iscp/SKILL.md) at Phase 4 closeout (2026-08-26).

## API

```
proposeCriteriaMutation(G → G′)  →  COMMIT | HOLD     clock τ4
recordRefusal(event)             →  REFUSE + digest   clock τ2
```

Shared handoff fields: `decision`, `clock`, `evidence_refs`.  
COMMIT/HOLD also carry `n10`/`n01`. REFUSE carries `digest_id`.

## Category lock

- HOLD does **not** emit a refusal digest.
- REFUSE does **not** mutate a genome.
- `refuseFromHandoff(COMMIT|HOLD)` throws.
- `commitFromRefusal(REFUSE)` throws.

## Skill-ready paragraph (merged into SKILL.md 2026-08-26)

```text
Commit-or-refuse (exp-030 + exp-031; optional, not auto):
When you would change Ideal State Criteria, call proposeCriteriaMutation.
COMMIT only if the ISC-Commit Gate says COMMIT (n01=0 and n10≥1, evidence, core lock).
HOLD is not a refusal — do not write a digest.
When you already KILL/park/block under n1–n3, call recordRefusal (digest, clock τ2).
Do not treat REFUSE as a genome commit. No τ3. Do not edit engine.ts.
Handoff must include decision + clock + evidence_refs (and digest_id if REFUSE).
```

## Ship

KEEP protocol + helper if both paths produce durable records and category errors = 0 in tests.
