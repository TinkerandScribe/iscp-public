import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import {
  ANTI_ISC,
  writeCiEm,
  type CiEmFamily,
  type CiEmRecord,
} from "./port";

/**
 * exp-031 Refusal Digest.
 * ISCP copy (Phase 7 Node 2). Imports the port, not the reference engine/engine.ts.
 * Housing copy remains in the reference engine (not deleted).
 */

export const REFUSAL_DIGEST_SCHEMA = "iscp-refusal-digest/1";

export type RefusalOutcome = "refusal" | "kill" | "park" | "block";

const FORBIDDEN_ASSERTED = new Set(["pursue", "approve"]);

export type RefusalDigest = {
  digest_id: string;
  workflow: string;
  anti_isc_ids: string[];
  evidence_refs: string[];
  forbidden_outcomes: string[];
  timestamp: string;
  schema_version: string;
  /** Must not be pursue/approve. Hashed with the body. */
  outcome: RefusalOutcome | string;
  content_hash: string;
};

export type DigestVerifyFailure = {
  code: "hash" | "anti_isc" | "evidence" | "outcome" | "schema";
  message: string;
};

export type DigestVerifyResult = {
  ok: boolean;
  failures: DigestVerifyFailure[];
};

export type EmitDigestArgs = {
  workflow: string;
  anti_isc_ids: string[];
  evidence_refs: string[];
  timestamp?: string;
  outcome?: RefusalOutcome;
};

type DigestBody = Omit<RefusalDigest, "content_hash">;

function canonical(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonical(obj[k])}`).join(",")}}`;
}

export function hashDigestBody(body: DigestBody): string {
  return createHash("sha256").update(canonical(body), "utf8").digest("hex");
}

function standingAntiIscIds(): Set<string> {
  return new Set(ANTI_ISC.map((n) => n.id));
}

function forbiddenFromIds(ids: string[]): string[] {
  const byId = new Map(ANTI_ISC.map((n) => [n.id, n.text]));
  return ids.map((id) => byId.get(id) ?? `UNKNOWN:${id}`);
}

function familyOf(workflow: string): CiEmFamily {
  return workflow.startsWith("curriculum") ? "curriculum-pack" : "idea-evaluation";
}

export function emitRefusalDigest(args: EmitDigestArgs): RefusalDigest {
  const timestamp = args.timestamp ?? "2026-08-26T00:00:00.000Z";
  const outcome: RefusalOutcome = args.outcome ?? "refusal";
  const body: DigestBody = {
    digest_id: `rd-${args.workflow}-${timestamp}`,
    workflow: args.workflow,
    anti_isc_ids: [...args.anti_isc_ids],
    evidence_refs: [...args.evidence_refs],
    forbidden_outcomes: forbiddenFromIds(args.anti_isc_ids),
    timestamp,
    schema_version: REFUSAL_DIGEST_SCHEMA,
    outcome,
  };
  const digest: RefusalDigest = {
    ...body,
    content_hash: hashDigestBody(body),
  };

  writeCiEm({
    id: digest.digest_id,
    timestamp,
    criterion_ids: args.anti_isc_ids,
    mode: "refusal_digest",
    topology_context: args.workflow,
    resolution: "refused",
    transfer_scope: "workflow",
    family: familyOf(args.workflow),
    workflow: args.workflow,
    failed_criteria: args.anti_isc_ids,
    outcome: "refusal",
    notes: digest.content_hash,
    verified: true,
  });

  return digest;
}

/** `path:<file>` must exist; any other non-empty string is a quote. */
export function evidenceResolves(ref: string, cwd: string = process.cwd()): boolean {
  const trimmed = ref.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("path:")) {
    const p = trimmed.slice("path:".length).trim();
    if (!p) return false;
    const abs = isAbsolute(p) ? p : resolve(cwd, p);
    return existsSync(abs);
  }
  return true;
}

export function verifyRefusalDigest(
  digest: RefusalDigest,
  opts?: { cwd?: string },
): DigestVerifyResult {
  const failures: DigestVerifyFailure[] = [];
  const cwd = opts?.cwd ?? process.cwd();

  if (digest.schema_version !== REFUSAL_DIGEST_SCHEMA) {
    failures.push({
      code: "schema",
      message: `schema_version ${digest.schema_version} ≠ ${REFUSAL_DIGEST_SCHEMA}`,
    });
  }

  const { content_hash: _ignored, ...body } = digest;
  const expected = hashDigestBody(body);
  if (digest.content_hash !== expected) {
    failures.push({
      code: "hash",
      message: "content_hash does not match canonical body",
    });
  }

  const standing = standingAntiIscIds();
  for (const id of digest.anti_isc_ids) {
    if (!standing.has(id)) {
      failures.push({
        code: "anti_isc",
        message: `anti_isc_id ${id} is not in the standing Anti-ISC list`,
      });
    }
  }
  if (digest.anti_isc_ids.length === 0) {
    failures.push({ code: "anti_isc", message: "anti_isc_ids is empty" });
  }

  if (digest.evidence_refs.length === 0) {
    failures.push({ code: "evidence", message: "evidence_refs is empty" });
  }
  for (const ref of digest.evidence_refs) {
    if (!evidenceResolves(ref, cwd)) {
      failures.push({
        code: "evidence",
        message: `evidence_ref does not resolve: ${ref}`,
      });
    }
  }

  const asserted = String(digest.outcome ?? "").toLowerCase();
  if (FORBIDDEN_ASSERTED.has(asserted)) {
    failures.push({
      code: "outcome",
      message: `digest asserts ${digest.outcome}`,
    });
  }

  return { ok: failures.length === 0, failures };
}

/** Recompute hash after a field edit (tamper helpers / tests only). */
export function rehash(digest: RefusalDigest): RefusalDigest {
  const { content_hash: _c, ...body } = digest;
  return { ...body, content_hash: hashDigestBody(body) };
}

export function digestFromCiEm(record: CiEmRecord): { digest_id: string; content_hash: string } {
  return { digest_id: record.id, content_hash: record.notes };
}
