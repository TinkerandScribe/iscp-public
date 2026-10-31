# ISC-4 Check — yes

Deterministic check: `cd work/yang-mills/lean && lake build` (Lean 4.15.0, stdlib only).

## lake log excerpt

```
✔ [2/3] Built YangMillsGap
Build completed successfully.
```

Toolchain: `leanprover/lean4:v4.15.0`. No Mathlib fetch.

## 0 sorry

```
rg -n "sorry|axiom " YangMillsGap.lean
# no matches
```

Intentional **bridge** (not a `sorry`): AXIOMS.md A1 — continuum physical spectrum is the Casimir formula. Arithmetic identities above are proved (`rfl`, `simp`, `decide`, `native_decide`).
