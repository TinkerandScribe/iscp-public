# ISCP Architecture

**Ideal State Control Plane** · Phase 1 locked  
**Old project name:** gxp  
How we build the agent control system

## Four builder rules (do not break these)

1. Start with a simple **loop**. Use pass/fail Ideal State Criteria. Check results with tests or rules that always run the same way. Use hard limits.
2. Turn only stable, high-coordination work into an explicit **graph**.
3. Treat every node as its own simple loop.
4. Save failures as real data so the layout can improve over time.

## Control-plane layers

```
Prompt → Context → Harness → Loop → Graph
     → Memory
     → Gated graph changes
     → Verify ↔ extra thinking time
```

Each layer moves more control out of hidden model weights (or the human operator) and into structure you can read, edit, and check.

## Thin vs plus

This is not a new architecture layer. It is a **chooser** on the same plane. Validated in exp-021 and exp-022.

- **ISCP thin** — loop only. On simple, reversible work with a strong check path, stay thin.
- **ISCP plus** — at most one extra step: adversary, Red Queen, CI-EM P1, or a refusal certificate.

Skill: [`skills/iscp/SKILL.md`](../skills/iscp/SKILL.md).

## Phase 1 design notes

### Memory

- Working Memory — short-lived. For the current job only.
- Experience Memory — lasting. Stores verified outcomes and failure graphs.
- Semantic / Skill Memory — lasting. Store only what has been verified.

At the end of each simple loop you may write to memory, but only after a check passes.

### Gated graph changes

- Normal nodes stay simple loops.
- An auditor collects failure patterns.
- A Topology Proposal Loop (itself a simple loop) may suggest a layout change.
- A hard check must pass before any rewrite.
- Experience Memory records the failure → rewrite link.

Purifying rule (exp-015): weight from **already-fixed** τ1 bugs is not a valid reason to change topology.

### Hybrid check node

- The outer loop owns the pass/fail checks and any side-effect permission.
- Inner extra thinking may produce a solution, a verdict, and a confidence score.
- An outside check that always runs the same way runs first and has final say.
- Failures go into Experience Memory.

## Contracts

- Memory writes (especially failures) feed the Topology Proposal Loop.
- Inner self-checks never beat an outside hard gate when side effects are at stake.
- Every advanced tool lives inside a simple loop.
- Product helpers stay **unwired** unless a later campaign turns wiring back on under pass/fail gates.
