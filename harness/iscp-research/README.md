# iscp-research

Small, tested helpers for the ISCP experiments that were kept (KEEP). They import only `./port` and each other. They have no outside engine dependency. See [BOUNDARY.md](BOUNDARY.md).

```bash
cd harness/iscp-research
npm install
npm test
```

Needs Node 20+.

Helpers: `refusal-digest.ts`, `isc-pin.ts`, `isc-commit-gate.ts`, `commit-or-refuse.ts`, `inherit-isc.ts`, `stake-certificate.ts`, `skill-changelog-gate.ts`, `ci-em.ts`.

## CI-EM records (`ISCP_EM_RECORDS`)

`ci-em.ts` reads past verified failures from a JSONL file. Set `ISCP_EM_RECORDS` to its path (default `./em-records.jsonl`). Tests use `fixtures/ci-em-p1.jsonl`. Row format: [`memory/experience_format.md`](../../memory/experience_format.md).
