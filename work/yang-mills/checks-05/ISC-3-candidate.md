# ISC-3 Candidate — yes

Lean 4 stdlib project `work/yang-mills/lean/` (no Mathlib; `Nat`-fractions + `Std.Internal.Rat` cross-check).

Theorems in `YangMillsGap.lean`:

- `casimirEnergy_formula` — E(j)=(g²L/2)·j·(j+1) as a Nat-fraction
- `energy_at_zero` — E(0)=0
- `energy_at_half` — E(1/2)=3 g²L / 8
- `massGap_eq_half_minus_zero` — Δ := E(1/2)−E(0) equals E(1/2) because E(0)=0
- `massGap_eq_three_eighths` — Δ = 3 g²L / 8
- `massGap_pos` — g²L > 0 ⇒ Δ > 0
- `three_eighths_pos` — g²L > 0 ⇒ 3 g²L / 8 > 0
- `ratEnergy_*` — computational identities at g²L=1 (Δ=3/8)

Physical identification “continuum spectrum = Casimir eigenvalues” is bridge A1 in `lean/AXIOMS.md`, not a Lean theorem.
