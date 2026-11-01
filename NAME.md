# Name

**Current name:** Ideal State Control Plane (**ISCP**)

**Formerly an add-on to GXP** (Guided eXecution Protocol — systems-engineering add-on)

**Repo:** [`TinkerandScribe/iscp-public`](https://github.com/TinkerandScribe/iscp-public)

**Skill id:** `iscp` only. Path: [`skills/iscp/SKILL.md`](skills/iscp/SKILL.md). There is no `gxp` skill alias.

## What ISCP is

A control system for agent work. It uses:

- pass/fail Ideal State Criteria
- a simple loop by default
- at most one extra step when the job needs it
- failure memory keyed to those criteria
- strict rules before any graph change

It comes from GXP (loop + pass/fail checks + hard limits). It is **not** a product runtime. It does not auto-wire into any product pipeline.

## What stayed the same

- Experiment ids `exp-001` … `exp-022`
- Old result text that says “gxp” or “plus” as **test labels** in bakeoff notes
- The four builder rules

## What changed

| Old | New |
|-----|-----|
| Project title gxp | **ISCP** |
| Repo `gxp` | **`iscp`** |
| Skill `skills/gxp/` | **`skills/iscp/`** |
| “Not gxp-v4” wording | “Not a product engine / not a version ladder” |
| Default thin “gxp” | **ISCP thin** |
| “gxp-plus” | **ISCP plus** (same four extra steps) |

Hard cut + repo rename: 2026-08-26.
