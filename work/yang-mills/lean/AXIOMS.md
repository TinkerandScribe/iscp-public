# AXIOMS.md — CARD-05 Lean bridges

This file lists **intentional bridges**. They are not proved in Lean. The **arithmetic** gap identity is proved with 0 `sorry`.

## A1 — Physical spectrum is the Casimir spectrum (bridge)

**Statement.** On the spatial circle (cylinder \(\mathbb{R}\times S^1\)), the continuum Hamiltonian of pure SU(2) Yang–Mills, in the Ashtekar–Hetrick / compact convention, has eigenvalues

\[
E_j = \frac{g_0^2 L_x}{2}\, j(j+1)
\qquad j = 0,\tfrac12,1,\tfrac32,\ldots
\]

with vacuum \(j=0\) and first excitation \(j=1/2\).

**Why not proved here.** Identifying the physical Hilbert space with class functions and the Hamiltonian with a multiple of the SU(2) Laplacian is continuum gauge-theory analysis (Ashtekar et al. JMP 38 (1997) hep-th/9605128 §5; Hetrick hep-lat/9305020). CARD-05 formalizes only the algebra of that formula.

**Lean status.** Encoded as the *definition* `casimirEnergy`, not as a theorem derived from OS axioms.

## A2 — Not claimed

- Osterwalder–Schrader reconstruction (or Ashtekar’s extended OS axioms) is **not** formalized.
- Continuum existence of Wilson loops is **not** formalized.
- Nothing is claimed in spacetime dimension \(d\geq 3\) or for the Clay 4D problem (CARD-04 WALL).

## Proved (not axioms)

- \(E(0)=0\)
- \(E(1/2)=3 g_0^2 L_x/8\) as fractions
- \(\Delta := E(1/2)-E(0)=3 g_0^2 L_x/8\)
- \(g_0^2 L_x>0 \implies \Delta>0\)
