# ISCP — Ideal State Control Plane

**Old name:** gxp  
**Skill file:** [`skills/iscp/SKILL.md`](skills/iscp/SKILL.md)  
**Status:** Phases 1–5 done (exp-030–037 KEEP). Helpers are not wired into product code. See [NAME.md](NAME.md).

ISCP is a control system for AI agent sessions. It sits around the model. It does not replace the model.

It uses clear pass/fail checks called **Ideal State Criteria**. By default it runs a simple loop. It adds at most one extra step only when the job needs it.

It comes from GXP. It is not a product engine. It is not Idea Gate.

## Plain picture

```
Prompt → Context → Harness → Loop → Graph
     → Memory (what we keep after a job)
     → Gated graph changes (only after a hard check)
     → Verify ↔ extra thinking time
```

**Thin (default):** 4–8 pass/fail checks. Check results with tests or rules first. Stay inside hard limits. Treat failures as data.

**Plus (at most one extra step):** use only when the job class needs it:
- adversary check
- Red Queen leftover hunt
- CI-EM P1 (reuse past verified failures)
- refusal digest (only after a correct stop)

## Four builder rules (do not break these)

1. Start with a simple **loop**. Use pass/fail checks. Use checks that always run the same way. Use hard limits.
2. Turn only stable, high-coordination work into an explicit **graph**.
3. Treat every node as its own simple loop.
4. Save failures as real data so the system can get better over time.

## What the experiments showed

| Phase | Result |
|-------|--------|
| 1 (exp-001–004) | The four rules held. Memory, gated graph change, and multi-agent work all stayed inside those rules. |
| 2 (exp-010–020) | Keep the useful tools. **exp-015 rejected** (extra topology stage did not help). |
| 3 (exp-021) | Thin scored +21.6 vs bare on Card A. Plus scored +9.2 on Card B. On simple work, stay thin. |
| 3b (exp-022) | Keep adversary, Red Queen, CI-EM P1, and refusal as optional plus steps. |
| 4 (exp-030–032) | **KEEP** ISC-Commit Gate, Refusal Digest, Commit-or-Refuse. Skill updated. Not wired. |
| 5 (exp-033–037) | **KEEP** stake, pin, skill changelog, inherit, soft-close cert. Not wired. |

Not run: exp-005, 008, 009 (other product surfaces).

## Idea Gate boundary

Idea Gate is a separate product (GXP × Zero to Founder). Some ISCP helpers were housed there for tests. Engine-free copies now live in [`harness/iscp-research/`](harness/iscp-research/BOUNDARY.md). `the reference engine` `engine.ts` was not edited and does not import these helpers.

## How to run it

Load [`skills/iscp/SKILL.md`](skills/iscp/SKILL.md). Use thin by default. Add at most one plus step. Do not edit `the reference engine` `engine.ts` or forge topology. Do not un-park laser-safety. Do not turn on exp-015.

## Docs

- [NAME.md](NAME.md) — name change
- [docs/SYNTHESIS.md](docs/SYNTHESIS.md) — full research record
- [docs/architecture.md](docs/architecture.md) — locked Phase 1 design
- [harness/iscp-research/BOUNDARY.md](harness/iscp-research/BOUNDARY.md) — split from Idea Gate
- [experiments/](experiments/) — exp-001–022, Phase 4, Phase 5

## License

Research and teaching use, in the spirit of the original GXP project.

---
*ISCP · Ideal State Control Plane · formerly gxp*
