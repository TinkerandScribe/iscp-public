# Experience Memory format

These records store outcomes and failures for ISCP nodes.

**Old project name:** gxp. Same schema.

## Record schema (JSON)

```json
{
  "timestamp": "ISO-8601",
  "variant": "pure_gxp | hybrid | self_modifying | multi_agent",
  "iteration": 1,
  "outcome": "success | failure | pivot",
  "failed_criteria": ["list of Ideal State Criteria that failed"],
  "injected_failure": false,
  "recovery_attempted": true,
  "recovery_success": true,
  "notes": "short root-cause or observation",
  "topology_change": null
}
```

## Write rules

- Write after every check success or failure.
- Failures are real data. Later they can drive layout proposals.
- Write only after a test that always runs the same way, or after a high-confidence check.
- The Experience Graph groups runs → paths → later principles.

## Read rules

- Retrieve only if the record is relevant, fresh, and not in clash with other records.
- Injecting memory into a node is itself a small check.

## CI-EM add-on (exp-012 KEEP)

This is the criterion-indexed form. `failed_criteria` and `outcome` stay required. Extra fields used by the the reference engine prototype (`src/lib/the reference engine/ci-em.ts`):

```json
{
  "id": "ig-antiloop-01",
  "timestamp": "ISO-8601",
  "criterion_ids": ["c7"],
  "mode": "weasel_criteria | soft_close_pop | anti_loop_cap | schema_validate_fail | strict_enrich_residual_skeleton | founder_as_customer_bias | criteria_game_escape | refusal | clock_violation",
  "topology_context": "the reference engine/decideVerdict",
  "resolution": "force KILL at MAX_REWRITE_PASSES",
  "transfer_scope": "workflow | family | ecosystem",
  "family": "idea-evaluation | curriculum-pack | process",
  "workflow": "the reference engine",
  "failed_criteria": ["anti-loop"],
  "outcome": "success | failure | pivot | refusal",
  "notes": "SEED_IDEA rewritePass=2",
  "verified": true
}
```

### Transfer policy (exp-020 KEEP)

| Policy | Rule |
|--------|------|
| **P0** | Open transfer. Any record may inform any workflow. This is the anti-pattern. |
| **P1** | Default. Same `family` only. `transfer_scope: ecosystem` is excluded. |
| **P2** | Family auto. Ecosystem ids only after a human quarantine review. |

Laser-safety failures are `transfer_scope: ecosystem`. Do not auto-apply them to nature-study or idea-evaluation.

### Refusal certificates (exp-013 KEEP)

Store as CI-EM with `mode: refusal` and `outcome: refusal`. Payload: `(workflow, anti_isc_ids, evidence_ref, timestamp)`.
