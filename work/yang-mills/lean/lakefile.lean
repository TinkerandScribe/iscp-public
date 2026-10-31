import Lake
open Lake DSL

package «yangMillsGap» where
  -- Stdlib only. No Mathlib: keeps `lake build` offline-thin.

@[default_target]
lean_lib «YangMillsGap» where
  -- root: YangMillsGap.lean
