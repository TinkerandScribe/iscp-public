# Phase 4 literature audit (Results time)

**Date:** 2026-08-26  
**Scope:** Claim posture for exp-030–032. Not a full survey.

## What we checked

| Anchor | What it is | Overlap with ISCP Phase 4 | Difference we actually measured |
|--------|------------|---------------------------|----------------------------------|
| [PACE](https://arxiv.org/abs/2606.08106) (Shawn, 2026) | Anytime-valid commit gate for self-evolving **prompts / skills / workflows** on **task accuracy**. Paired eval + testing-by-betting e-process; per-candidate false-commit control under optional stopping. | Commit-gate *shape*: incumbent vs candidate on a frozen instance set. | **Object of commit** is an Ideal State Criteria **genome** scored with adversary **high-severity game counts** + the reference engine contracts. Our rule is bounded discordant-pair (n01=0 ∧ n10≥1) with empirical α=0 on a 5-row D — **not** a PACE e-process on GSM8K. |
| HTTP integrity digests ([RFC 9530](https://www.rfc-editor.org/rfc/rfc9530.html)) | Hash fields over message content. | Hash-then-recheck. | Not an agent refusal record; not Anti-ISC. |
| “IETF-style Refusal Digest” as named in the campaign brief | Shape we aimed at: a later process can re-check that a forbidden transition did not occur. | Portable digest fields. | No matching IETF *agent-refusal* draft found in this audit. Our digest is unsigned, product-workflow, tied to `n1–n3`. **Not legal certification.** |
| SEA / anytime-valid certificates (related 2026 self-evolve work) | Limit self-mod by freezing a base model + verify. | Self-mod is gated. | Different stack; we did not compare empirically. |

## Allowed claims (unchanged)

- “ISCP ISC-Commit Gate: sequential commit tests for Ideal State Criteria changes under adversary scores”
- “ISCP Refusal Digest: offline-re-checkable refusal records for product agent workflows”

## Still forbidden

- “first ever”, “novel algorithm”, “world’s only”, “beats PACE”

## Audit result

Differentiation stands as **object of commit** and **product refusal shape**. Do not upgrade claim language. Do not treat empirical α=0 on frozen D as PACE anytime-validity.
