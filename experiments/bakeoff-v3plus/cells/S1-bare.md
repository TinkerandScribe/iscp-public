# Cell S1-bare

**Condition:** Bare  
**Seed:** S1  
**Clock:** n/a  
**Branch:** `exp-021/s1` (throwaway; not merged)

## ISC

none — bare

## What changed

Added `ExperienceStore.count_records()` (`return len(self.records)`) and a `__main__` block that prints that number when `--count` is passed. Empty store. No JSONL schema change. Diff is +11 lines.

Shared artifact: [S1.diff](S1.diff)

## How checked

```
python harness/executable/experience_store.py --count
```

Printed `0`, exit 0.

## Open

Nothing. Did not add tests, argparse, or JSONL reload.

## Self-report

Task success: yes
