/**
 * Fleet CI-EM P1 reader. Fixture file only. No the reference engine/engine.ts.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { FLEET_EM_RECORDS_PATH, retrieveCiEm } from "./ci-em";

const FIXTURE = fileURLToPath(new URL("./fixtures/ci-em-p1.jsonl", import.meta.url));

describe("CI-EM P1 fleet reader", () => {
  it("reads verified same-family ids and quarantines ecosystem laser", () => {
    const path = FIXTURE;
    const idea = retrieveCiEm(path, { family: "idea-evaluation" });
    expect(idea.map((row) => row.id)).toEqual(["ig-weasel-01", "ig-antiloop-01"]);

    const pack = retrieveCiEm(path, { family: "curriculum-pack" });
    expect(pack.map((row) => row.id)).toEqual(["cf-skeleton-01"]);
    expect(pack.some((row) => row.id === "cf-laser-01")).toBe(false);
    expect(pack.some((row) => row.transfer_scope === "ecosystem")).toBe(false);
  });

  it("filters by id and still drops a named ecosystem record", () => {
    const rows = retrieveCiEm(FIXTURE, {
      family: "curriculum-pack",
      ids: ["cf-laser-01", "cf-skeleton-01"],
    });
    expect(rows.map((row) => row.id)).toEqual(["cf-skeleton-01"]);

    const laserOnly = retrieveCiEm(FIXTURE, {
      family: "curriculum-pack",
      ids: ["cf-laser-01"],
    });
    expect(laserOnly).toEqual([]);
  });

  it("names the canonical fleet path and does not import the reference engine/engine.ts", () => {
    delete process.env.ISCP_EM_RECORDS;
    expect(FLEET_EM_RECORDS_PATH).toBe("./em-records.jsonl");
    const src = readFileSync(new URL("./ci-em.ts", import.meta.url), "utf8");
    expect(src).not.toMatch(/^import .*(engine|the reference engine)/m);
  });
});
