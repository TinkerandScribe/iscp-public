/**
 * exp-032 port tests — frozen fixtures. No the reference engine/engine.ts.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it, beforeEach } from "vitest";
import { allCiEm, resetCiEmStore } from "./port";
import {
  applyHarden,
  frozenPairs,
  incumbentFromD,
  type GenomeSnapshot,
} from "./isc-commit-gate";
import {
  allSurfaceRecords,
  commitFromRefusal,
  commitOrRefuse,
  formatHandoff,
  proposeCriteriaMutation,
  recordRefusal,
  refuseFromHandoff,
  resetSurfaceLog,
} from "./commit-or-refuse";

function trueHarden(inc: GenomeSnapshot): GenomeSnapshot {
  let snap = inc;
  for (const id of ["c1", "c3", "c6", "c7"]) {
    snap = applyHarden(
      snap,
      {
        criterionId: id,
        newText: `${inc.criteria.find((c) => c.id === id)!.text} [hardened]`,
        evidenceRef: "exp-010/reports.md#harden-pass",
      },
      { allowCore: true },
    );
  }
  return snap;
}

beforeEach(() => {
  resetCiEmStore();
  resetSurfaceLog();
});

describe("exp-032 Commit-or-Refuse surface (port)", () => {
  it("COMMIT path produces a durable τ4 record and no digest", () => {
    const inc = incumbentFromD();
    const rec = proposeCriteriaMutation({
      incumbent: inc,
      candidate: trueHarden(inc),
      instances: frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
      opts: { allowCore: true },
    });
    expect(rec.decision).toBe("COMMIT");
    expect(rec.clock).toBe("τ4");
    expect(rec.digest_id).toBeUndefined();
    expect(rec.commit?.n10).toBe(4);
    expect(rec.commit?.n01).toBe(0);
    expect(allCiEm().some((r) => r.mode === "refusal_digest")).toBe(false);
    expect(allSurfaceRecords()).toHaveLength(1);
    expect(formatHandoff(rec)).toMatch(/decision: COMMIT/);
  });

  it("HOLD does not emit a refusal digest", () => {
    const inc = incumbentFromD();
    const cosmetic = applyHarden(
      inc,
      {
        criterionId: "c7",
        newText: "Scope remains idea evaluation only — no funnel build.",
        evidenceRef: "exp-032/cosmetic-c7",
      },
      { allowCore: true },
    );
    const rec = proposeCriteriaMutation({
      incumbent: inc,
      candidate: cosmetic,
      instances: frozenPairs({ high_incumbent: 2, high_candidate: 2 }),
      opts: { allowCore: true },
    });
    expect(rec.decision).toBe("HOLD");
    expect(rec.clock).toBe("τ4");
    expect(rec.digest).toBeUndefined();
    expect(allCiEm().filter((r) => r.mode === "refusal_digest")).toHaveLength(0);
  });

  it("REFUSE path produces a verifiable digest and does not mutate the genome", () => {
    const inc = incumbentFromD();
    const before = JSON.stringify(inc);
    const rec = recordRefusal({
      workflow: "the reference engine",
      anti_isc_ids: ["n2"],
      evidence_refs: ["evaluateIdea rewritePass=2"],
      outcome: "kill",
    });
    expect(rec.decision).toBe("REFUSE");
    expect(rec.clock).toBe("τ2");
    expect(rec.digest_id).toBeTruthy();
    expect(JSON.stringify(inc)).toBe(before);
    expect(allCiEm().filter((r) => r.mode === "refusal_digest")).toHaveLength(1);
  });

  it("category errors: HOLD-as-refuse and refuse-as-commit throw (0 silent swaps)", () => {
    const inc = incumbentFromD();
    const hold = proposeCriteriaMutation({
      incumbent: inc,
      candidate: inc,
      instances: frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
    });
    expect(hold.decision).toBe("HOLD");
    expect(() => refuseFromHandoff(hold)).toThrow(/category error/);

    const refuse = recordRefusal({
      workflow: "the reference engine",
      anti_isc_ids: ["n2"],
      evidence_refs: ["evaluateIdea rewritePass=2"],
    });
    expect(() => commitFromRefusal(refuse)).toThrow(/category error/);
  });

  it("commitOrRefuse dispatcher: propose never refuses; refuse never commits", () => {
    const inc = incumbentFromD();
    const a = commitOrRefuse({
      kind: "propose",
      incumbent: inc,
      candidate: trueHarden(inc),
      instances: frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
      opts: { allowCore: true },
    });
    expect(a.decision).toBe("COMMIT");
    expect(a.clock).toBe("τ4");

    const b = commitOrRefuse({
      kind: "refuse",
      workflow: "curriculum-forge-laser",
      anti_isc_ids: ["n3"],
      evidence_refs: ["quote: PARKED per-equipment"],
      outcome: "park",
    });
    expect(b.decision).toBe("REFUSE");
    expect(b.clock).toBe("τ2");
    expect(allSurfaceRecords().map((r) => r.decision)).toEqual(["COMMIT", "REFUSE"]);
  });

  it("sealed edit is HOLD on τ4 and not a refusal digest", () => {
    const inc = incumbentFromD();
    const rec = proposeCriteriaMutation({
      incumbent: inc,
      candidate: applyHarden(inc, {
        criterionId: "c1",
        newText: "rewritten after pass",
        evidenceRef: "seal/surface-c1",
      }),
      instances: frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
      opts: { sealedIds: ["c1"] },
    });
    expect(rec.decision).toBe("HOLD");
    expect(rec.clock).toBe("τ4");
    expect(rec.digest).toBeUndefined();
    expect(rec.digest_id).toBeUndefined();
    expect(rec.sealed).toEqual(["c1"]);
    expect(rec.commit?.hold_reasons.some((h) => /sealed c1/.test(h))).toBe(true);
    expect(formatHandoff(rec)).toMatch(/sealed: c1/);
    expect(allCiEm().filter((r) => r.mode === "refusal_digest")).toHaveLength(0);
  });

  it("does not import the reference engine/engine.ts", () => {
    const src = readFileSync(new URL("./commit-or-refuse.ts", import.meta.url), "utf8");
    expect(src).not.toMatch(/^import .*(engine|the reference engine)/m);
  });
});
