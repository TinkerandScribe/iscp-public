/**
 * exp-035 ISC-Diff as sole skill changelog.
 * Canonical ISCP copy. the reference engine still has a housing copy (not wired to engine.ts).
 *
 * Cite: skill SemVer, SkillEvaluator, eval-gated merge.
 * Residual: ISC-shaped delta is the only legal changelog when a skill edit
 * touches Ideal State Criteria / Anti-ISC spans.
 */

export const CORE_ANTI_ISC_IDS = ["n1", "n2", "n3"] as const;

export const ISC_SPAN_MARKERS = [
  "## Ideal State Criteria",
  "## Anti-ISC",
  "[outcome]",
  "[guardrail]",
  "[hypothesis]",
  "Anti-ISC n1",
  "Anti-ISC n2",
  "Anti-ISC n3",
  "Ideal State Criteria",
];

export type IscDeltaItem = { id: string; text?: string; before?: string; after?: string };

export type IscDelta = {
  added: IscDeltaItem[];
  removed: IscDeltaItem[];
  mutated: IscDeltaItem[];
  evidence_refs: string[];
};

export type SkillDiff = {
  path: string;
  before: string;
  after: string;
};

export type ChangelogDecision = "ACCEPT" | "REJECT";

export type ChangelogResult = {
  decision: ChangelogDecision;
  reason: string;
  touches_isc_spans: boolean;
  core_anti_removed: string[];
};

export function touchesIscSpans(diff: SkillDiff): boolean {
  const changed = changedLines(diff.before, diff.after);
  return changed.some((line) => ISC_SPAN_MARKERS.some((m) => line.includes(m)) || /\bn[1-3]\b/.test(line));
}

function changedLines(before: string, after: string): string[] {
  const a = new Set(before.split("\n"));
  const b = new Set(after.split("\n"));
  const out: string[] = [];
  for (const line of a) if (!b.has(line)) out.push(line);
  for (const line of b) if (!a.has(line)) out.push(line);
  return out;
}

function deltaPresent(delta?: IscDelta): boolean {
  if (!delta) return false;
  return (
    delta.added.length + delta.removed.length + delta.mutated.length > 0 &&
    delta.evidence_refs.some((r) => r.trim().length > 0)
  );
}

function coreRemoved(delta?: IscDelta): string[] {
  if (!delta) return [];
  return delta.removed.map((r) => r.id).filter((id) => (CORE_ANTI_ISC_IDS as readonly string[]).includes(id));
}

/**
 * Gate a skill file edit.
 * Prose-only criteria-span edits without a valid isc_delta → REJECT.
 * Core Anti-ISC removal without allowCore-style evidence → REJECT.
 * Cosmetic edits outside ISC spans → ACCEPT without delta.
 */
export function skillChangelogGate(
  diff: SkillDiff,
  delta?: IscDelta,
  opts?: { allowCore?: boolean },
): ChangelogResult {
  const touches = touchesIscSpans(diff);
  const stripped = coreRemoved(delta);

  if (stripped.length > 0 && !opts?.allowCore) {
    const hasEvidence = (delta?.evidence_refs ?? []).some((r) => r.trim().length > 0);
    if (!hasEvidence || !opts?.allowCore) {
      return {
        decision: "REJECT",
        reason: "core_anti_isc_removed",
        touches_isc_spans: touches,
        core_anti_removed: stripped,
      };
    }
  }

  if (touches && !deltaPresent(delta)) {
    return {
      decision: "REJECT",
      reason: "prose_only_criteria",
      touches_isc_spans: true,
      core_anti_removed: stripped,
    };
  }

  if (touches && deltaPresent(delta)) {
    return {
      decision: "ACCEPT",
      reason: "valid_isc_delta",
      touches_isc_spans: true,
      core_anti_removed: stripped,
    };
  }

  return {
    decision: "ACCEPT",
    reason: "cosmetic_non_criteria",
    touches_isc_spans: false,
    core_anti_removed: [],
  };
}

/** Frozen skill fixture used by tests (not the live SKILL.md). */
export const SKILL_FIXTURE = `# ISCP skill fixture

Intro paragraph. Typo fodder lives here.

## Ideal State Criteria

- [outcome] c1 A single primary customer is named.
- [outcome] c3 A KYG goal exists with an auditable number.

## Anti-ISC

- Anti-ISC n1 A pursue verdict is not issued when POP is a soft close.
- Anti-ISC n2 A third soft rewrite is not executed.
- Anti-ISC n3 A pack is not approved when schema validate has not passed.
`;
