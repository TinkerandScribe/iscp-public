# ISCP Novelty Scan Log

**Process:** propose → prior-art search → classify → note → dispose → next  
**Rule:** promote only **open gap** or **rare combo with measurable delta**. Novel-to-us ≠ promote.  
**Out of band:** exp-030–032 (running elsewhere); do not re-litigate here except as park cards.  
**Started:** 2026-08-26  
**Last batch:** ~10 min continuous scan (cards 013–022)

## Classification key

| Label | Meaning |
|-------|---------|
| world-established | Clear public practice/research |
| parallel | Others reached nearby idea |
| rare combo | Pieces exist; specific assembly uncommon |
| open gap | No close art found in this pass |

## Dispose key

drop · park (citation only) · **promote** (eligible for future brief)

---

## Card 001 — Idea-vs-criteria satisfaction probe
**Dispose:** **drop** (product gap, not world-novel)

## Card 002 — Negative-transfer certificates (durable TN)
**Dispose:** **park**

## Card 003 — ISC-preserving context compaction
**Concept:** Pin + re-verify binary Ideal State Criteria + Anti-ISC after every compaction; pin-fail = hard failure + CI-EM write.
**Nearest art:** Lost in Compaction / CompInt (~17% SC retention); Compaction Cliff / Knowledge Triage TypeCompact (safety-rule recall 53%→10% over rounds; TypeCompact 2–4× better); Constraint Pinning; Slipstream.
**Residual gap:** Pin type = **versioned ISC genome + Anti-ISC ids** with ISCP clocks + **CI-EM write on pin-fail** (not only “safety rules” or generic SCs).
**Dispose:** **promote** → **P1**

## Card 004 — Economic binding as Ideal State Criterion
**Dispose:** **drop**

## Card 005 — Partial-order / lattice of Ideal State Criteria
**Dispose:** **drop**

## Card 006 — Credit assignment for topology promotion
**Dispose:** **drop**

## Card 007 — Anti-criteria / Negative ISC (world check)
**Dispose:** **park** — cite PAI ISC-A

## Card 008 — Purifying topology stakes (only unfixed CI-EM)
**Dispose:** **park**

## Card 009 — Probeability-at-write
**Dispose:** **drop**

## Card 010 — Dual-clock memory TTL
**Dispose:** **drop**

## Card 011 — Adversary-on-handoff
**Dispose:** **park**

## Card 012 — EM schema evolution without retrieval contamination
**Dispose:** **drop**

---

## Card 013 — Operator-abort as Anti-ISC event

**Concept:** Human kill/abort is not only a runtime stop; it emits a typed Anti-ISC refusal certificate (anti_isc_ids + evidence_ref + operator principal) into Experience Memory.

**Nearest art:** AI agent kill switches (separate control plane); Evidence-Carrying Termination (ECT, arXiv:2608.23623) for *agent* COMPLETE; industrial abort operators; mission-abort policies (different domain).

**Their result:** Kill switches and evidence-carrying *agent* termination exist; ECT zeros premature unsupported COMPLETE.

**Residual gap:** **Human-initiated abort** as first-class **Anti-ISC + certificate** (not only process kill) is thinner than agent-side ECT. Still close to refusal digests / exp-031 territory.

**Classify:** parallel / rare combo with 031  
**Dispose:** **park** — fold into 031 if KEEP; do not dual-fund

---

## Card 014 — Subagent ISC attenuation (inherit + tighten-only)

**Concept:** On spawn, child receives parent Ideal State Criteria by value; child may **add or tighten** criteria, never loosen or drop parent ISC without a parent-signed waiver. Parallel to capability scope attenuation, but for Ideal State.

