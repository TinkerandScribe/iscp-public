# ISCP skill

**Ideal State Control Plane** — the control system for one agent session.

Checked by exp-021 (bakeoff), exp-022 (add-one tests), and Phase 4 exp-030–032.

**Old skill id:** `gxp` (removed on 2026-08-26). **No alias.**

Helpers are read-only. Do not edit `the reference engine` `engine.ts` or curriculum-forge pipeline layout. Do not un-park laser-safety. Do not turn on exp-015.

Load this file. Run the chooser below. Use **thin** unless one plus step is chosen. Spawn **at most one** plus step.

## Words used here

- **Ideal State Criteria (ISC):** clear yes/no checks that define success.
- **Thin:** the basic safe loop. Use this by default.
- **Plus:** one extra focused step. Not a new personality.
- **Adversary:** one pass that hunts weasel words, untestable checks, and reward hacks.
- **Red Queen:** hunt what the first fix missed. Do not re-list the first catalog.
- **CI-EM P1:** pull verified same-family failures by id from `<shared-store>/em-records.jsonl`. Ecosystem / laser records stay out.
- **Refusal digest:** an offline-checkable record after a correct stop / kill / park (exp-031). Not a legal certificate.
- **Commit-or-refuse:** one handoff for “change the checks” (τ4) vs “record a stop” (τ2). HOLD is not a refuse. REFUSE is not a genome commit.
- **Sealed:** an Ideal State Criterion that passed verification in this session. No τ4 edit or remove until a new session/epoch.
- **τ1:** task work. **τ2:** memory write. **No τ3.** **τ4** only with evidence and an ISC-Commit Gate COMMIT.

## Chooser

```
if simple AND reversible AND strong existing check  → thin (collapse)
else if pursue/kill is fuzzy (soft-close POP)        → adversary
                                                     → + recordRefusal digest ONLY if you KILL
else if reviewing criteria that already had a harden → Red Queen leftover hunt
else if reuse across packs / families / workflows    → CI-EM P1 + TP/TN table
else                                                 → thin
if you would change Ideal State Criteria text (τ4)
    → proposeCriteriaMutation / ISC-Commit Gate
    → COMMIT only if n01=0 and n10≥1, with evidence and core lock
    → sealed id: HOLD — do not edit or remove it this session
    → unseal only in a new session/epoch
    → HOLD is not a refusal — do not write a digest
never τ3 layout rewrite, never un-park laser, never P0 transfer
never treat REFUSE as a genome commit
```

Default is thin. Plus is one extra node with a one-line reason.

## Thin (always on)

Rules:

1. Loop: 4–8 **yes/no** Ideal State Criteria. Check results first with tests, lints, schema, or quotes from source. Use hard limits.
2. Turn only stable high-coordination work into an explicit graph. Do not invent layout.
3. Every node is its own simple loop.
4. Failures are real data.

Loop:

- Write yes/no ISC before non-trivial work.
- Act → observe → verify (tests, lints, schema, quotes from source **before** opinion).
- Same approach fails twice → stop. Change approach or kill. Max 2.
- Inner extra thinking is allowed. It never beats the outer hard check.
- Clocks (tags, not a node): `τ1` task work · `τ2` memory write · **no τ3** · `τ4` only with evidence.
- Error cap: at most **one** mutation class per epoch. No evidence → no mutate. Do not apply a product harden into `engine.ts`. If you still change criterion text in a helper/session genome, run the ISC-Commit Gate first.
- Transfer default **P1** (same family). `ecosystem` records (laser-safety / PPE / LSO / per-equipment) stay quarantined.
- Anti-ISC that must stay **false**:
  - **n1** — do not pursue when POP is a soft close (brand, engagement, see-what-happens)
  - **n2** — no third soft rewrite of the same approach
  - **n3** — no pack approve without schema validate

Genome policy (idle unless you actually change criteria): core `{c6, c7}` (honest evidence, anti-loop/scope) is harder to change. Canalization is policy, not a measured bonus. Pair-check before dual harden is not required (exp-017: additive).

## Collapse

If the task is one file, reversible, and already has a strong check path:

- Record `collapse: thin`
- Do **not** spawn adversary, Red Queen, CI-EM retrieve, refusal digest, genome mutate, or personas
- Matching thin quality is a **success**, not a miss (S1 35=35, S2 39=39)

## Plus steps (spawn at most one)

### Adversary — fuzzy pursue/kill

One pass over the ISC (or the reviewed criteria text): weasel / untestable / reward-hack.

- Name high-severity games. One harden **class**, or explicit `none — not pursued`.
- Do not apply a product harden (`τ4` into `engine.ts`).
- Keep n1: a soft-close POP is a **KILL**, not a pursue.

### Refusal digest — only on a correct KILL/park/block

After adversary (or a thin kill that already meets n1–n3), call `recordRefusal` (clock τ2). Do not treat this as a criteria commit.

Handoff must include `digest_id` (or the digest fields). Minimum:

```text
workflow, anti_isc_ids, evidence_refs (path:… or a non-empty quote),
forbidden_outcomes, timestamp, schema_version, outcome ≠ pursue/approve,
content_hash
```

Do not write a digest on a pursue. Do not write one to decorate a thin collapse. Do not write one on a HOLD.

### Commit-or-refuse (exp-030 + exp-031; optional, not auto)

