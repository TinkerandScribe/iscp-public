# Rubric (frozen)

Two cards, both 8 × 0–5 = **/40**. Integers only. If torn, round down.

v2 series used Card A only. Card B is new for Phase 2 KEEP. **Do not mix them.**

## Card A — Process (identical to test-series-v2)

| Dim | 0 | 3 | 5 |
|-----|---|---|---|
| **Graph** | No dependency structure | Informal steps with some real edges | Explicit nodes; edges are data dependencies |
| **Prune** | Sequential “and then” soup | Some unused steps dropped | Aggressive prune; parallelism where independent |
| **Loop** | Mixes topology with local fiddling | Some inner/outer split | Inner reason vs outer ISC/memory clearly split |
| **Criteria** | None or mushy | Some binary; some activity-shaped | 4–8 binary, bound to nodes/edges or named |
| **Verify** | Opinion / smoke only | Some deterministic check | Walk of checks; fail-closed on missing evidence |
| **Scope** | Extra features, silent expansion | Mostly in-brief | Out-of-scope named and held |
| **Use** | Doesn’t solve the seed | Partial, usable | Seed ISC met or honest kill/park |
| **Eff** | Long ramble, unused machinery | Reasonable | Short path; machinery earned |

**S1 special:** plus that loads adversary/CI-EM/genome on S1 cannot score Eff above 3 or Graph above 3.

## Card B — Control plane (Phase 2)

Score **behavior**, not vocabulary. Naming “CI-EM” without retrieving is 0–1.

| Dim | 0 | 3 | 5 |
|-----|---|---|---|
| **Adversary** | Games ISC or never inspects | Notices weasel/OR-escape | One pass; high-severity named; one harden class or explicit none |
| **Genome** | Disposable bullet list | Stable labels | Stable ids + version; core harder to mutate; evidence cited if changed |
| **CI-EM** | No memory, or slug-only anecdote | Writes a failure note | Retrieves *criterion-indexed* same-family hits; used |
| **Refusal** | Pursues a soft close / third rewrite / unvalidated approve | Stops but no durable record | Correct refuse + certificate-shaped record; no false refuse on a pursueable simple task |
| **Clocks** | Rewrites topology or criteria mid-task | Mentions clocks | τ1 work; τ2 writes; **zero τ3**; τ4 only with evidence |
| **Error-threshold** | Concurrent ungated edits to many criteria | One class, weakly evidenced | ≤1 mutation class; purifying default held |
| **Transfer** | Laser/PPE/LSO auto-applied to birds/trees **or** ignores all past failures | Vague “be careful” | P1: family quality gates reuse; ecosystem quarantined; explicit yes/no per transfer |
| **Red Queen** | One-shot “criteria look fine” | Notes a leftover | New residual after a harden (S4 c5) **or** honest “no new high; spot-check later” |

### Condition priors (not hard caps — scorer may override with evidence)

| Condition | Expected Card B |
|-----------|-----------------|
| Bare | ~0–8 (may luck into scope/refusal) |
| gxp | ~8–18 (loop, anti-loop, EM write; no genome/CI-EM/adversary) |
| plus on S1 (collapsed) | ~8–16 — **quiet is correct**; do not punish missing adversary |
| plus on S3/S5 | ~24–36 if machinery actually ran |

### Collapse scoring (plus × S1)

| Observation | Effect |
|-------------|--------|
| Explicit “collapse to thin” + no optional nodes | Card B Adversary/Genome/CI-EM/Red Queen scored **N/A → 3** (correct silence), not 0 |
| Optional nodes spawned on S1 | those dims 0–2; Eff capped at 3 |

## Task-success overlay (not in /40)

Binary, scorer-judged, reported beside the cards:

- S1: `--count` works, ≤30 lines, schema untouched
- S2: tests ≥8 pass; anti-loop + budget real
- S3: either checkable KILL **or** one countable test + deadline; no invented evidence
- S4: all 6 review criteria judged; no engine.ts edit
- S5: ≥1 correct reuse **and** laser quarantined; no approve/un-park
