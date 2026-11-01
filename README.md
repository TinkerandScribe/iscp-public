# ISCP — Ideal State Control Plane

ISCP helps you tell when an AI agent's work is really done. Before a job starts, you write 4–8 yes/no checks. The agent proves each one with a test, a rule, or a quote before it's allowed to call the job finished. Failures get written down so the next run can learn from them.

**Who it's for:** people building agent workflows who want "done" to mean done.

**Related:** ISCP builds on [GXP](https://github.com/TinkerandScribe/gxp), our verification-first workflow for AI agents. GXP is the day-to-day workflow; ISCP is the control layer on top of it — how checks get set, proven, sealed, and changed.  
**Skill file:** [`skills/iscp/SKILL.md`](skills/iscp/SKILL.md)  
**Status:** Phases 1–5 done (exp-030–037 KEEP). Helpers are not wired into product code. See [NAME.md](NAME.md).

ISCP is a control system for AI agent sessions. It sits around the model. It does not replace the model.

It uses clear pass/fail checks called **Ideal State Criteria**. By default it runs a simple loop. It adds at most one extra step only when the job needs it.

It builds on GXP. It is a method and a set of small helpers, not a product engine.

## Quick start

1. Read the skill: [`skills/iscp/SKILL.md`](skills/iscp/SKILL.md). Drop it into any agent that reads skill or rules files (Cursor, Claude Code, and similar).
2. Run the helpers and their tests (Node 20+):
   ```bash
   cd harness/iscp-research
   npm install
   npm test
   ```
3. See the evidence: [`docs/SYNTHESIS.md`](docs/SYNTHESIS.md) and [`experiments/`](experiments/).

## Words we use

- **Ideal State Criteria (ISC):** the yes/no checks that define done.
- **Thin / Plus:** thin is the default loop; plus adds one extra step for fuzzy or risky work.
- **Adversary:** a step that tries to break the answer.
- **Red Queen:** a hunt for leftover gaps after the checks pass.
- **CI-EM:** reusing past verified failures, matched by the check they failed. **P1** means same family only.
- **Refusal digest:** a tamper-evident record of why the agent stopped.
- **Card A / Card B:** the two scoring rubrics used in the exp-021 bakeoff (simple work vs. fuzzy work).

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

## Four builder rules

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

Not run: exp-005, 008, 009 (they targeted product surfaces that aren't part of this repo).

## Where the helpers came from

ISCP grew up next to a private product engine. A few helpers were first tested there. The copies in [`harness/iscp-research/`](harness/iscp-research/) don't import that engine and run on their own. See [BOUNDARY.md](harness/iscp-research/BOUNDARY.md).

## How to use it

Load [`skills/iscp/SKILL.md`](skills/iscp/SKILL.md) into your agent. Use thin by default. Add at most one plus step, only when the job needs it.

## Docs

- [NAME.md](NAME.md) — name change
- [docs/SYNTHESIS.md](docs/SYNTHESIS.md) — full research record
- [docs/architecture.md](docs/architecture.md) — locked Phase 1 design
- [harness/iscp-research/BOUNDARY.md](harness/iscp-research/BOUNDARY.md) — how the helpers were split from the private engine
- [experiments/](experiments/) — every experiment (exp-001–037) and campaign, including the ones we rejected
- [work/](work/) — a longer worked example
- [SECURITY.md](SECURITY.md) · [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT — see [LICENSE](LICENSE). Copyright © 2026 Tinker and Scribe Workshop Inc. Same license as [GXP](https://github.com/TinkerandScribe/gxp).

---
*ISCP · Ideal State Control Plane · by Tinker & Scribe · builds on GXP*
