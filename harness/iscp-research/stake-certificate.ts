/**
 * exp-033 Topology Stake Certificate.
 * Canonical ISCP copy. the reference engine still has a housing copy (not wired to engine.ts).
 *
 * Related: ATM shadow-before-live (arXiv:2607.20488) and canary practice gate
 * structural change offline. This helper does *not* run topology mutation.
 * Residual rule: stake only on *unfixed* CI-EM weight — reject proposals whose
 * cited failures are already fixed or unknown (fail closed).
 */

export type StakeFixStatus = "open" | "fixed";

export type StakeStore = {
  /** Return open|fixed for a known CI-EM id; undefined if unknown. */
  getStatus(id: string): StakeFixStatus | undefined;
};

export type StakeProposal = {
  proposal_id: string;
  cited_ci_em_ids: string[];
};

export type StakeDecision = "ACCEPT" | "REJECT";

export type StakeCertificate = {
  proposal_id: string;
  cited_ci_em_ids: string[];
  status_per_id: Record<string, StakeFixStatus | "unknown">;
  unfixed_weight: number;
  decision: StakeDecision;
  reason: string;
  evidence_refs: string[];
};

/** In-memory store for tests and harnesses. */
export function makeStakeStore(
  entries: Record<string, StakeFixStatus>,
): StakeStore {
  return {
    getStatus(id: string) {
      return entries[id];
    },
  };
}

/**
 * Evaluate a topology/layout proposal stake.
 * ACCEPT only when every cited id is known and at least one is still open.
 * REJECT on empty cites, any unknown id, or unfixed_weight === 0.
 */
export function evaluateStake(
  proposal: StakeProposal,
  store: StakeStore,
): StakeCertificate {
  const cited = [...proposal.cited_ci_em_ids];
  const status_per_id: Record<string, StakeFixStatus | "unknown"> = {};
  const evidence_refs: string[] = [];
  let unfixed_weight = 0;
  let unknown = false;

  if (cited.length === 0) {
    return {
      proposal_id: proposal.proposal_id,
      cited_ci_em_ids: cited,
      status_per_id,
      unfixed_weight: 0,
      decision: "REJECT",
      reason: "empty_cites",
      evidence_refs: [],
    };
  }

  for (const id of cited) {
    const status = store.getStatus(id);
    if (status === undefined) {
      status_per_id[id] = "unknown";
      unknown = true;
      continue;
    }
    status_per_id[id] = status;
    if (status === "open") {
      unfixed_weight += 1;
      evidence_refs.push(id);
    }
  }

  if (unknown) {
    return {
      proposal_id: proposal.proposal_id,
      cited_ci_em_ids: cited,
      status_per_id,
      unfixed_weight,
      decision: "REJECT",
      reason: "unknown_id",
      evidence_refs: [],
    };
  }

  if (unfixed_weight === 0) {
    return {
      proposal_id: proposal.proposal_id,
      cited_ci_em_ids: cited,
      status_per_id,
      unfixed_weight: 0,
      decision: "REJECT",
      reason: "fixed_only",
      evidence_refs: [],
    };
  }

  return {
    proposal_id: proposal.proposal_id,
    cited_ci_em_ids: cited,
    status_per_id,
    unfixed_weight,
    decision: "ACCEPT",
    reason: "has_open_ci_em",
    evidence_refs,
  };
}
