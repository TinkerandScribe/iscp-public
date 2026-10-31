# CARD-02 HANDOFF

```text
collapse: thin
isc: [ISC-1 yes, ISC-2 yes, ISC-3 yes, ISC-4 yes, ISC-5 yes, ISC-6 yes, ISC-7 yes, ISC-8 yes]
spawned: none
adversary: none — not pursued
decision: COMMIT
clock: τ1
evidence_refs:
  - Ashtekar et al., J. Math. Phys. 38 (1997) 5453; hep-th/9605128 (continuum Wilson loops; extended OS satisfied; H=−(g₀²Lx/2)Δ; E=(g₀²Lx/2)λ)
  - Driver CMP 123 (1989); Sengupta; Lévy arXiv:1912.06246 (continuum YM₂ measure)
  - Hetrick hep-lat/9305020 (SU(2) Casimir cross-check)
verified: quotes in checks-02/; numeric Δ=3g₀²Lx/8
em: {outcome: success, failed_criteria: [], notes: "cylinder continuum OS+gap YES; plane trivial; not 4D"}
anti_loop: ok
dimensional_scope: 2D cylinder continuum (not 4D; plane Hamiltonian trivial)
```

## Answer

**Yes**, for pure YM₂ on the **cylinder** R×S¹ with compact G: continuum limit of Wilson loops exists, an extension of the Osterwalder–Schrader axioms for gauge theories is satisfied (Ashtekar et al.), and the reconstructed Hamiltonian has continuum mass gap Δ=(g₀² L_x/2)λ₁ (SU(2): 3g₀² L_x/8).

On the **plane** R² the continuum measure exists but the reduced theory is trivial — do not treat that as a nontrivial gap theorem.
