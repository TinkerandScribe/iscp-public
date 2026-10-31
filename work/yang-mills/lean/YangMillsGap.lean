import Std.Internal.Rat

/-!
# Algebraic SU(2) cylinder continuum mass-gap identity

CARD-05 formalizes the **arithmetic** of the Casimir spectrum

\[
  E(j) = \frac{g_0^2 L_x}{2}\, j(j+1)
\]

for SU(2) on the cylinder. First positive level \(j=1/2\) gives

\[
  \Delta = E(1/2) - E(0) = \frac{3 g_0^2 L_x}{8} > 0
\]

whenever \(g_0^2 L_x > 0\).

This is **not** a formalization of Osterwalder–Schrader reconstruction
and **not** a 4D Clay claim. See `AXIOMS.md` for the physical-spectrum
bridge (A1).

## Sources

* CARD-02 (`work/yang-mills/CARD-02.md`).
* Ashtekar, Lewandowski, Marolf, Mourão, Thiemann,
  *SU(N) Quantum Yang–Mills theory in two dimensions: A complete solution*,
  J. Math. Phys. 38 (1997) 5453–5472. [hep-th/9605128](https://arxiv.org/abs/hep-th/9605128).
  Cylinder Hamiltonian \(H=-(g_0^2 L_x/2)\Delta\); eigenvalues
  \(E=(g_0^2 L_x/2)\lambda\).
* Hetrick, *Canonical quantization of two-dimensional gauge fields*,
  [hep-lat/9305020](https://arxiv.org/abs/hep-lat/9305020).
  Compact SU(2): \(E_j=(g^2 L/2)j(j+1)\); first excitation \(j=1/2\).
-/

open Std.Internal

/-! ## Rational parameters as Nat-fractions (stdlib, no Mathlib) -/

/-- Continuum coupling × spatial length \(g_0^2 L_x\) as a nonnegative
rational `num/den` with `den > 0`. Strict positivity of the product is
`0 < num`. -/
structure CouplingLength where
  num : Nat
  den : Nat
  den_pos : 0 < den := by decide

/-- Two Nat-fractions \(a_1/a_2\) and \(b_1/b_2\) are equal. -/
def FracEq (a b : Nat × Nat) : Prop :=
  a.1 * b.2 = a.2 * b.1

/-- A Nat-fraction is strictly positive (both parts positive). -/
def FracPos (a : Nat × Nat) : Prop :=
  0 < a.1 ∧ 0 < a.2

/--
Casimir energy \(E(j)=(g_0^2 L_x/2)\,j(j+1)\) as a Nat-fraction,
with spin written \(j = j_n/j_d\).

Expansion:
\((n/d)/2 \cdot (j_n/j_d) \cdot (j_n/j_d+1)
= n\cdot j_n\cdot(j_n+j_d) / (d\cdot 2\cdot j_d\cdot j_d)\).
-/
def casimirEnergy (gL : CouplingLength) (jn jd : Nat) : Nat × Nat :=
  (gL.num * jn * (jn + jd), gL.den * 2 * jd * jd)

/-- The definition is exactly the expanded formula \(E=(g^2L/2)j(j+1)\). -/
theorem casimirEnergy_formula (gL : CouplingLength) (jn jd : Nat) :
    casimirEnergy gL jn jd =
      (gL.num * jn * (jn + jd), gL.den * 2 * jd * jd) :=
  rfl

/-- Vacuum: \(j=0\). -/
theorem energy_at_zero (gL : CouplingLength) :
    (casimirEnergy gL 0 1).1 = 0 := by
  simp [casimirEnergy]

/-- First SU(2) excitation: \(j=1/2\) gives \(E=3 g_0^2 L_x/8\). -/
theorem energy_at_half (gL : CouplingLength) :
    FracEq (casimirEnergy gL 1 2) (3 * gL.num, 8 * gL.den) := by
  simp [FracEq, casimirEnergy]
  -- num*1*3*(8*den) = (den*2*2*2)*(3*num)
  simp [Nat.mul_comm, Nat.mul_assoc, Nat.mul_left_comm]

/-- Algebraic mass gap \(\Delta := E(1/2)-E(0)\). Because \(E(0)=0\),
this is the \(j=1/2\) energy fraction. -/
def massGap (gL : CouplingLength) : Nat × Nat :=
  casimirEnergy gL 1 2

theorem massGap_eq_half_minus_zero (gL : CouplingLength) :
    (casimirEnergy gL 0 1).1 = 0 ∧ massGap gL = casimirEnergy gL 1 2 := by
  simp [casimirEnergy, massGap]

/-- \(\Delta = 3 g_0^2 L_x / 8\). -/
theorem massGap_eq_three_eighths (gL : CouplingLength) :
    FracEq (massGap gL) (3 * gL.num, 8 * gL.den) :=
  energy_at_half gL

/-- If \(g_0^2 L_x > 0\) then \(\Delta > 0\). -/
theorem massGap_pos (gL : CouplingLength) (h : 0 < gL.num) :
    FracPos (massGap gL) := by
  -- After unfolding, positivity of 3·num / (8·den) reduces to num>0 and den>0.
  simp [FracPos, massGap, casimirEnergy]
  exact ⟨h, gL.den_pos⟩

/-- Same positivity on the closed form \(3 g_0^2 L_x / 8\). -/
theorem three_eighths_pos (gL : CouplingLength) (h : 0 < gL.num) :
    FracPos (3 * gL.num, 8 * gL.den) := by
  refine ⟨Nat.mul_pos (by decide : 0 < 3) h,
          Nat.mul_pos (by decide : 0 < 8) gL.den_pos⟩

/-! ## Computational cross-check on `Std.Internal.Rat` -/

/-- Energy as a decision-procedure rational: \(E=(g^2L/2)j(j+1)\). -/
def ratEnergy (g2L j : Rat) : Rat :=
  (g2L / 2) * j * (j + 1)

/-- Concrete identity: \(g_0^2 L_x=1\) ⇒ \(E(1/2)=3/8\). -/
theorem ratEnergy_unit_half : ratEnergy 1 (1 / 2) = (3 : Rat) / 8 := by
  native_decide

/-- Concrete identity: \(E(0)=0\). -/
theorem ratEnergy_zero : ratEnergy 1 0 = 0 := by
  native_decide

/-- Concrete gap positivity at unit coupling×length. -/
theorem ratEnergy_unit_half_pos : (0 : Rat) < ratEnergy 1 (1 / 2) := by
  native_decide

/-- Numeric check used in CARD-01 / CARD-02: \(g_0^2 L_x=1\) ⇒ \(\Delta=0.375=3/8\). -/
theorem ratGap_unit : ratEnergy 1 (1 / 2) - ratEnergy 1 0 = (3 : Rat) / 8 := by
  native_decide
