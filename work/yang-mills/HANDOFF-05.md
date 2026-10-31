# CARD-05 HANDOFF

```text
collapse: thin
isc: [ISC-1 yes, ISC-2 yes, ISC-3 yes, ISC-4 yes, ISC-5 yes, ISC-6 yes, ISC-7 yes, ISC-8 yes]
spawned: none
adversary: none — not pursued
decision: COMMIT
clock: τ1
evidence_refs:
  - CARD-02 / checks-02 (cylinder continuum Δ=3g₀²Lx/8; SU(2) Casimir)
  - Ashtekar et al., J. Math. Phys. 38 (1997) 5453; hep-th/9605128 (H=−(g₀²Lx/2)Δ; E=(g₀²Lx/2)λ)
  - Hetrick hep-lat/9305020 (E_j=(g²L/2)j(j+1); j=1/2)
  - work/yang-mills/lean/YangMillsGap.lean (lake build; 0 sorry)
  - work/yang-mills/lean/AXIOMS.md (A1 spectrum bridge only)
verified: quotes in checks-05/; lake build green; theorems massGap_eq_three_eighths + massGap_pos
em: {outcome: success, failed_criteria: [], notes: "algebraic SU(2) cylinder gap Lean YES; not OS; not 4D"}
anti_loop: ok
dimensional_scope: 2D cylinder algebraic SU(2) gap (not OS reconstruction; not 4D)
```

## Answer

**Yes**, as an **algebraic** identity: if the SU(2) cylinder spectrum is \(E_j=(g_0^2 L_x/2)\,j(j+1)\), then \(E(0)=0\), \(E(1/2)=3 g_0^2 L_x/8\), and \(\Delta=E(1/2)-E(0)=3 g_0^2 L_x/8>0\) whenever \(g_0^2 L_x>0\).

Lean 4 (`work/yang-mills/lean`, stdlib, no Mathlib) proves those equalities and the positivity theorem with 0 `sorry`. The identification of the physical continuum spectrum with that Casimir formula is a documented bridge (`AXIOMS.md` A1), not a Lean derivation from OS axioms.

This does **not** prove Osterwalder–Schrader reconstruction and does **not** touch continuum \(d\geq 3\) or Clay 4D (CARD-04 WALL).
