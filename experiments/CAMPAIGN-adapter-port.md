# Phase 7: adapter-port housed helpers (ISCP)

**Status:** Closed 2026-08-27 — Node 1 KEEP · Node 2 KEEP · Node 3 KEEP · Node 4 stop.  
**This campaign:** nothing further. Next helper **banned**. Housing copies stay. `evaluateIdea` stays unwired. 037 stays parked.  
**Parent:** [Phase 6 closeout](CAMPAIGN-sidecar-split.md) later queue row 1  
**Chooser:** first queued item that does **not** wire `evaluateIdea`. Thin default.  
**Claim rule:** Housing split only. Cite nearest art already on the KEEP briefs. No world-novelty.

## Why this campaign, not the others

| Queued | This campaign? |
|--------|----------------|
| Adapter-port 030–032, 034, 037 | **Yes — this file** (037 parked) |
| Wiring test | No. Phase 6 sidecar is a log. |
| Red Queen exp-019 | No. Standing policy, not a new helper. |
| exp-005 / 008 / 009 | No. Other products. |

Phase 2 bakeoff files (`ci-em.ts`, `genome.ts`, `criteria-adversary.ts`, `evo.test.ts`) stay housed in Idea Gate. They are the test surface, not this port.

## Graph (do not reorder)

```
Node 1 port contract  →  Node 2 digest+pin  →  Node 3 commit-or-refuse  →  Node 4 stop
```

037 soft-close stays housed this campaign unless Node 3 KEEP and a follow-up campaign names it. It already has a Phase 6 sidecar test in Idea Gate.

If N fails its outer ISC, do not start N+1.

| Node | Focus | Mode | Plus |
|------|--------|------|------|
| 1 | Freeze a port that does not import `engine.ts` | Chat | thin |
| 2 | Copy 031 + 034 behind that port; tests in `iscp/harness` | Build | thin |
| 3 | Copy 030 + 032 with injected check/evaluate; no engine import | Build | plus:adversary on the port ISC |
| 4 | Closeout. Housing copies stay. No wire. | Chat | thin |

## Shared Anti-ISC

- **n1** Do not treat a port as a product wire.
- **n2** No third soft rewrite of the same adapter.
- **n3** Do not delete Idea Gate housing copies in this campaign.

Clock: **τ1** on 1–3. **τ2** only if a node SHADOW/ABANDON writes a failure note. **No τ3. No τ4.**

## Outer ISC by node

### Node 1 — port contract

1. `[outcome]` `harness/iscp-research/port.ts` (or equivalent) defines the injected functions / types 031 and 034 need, with **zero** `the reference engine` `engine` imports.
2. `[outcome]` BOUNDARY.md lists which helpers this campaign will port vs park.
3. `[guardrail]` No helper body copied yet except what already lives in this folder (033/035/036).
4. `[outcome]` KEEP | HOLD recorded.

### Node 2 — digest + pin

Depends on Node 1 KEEP.

1. `[outcome]` `refusal-digest.ts` and `isc-pin.ts` exist under `harness/iscp-research/` and import the port, not `engine.ts`.
2. `[outcome]` Tests for both run from the iscp tree (or a documented command) and pass on frozen fixtures.
3. `[guardrail]` Idea Gate copies still present. `engine.ts` untouched.
4. `[economic]` 0 model passes.
5. `[outcome]` KEEP | SHADOW | ABANDON.

### Node 3 — commit gate + commit-or-refuse

Depends on Node 2 KEEP.

1. `[outcome]` `isc-commit-gate.ts` and `commit-or-refuse.ts` exist under `harness/iscp-research/` and do not import `the reference engine/engine.ts`.
2. `[outcome]` Check / evaluate / generate / SAMPLE_IDEAS are injected or stubbed so fixtures still prove n01=0 / n10≥1 and category lock.
3. `[guardrail]` `decideVerdict` / product path unchanged.
4. `[economic]` 0 model passes.
5. `[outcome]` KEEP | SHADOW | ABANDON.

**Adversary (this node only):** hunt “import engine to make the port easier,” reward-hack stubs that always COMMIT, untestable “feels decoupled.” Harden class: none — not pursued, or one port-type tighten.

### Node 4 — stop

1. `[outcome]` Housing copies not deleted.
2. `[outcome]` No wiring campaign started.
3. `[outcome]` BOUNDARY.md updated with KEEP/SHADOW per helper.
4. `[outcome]` Closeout paragraph in this file.

## Out of scope

- `evaluateIdea` import of any helper
- Deleting Idea Gate research files
- Moving ci-em / genome / adversary / evo.test
- exp-015, τ3, laser, novelty scan, P7/P8
- exp-005 / 008 / 009


## Results

**Node 1:** KEEP (thin) 2026-08-26 — [`port.ts`](../harness/iscp-research/port.ts) `ANTI_ISC` + `writeCiEm` in-memory store. Zero `engine.ts` / `types.ts` imports. No helper bodies that node.

**Node 2:** KEEP (thin) 2026-08-27 — [`refusal-digest.ts`](../harness/iscp-research/refusal-digest.ts) + [`isc-pin.ts`](../harness/iscp-research/isc-pin.ts) import `./port` only. Tests in `harness/iscp-research`. Housing copies not deleted.

**Node 3:** KEEP (plus:adversary) 2026-08-27 — [`isc-commit-gate.ts`](../harness/iscp-research/isc-commit-gate.ts) + [`commit-or-refuse.ts`](../harness/iscp-research/commit-or-refuse.ts). Frozen `InstancePairPort` rows. N4 greedy COMMIT / gate HOLD. Category lock. Zero engine imports. 037 not ported.

Adversary: import-engine not used; always-COMMIT stub rejected; untestable rejected. Harden class: **port-type tighten**. Not a product harden.

**Node 4:** Stop. Housing copies not deleted. No wiring campaign started. Next helper banned (037 port, `evaluateIdea` wire, housing delete). Bakeoff surface stays in Idea Gate.

## Later queue (none of these start here)

| Later, if you choose it | Why it is queued | Do not treat as “now” |
|-------------------------|------------------|------------------------|
| Port 037 behind `port.ts` | Node 3 KEEP named it; Phase 6 sidecar already logs it | Not this campaign |
| Wiring test | SYNTHESIS §6: only if FAIL-weasel + golden packs stay green | A port is not a wire |
| Delete Idea Gate housing copies | Tests now run here; a later cut must name the delete | Anti-ISC n3 this campaign |
| Standing Red Queen (exp-019) | Policy, not a new helper | Thin default still holds |
| Leftover surfaces exp-005 / 008 / 009 | Named, never run | Other products |

Still parked / never: P7/P8, exp-015, τ3, laser-safety, novelty scan, moving ci-em / genome / adversary / evo.test.

---
*Phase 7 closed 2026-08-27. KEEP 030/031/032/034. 037 parked. Housing copies stay. `evaluateIdea` unwired.*
