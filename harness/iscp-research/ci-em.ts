/**
 * Engine-free CI-EM P1 reader.
 * Reads criterion-indexed rows from a JSONL path. Default records file:
 * `$ISCP_EM_RECORDS` (default ./em-records.jsonl).
 * Has no outside engine dependency.
 *
 * P1 only: verified, same family, `transfer_scope: ecosystem` excluded (TN).
 * P0 is not implemented.
 */

import { readFileSync } from "node:fs";
import type { CiEmFamily, CiEmMode, CiEmRecord, TransferScope } from "./port";

/** Canonical fleet store. Tests pass a fixture path instead of this file. */
export const FLEET_EM_RECORDS_PATH = process.env.ISCP_EM_RECORDS ?? "./em-records.jsonl";

const FAMILIES = new Set<string>(["idea-evaluation", "curriculum-pack", "process"]);
const SCOPES = new Set<string>(["workflow", "family", "ecosystem"]);
const MODES = new Set<string>([
  "refusal",
  "refusal_digest",
  "compaction_drop",
  "weasel_criteria",
  "soft_close_pop",
  "anti_loop_cap",
  "schema_validate_fail",
  "strict_enrich_residual_skeleton",
  "founder_as_customer_bias",
  "criteria_game_escape",
  "clock_violation",
]);
const OUTCOMES = new Set<string>(["success", "failure", "pivot", "refusal"]);

export type RetrieveQuery = {
  family: CiEmFamily;
  /** When set, only these ids are eligible. P1 still applies. */
  ids?: readonly string[];
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/** Basic EM lines (no id / family) are seeds, not CI-EM hits. */
function asCiEm(value: unknown): CiEmRecord | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || row.id.trim().length === 0) return null;
  if (typeof row.family !== "string" || !FAMILIES.has(row.family)) return null;
  if (typeof row.transfer_scope !== "string" || !SCOPES.has(row.transfer_scope)) return null;
  if (typeof row.verified !== "boolean") return null;
  if (typeof row.mode !== "string" || !MODES.has(row.mode)) return null;
  if (typeof row.timestamp !== "string") return null;
  if (typeof row.topology_context !== "string") return null;
  if (typeof row.resolution !== "string") return null;
  if (typeof row.workflow !== "string") return null;
  if (typeof row.notes !== "string") return null;
  if (typeof row.outcome !== "string" || !OUTCOMES.has(row.outcome)) return null;
  if (!isStringArray(row.criterion_ids) || !isStringArray(row.failed_criteria)) return null;
  return {
    id: row.id,
    timestamp: row.timestamp,
    criterion_ids: row.criterion_ids,
    mode: row.mode as CiEmMode,
    topology_context: row.topology_context,
    resolution: row.resolution,
    transfer_scope: row.transfer_scope as TransferScope,
    family: row.family as CiEmFamily,
    workflow: row.workflow,
    failed_criteria: row.failed_criteria,
    outcome: row.outcome as CiEmRecord["outcome"],
    notes: row.notes,
    verified: row.verified,
  };
}

function loadRecords(recordsPath: string): CiEmRecord[] {
  const text = readFileSync(recordsPath, "utf8");
  const records: CiEmRecord[] = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      throw new Error(`ci-em: invalid JSON at ${recordsPath}:${i + 1}`);
    }
    const record = asCiEm(parsed);
    if (record) records.push(record);
  }
  return records;
}

/**
 * P1 retrieval. `recordsPath` is the JSONL file (fleet store or a fixture).
 * Returns verified same-family records. Ecosystem scope is never returned.
 */
export function retrieveCiEm(recordsPath: string, query: RetrieveQuery): CiEmRecord[] {
  const wanted = query.ids ? new Set(query.ids) : null;
  return loadRecords(recordsPath).filter((record) => {
    if (!record.verified) return false;
    if (record.family !== query.family) return false;
    if (record.transfer_scope === "ecosystem") return false;
    if (wanted && !wanted.has(record.id)) return false;
    return true;
  });
}
