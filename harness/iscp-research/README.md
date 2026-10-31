# iscp-research

Canonical KEEP helpers that do **not** import Idea Gate `engine.ts`. See [BOUNDARY.md](BOUNDARY.md).

```bash
cd harness/iscp-research
npm install
npm test
```

Phase 7: `refusal-digest.ts`, `isc-pin.ts`, `isc-commit-gate.ts`, and `commit-or-refuse.ts` import `./port` (or each other), not `the reference engine/engine.ts`. Housing copies in Idea Gate are not deleted.

`ci-em.ts` is the engine-free P1 reader. It takes a JSONL path. The canonical file is `<shared-store>/em-records.jsonl`.
