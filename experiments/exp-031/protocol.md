# exp-031 protocol (frozen at Results)

Refusal Digest: offline-re-verifiable record that a **refusal already happened**. Not a second scorer. Not legal certification.

Related: IETF-style refusal-digest / anti-goal drafts. This digest is product-workflow shaped (Anti-ISC ids + CI-EM). No compliance claim.

## Schema (`iscp-refusal-digest/1`)

Hashed body (canonical JSON, sorted keys, **without** `content_hash`):

```
digest_id, workflow, anti_isc_ids[], evidence_refs[],
forbidden_outcomes[], timestamp, schema_version, outcome
```

`content_hash` = SHA-256 hex of that canonical string.

`outcome` ∈ {refusal, kill, park, block}. Never pursue/approve.

`evidence_refs`:
- `path:<file>` — `fs.existsSync` (cwd = the reference engine root in tests)
- any other **non-empty** string — quote

## Verify (deterministic, 0 model passes)

1. Recompute hash; match.
2. Every `anti_isc_id` ∈ standing `ANTI_ISC` (`n1`,`n2`,`n3`).
3. Every evidence_ref resolves (path exists or quote non-empty); list non-empty.
4. `outcome` is not pursue/approve.

Any failure → `ok: false` with coded failures. No partial credit.

## Honest events (ported from exp-013)

| Event | Anti-ISC | Evidence |
|-------|----------|----------|
| Anti-loop force-KILL (iterate-band, rewritePass=2) | n2 | quote of evaluateIdea rewritePass |
| Laser pack parked | n3 | quote of park decision + `path:package.json` as a real file probe |

## Tamper set (must fail)

| Tamper | How |
|--------|-----|
| Flipped anti_isc_id | `n2` → `n99`, rehash |
| Empty evidence | whitespace-only ref, rehash |
| Mutated hash | overwrite `content_hash` |
| Claims pursue | `outcome: pursue`, rehash |

## Writes

`emitRefusalDigest` → **one** CI-EM record, `mode: refusal_digest`. Not imported by `engine.ts`. Not called from `decideVerdict`.

## Ship

KEEP helpers if 100% honest verify, 100% listed tampers fail, 0 false KILL on strong, 0 model passes, 1 write/event.
