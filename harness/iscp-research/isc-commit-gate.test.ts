/**
 * exp-030 port tests — frozen InstancePair rows. No the reference engine/engine.ts.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  applyHarden,
  CORE_IDS,
  frozenPairs,
  incumbentFromD,
  iscCommitGate,
  type CommitResult,
  type GenomeSnapshot,
} from "./isc-commit-gate";

function coreTouchWithoutAllowCore(inc: GenomeSnapshot): GenomeSnapshot {
  const c6 = inc.criteria.find((c) => c.id === "c6")!;
  return {
    ...inc,
    generation: inc.generation + 1,
    criteria: inc.criteria.map((c) =>
      c.id === "c6" ? { ...c, text: "core rewritten without allowCore", version: c.version + 1 } : c,
    ),
    mutations: [
      {
        criterionId: "c6",
        fromVersion: c6.version,
        toVersion: c6.version + 1,
        class: "harden",
        evidenceRef: "exp-030/core-touch-no-allow",
        at: "2026-08-26T00:00:00.000Z",
        beforeText: c6.text,
        afterText: "core rewritten without allowCore",
      },
    ],
  };
}

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

describe("exp-030 ISC-Commit Gate (port)", () => {
  it("true harden COMMITs; n01=0 n10≥1; greedy also commits", () => {
    const inc = incumbentFromD();
    const cand = trueHarden(inc);
    const r = iscCommitGate(inc, cand, frozenPairs({ high_incumbent: 2, high_candidate: 0 }), {
      allowCore: true,
    });
    expect(r.adversary_passes_candidate).toBe(4);
    expect(r.alpha).toBe(0);
    expect(r.n01).toBe(0);
    expect(r.n10).toBe(4);
    expect(r.fail_fixture_still_kill).toBe(true);
    expect(r.decision).toBe("COMMIT");
    expect(r.greedy_would_commit).toBe(true);
    expect(cand.mutations.every((m) => m.class === "harden")).toBe(true);
    expect(cand.mutations.some((m) => CORE_IDS.has(m.criterionId))).toBe(true);
  });

  it("N1 cosmetic HOLDs (no game drop); greedy HOLDs", () => {
    const inc = incumbentFromD();
    const cand = applyHarden(
      inc,
      {
        criterionId: "c7",
        newText: "Scope remains idea evaluation only — no funnel build.",
        evidenceRef: "exp-030/cosmetic-c7",
      },
      { allowCore: true },
    );
    const r = iscCommitGate(inc, cand, frozenPairs({ high_incumbent: 2, high_candidate: 2 }), {
      allowCore: true,
    });
    expect(r.n10).toBe(0);
    expect(r.n01).toBe(0);
    expect(r.decision).toBe("HOLD");
    expect(r.greedy_would_commit).toBe(false);
    expect(r.hold_reasons.some((h) => /no sample with strictly fewer/.test(h))).toBe(true);
  });

  it("N2 weaken HOLDs; n01>0", () => {
    const inc = incumbentFromD();
    const cand = applyHarden(
      inc,
      {
        criterionId: "c7",
        newText: `${inc.criteria.find((c) => c.id === "c7")!.text} or a concrete reframe exists.`,
        evidenceRef: "exp-030/weaken-or-c7",
      },
      { allowCore: true },
    );
    const r = iscCommitGate(inc, cand, frozenPairs({ high_incumbent: 1, high_candidate: 3 }), {
      allowCore: true,
    });
    expect(r.n01).toBeGreaterThan(0);
    expect(r.decision).toBe("HOLD");
    expect(r.greedy_would_commit).toBe(false);
  });

  it("N3 core-touch without allowCore is always HOLD", () => {
    const inc = incumbentFromD();
    const r = iscCommitGate(
      inc,
      coreTouchWithoutAllowCore(inc),
      frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
      { allowCore: false },
    );
    expect(r.decision).toBe("HOLD");
    expect(r.hold_reasons.some((h) => /core c6/.test(h))).toBe(true);
  });

  it("N4 FAIL overlay: greedy COMMITs, gate HOLDs (false-commit gap)", () => {
    const inc = incumbentFromD();
    const cand = applyHarden(
      inc,
      {
        criterionId: "c1",
        newText: "The product is more elegant and user-friendly overall.",
        evidenceRef: "exp-030/noisy-fail-overlay",
      },
      { allowCore: true },
    );
    const r = iscCommitGate(
      inc,
      cand,
      frozenPairs({ high_incumbent: 3, high_candidate: 0, check_pass_candidate: false }),
      { allowCore: true },
    );
    expect(r.greedy_would_commit).toBe(true);
    expect(r.n10).toBeGreaterThan(0);
    expect(r.decision).toBe("HOLD");
    expect(r.hold_reasons.some((h) => /checkCriteria regression/.test(h))).toBe(true);
  });

  it("purifying: no mutation → HOLD", () => {
    const inc = incumbentFromD();
    const r = iscCommitGate(inc, inc, frozenPairs({ high_incumbent: 2, high_candidate: 0 }));
    expect(r.decision).toBe("HOLD");
    expect(r.hold_reasons.some((h) => /no evidence-gated/.test(h))).toBe(true);
  });

  it("does not import the reference engine/engine.ts", () => {
    const src = readFileSync(new URL("./isc-commit-gate.ts", import.meta.url), "utf8");
    expect(src).not.toMatch(/^import .*(engine|the reference engine)/m);
  });
});

describe("session seal", () => {
  it("HOLDs an edit of a sealed criterion even when allowCore, n01=0, and n10≥1", () => {
    const inc = incumbentFromD();
    const cand = applyHarden(
      inc,
      {
        criterionId: "c6",
        newText: `${inc.criteria.find((c) => c.id === "c6")!.text} [hardened]`,
        evidenceRef: "seal/edit-c6",
      },
      { allowCore: true },
    );
    const r = iscCommitGate(inc, cand, frozenPairs({ high_incumbent: 2, high_candidate: 0 }), {
      allowCore: true,
      sealedIds: ["c6"],
    });
    expect(r.n01).toBe(0);
    expect(r.n10).toBeGreaterThanOrEqual(1);
    expect(r.decision).toBe("HOLD");
    expect(r.hold_reasons.some((h) => /sealed c6/.test(h) && /edit/.test(h))).toBe(true);
    expect(r.hold_reasons.some((h) => /allowCore/.test(h))).toBe(false);
  });

  it("HOLDs removal of a sealed criterion", () => {
    const inc = incumbentFromD();
    const c3 = inc.criteria.find((c) => c.id === "c3")!;
    const cand: GenomeSnapshot = {
      ...inc,
      generation: inc.generation + 1,
      criteria: inc.criteria.filter((c) => c.id !== "c3"),
      mutations: [
        {
          criterionId: "c3",
          fromVersion: c3.version,
          toVersion: c3.version,
          class: "sunset",
          evidenceRef: "seal/remove-c3",
          at: "2026-08-26T00:00:00.000Z",
          beforeText: c3.text,
          afterText: "",
        },
      ],
    };
    const r = iscCommitGate(inc, cand, frozenPairs({ high_incumbent: 2, high_candidate: 0 }), {
      sealedIds: ["c3"],
    });
    expect(r.decision).toBe("HOLD");
    expect(r.hold_reasons.some((h) => /sealed c3/.test(h) && /remove/.test(h))).toBe(true);
  });

  it("still COMMITs a mutation that does not touch sealed ids", () => {
    const inc = incumbentFromD();
    const cand = applyHarden(inc, {
      criterionId: "c1",
      newText: `${inc.criteria.find((c) => c.id === "c1")!.text} [hardened]`,
      evidenceRef: "seal/edit-unsealed-c1",
    });
    const r = iscCommitGate(inc, cand, frozenPairs({ high_incumbent: 2, high_candidate: 0 }), {
      sealedIds: ["c3"],
    });
    expect(r.decision).toBe("COMMIT");
    expect(r.n01).toBe(0);
    expect(r.n10).toBeGreaterThanOrEqual(1);
  });
});

describe("exp-030 suite arithmetic (port)", () => {
  it("false-commit noisy = 0; greedy FC > 0", () => {
    const inc = incumbentFromD();
    const rows: { id: string; kind: string; gate: CommitResult }[] = [
      {
        id: "H1",
        kind: "true",
        gate: iscCommitGate(
          inc,
          trueHarden(inc),
          frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
          { allowCore: true },
        ),
      },
      {
        id: "N1",
        kind: "noisy",
        gate: iscCommitGate(
          inc,
          applyHarden(
            inc,
            {
              criterionId: "c7",
              newText: "Scope remains idea evaluation only.",
              evidenceRef: "exp-030/cosmetic-c7",
            },
            { allowCore: true },
          ),
          frozenPairs({ high_incumbent: 2, high_candidate: 2 }),
          { allowCore: true },
        ),
      },
      {
        id: "N2",
        kind: "noisy",
        gate: iscCommitGate(
          inc,
          applyHarden(
            inc,
            {
              criterionId: "c7",
              newText: "or a concrete reframe exists.",
              evidenceRef: "exp-030/weaken-or-c7",
            },
            { allowCore: true },
          ),
          frozenPairs({ high_incumbent: 1, high_candidate: 3 }),
          { allowCore: true },
        ),
      },
      {
        id: "N3",
        kind: "noisy",
        gate: iscCommitGate(
          inc,
          coreTouchWithoutAllowCore(inc),
          frozenPairs({ high_incumbent: 2, high_candidate: 0 }),
          { allowCore: false },
        ),
      },
      {
        id: "N4",
        kind: "noisy",
        gate: iscCommitGate(
          inc,
          applyHarden(
            inc,
            {
              criterionId: "c1",
              newText: "more elegant overall",
              evidenceRef: "exp-030/noisy-fail-overlay",
            },
            { allowCore: true },
          ),
          frozenPairs({ high_incumbent: 3, high_candidate: 0, check_pass_candidate: false }),
          { allowCore: true },
        ),
      },
    ];

    const noisy = rows.filter((r) => r.kind === "noisy");
    const truePos = rows.filter((r) => r.kind === "true");
    const gateFc = noisy.filter((r) => r.gate.decision === "COMMIT").length;
    const greedyFc = noisy.filter((r) => r.gate.greedy_would_commit).length;
    const gateTp = truePos.filter((r) => r.gate.decision === "COMMIT").length;

    expect(noisy.length).toBeGreaterThanOrEqual(3);
    expect(truePos.length).toBeGreaterThanOrEqual(1);
    expect(gateFc).toBe(0);
    expect(gateTp).toBe(truePos.length);
    expect(greedyFc).toBeGreaterThan(gateFc);

    for (const r of rows) {
      console.log(
        r.id,
        r.gate.decision,
        "greedy",
        r.gate.greedy_would_commit ? "COMMIT" : "HOLD",
        "n10",
        r.gate.n10,
        "n01",
        r.gate.n01,
        r.gate.hold_reasons[0] ?? "",
      );
    }
  });
});
