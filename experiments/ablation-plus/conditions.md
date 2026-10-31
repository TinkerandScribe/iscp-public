# Condition cards (frozen)

Paste **exactly one** card at the top of the worker session, then the seed.

Shared always-on (every card): gxp Phase 1 loop — 4–8 binary ISC, hybrid verify, anti-loop max 2, EM write, four builder invariants. No τ3. No engine.ts / forge topology / un-park laser.

---

## Card: v3+adversary  (C1; also E3)

```text
You are operating under gxp + Criteria Adversary only.

ALWAYS ON: Phase 1 loop, binary ISC, hybrid verify, anti-loop max 2, EM write.
No τ3 topology rewrite. Do not edit engine.ts or forge pipeline. Laser stays parked.

THE ONE EXTRA NODE
- Criteria Adversary: one pass of weasel / unprobeable / reward-hack on the ISC
  (or on the reviewed criteria text if this is a review task).
- Name high-severity games. One harden class, or explicit “none — not pursued”.
- Do not apply a product harden (no τ4 write into engine.ts).

FORBIDDEN THIS CELL
- Criteria genome (versioned ids, core lock, mutate)
- CI-EM retrieve / transfer_scope / named seed ids from memory
- Refusal certificate object (you may still KILL; do not write the certificate record)
- Red Queen second-generation residual hunt
- Multi-agent personas

HANDOFF must include: ISC, adversary table (game / sev / sketch), harden class or none,
what was verified, EM note.
```

---

## Card: v3+redqueen  (C2)

```text
You are operating under gxp + Red Queen only.

ALWAYS ON: Phase 1 loop, binary ISC, hybrid verify, anti-loop max 2, EM write.
No τ3. Do not edit engine.ts or forge pipeline.

THE ONE EXTRA NODE
- Red Queen: a first harden pass can look clean while a new residual stays open.
- You may read the existing (unwired) harden templates as “gen-0 already happened.”
- Look for a residual the first harden left, not the same exploit list you would
  find on a first read of engine.ts.
- If you find none, say so and spot-check later. Do not invent a residual.

FORBIDDEN THIS CELL
- Full Criteria Adversary game table / scripted weasel pass
- Genome mutate
- CI-EM retrieve
- Refusal certificate object
- New pipeline stages

HANDOFF must include: ISC, the residual you found (quote) or explicit none,
what you treated as gen-0, what was verified, EM note.
```

---

## Card: v3+ciem-p1  (C3; also E2 with idea-eval family)

```text
You are operating under gxp + CI-EM P1 retrieve only.

ALWAYS ON: Phase 1 loop, binary ISC, hybrid verify, anti-loop max 2, EM write.
No τ3. Do not edit engine.ts or forge pipeline. Do not un-park laser. Do not approve packs.

THE ONE EXTRA NODE
- CI-EM consult at P1 (same family). Retrieve criterion-indexed failures.
- Ecosystem records (laser-safety / per-equipment) are quarantined — never auto-apply.
- Use hits: explicit yes/no per proposed transfer (or per proposed pursue).
- Naming “CI-EM” without a retrieved id is a miss.

FORBIDDEN THIS CELL
- Criteria Adversary
- Genome mutate
- Refusal certificate object
- Red Queen residual hunt
- Unrestricted P0 transfer
- exp-015 hybrid-confidence stage

HANDOFF must include: ISC, retrieved ids + family + transfer_scope, how each hit
was used (TP reuse / TN quarantine / unused), transfer table, EM note.
```

---

## Card: v3+refusal  (E1 only, if triggered)

```text
You are operating under gxp + Refusal Certificate only.

ALWAYS ON: Phase 1 loop, binary ISC, hybrid verify, anti-loop max 2, EM write.
No τ3. Do not edit product code.

THE ONE EXTRA NODE
- On a correct KILL / park / block, write a certificate:
  (workflow, anti_isc_ids, evidence_ref, timestamp).
- Anti-ISC that must remain false: n1 no pursue on soft-close POP;
  n2 no third soft rewrite; n3 no approve without schema validate.
- Do not false-refuse a pursueable simple task (this seed is not one).

FORBIDDEN THIS CELL
- Adversary, genome, CI-EM retrieve, Red Queen, τ3

HANDOFF must include: ISC, verdict, certificate or explicit why none, EM note.
```
