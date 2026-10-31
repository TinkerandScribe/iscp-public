/**
 * exp-031 port tests — frozen fixtures. No the reference engine/engine.ts.
 * Engine-contract checks stay in the Idea Gate housing copy.
 */
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeEach } from "vitest";
import { allCiEm, resetCiEmStore } from "./port";
import {
  emitRefusalDigest,
  rehash,
  verifyRefusalDigest,
  type RefusalDigest,
} from "./refusal-digest";

const HARNESS_DIR = fileURLToPath(new URL(".", import.meta.url));

beforeEach(() => {
  resetCiEmStore();
});

function antiLoopDigest(): RefusalDigest {
  resetCiEmStore();
  return emitRefusalDigest({
    workflow: "the reference engine",
    anti_isc_ids: ["n2"],
    evidence_refs: ["evaluateIdea rewritePass=2 antiLoopApplied"],
    outcome: "kill",
  });
}

function laserParkDigest(): RefusalDigest {
  return emitRefusalDigest({
    workflow: "curriculum-forge-laser",
    anti_isc_ids: ["n3"],
    evidence_refs: [
      "quote: PARKED per-equipment — .ai/decisions/001-park-laser-safety-per-equipment.md",
      "path:BOUNDARY.md",
    ],
    outcome: "park",
  });
}

describe("exp-031 Refusal Digest (port)", () => {
  it("emits and verifies anti-loop force-KILL offline", () => {
    const d = antiLoopDigest();
    const v = verifyRefusalDigest(d);
    expect(v.ok).toBe(true);
    expect(v.failures).toEqual([]);
    const stored = allCiEm().filter(
      (r) => r.mode === "refusal_digest" && r.workflow === "the reference engine",
    );
    expect(stored).toHaveLength(1);
    expect(stored[0]!.id).toBe(d.digest_id);
    expect(stored[0]!.notes).toBe(d.content_hash);
  });

  it("emits and verifies laser park offline", () => {
    const d = laserParkDigest();
    expect(verifyRefusalDigest(d, { cwd: HARNESS_DIR }).ok).toBe(true);
    const stored = allCiEm().filter(
      (r) =>
        r.mode === "refusal_digest" && r.workflow === "curriculum-forge-laser",
    );
    expect(stored.some((r) => r.id === d.digest_id)).toBe(true);
  });

  it("100% of frozen honest events verify", () => {
    const honest = [antiLoopDigest(), laserParkDigest()];
    expect(honest).toHaveLength(2);
    expect(
      honest.every((d) => verifyRefusalDigest(d, { cwd: HARNESS_DIR }).ok),
    ).toBe(true);
  });

  it("tamper: flipped anti_isc_id fails (rehashed)", () => {
    const flipped = rehash({ ...antiLoopDigest(), anti_isc_ids: ["n99"] });
    const v = verifyRefusalDigest(flipped);
    expect(v.ok).toBe(false);
    expect(v.failures.some((f) => f.code === "anti_isc")).toBe(true);
  });

  it("tamper: empty evidence fails (rehashed)", () => {
    const empty = rehash({ ...antiLoopDigest(), evidence_refs: ["   "] });
    const v = verifyRefusalDigest(empty);
    expect(v.ok).toBe(false);
    expect(v.failures.some((f) => f.code === "evidence")).toBe(true);
  });

  it("tamper: mutated hash fails", () => {
    const d = antiLoopDigest();
    const v = verifyRefusalDigest({ ...d, content_hash: "0".repeat(64) });
    expect(v.ok).toBe(false);
    expect(v.failures.some((f) => f.code === "hash")).toBe(true);
  });

  it("tamper: digest that claims pursue fails (rehashed)", () => {
    const p = rehash({ ...antiLoopDigest(), outcome: "pursue" });
    const v = verifyRefusalDigest(p);
    expect(v.ok).toBe(false);
    expect(v.failures.some((f) => f.code === "outcome")).toBe(true);
  });

  it("missing path evidence fails", () => {
    const d = rehash({
      ...antiLoopDigest(),
      evidence_refs: ["path:does-not-exist-exp-031.md"],
    });
    const v = verifyRefusalDigest(d, { cwd: HARNESS_DIR });
    expect(v.ok).toBe(false);
    expect(v.failures.some((f) => f.code === "evidence")).toBe(true);
  });

  it("one structured write per refusal; 0 engine calls", () => {
    antiLoopDigest();
    expect(allCiEm().filter((r) => r.mode === "refusal_digest")).toHaveLength(1);
  });
});
