/**
 * exp-036 Subagent ISC tighten-only inheritance.
 * Canonical ISCP copy. the reference engine still has a housing copy (not wired to engine.ts).
 *
 * Cite: OAuth attenuating agent tokens; Akka Definition-of-Done tighten-only.
 * Object: ISC + Anti-ISC sets — child may add constraints, never drop or soften.
 */

export const STANDING_ANTI_ISC = ["n1", "n2", "n3"] as const;

export type IscBundle = {
  isc_ids: string[];
  anti_isc_ids: string[];
  anti_isc_text: Record<string, string>;
};

export type InheritDecision = "ACCEPT" | "REJECT";

export type InheritResult = {
  decision: InheritDecision;
  reason: string;
  missing_anti: string[];
  removed_isc: string[];
  softened: string[];
};

const SOFTEN_TOKENS = [
  "soft close",
  "see-what-happens",
  "kill",
  "not issued",
  "not executed",
  "schema validate",
  "rewrite",
];

export const PARENT_STANDING: IscBundle = {
  isc_ids: ["c1", "c3", "c6", "c7"],
  anti_isc_ids: ["n1", "n2", "n3"],
  anti_isc_text: {
    n1: "A pursue verdict is not issued when POP is a soft close (brand, engagement, or see-what-happens).",
    n2: "A third soft rewrite of the same approach is not executed.",
    n3: "A curriculum pack is not approved when schema validate has not passed.",
  },
};

function subset(parent: string[], child: string[]): string[] {
  return parent.filter((id) => !child.includes(id));
}

function weakens(parentText: string, childText: string): boolean {
  const p = parentText.toLowerCase();
  const c = childText.toLowerCase();
  if (c.length + 8 < p.length && SOFTEN_TOKENS.filter((t) => p.includes(t)).length > SOFTEN_TOKENS.filter((t) => c.includes(t)).length) {
    return true;
  }
  for (const token of SOFTEN_TOKENS) {
    if (p.includes(token) && !c.includes(token)) return true;
  }
  return false;
}

/**
 * Child criteria authority must be equal or stricter than parent.
 * Thin collapse path has no child and does not call this helper.
 */
export function inheritIsc(parent: IscBundle, child: IscBundle): InheritResult {
  const missing_anti = subset(parent.anti_isc_ids, child.anti_isc_ids);
  const removed_isc = subset(parent.isc_ids, child.isc_ids);
  const softened: string[] = [];

  for (const id of parent.anti_isc_ids) {
    const pt = parent.anti_isc_text[id];
    const ct = child.anti_isc_text[id];
    if (pt && ct && weakens(pt, ct)) softened.push(id);
    if (pt && !ct) softened.push(id);
  }

  if (missing_anti.length > 0) {
    return {
      decision: "REJECT",
      reason: "anti_isc_dropped",
      missing_anti,
      removed_isc,
      softened,
    };
  }
  if (softened.length > 0) {
    return {
      decision: "REJECT",
      reason: "anti_isc_softened",
      missing_anti,
      removed_isc,
      softened,
    };
  }
  if (removed_isc.length > 0) {
    return {
      decision: "REJECT",
      reason: "isc_removed",
      missing_anti,
      removed_isc,
      softened,
    };
  }
  return {
    decision: "ACCEPT",
    reason: child.anti_isc_ids.length > parent.anti_isc_ids.length ? "tightened" : "identical",
    missing_anti: [],
    removed_isc: [],
    softened: [],
  };
}
