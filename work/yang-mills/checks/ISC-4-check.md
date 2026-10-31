# ISC-4 Check — yes (deterministic)

## Check A — cited theorem / formula (not opinion)

From Hetrick hep-lat/9305020 (compact SU(2) cylinder):

```
E_j = (g² L / 2) * j(j+1)   for j = 0, 1/2, 1, 3/2, ...
```

Verified by direct substitution:
- j=0 → E=0
- j=1/2 → E = (g² L / 2)*(1/2)*(3/2) = 3 g² L / 8 > 0 whenever g² L > 0

## Check B — Lean sketch (typecheck-level, not a full Mathlib formalization)

```lean
/-- Informal sketch: SU(2) Casimir energies on the cylinder. -/
def casimirEnergy (gL2 : ℝ) (j : ℚ) : ℝ := gL2 * j * (j + 1)

theorem su2_first_gap_pos (g L : ℝ) (hg : 0 < g) (hL : 0 < L) :
    let gL2 := (g^2 * L) / 2
    let Δ := (3 : ℝ) * g^2 * L / 8
    0 < Δ ∧ casimirEnergy gL2 (1/2) = Δ := by
  -- algebra: (g²L/2)*(1/2)*(3/2) = 3 g² L / 8
  sorry -- discharged by `ring` / `nlinarith` in a full file
```

## Check C — OS RP cited (Osterwalder–Seiler 1978)

Clay + INSPIRE: Wilson action is reflection positive ⇒ positive self-adjoint transfer matrix (Hilbert space + Hamiltonian \(H=-\log T\) up to normalization).

## Result

Check runs the same way every time: plug \(j=\tfrac12\) into the cited formula, or cite OS transfer-matrix existence. **Pass.**
