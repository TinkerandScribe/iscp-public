/**
 * Phase 7 Node 1 — port contract for housed helpers that need CI-EM / Anti-ISC.
 * Zero imports from the reference engine/engine.ts or the reference engine/types.ts.
 *
 * Node 2: refusal-digest.ts / isc-pin.ts.
 * Node 3: isc-commit-gate.ts / commit-or-refuse.ts use frozen InstancePairPort
 * rows (stubbed check/evaluate/generate results). Not a product wire.
 */

export type TransferScope = "workflow" | "family" | "ecosystem";
export type CiEmFamily = "idea-evaluation" | "curriculum-pack" | "process";
export type CiEmMode =
  | "refusal"
  | "refusal_digest"
  | "compaction_drop"
  | "weasel_criteria"
  | "soft_close_pop"
  | "anti_loop_cap"
  | "schema_validate_fail"
  | "strict_enrich_residual_skeleton"
  | "founder_as_customer_bias"
  | "criteria_game_escape"
  | "clock_violation";

export type CiEmRecord = {
  id: string;
  timestamp: string;
  criterion_ids: string[];
  mode: CiEmMode;
  topology_context: string;
  resolution: string;
  transfer_scope: TransferScope;
  family: CiEmFamily;
  workflow: string;
  failed_criteria: string[];
  outcome: "success" | "failure" | "pivot" | "refusal";
  notes: string;
  verified: boolean;
};

export type AntiIsc = {
  id: string;
  tag: "negative";
  text: string;
};

/** Standing Anti-ISC. Same ids as Idea Gate housing. Not imported from there. */
export const ANTI_ISC: AntiIsc[] = [
  {
    id: "n1",
    tag: "negative",
    text: "A pursue verdict is not issued when POP is a soft close (brand, engagement, or see-what-happens).",
  },
  {
    id: "n2",
    tag: "negative",
    text: "A third soft rewrite of the same approach is not executed.",
  },
  {
    id: "n3",
    tag: "negative",
    text: "A curriculum pack is not approved when schema validate has not passed.",
  },
];

const STORE: CiEmRecord[] = [];

export function resetCiEmStore() {
  STORE.length = 0;
}

export function writeCiEm(record: CiEmRecord): CiEmRecord {
  if (!record.verified) {
    throw new Error("ISCP write rule: CI-EM writes only after verification");
  }
  STORE.push(record);
  return record;
}

export function allCiEm(): CiEmRecord[] {
  return [...STORE];
}

export type CriterionPort = { id: string; tag: string; text: string };
export type VerdictPort = "pursue" | "iterate" | "kill";

/**
 * Injected later if a caller has check/evaluate/generate.
 * Not an engine import. Node 3 fixtures stub results as InstancePairPort.
 */
export type EvaluatePort = {
  checkCriteria: (criteria: CriterionPort[]) => { pass: boolean };
  evaluateIdea: (intake: unknown, criteria?: CriterionPort[]) => { verdict: VerdictPort };
  generateCriteria: (intake: unknown) => CriterionPort[];
};

/** Frozen stub of check / evaluate / adversary high-severity on one sample. */
export type InstancePairPort = {
  id: string;
  high_incumbent: number;
  high_candidate: number;
  check_pass_incumbent: boolean;
  check_pass_candidate: boolean;
  verdict_incumbent: VerdictPort;
  verdict_candidate: VerdictPort;
};
