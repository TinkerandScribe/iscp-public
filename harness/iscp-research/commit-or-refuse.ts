/**
 * exp-032 Commit-or-Refuse surface.
 * ISCP copy (Phase 7 Node 3). Imports local gate + digest, not the reference engine/engine.ts.
 * Housing copy remains in the reference engine (not deleted).
 */

import {
  iscCommitGate,
  normalizeSealedIds,
  type CommitGateOpts,
  type CommitResult,
  type GenomeSnapshot,
  type InstancePair,
} from "./isc-commit-gate";
import {
  emitRefusalDigest,
  verifyRefusalDigest,
  type RefusalDigest,
  type RefusalOutcome,
} from "./refusal-digest";

export type ClockTag = "τ2" | "τ4";
export type SurfaceDecision = "COMMIT" | "HOLD" | "REFUSE";

export type SurfaceRecord = {
  decision: SurfaceDecision;
  clock: ClockTag;
  evidence_refs: string[];
  commit?: CommitResult;
  digest?: RefusalDigest;
  digest_id?: string;
  /** Ids sealed for this session. Omitted when empty. */
  sealed?: string[];
};

export type ProposeArgs = {
  kind: "propose";
  incumbent: GenomeSnapshot;
  candidate: GenomeSnapshot;
  instances: InstancePair[];
  opts?: CommitGateOpts;
};

export type RefuseArgs = {
  kind: "refuse";
  workflow: string;
  anti_isc_ids: string[];
  evidence_refs: string[];
  outcome?: RefusalOutcome;
  timestamp?: string;
};

const LOG: SurfaceRecord[] = [];

export function resetSurfaceLog() {
  LOG.length = 0;
}

export function allSurfaceRecords(): SurfaceRecord[] {
  return [...LOG];
}

function log(record: SurfaceRecord): SurfaceRecord {
  LOG.push(record);
  return record;
}

/** Propose G → G′. COMMIT | HOLD. Never emits a refusal digest. Clock τ4. */
export function proposeCriteriaMutation(args: Omit<ProposeArgs, "kind">): SurfaceRecord {
  const gate = iscCommitGate(args.incumbent, args.candidate, args.instances, args.opts);
  const evidence_refs =
    gate.decision === "COMMIT"
      ? args.candidate.mutations.map((m) => m.evidenceRef)
      : gate.hold_reasons;
  const sealed = normalizeSealedIds(args.opts?.sealedIds);
  return log({
    decision: gate.decision,
    clock: "τ4",
    evidence_refs,
    commit: gate,
    ...(sealed.length ? { sealed } : {}),
  });
}

/** Record a refusal that already happened. Never mutates a genome. Clock τ2. */
export function recordRefusal(args: Omit<RefuseArgs, "kind">): SurfaceRecord {
  const digest = emitRefusalDigest({
    workflow: args.workflow,
    anti_isc_ids: args.anti_isc_ids,
    evidence_refs: args.evidence_refs,
    outcome: args.outcome,
    timestamp: args.timestamp,
  });
  const verified = verifyRefusalDigest(digest);
  if (!verified.ok) {
    throw new Error(
      `refusal digest failed offline verify: ${verified.failures.map((f) => f.code).join(",")}`,
    );
  }
  return log({
    decision: "REFUSE",
    clock: "τ2",
    evidence_refs: args.evidence_refs,
    digest,
    digest_id: digest.digest_id,
  });
}

export function commitOrRefuse(action: ProposeArgs | RefuseArgs): SurfaceRecord {
  if (action.kind === "propose") {
    const { kind: _k, ...rest } = action;
    return proposeCriteriaMutation(rest);
  }
  const { kind: _k, ...rest } = action;
  return recordRefusal(rest);
}

/**
 * Category lock: a COMMIT/HOLD handoff is not a refusal event.
 * HOLD must not become a digest; REFUSE must not be filed as a commit.
 */
export function refuseFromHandoff(_record: SurfaceRecord): never {
  throw new Error("category error: HOLD/COMMIT handoff is not a refusal event");
}

export function commitFromRefusal(_record: SurfaceRecord): never {
  throw new Error("category error: REFUSE is not a criteria-genome commit");
}

export function formatHandoff(record: SurfaceRecord): string {
  const lines = [
    `decision: ${record.decision}`,
    `clock: ${record.clock}`,
    `evidence_refs: ${record.evidence_refs.join(" | ") || "(none)"}`,
  ];
  if (record.commit) {
    lines.push(`n10: ${record.commit.n10}`);
    lines.push(`n01: ${record.commit.n01}`);
    if (record.commit.hold_reasons.length) {
      lines.push(`hold: ${record.commit.hold_reasons.join("; ")}`);
    }
  }
  if (record.sealed?.length) lines.push(`sealed: ${record.sealed.join(", ")}`);
  if (record.digest_id) lines.push(`digest_id: ${record.digest_id}`);
  return lines.join("\n");
}
