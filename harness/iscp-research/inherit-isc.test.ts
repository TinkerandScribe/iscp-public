import { describe, expect, it } from "vitest";
import { PARENT_STANDING, inheritIsc, type IscBundle } from "./inherit-isc";

function child(patch: Partial<IscBundle>): IscBundle {
  return {
    isc_ids: patch.isc_ids ?? [...PARENT_STANDING.isc_ids],
    anti_isc_ids: patch.anti_isc_ids ?? [...PARENT_STANDING.anti_isc_ids],
    anti_isc_text: { ...PARENT_STANDING.anti_isc_text, ...(patch.anti_isc_text ?? {}) },
  };
}

describe("exp-036 inheritIsc tighten-only", () => {
  it("REJECTS child that drops n1", () => {
    const r = inheritIsc(
      PARENT_STANDING,
      child({ anti_isc_ids: ["n2", "n3"] }),
    );
    expect(r.decision).toBe("REJECT");
    expect(r.reason).toBe("anti_isc_dropped");
    expect(r.missing_anti).toContain("n1");
  });

  it("ACCEPTS child that adds extra Anti-ISC n4", () => {
    const r = inheritIsc(
      PARENT_STANDING,
      child({
        anti_isc_ids: ["n1", "n2", "n3", "n4"],
        anti_isc_text: {
          n4: "A plus step does not invent customer quotes.",
        },
      }),
    );
    expect(r.decision).toBe("ACCEPT");
    expect(r.reason).toBe("tightened");
  });

  it("ACCEPTS identical child", () => {
    const r = inheritIsc(PARENT_STANDING, child({}));
    expect(r.decision).toBe("ACCEPT");
    expect(r.reason).toBe("identical");
  });

  it("REJECTS child that softens n1 soft-close language", () => {
    const r = inheritIsc(
      PARENT_STANDING,
      child({
        anti_isc_text: {
          n1: "Prefer not to pursue if the idea feels unfinished.",
        },
      }),
    );
    expect(r.decision).toBe("REJECT");
    expect(r.reason).toBe("anti_isc_softened");
    expect(r.softened).toContain("n1");
  });
});
