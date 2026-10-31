# Phase 4 campaign: world-novelty frontier (ISCP)

**Status:** Closed 2026-08-26 — exp-030–032 KEEP · skill paragraph merged · literature audit recorded · helpers unwired
**Parent:** [ISCP program of record](../docs/SYNTHESIS.md) · [NAME.md](../NAME.md)  
**Discipline:** ISCP four builder rules + pre-registered KEEP / SHADOW / ABANDON  
**Claim rule:** This is our own engineering and measurement. **Do not claim “first in the world”** in titles, READMEs, or papers until a literature audit at Results time says otherwise.

## Why this campaign exists

Phases 2–3 validated a control-system kit that is new to us and only partly new in the wider world. A prior-art review showed the open space is not another metaphor. It is:

1. A **formal acceptor** for changes to **Ideal State Criteria** (not just prompt or code accuracy).
2. A **portable refusal record** stronger than session notes, weaker than fake legal certification.
3. One **commit-or-refuse** surface so “yes, change the checks” and “no, stop” use the same gate rules.

Closest outside work (cite it, then say how we differ):

| Anchor | What it does | What it does *not* do |
|--------|----------------|------------------------|
| [PACE](https://arxiv.org/abs/2606.08106) (arXiv:2606.08106) | Anytime-valid commit gate for self-evolving **prompts/skills** on task accuracy | Commit tests on **Ideal State Criteria genomes** with adversary game-escape scores |
| IETF-style Refusal Digest drafts | Signed digests that forbidden transitions did not happen | Light **coding-agent / product-workflow** certificates tied to Anti-ISC + CI-EM |
| ISA / Ideal State practice | Probeable ideal-state claims | Formal sequential tests for **changing** the criteria set itself |
| ISCP Phase 2 (exp-010–020) | Adversary, genome, CI-EM, simple refusal cert, purifying τ3 rule | Statistical false-commit control; portable offline-checkable digests |

## Research questions

1. Can an anytime-valid (or bounded sequential) **ISC-Commit Gate** reject noisy criteria changes while still allowing evidence-gated hardens, with false-commit rate ≤ α on a frozen golden set?
2. Can a **Refusal Digest** be written, stored, and **re-checked offline** from public fields only, without becoming a second scorer that over-refuses?
3. Does one **commit-or-refuse** surface cut silent criteria drift *and* undocumented kills versus two ad-hoc paths?

## Experiment ladder (do these in order)

| Exp | Focus | Depends on | Primary surface |
|-----|--------|------------|-----------------|
| [exp-030](exp-030.md) | **ISC-Commit Gate** — formal acceptor for genome changes | Phase 2 KEEP (010, 011, 016) | the reference engine `genome.ts` + golden SAMPLE_IDEAS + adversary scores |
| [exp-031](exp-031.md) | **Refusal Digest** — portable, re-checkable refuse records | Phase 2 KEEP (012, 013) | ci-em refusal mode + offline verify script |
| [exp-032](exp-032.md) | **Commit-or-Refuse surface** — one API for τ4 mutate vs τ2 refuse | exp-030 + exp-031 KEEP | helper + protocol doc; **not** engine wire-up |

**Hard rule:** If N fails its benefit/cost gate, do not spend on N+1 in this ladder. SHADOW is allowed (keep the protocol, do not ship).

## Shared measurement model

### Benefit axes
- False-commit rate of criteria changes (α bound or empirical upper bound on the golden set)
- True-positive admit of exp-010-style hardens that cut high-severity games
- Offline re-check rate of digests (100% on held digests)
- Over-refusal: 0 false KILL on strong pursue samples
- Citation quality: digests/commits point at Anti-ISC / criterion ids

### Cost axes
- Extra model passes per commit decision (target: **0** for a formal gate if scores are deterministic; else ≤1)
- Wall-clock / eval count vs greedy “always mutate if the adversary says so”
- Schema tax (files, fields, mental load)

### Decision rule
KEEP only if primary benefit ≥ threshold **and** cost ≤ threshold **and** no anti-ISC regression on golden samples. Else SHADOW or ABANDON.

## Novelty claim rules (required)

Allowed after KEEP:
- “ISCP ISC-Commit Gate: sequential commit tests for Ideal State Criteria changes under adversary scores”
- “ISCP Refusal Digest: offline-re-checkable refusal records for product agent workflows”

Forbidden until an outside audit:
- “first ever”, “novel algorithm”, “world’s only”, “beats PACE”

Say how we differ by **what we commit** (criteria genome + game-escape scores) and by **product refusal shape**. Do not invent new statistics as the difference.

## Out of scope (whole campaign)

- Wiring into `evaluateIdea` / forge approve path
- Claiming legal or compliance certification
- Turning on exp-015 topology
- Multi-agent concurrent genome change
- Replacing PACE on GSM8K-style tasks (different problem)

## Status

- [x] exp-030 ISC-Commit Gate — **KEEP** (helper + protocol; not wired; [exp-030.md](exp-030.md))
- [x] exp-031 Refusal Digest — **KEEP** (helper + protocol; not wired; [exp-031.md](exp-031.md))
- [x] exp-032 Commit-or-Refuse surface — **KEEP** (orchestration + protocol; [exp-032.md](exp-032.md))
- [x] Skill paragraph merged into [`skills/iscp/SKILL.md`](../skills/iscp/SKILL.md) (Phase 4 closeout)
- [x] Literature audit — [CAMPAIGN-world-novelty-audit.md](CAMPAIGN-world-novelty-audit.md) (no priority claim)

Skill now includes commit-or-refuse as **recording rules**, not a fifth plus personality. Helpers stay read-only. `engine.ts` unedited.

---
*Opened under ISCP rules as Phase 4. Briefs frozen 2026-08-26. Closed 2026-08-26.*
