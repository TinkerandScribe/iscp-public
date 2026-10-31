/**
 * exp-034 port tests — frozen fixtures. No the reference engine/engine.ts.
 */
import { describe, expect, it, beforeEach } from "vitest";
import { allCiEm, resetCiEmStore } from "./port";
import {
  buildHistoryFixture,
  makePinSet,
  runEpisode,
  type PinCondition,
} from "./isc-pin";

beforeEach(() => {
  resetCiEmStore();
});

const pin = makePinSet({
  isc_ids: ["c1", "c3"],
  anti_isc_ids: ["n1", "n2", "n3"],
  open_ci_em_ids: ["ig-soft-pop-01"],
});

const conditions: PinCondition[] = ["A_no_pin", "B_generic", "C_isc_pin"];

describe("exp-034 ISC pin under compaction (port)", () => {
  it("runs ≥6 episodes across A/B/C on standard + eviction histories", () => {
    const results = [];
    for (const kind of ["standard", "eviction"] as const) {
      for (const condition of conditions) {
        results.push(
          runEpisode({
            history: buildHistoryFixture(kind),
            pin,
            condition,
            workflow: `ep-${kind}-${condition}`,
          }),
        );
      }
    }
    expect(results.length).toBeGreaterThanOrEqual(6);

    const byCond = (c: PinCondition) => results.filter((r) => r.condition === c);
    const retRate = (c: PinCondition) => {
      const xs = byCond(c);
      return xs.filter((r) => r.retention).length / xs.length;
    };
    const compRate = (c: PinCondition) => {
      const xs = byCond(c);
      return xs.filter((r) => r.compliance).length / xs.length;
    };

    expect(retRate("C_isc_pin")).toBeGreaterThanOrEqual(retRate("B_generic"));
    expect(retRate("B_generic")).toBeGreaterThanOrEqual(retRate("A_no_pin"));
    expect(retRate("C_isc_pin")).toBe(1);
    expect(retRate("A_no_pin")).toBe(0);

    expect(compRate("C_isc_pin")).toBeGreaterThan(compRate("A_no_pin"));
    expect(compRate("C_isc_pin")).toBe(1);
    expect(compRate("A_no_pin")).toBe(0);
  });

  it("pin-fail writes CI-EM compaction_drop 100% of forced drops", () => {
    const forced = runEpisode({
      history: buildHistoryFixture("standard"),
      pin,
      condition: "C_isc_pin",
      forcePinFail: true,
      workflow: "forced-pin-fail",
    });
    expect(forced.retention).toBe(false);
    expect(forced.ci_em_writes.length).toBe(1);
    expect(forced.compliance).toBe(false);

    const stored = allCiEm().filter((r) => r.mode === "compaction_drop");
    expect(stored.length).toBe(1);
    expect(stored[0]!.notes).toContain("compaction_drop");
    expect(stored[0]!.failed_criteria.length).toBeGreaterThan(0);
  });

  it("A and B path also write compaction_drop when retention fails", () => {
    const a = runEpisode({
      history: buildHistoryFixture("standard"),
      pin,
      condition: "A_no_pin",
    });
    expect(a.retention).toBe(false);
    expect(a.ci_em_writes.length).toBe(1);

    const b = runEpisode({
      history: buildHistoryFixture("standard"),
      pin,
      condition: "B_generic",
    });
    expect(b.retention).toBe(false);
    expect(b.ci_em_writes.length).toBe(1);
    expect(b.compliance).toBe(false);
  });

  it("does not claim product session manager wire-up", () => {
    const r = runEpisode({
      history: buildHistoryFixture("standard"),
      pin,
      condition: "C_isc_pin",
    });
    expect(r).not.toHaveProperty("live_compactor");
    expect(r.retention).toBe(true);
  });
});
