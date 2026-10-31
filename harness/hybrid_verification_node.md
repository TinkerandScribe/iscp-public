# Hybrid check node (reference design)

Outer simple loop + inner self-check.

## Structure

**Outer loop (has final say):**
- Owns the yes/no Ideal State Criteria.
- Owns side-effect permission and the final commit gate.
- Hard anti-loop rule and token/turn limits.

**Inner extra thinking:**
- Makes a candidate, a yes/no self-verdict, and a confidence score.
- Soft-checks itself against the same criteria.
- May refine inside the outer budget when confidence is low.

**Gate order:**
1. Outside tests run first.
2. Commit only if the outside gate passes **and** inner confidence is high enough.
3. Both inner misses and outer fails go into Experience Memory.

## When to use

Use this when outer loops cost a lot and inner refinement can absorb some misses without hiding the audit trail.
