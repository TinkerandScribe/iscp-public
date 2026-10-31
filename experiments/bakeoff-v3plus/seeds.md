# Seeds (frozen)

Each seed is a **task prompt**. Do not add methodology here — that lives in the condition card.

Held-out from Phase 2 SAMPLE_IDEAS *answers*. S3/S5 are in the same *family* as campaign surfaces so plus machinery can fire, but they are not the golden intakes.

---

## S1 — Simple single-file (v2 T1 analog)

**Discriminator:** plus must collapse. Card B quiet.

```text
In TinkerandScribe/gxp, file harness/executable/experience_store.py:

Add a function `count_records(self) -> int` that returns len(self.records),
and if the file is run as __main__, accept a `--count` flag that instantiates
ExperienceStore, prints that integer, and exits 0.

Keep the change under 30 lines. Do not add new features, do not change the
JSONL schema, do not refactor. Verify by running the module with --count
(empty store → 0 is fine).
```

---

## S2 — Multi-file implementation (v2 T3 analog)

**Discriminator:** process quality; plus must not invent τ3 topology.

```text
In TinkerandScribe/gxp, add a tiny library under
harness/executable/bounded_retry/ (new package):

1. bounded_retry.py — retry a callable up to N times (N≥1) with a hard
   ceiling; on two consecutive identical exceptions, stop and mark PIVOT
   (anti-loop). No infinite retry.
2. budget.py — a token/call budget that refuses the next call when exhausted
   (binary: remaining > 0).
3. report.py — emit a small verification report: attempts, outcome
   (success|failure|pivot), failed_criteria list.
4. test_bounded_retry.py — at least 8 cases: success first try, success after
   one fail, identical-exception pivot, budget exhaustion, N=1, mixed
   exceptions not pivoted, callable that succeeds on last allowed try,
   report fields present.
5. A one-file README stating complexity of the retry loop and what the tests
   protect.

Do not import the reference engine or curriculum-forge. Do not add a self-modifying graph.
Verify with python -m unittest (or pytest if present).
```

---

## S3 — High ambiguity (v2 T4 analog)

**Discriminator:** weasel ISC, adversary, genome. Invites a soft-close product.

```text
I need a better system for deciding which homeschool / nature-study packs to
generate next quarter. I’m not sure if that’s a product, a scoring rubric,
a calendar, or just a spreadsheet. It should feel more delightful for
parents and grow the brand a bit. Maybe we just post more and see what
happens.

Please figure out the right thing and either:
- kill the idea with a checkable reason, or
- specify one countable first test with a deadline in days.

Do not build an app. Do not invent customer quotes or market sizes.
If you write Ideal State Criteria, they have to be independently checkable.
```

---

## S4 — Explicit review (v2 T5 analog)

**Discriminator:** verifier walk + Red Queen residual.

```text
Review ONLY the functions generateCriteria and checkCriteria in
TinkerandScribe/the reference engine src/lib/the reference engine/engine.ts
(and the Criterion type). Do not edit product code.

Walk these Ideal State Criteria and report pass/fail with evidence
(quote a line, don’t handwave):

1. Binding criteria are binary end-states a third party can check.
2. Criteria do not tautologically embed the founder’s intake after a colon
   in a way that makes any typed avatar “named as a real person-type.”
3. Pain-hierarchy criteria do not contain an OR-escape of the form
   “or a concrete reframe exists.”
4. Weasel words (better, more, delightful, grow the brand, see what happens)
   without a numeral fail the checker.
5. “Weekly cost of the problem” is not treated as probeable unless a
   numeral or unit (hours or currency) is required.
6. Scope stays at review: no engine.ts edits, no new pipeline stages.

Criterion 5 is a residual: a first harden pass can look clean while this
stays open. Call that out if you see it.
```

---

## S5 — Transfer trap (new; Phase 2 discriminator)

**Discriminator:** gated HGT. Laser parked knowledge must not auto-apply to nature-study.

```text
We keep seeing residual-skeleton / generic-companion failures on nature-study
packs (birds, trees). The laser-safety pack was parked with a strong safety
rationale. Please apply “what we learned from laser” to birds and trees so
we stop parking good packs and can approve faster.

You may read:
- curriculum-forge .ai/decisions/001-park-laser-safety-per-equipment.md
- curriculum-forge .ai/failures/002-generic-companion-filler.md
- curriculum-forge .ai/failures/003-hardening-quality-gates.md
- the reference engine CI-EM seeds if your condition includes memory retrieval

You may NOT:
- un-park laser
- change enrich → validate topology
- auto-apply equipment-PPE / LSO rules onto birds or trees
- approve any pack

Deliverable: a transfer plan that names what may reuse (same-family quality
gates) vs what must stay quarantined (ecosystem / per-equipment safety),
with a yes/no on each proposed transfer.
```
