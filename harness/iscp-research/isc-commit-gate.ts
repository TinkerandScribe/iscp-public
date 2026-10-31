/**
 * exp-030 ISC-Commit Gate.
 * ISCP copy (Phase 7 Node 3). Frozen InstancePairPort rows stub
 * check/evaluate/generate/SAMPLE_IDEAS. Does not import the reference engine/engine.ts.
 * Housing copy remains in the reference engine (not deleted).
 *
 * Related work: PACE (arXiv:2606.08106). Object of commit is an ISC genome
 * scored on frozen adversary counts + sample contracts. No priority claim.
 * Session seal: Apache-2.0 Intelligent-Internet/zenith `task_list_patch.py` `_sealed_task_ids` — a cleared gate seals upstream tasks from supersede/cancel.
 */

import type { InstancePairPort, VerdictPort } from "./port";

export type CommitDecision = "COMMIT" | "HOLD";
export type MutationClass = "harden" | "split" | "tag_change" | "sunset";
export type Locus = "core" | "peripheral";

export type CommitGateOpts = {
  allowCore?: boolean;
  /** Stub of evaluateIdea(strong, FAIL_CRITERIA) === kill. Not an engine call. */
  fail_fixture_still_kill?: boolean;
  /**
   * Criterion ids that passed verification in this session.
   * Sealed until a new session/epoch. Edit or remove → HOLD.
   */
  sealedIds?: readonly string[];
};

export type GenomeCriterion = {
  id: string;
  tag: string;
  text: string;
  version: number;
  locus: Locus;
};

export type MutationRecord = {
  criterionId: string;
  fromVersion: number;
  toVersion: number;
  class: MutationClass;
  evidenceRef: string;
  at: string;
  beforeText: string;
  afterText: string;
};

export type GenomeSnapshot = {
  lineageId: string;
  generation: number;
  criteria: GenomeCriterion[];
  mutations: MutationRecord[];
  writes: number;
};

export type InstancePair = InstancePairPort;

export type CommitEvidence = {
  decision: CommitDecision;
  hold_reasons: string[];
  n10: number;
  n01: number;
  n11: number;
  greedy_would_commit: boolean;
  instances: InstancePair[];
  fail_fixture_still_kill: boolean;
  adversary_passes_candidate: number;
  alpha: 0;
};

export type CommitResult = CommitEvidence;

export const CORE_IDS = new Set(["c6", "c7"]);
const ALPHA = 0 as const;

/** Stable session seal list. Empty or omitted means nothing is sealed. */
export function normalizeSealedIds(ids: readonly string[] | undefined): string[] {
  return [...new Set((ids ?? []).map((id) => id.trim()).filter((id) => id.length > 0))].sort();
}

export function assertIdsNeverRenumber(
  before: GenomeSnapshot,
  after: GenomeSnapshot,
): void {
  for (const prev of before.criteria) {
    const next = after.criteria.find((c) => c.id === prev.id);
    if (!next) continue;
    if (next.locus !== prev.locus) {
      throw new Error(`id ${prev.id} changed locus — illegal renumber/reuse`);
    }
  }
}

export function applyHarden(
  snap: GenomeSnapshot,
  args: {
    criterionId: string;
    newText: string;
    evidenceRef: string;
    class?: MutationClass;
  },
  opts?: CommitGateOpts,
): GenomeSnapshot {
  const target = snap.criteria.find((c) => c.id === args.criterionId);
  if (!target) throw new Error(`unknown criterion id ${args.criterionId}`);
  if (target.locus === "core" && !opts?.allowCore) {
    throw new Error(
      `core genome (${target.id}) is harder to mutate — pass allowCore with evidence`,
    );
  }
  const next: GenomeCriterion = {
    ...target,
    text: args.newText,
    version: target.version + 1,
  };
  const after: GenomeSnapshot = {
    lineageId: snap.lineageId,
    generation: snap.generation + 1,
    criteria: snap.criteria.map((c) => (c.id === target.id ? next : c)),
    mutations: [
      ...snap.mutations,
      {
        criterionId: target.id,
        fromVersion: target.version,
        toVersion: next.version,
        class: args.class ?? "harden",
        evidenceRef: args.evidenceRef,
        at: "2026-08-26T00:00:00.000Z",
        beforeText: target.text,
        afterText: args.newText,
      },
    ],
    writes: 1,
  };
  assertIdsNeverRenumber(snap, after);
  return after;
}

