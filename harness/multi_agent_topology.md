# Multi-agent layout (reference design)

## Starting pattern

Specialist nodes pass work only after a check:

- Researcher / Implementer
- Analyst / Critic
- Verifier (outside tests + yes/no criteria gate)
- Synthesizer
- Memory-Manager
- Auditor + Topology Proposal (optional, for gated layout change)

Edges may be one-after-another, in parallel, or conditional. Every node is itself a full simple loop.

## Coordination rules

- Hand-offs are checked (complete content, right type, criteria still match).
- Experience Memory is shared and versioned. Specialists write. Later nodes read under clash checks.
- Coordination failures are saved. They may trigger a small layout change under the VGTE gate.
- No node owns the global layout. The control system (Auditor + Proposal + Gate) does.

## When to promote

Only when split work, parallel work, or lasting hand-offs are needed again and again, and one node is not enough.
