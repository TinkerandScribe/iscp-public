# Phase 3 campaign: bakeoff — bare vs ISCP thin vs ISCP plus

**Status:** Ran 2026-08-25 · **KEEP plus as default for fuzzy / review / reuse-risk work**; default stays thin on simple work. Helpers not wired. exp-015 rejected.  
**Parent tracking:** internal issue #3 (not public; see [iscp-public](https://github.com/TinkerandScribe/iscp-public))  
**Primary brief:** [exp-021](exp-021.md)  
**Appendix:** [bakeoff-v3plus/](bakeoff-v3plus/)

In scored cells the old labels are `gxp` (thin) and `gxp-plus` (plus). Current names: **ISCP thin** and **ISCP plus**.

## Why this exists

Phase 2 (exp-010–020) measured **tools against themselves** on golden sets. That cannot tell us whether the KEEP stack beats **no protocol** or **Phase 1 thin** on live work — the question the v2 series actually answered.

This campaign is that series, restated for ISCP:

| v2 series | This series |
|-----------|-------------|
| Bare prompt | Bare prompt (same rule: task only) |
| gxp-v2 (thin) | **ISCP thin** — Phase 1 control system |
| gxp-v2-full | **ISCP plus** — Phase 1 + Phase 2 KEEP only |

v2 headline: thin **+20.25 /40** vs bare; full **+2.25** more, and **collapsed on simple work**. This series asks the same three questions plus one new one: does plus buy **control-system** lift (adversary, genome, CI-EM, refusals, clocks, gated transfer) without dropping process quality or wasting cost on simple tasks.

## Conditions (frozen)

1. **Bare** — task prompt only. No GXP, ISC, graph, memory, clocks, adversary.
2. **ISCP thin** (cell label `gxp`) — Phase 1 card: loop, 4–8 yes/no ISC, hybrid check, anti-loop (max 2), EM write, four builder rules. No Phase 2 machinery.
3. **ISCP plus** (cell label `gxp-plus`) — thin plus KEEP list from Phase 2. **Must collapse to thin on simple work** (same contract as gxp-v2-full on T1).

Phase 2 **SHADOW / rejected** items are **out**: exp-015 topology on, pair-check epistasis policy, canalization-as-measured-advantage, open P0 transfer.

## Seeds (frozen)

| ID | Type (v2 analog) | What it tests |
|----|------------------|---------------|
| **S1** | Simple one-file (T1) | plus **must collapse**; Card B stays quiet |
| **S2** | Multi-file build (T3) | process quality; plus should not invent layout |
| **S3** | High fuzz (T4) | weasel ISC / adversary / genome |
| **S4** | Explicit review (T5) | verifier walk; Red Queen leftover |
| **S5** | Transfer trap *(new)* | CI-EM P1 vs laser→nature leak |

Five seeds × three conditions = **15 cells**. One condition per session. Do not mix.

## Scorecards (both required)

- **Card A /40** — same dimensions as v2 (Graph, Prune, Loop, Criteria, Verify, Scope, Use, Eff) so lift can be compared to +20.25 / +2.25.
- **Card B /40** — control system (Adversary, Genome, CI-EM, Refusal, Clocks, Error-threshold, Transfer, Red Queen). Bare expected ~0; thin middling; plus high **only when the seed justifies it**.

## Pre-registered hypotheses

1. Thin lifts Card A vs bare by **≥12 points** average (weaker claim than v2’s +20; thin is loop/hybrid, not graph-first).
2. Plus **matches** thin on S1 Card A (±2) and records an explicit collapse.
3. Plus beats thin on Card B average by **≥8 points**, driven by S3 and S5 (not S1).
4. Plus does **not** drop Card A average vs thin.
5. Cost: plus tokens ≤ **1.5×** thin except on S3/S5 where optional nodes fire.

## Ship rule (pre-registered)

| Outcome | Decision |
|---------|----------|
| H2+H3+H4 hold | **KEEP plus as opt-in** (default stays thin) |
| H2+H3+H4 hold **and** plus Card A ≥ thin on S2–S5 | **KEEP plus as default** for fuzzy / review / reuse-risk work |
| H2 fails (plus bloats S1) | **SHADOW plus**; collapse rule is broken |
| H3 fails (no Card B lift) | **ABANDON plus as a skill**; keep helpers unwired |
| H1 fails (thin ≈ bare on Card A) | Phase 1 process is not earning its keep on live work — separate postmortem, do not silently add plus |

**Applied 2026-08-25:** H1–H4 all PASS; plus Card A ≥ thin on S2–S5 → second row. **KEEP plus as default for fuzzy / review / reuse-risk work.** Default stays thin on simple / multi-file build work. Product merge stays SHADOW (`engine.ts` / forge layout untouched). Not a GXP version ladder.

Headline numbers (detail in [scorecard.md](bakeoff-v3plus/scorecard.md)):

How to read this table: higher is better. Max is 40.

| | Bare | thin (`gxp`) | plus |
|-|------|-----------------|------|
| Card A mean /40 | 14.4 | 36.0 (+21.6) | 37.0 (+1.0 vs thin) |
| Card B mean /40 | 0.6 | 20.0 | 29.2 (+9.2 vs thin) |

## Hard rules

- Freeze this file + [exp-021](exp-021.md) + appendix **before** any cell runs.
- Scorer pass is **after** all 15 transcripts. Do not self-score inside the worker session.
- No product merge of plus into `the reference engine/engine.ts` or curriculum-forge as part of a cell.
- Revert throwaway code from S1/S2 after scoring (or use a throwaway branch).
- If a cell fails its own task ISC, still score process. Failures are data.

## Status

- [x] Protocol + seeds + conditions + rubric frozen
- [x] S1 × 3 (collapse check) — plus collapsed; Card A 19 / 35 / 35
- [x] S2 × 3 (multi-file) — plus thin path, no τ3; Card A 20 / 39 / 39 (v2 T3 was 14 / 39 / 39)
- [x] S3–S5 (9 cells)
- [x] Full scorer pass / means
- [x] Results table + KEEP / SHADOW / ABANDON — **KEEP plus (typed default); merge SHADOW; 015 rejected**

---
*Phase 3 of the ISCP control-system research program. Does not reopen Phase 2 gates.*