**Nearest art:** Skill inheritance (Hermes PR #3631); governance-inheritance skills; PEDIGREE scope attenuation for tokens; “When Child Inherits” (arXiv:2605.08460) on *dangerous* memory inheritance; agent SDK InheritParent route policies.

**Their result:** Skills/policies/tokens inherit; security literature warns inheritance spreads compromise; PEDIGREE mandates narrower child scopes.

**Residual gap:** **Binary Ideal State Criteria** as the attenuated object (not skills, tools, or OAuth scopes) with tighten-only rule + verify on child complete is uncommon as a measured control-plane invariant.

**Classify:** rare combo  
**Dispose:** **promote** → **P2**

---

## Card 015 — CI-EM retention under compaction (failure-memory cliff)

**Concept:** Measure and gate **criterion-indexed failure records** through compaction the same way Compaction Cliff measures safety rules—pin CI-EM ids; pin-fail writes a meta-failure.

**Nearest art:** Compaction Cliff TypeCompact for safety rules; Lost in Compaction for Session Constraints; Inspect compaction + memory() tool offload.

**Their result:** Type-aware retention works for safety-rule *types*; SC retention is poor under task-centric compactors.

**Residual gap:** Public benchmarks do not treat **criterion-indexed Experience Memory** as a distinct pin type with transfer_scope. Measurable delta vs TypeCompact “safety rules” bucket is available.

**Classify:** rare combo (measurement + type)  
**Dispose:** **promote** → **P3** (can share harness with P1; different pin payload)

---

## Card 016 — Adversary co-evolution rate limit (Red Queen without mutational load)

**Concept:** Bound adversary generations per criteria epoch so Red Queen cannot force unbounded τ4 mutation (error-threshold aware RQ).

**Nearest art:** Biological Red Queen rate models; exp-016/019 standing policy; PACE commit gates limiting false accepts; evaluation budgets generally.

**Their result:** Periodic RQ and error-threshold already ISCP policy; budgets are standard.

**Residual gap:** Packaging only.  
**Dispose:** **drop** (policy, not novelty)

---

## Card 017 — Ideal State diff as only legal skill changelog

**Concept:** Skill/workflow evolution may only land when accompanied by a structured **ISC diff** (added/removed/tightened criteria); code-only skill edits without ISC delta are rejected.

**Nearest art:** Spec Growth Engine (intent graph vs evidence graph; AI updates spec in same commit); litespec ADDED/MODIFIED/REMOVED requirements; drift validation gates; Netflix diff systems (different domain).

**Their result:** Spec-coupled commits and requirement deltas are shipping architecture patterns.

**Residual gap:** Restricting the delta object to **Ideal State Criteria** (ISCP binary ISC) vs general specs is a narrow specialization, not open science.

**Classify:** parallel  
**Dispose:** **park** — skill hygiene; cite Spec Growth Engine

---

## Card 018 — Freeze epoch (criteria immutable during adversary measurement)

**Concept:** During an adversary + score epoch, Ideal State Criteria are **write-frozen**; harden proposals queue for a separate τ4 commit gate (links to exp-030 without duplicating it).

**Nearest art:** Frozen eval protocols; PACE incumbent vs candidate comparison; concurrent mutation forbidden in many experiment designs; Code-A1 independent Test LLM.

**Their result:** Freeze-during-measure is standard experimental hygiene; formalized as product control-plane law less often.

**Residual gap:** Explicit **τ4 freeze latch** API for coding agents is process IP adjacent to 030.

**Classify:** parallel to 030  
**Dispose:** **park** — absorb into 030 Results if they invent the latch; no separate brief

---

## Card 019 — Detached criteria-adversary model (anti-circular harden)

**Concept:** Detector and hardener must be different model identities / prompts with no shared weights path (Code-A1 style) when scoring ISC games.

**Nearest art:** Code-A1 independent Code LLM vs Test LLM; Gauntlet loops (separate critic, fresh context); Adv-RM adversarial reward training; classic adv-eval “don’t reuse the defense model.”

**Their result:** Separation is established best practice; exp-010 already noted circularity of paired scripted detector/hardener.

**Dispose:** **drop** (world-established; enforce as eval hygiene)

---

## Card 020 — Cross-workflow ISC contract interface

**Concept:** Workflows export a minimal Ideal State interface (core criteria ids) that callers must satisfy before invocation—like typed APIs for agent tools.

**Nearest art:** MCP tool schemas; skill manifests; capability containment (formal skill verification); agent cards; contract-first agent APIs.

**Their result:** Tool/skill contracts are mainstream.

**Dispose:** **drop** (rebrand of interface contracts)

---

## Card 021 — Soft-close POP as structural Anti-ISC (n1) with machine detect

**Concept:** Soft-close “pursue and see” is not only a scoring heuristic; it is a **detectable structural pattern** that forces KILL + certificate.

**Nearest art:** the reference engine n1 already; product anti-patterns; ISA hard-to-vary claims.

**Dispose:** **drop** (local product; not world-novel)

---

## Card 022 — Compaction after refusal must not resurrect refused action

**Concept:** After a refusal certificate, compaction summaries must not reintroduce the refused action as “pending work.”

**Nearest art:** Lost in Compaction / Compaction Cliff (constraints drop); Uvbolt “prior approvals expire after compaction”; ECT termination evidence.

**Their result:** Approvals/constraints silently mutate under compaction is documented.

**Residual gap:** Binding **refusal certificates** as non-resurrectable pins is a natural dual of P1 (positive ISC pins vs negative refused-action pins).

**Classify:** rare combo with P1  
**Dispose:** **promote** → **P4** (dual of P1; same experiment family)

---

## Batch 3–4 summary

| Card | Dispose |
|------|---------|
| 013 operator-abort Anti-ISC | park (→031) |
| 014 subagent ISC attenuation | **promote P2** |
| 015 CI-EM retention under compaction | **promote P3** |
| 016 RQ rate limit | drop |
| 017 ISC-only skill changelog | park |
| 018 freeze epoch | park (→030) |
| 019 detached adversary model | drop |
| 020 cross-workflow ISC interface | drop |
| 021 soft-close structural n1 | drop |
| 022 refusal non-resurrection under compaction | **promote P4** |

**Pattern held:** most nouns are taken; surviving novelty is **assemblies** (ISC/Anti-ISC/CI-EM as pin types; ISC attenuation on spawn).

---

## Promote board (test candidates)

| ID | Concept | Measurable test sketch | Depends |
|----|---------|------------------------|---------|
| **P1** | ISC-preserving compaction | After N compact rounds, ISC+Anti-ISC pin recall = 100% or pin-fail+CI-EM; vs task-centric compact baseline | after 030–032 |
| **P2** | Subagent ISC attenuation | Child that drops parent ISC fails gate; child that tightens passes; waiver path explicit | after 030–032 |
| **P3** | CI-EM pin under compaction | Seeded CI-EM ids survive TypeCompact-like policy; measure recall vs safety-rule-only triage | share harness with P1 |
| **P4** | Refusal non-resurrection | Post-refusal compact must not list refused action as next step; dual of P1 | share harness with P1 |

## Park board

| ID | Note |
|----|------|
| 002 TN certs | 020 / 031 |
| 007 Anti-ISC | cite PAI ISC-A |
| 008 unfixed τ3 | policy |
| 011 handoff adversary | skill checklist |
| 013 operator-abort | fold 031 |
| 017 ISC skill changelog | cite Spec Growth Engine |
| 018 freeze epoch | fold 030 |

## Explicit non-promotes this pass

World-established or crowded: idea-vs-criteria probe, economic ISC, ISC lattice, topology credit, probe-at-write, TTL memory, EM migrations, RQ rate limit, detached adversary, tool ISC interfaces, soft-close n1 productization.

## Next queue (if another pass)

- Multi-tenant ISC isolation (same model, different Ideal States, no bleed)
- Adversarial compaction (compactor as attacker against pins)
- ISC fitness vs task score Pareto front (when tightening ISC hurts Card A)
- Certificate federation across repos without shared EM store

*Loop paused after ~10 min continuous scan. Promote set = P1–P4.*