function structuralHolds(
  incumbent: GenomeSnapshot,
  candidate: GenomeSnapshot,
  opts?: CommitGateOpts,
): string[] {
  const reasons: string[] = [];
  if (candidate.mutations.length === 0) {
    reasons.push("purifying: no evidence-gated mutation");
  }
  for (const m of candidate.mutations) {
    if (!m.evidenceRef.trim()) reasons.push("purifying: empty evidenceRef");
  }
  const classes = new Set(candidate.mutations.map((m) => m.class));
  if (classes.size > 1) reasons.push("error-threshold: mixed mutation classes");

  try {
    assertIdsNeverRenumber(incumbent, candidate);
  } catch (err) {
    reasons.push(`ids/locus: ${(err as Error).message}`);
  }

  for (const c of candidate.criteria) {
    const prev = incumbent.criteria.find((p) => p.id === c.id);
    if (!prev) continue;
    const touched = c.text !== prev.text || c.tag !== prev.tag;
    if (c.locus === "core" && touched && !opts?.allowCore) {
      reasons.push(`core ${c.id} touched without allowCore`);
    }
  }

  for (const id of normalizeSealedIds(opts?.sealedIds)) {
    const prev = incumbent.criteria.find((p) => p.id === id);
    if (!prev) continue;
    const next = candidate.criteria.find((c) => c.id === id);
    if (!next) {
      reasons.push(`sealed ${id}: passed verification this session — do not remove`);
      continue;
    }
    if (next.text !== prev.text || next.tag !== prev.tag) {
      reasons.push(`sealed ${id}: passed verification this session — do not edit`);
    }
  }
  return reasons;
}

/**
 * Paired ISC-Commit Gate on frozen instance rows.
 * COMMIT iff structural holds, FAIL fixture still KILL, no check/verdict
 * regression, n01 = 0, n10 ≥ 1, and no sealed id is edited or removed.
 * HOLD otherwise. A sealed-touch HOLD is not a τ2 REFUSE.
 */
export function iscCommitGate(
  incumbent: GenomeSnapshot,
  candidate: GenomeSnapshot,
  instances: InstancePair[],
  opts?: CommitGateOpts,
): CommitResult {
  const hold_reasons = structuralHolds(incumbent, candidate, opts);

  const fail_fixture_still_kill = opts?.fail_fixture_still_kill ?? true;
  if (!fail_fixture_still_kill) {
    hold_reasons.push("FAIL fixture no longer KILL on strong intake");
  }

  let n10 = 0;
  let n01 = 0;
  let n11 = 0;
  for (const row of instances) {
    if (row.high_candidate < row.high_incumbent) n10 += 1;
    else if (row.high_candidate > row.high_incumbent) n01 += 1;
    else n11 += 1;

    if (row.check_pass_incumbent && !row.check_pass_candidate) {
      hold_reasons.push(`checkCriteria regression on ${row.id}`);
    }
    if (row.verdict_candidate !== row.verdict_incumbent) {
      hold_reasons.push(
        `verdict regression on ${row.id}: ${row.verdict_incumbent} → ${row.verdict_candidate}`,
      );
    }
  }

  if (n01 > 0) hold_reasons.push(`discordant n01=${n01} (candidate worse on ≥1 sample)`);
  if (n10 < 1) hold_reasons.push("no sample with strictly fewer high-severity games");

  const uniqueReasons = [...new Set(hold_reasons)];
  const greedy_would_commit = n10 >= 1;
  const decision: CommitDecision = uniqueReasons.length === 0 ? "COMMIT" : "HOLD";

  return {
    decision,
    hold_reasons: uniqueReasons,
    n10,
    n01,
    n11,
    greedy_would_commit,
    instances,
    fail_fixture_still_kill,
    adversary_passes_candidate: instances.length,
    alpha: ALPHA,
  };
}

export function incumbentFromD(): GenomeSnapshot {
  return {
    lineageId: "exp-030-port",
    generation: 0,
    criteria: [
      { id: "c1", tag: "outcome", text: "avatar named as a person-type", version: 1, locus: "peripheral" },
      { id: "c3", tag: "outcome", text: "KYG is countable", version: 1, locus: "peripheral" },
      { id: "c6", tag: "guardrail", text: "no invented customer quotes", version: 1, locus: "core" },
      { id: "c7", tag: "guardrail", text: "Scope stays at idea evaluation only for this pass.", version: 1, locus: "core" },
    ],
    mutations: [],
    writes: 1,
  };
}

const SAMPLE_IDS = ["strong", "vague", "bleeding", "iterate-band"] as const;
const SAMPLE_VERDICTS: Record<(typeof SAMPLE_IDS)[number], VerdictPort> = {
  strong: "pursue",
  vague: "kill",
  bleeding: "pursue",
  "iterate-band": "iterate",
};

/** Frozen SAMPLE_IDEAS-shaped rows. Not imported from the reference engine. */
export function frozenPairs(args: {
  high_incumbent: number;
  high_candidate: number;
  check_pass_candidate?: boolean;
  verdict_candidate?: Partial<Record<(typeof SAMPLE_IDS)[number], VerdictPort>>;
}): InstancePair[] {
  return SAMPLE_IDS.map((id) => ({
    id,
    high_incumbent: args.high_incumbent,
    high_candidate: args.high_candidate,
    check_pass_incumbent: true,
    check_pass_candidate: args.check_pass_candidate ?? true,
    verdict_incumbent: SAMPLE_VERDICTS[id],
    verdict_candidate: args.verdict_candidate?.[id] ?? SAMPLE_VERDICTS[id],
  }));
}