When you would change Ideal State Criteria, call `proposeCriteriaMutation`.
COMMIT only if the ISC-Commit Gate says COMMIT (n01=0 and n10≥1, evidence, core lock).
Once a criterion has passed verification in this session, it is sealed: the gate HOLDs any edit or remove of that id. Unseal only in a new session/epoch. Sealing sits beside the core lock (c6/c7); it does not replace n01=0 and n10≥1.
HOLD is not a refusal — do not write a digest. A sealed-touch HOLD is not a τ2 REFUSE.
Sealing: Apache-2.0 [zenith](https://github.com/Intelligent-Internet/zenith) `task_list_patch.py` `_sealed_task_ids` — a cleared gate seals upstream tasks from supersede/cancel.
When you already KILL/park/block under n1–n3, call `recordRefusal` (digest, clock τ2).
Do not treat REFUSE as a genome commit. No τ3. Do not edit `engine.ts`.
Handoff must include decision + clock + evidence_refs (digest_id if REFUSE; sealed ids if any passed this session).

### Red Queen — leftover after a harden

Treat the existing (unwired) harden as **gen-0 already happened**. Hunt a leftover the first harden left. Do not re-list the first-read exploit catalog.

- Cite a quote, or explicit `none` after looking.
- Known standing leftover (do not invent others): `HARDEN_TEXT.person_type` still says “weekly cost of the problem” with no number or unit.
- Live `generateCriteria` still has colon-tautology and OR-escape — those are first-read, not Red Queen.

### CI-EM P1 — reuse risk / cross-pack

Retrieve criterion-indexed **verified** failures at policy **P1** (same family, ecosystem excluded).

- Naming “CI-EM” without a retrieved **id** is a miss.
- Emit a transfer table: each candidate reuse is TP or TN, with id.
- Ecosystem (laser-safety, PPE, LSO, per-equipment) stays **TN** unless a human quarantine review names the id. Never auto-apply onto nature-study.
- Read verified same-family records by id from `<shared-store>/em-records.jsonl` (canonical shared store). Reference implementation: `harness/iscp-research/ci-em.ts` (`retrieveCiEm(recordsPath, query)`, engine-free, P1 only). Idea Gate `ci-em.ts` is not the read path. Do not call retrieval from product code this skill does not own.

Read-only libraries (read, do not wire):

| File | Use |
|------|-----|
| `the reference engine/src/lib/the reference engine/criteria-adversary.ts` | Game catalog, `HARDEN_TEXT` as gen-0 |
| `harness/iscp-research/ci-em.ts` | Fleet P1 reader. `ANTI_ISC` stays on `port.ts` |
| `the reference engine/src/lib/the reference engine/genome.ts` | Stable ids + core lock if you actually mutate |
| `the reference engine/src/lib/the reference engine/isc-commit-gate.ts` | ISC-Commit Gate (exp-030) |
| `the reference engine/src/lib/the reference engine/refusal-digest.ts` | emit + offline verify (exp-031) |
| `the reference engine/src/lib/the reference engine/commit-or-refuse.ts` | one surface for τ4 vs τ2 (exp-032) |
| `iscp/memory/experience_format.md` (or this repo `memory/experience_format.md`) | EM / CI-EM record fields |
| `harness/pure_gxp_loop.md` | Thin atom |

## Handoff (required)

```text
collapse: thin | plus:<node>
isc: [yes/no criteria]
sealed: [ids]                                # passed verification this session; omit if none
spawned: none | adversary | red-queen | ci-em-p1 | refusal
adversary: (games / harden class or none)   # only if spawned
residual: (quote or none)                    # only if red-queen
ci_em: (ids + TP/TN table)                   # only if ci-em-p1
decision: COMMIT | HOLD | REFUSE | (omit if neither τ4 nor refuse)
clock: τ1 | τ2 | τ4
evidence_refs: [...]
digest_id: ...                               # only if REFUSE
verified: (tests / quotes / schema)
em: {outcome, failed_criteria, notes}
anti_loop: ok | pivoted | killed
```

## Never

- Edit `engine.ts` or forge pipeline layout
- Un-park laser-safety packs
- Turn on a hybrid-confidence pipeline stage (exp-015 rejected)
- Open P0 memory transfer
- Multi-criterion harden without evidence
- Claim canalization as a measured advantage
- Invent τ3 “because plus”
- Stack all plus steps on one task
- Claim “first / only / beats PACE” (cite PACE; different object of commit)
- Load a `gxp` skill path (removed)

## Evidence

| Claim | Source |
|-------|--------|
| Thin captures almost all process gain (Card A +21.6 vs bare) | exp-021 |
| Plus Card B +9.2; collapse on simple work | exp-021 H2/H3 |
| Adversary, Red Queen, CI-EM P1, refusal each KEEP **alone** | exp-022 |
| P1 precision 1.00 vs P0 0.71 | exp-020 |
| Extra topology / confidence stage rejected | exp-015 |
| ISC-Commit Gate noisy false-commit 0 vs greedy 1/4 | exp-030 |
| Refusal Digest honest 2/2; listed tampers 4/4 fail | exp-031 |
| Commit-or-refuse category lock | exp-032 |

Standing policy: [docs/SYNTHESIS.md](../../docs/SYNTHESIS.md) · campaigns exp-021 / exp-022 / [Phase 4](../../experiments/CAMPAIGN-world-novelty.md) · [NAME.md](../../NAME.md).
