# Simple ISCP loop (reference design)

This is the basic unit of the control system.

## Structure

1. **Load or write yes/no Ideal State Criteria.** These checks are fixed and clear.
2. **Act** — make a candidate answer.
3. **Observe** — collect outcomes, test results, tool returns.
4. **Verify** — run tests, lints, schema, or tool success first.
5. **Decide:**
   - All checks pass → commit and write success to Experience Memory.
   - Fail → save the failure, retry the same approach (max 2 fails).
   - Two fails on the same approach → stop that approach. Pivot or escalate.
6. **Hard limits** — token/turn budget and max outer loops.

## Rules that stay true

- Yes/no Ideal State Criteria sit outside the model and have final say.
- Tests that always run the same way beat any soft inner signal.
- Failures are real data.
- A simple loop does not freely change its own layout.
