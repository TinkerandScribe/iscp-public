# Housing vs runtime

**ISCP** is the control-plane research program. **Idea Gate** is a GXP × Zero to Founder product. They share a method (pass/fail Ideal State Criteria). They are not the same repo and not the same runtime.

## What this folder is

Canonical copies of KEEP helpers that do **not** import `the reference engine` `engine.ts`, plus the Phase 7 port contract.

| Helper | Experiment | Status |
|--------|------------|--------|
| `port.ts` | Phase 7 Node 1 | **KEEP** contract. Zero `engine.ts` imports. |
| `refusal-digest.ts` | exp-031 | **KEEP** Node 2. Imports `./port`. Housing copy remains. |
| `isc-pin.ts` | exp-034 | **KEEP** Node 2. Imports `./port`. Housing copy remains. |
| `isc-commit-gate.ts` | exp-030 | **KEEP** Node 3. Frozen `InstancePairPort`. No engine import. |
| `commit-or-refuse.ts` | exp-032 | **KEEP** Node 3. Local gate + digest. Category lock. |
| `stake-certificate.ts` | exp-033 | Copied. Tests still run in the reference engine (need CI-EM seed store). |
| `inherit-isc.ts` | exp-036 | Copied with tests. |
| `skill-changelog-gate.ts` | exp-035 | Copied with tests. |
| `ci-em.ts` | exp-012 / exp-020 | Fleet P1 reader. JSONL path. Not a move of the Idea Gate housing copy. |
| *(not copied)* | exp-037 | **PARK** this campaign. Sidecar lives in Idea Gate. |

Run tests: `cd harness/iscp-research && npm install && npm test`.

## Phase 7 adapter-port — closed 2026-08-27

**KEEP this campaign:** 030, 031, 032, 034 (behind `port.ts`).  
**PARK this campaign:** 037; Phase 2 bakeoff housing in Idea Gate (`ci-em.ts`, `genome.ts`, `criteria-adversary.ts`, `evo.test.ts`). That housing copy is not the CI-EM read path.

Do not delete Idea Gate housing copies until a later cut is named. A port is not a product wire.

## Still hosted in the reference engine (not deleted)

- exp-030 `isc-commit-gate.ts`
- exp-031 `refusal-digest.ts`
- exp-032 `commit-or-refuse.ts`
- exp-034 `isc-pin.ts`
- exp-037 `soft-close-certificate.ts`
- Phase 2 bakeoff surface listed above

## Product path (do not touch from this repo)

`the reference engine/src/lib/the reference engine/engine.ts` imports only `types.ts`. Evaluate / wizard / store stay GXP × ZTF.

## Rules

- No `engine.ts` edit.
- No delete of the reference engine copies in this campaign.
- No claim that Idea Gate *is* ISCP.
- Cite nearest art. No world-novelty claim.
