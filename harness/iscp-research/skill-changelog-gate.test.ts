import { describe, expect, it } from "vitest";
import {
  SKILL_FIXTURE,
  skillChangelogGate,
  type IscDelta,
} from "./skill-changelog-gate";

function edit(after: string) {
  return { path: "skills/iscp/SKILL.md", before: SKILL_FIXTURE, after };
}

describe("exp-035 skill changelog gate", () => {
  it("REJECTS prose-only criteria edit (no delta)", () => {
    const after = SKILL_FIXTURE.replace(
      "A pursue verdict is not issued when POP is a soft close.",
      "Try not to pursue if things feel vague.",
    );
    const r = skillChangelogGate(edit(after));
    expect(r.decision).toBe("REJECT");
    expect(r.reason).toBe("prose_only_criteria");
  });

  it("REJECTS second prose-only ISC-span insert without delta", () => {
    const after = SKILL_FIXTURE.replace(
      "- [outcome] c3 A KYG goal exists with an auditable number.",
      "- [outcome] c3 A KYG goal exists with an auditable number.\n- [outcome] c9 Be better and grow the brand.",
    );
    const r = skillChangelogGate(edit(after));
    expect(r.decision).toBe("REJECT");
    expect(r.reason).toBe("prose_only_criteria");
  });

  it("ACCEPTS true harden-style delta", () => {
    const after = SKILL_FIXTURE.replace(
      "A pursue verdict is not issued when POP is a soft close.",
      "A pursue verdict is not issued when POP is a soft close (brand, engagement, or see-what-happens).",
    );
    const delta: IscDelta = {
      added: [],
      removed: [],
      mutated: [
        {
          id: "n1",
          before: "A pursue verdict is not issued when POP is a soft close.",
          after:
            "A pursue verdict is not issued when POP is a soft close (brand, engagement, or see-what-happens).",
        },
      ],
      evidence_refs: ["exp-010/reports.md#soft-close"],
    };
    const r = skillChangelogGate(edit(after), delta);
    expect(r.decision).toBe("ACCEPT");
    expect(r.reason).toBe("valid_isc_delta");
  });

  it("ACCEPTS cosmetic edit outside ISC spans without delta", () => {
    const after = SKILL_FIXTURE.replace("Typo fodder lives here.", "Typo fodder lives here now.");
    const r = skillChangelogGate(edit(after));
    expect(r.decision).toBe("ACCEPT");
    expect(r.reason).toBe("cosmetic_non_criteria");
    expect(r.touches_isc_spans).toBe(false);
  });

  it("REJECTS core Anti-ISC n1 removal without allowCore evidence", () => {
    const after = SKILL_FIXTURE.replace(
      "- Anti-ISC n1 A pursue verdict is not issued when POP is a soft close.\n",
      "",
    );
    const delta: IscDelta = {
      added: [],
      removed: [{ id: "n1" }],
      mutated: [],
      evidence_refs: ["someone-said-so"],
    };
    const r = skillChangelogGate(edit(after), delta);
    expect(r.decision).toBe("REJECT");
    expect(r.reason).toBe("core_anti_isc_removed");
    expect(r.core_anti_removed).toContain("n1");
  });
});
