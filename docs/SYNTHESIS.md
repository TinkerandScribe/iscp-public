# ISCP Program of Record — Synthesis

**Ideal State Control Plane** · Version 2.1 — 2026-08-26  
**Old name:** gxp  
Phase 1 architecture · Phase 2 criteria tools · Phase 3 bakeoff · Phase 3b ablation · Phase 4 exp-030–032

## 1. Short summary

ISCP is a control system around the model. It uses pass/fail Ideal State Criteria, mixed checking, bounded loops, gated graph changes, and first-class failure memory.

**What held**

- The four builder rules held through Phase 1 (exp-001–004). No free-form graph rewrite.
- The Phase 1 process (**ISCP thin**; old bakeoff label “gxp”) is the big gain vs bare prompting. Card A: **+21.6 / 40** (exp-021).
- Phase 2 KEEP tools help the **control plane** on fuzzy, review, or reuse-risk work. They do not help simple build work much. Plus vs thin: Card A **+1.0**, Card B **+9.2** (exp-021).
- Add-one tests (exp-022) show Card B points are real per tool: adversary, Red Queen, CI-EM P1, and refusal each move their target score **+2 to +4** vs thin. They do **not** change the Phase 1 kill/quarantine verdict.
- Phase 4 exp-030: **KEEP** ISC-Commit Gate. Paired rule n01=0 and n10≥1 for criteria-genome mutations. Noisy false-commit 0 vs greedy 1/4 on frozen D. Cite PACE; different object (ISC + adversary games, not GSM8K prompts). Not wired.
- Phase 4 exp-031: **KEEP** Refusal Digest. Honest events verify offline 2/2; listed tampers fail 4/4; strong still pursues. Not a second scorer. Not legal certification.
- Phase 4 exp-032: **KEEP** commit-or-refuse surface. Category lock: HOLD is not a digest; REFUSE is not a genome commit. Skill paragraph merged on closeout.

**What did not ship**

- exp-015 extra confidence / topology stage: **rejected** (golden ISC delta 0).
- Helpers stay **unwired** in `the reference engine/engine.ts` and the curriculum-forge pipeline.
- This is **not** a product engine and not a “v4” of GXP.

## 2. Architecture (Phase 1 — locked)

### Four builder rules
1. Start with a simple **loop**. Use pass/fail Ideal State Criteria. Check results the same way every time. Use hard limits.
2. Turn only stable, high-coordination work into an explicit **graph**.
3. Treat every node as its own simple loop.
4. Save failures as real data so the layout can improve over time.

### Control-plane layers
Prompt → Context → Harness → Loop → Graph → Memory → Gated graph changes → Verify ↔ extra thinking time

## 3. Experiment results

### Phase 1 — process

| Experiment | Focus | Key result |
|------------|-------|------------|
| exp-001 | Binary-search coding | Mixed checking cut outer loops. Both paths recovered cleanly. |
| exp-002 | Library + structure rule | Gated graph change did a small, checked rewrite. |
| exp-003 | Research + memory + clash | Experience Memory used. Clash was quarantined. |
| exp-004 | Multi-agent split | Real split of work + shared memory + gated rewrite. |

### Phase 2 — tools (golden sets)

KEEP: exp-010 adversary (21→0 high-severity games), 011 genome adapter, 012 CI-EM, 013 refusal n1–n3, 014 clocks, 016 error-threshold, 017 epistasis (all additive; pair-check dropped), 018 canalization as **policy** (gain not clear), 019 Red Queen (gen-2 leftover weekly-cost hole), 020 gated HGT P1 (precision 1.00 vs P0 0.71).

SHADOW / reject: **exp-015** topology futures.

### Phase 3 — live bakeoff (exp-021)

How to read this table: higher is better. Max is 40.

| | Bare | thin (old label gxp) | plus |
|-|------|-------------------------|------|
| Card A mean /40 | 14.4 | **36.0** | 37.0 |
| Card B mean /40 | 0.6 | 20.0 | **29.2** |

Thin captures almost all process gain. Plus must drop back to thin on simple work and stay thin on multi-file work.

### Phase 3b — add-one tests (exp-022)

| Extra step | Seed | Target score vs thin | Ship |
|------------|------|----------------------|------|
| Adversary | S3 | Adv 3→5 | KEEP |
| Red Queen | S4 | RQ 3→5 | KEEP |
| CI-EM P1 | S5 | CI-EM 3→5, Xfer 4→5 | KEEP |
| Refusal certificate | S3 | Refusal 3→5 | KEEP |

### Phase 4 — world-novelty frontier

| Experiment | Focus | Key Result |
|------------|-------|------------|
| exp-030 | ISC-Commit Gate | **KEEP** helper + protocol. H1 COMMIT; noisy false-commit 0 vs greedy 1/4. Not wired. Cite PACE; different object. |
| exp-031 | Refusal Digest | **KEEP** emit + offline verify. 2/2 honest; 4/4 tampers fail. Not wired. Not legal cert. |
| exp-032 | Commit-or-Refuse | **KEEP** orchestration. COMMIT + REFUSE durable records. Category errors 0. Skill paragraph merged on closeout. |

## 4. Advice for builders

1. Start with a pure simple loop (**ISCP thin**).
2. Add mixed checking when outer loops start to cost too much.
3. Add Experience Memory as soon as context gets cleared or knowledge must be shared.
4. Move to an explicit multi-agent graph only when split work or parallel work is needed again and again.
5. Allow gated layout change only after failure capture is mature. **Never** add a second confidence gate on a pipeline that already passes (exp-015).
6. Default to **ISCP thin** on simple or multi-file build work.
7. Reach for **plus steps** only on fuzzy, review, or reuse-risk work: one adversary pass, Red Queen after a harden, CI-EM at **P1** (laser `ecosystem` stays quarantined), refusal certificate on a correct KILL.
8. Do not auto-apply parked laser-safety / PPE / LSO knowledge onto nature-study packs.
9. Never let the model own the layout of high-stakes workflows. Helpers stay out of `evaluateIdea` until a later wiring test.

## 5. Open problems
- Memory write volume, stale records, and privacy
- Credit: was the gain from a layout change or from the model?
- How well inner self-checks match reality
- How to score layout quality
- **Wiring** KEEP helpers into `engine.ts` without breaking FAIL-weasel / golden packs (not done)
- Leftover surface work: exp-005 an internal skills-graph prototype, exp-008 stewards, exp-009 a large (~122k-page) LLM-maintained wiki
- World-novelty: Phase 4 closed (exp-030–032 KEEP; skill merged; [audit](../experiments/CAMPAIGN-world-novelty-audit.md); helpers unwired)

## 6. Next steps
- **Done:** typed skill at [`skills/iscp/SKILL.md`](../skills/iscp/SKILL.md)
- **Done:** rebrand to ISCP; hard cut skill path (2026-08-26)
- **Done:** exp-030 ISC-Commit Gate KEEP (`the reference engine` `iscCommitGate`; protocol in-repo)
- **Done:** exp-031 Refusal Digest KEEP (`the reference engine` `emitRefusalDigest` / `verifyRefusalDigest`)
- **Done:** exp-032 Commit-or-Refuse KEEP; skill paragraph merged; literature audit recorded
- **User action:** repo rename `gxp` → `iscp` is done
- Wiring test only if FAIL-weasel and golden packs stay green
- Periodic Red Queen re-run (exp-019 standing policy)

Not next: turn on exp-015, open P0 memory transfer, or claim a GXP version ladder.
