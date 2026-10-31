# Gated layout change (VGTE)

VGTE means: the graph may change only after a hard check.

## Layers

1. **Normal run** — a graph of simple-loop nodes.
2. **Auditor** — collects failures, odd events, and team traces (process signals only).
3. **Topology Proposal Loop** (itself a simple loop) — fires only after failure patterns pile up. It suggests a *small* rewrite (≤ 3 operations).
4. **Hard check gate** — tests that always run the same way (no broken order, budget safety, type safety). Optional dry-run before commit.
5. **Experience Memory** — records accepted and rejected proposals so later proposals get better.

## Rules

- Layout change is the exception, not the default.
- Only stable, high-coordination failure patterns trigger a proposal.
- Every node (including the proposal node) stays a simple loop.
- Failures are the only valid reason to improve layout.
- Free-form change is blocked by the gate, the small-change rule, and negative examples in memory.
