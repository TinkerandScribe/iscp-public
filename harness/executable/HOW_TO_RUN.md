# How to Run the ISCP Harnesses

This guide uses short sentences so you can follow it without extra background.

**Old folder name:** gxp harness. The ideas are the same. The project name is now ISCP.

## What this folder is

This folder has working Python demos of the ISCP control system.

The demos show how to:

- Run a simple loop that checks its own work
- Run a smarter loop that self-checks before the main test
- Run a small team of specialist nodes
- Save mistakes so later steps can learn
- Change the team layout only after a safety check

Nothing important changes unless a clear check passes first.

## What you need

- Python 3.10 or newer
- No extra packages for the basic demos

## Quick start

Open a terminal and go into the harness folder. On a local clone that path may still be named `gxp-harness`:

```bash
cd artifacts/gxp-harness
```

If you are already inside `harness/executable/` in this repo, run the same commands from there.

### 1. Basic simple loop

```bash
python -m pure_gxp.gxp_loop
```

This tries to build a binary search function. It fails a couple of times on purpose, saves the mistakes, then succeeds.

### 2. Hybrid version

```bash
python -m hybrid.hybrid_node
```

Same job. It also does a quick self-check before the main test.

### 3. Simple team (graph)

```bash
python -m graph.simple_graph
```

Three nodes work together:

- One builds the answer
- One checks the answer with real tests
- One writes down every success and failure

### 4. Longer library task (with memory)

```bash
python -m graph.library_graph
```

This builds three related functions:

- binary_search
- lower_bound
- upper_bound

It reads past mistakes so it does not repeat the same error.

### 5. Multi-agent version

```bash
python -m graph.multi_agent_library
```

Specialist nodes each do one part. A shared checker decides if the whole library is good.

### 6. Layout-change demo (VGTE)

```bash
python -m graph.vgte
```

The system sees the same mistake twice. It then adds a “Summary Critic” node. It only makes the change after a safety check passes.

### 7. Side-by-side comparison

```bash
python run_comparison.py
```

This runs the simple loop and the hybrid node and prints a short comparison.

### 8. Unit tests

```bash
python -m tests.test_pure_gxp
```

## What success looks like

You should see JSON that ends with something like:

```json
"success": true,
"outer_iterations": 2
```

or

```json
"proposal_accepted": true
```

If you see `"success": false`, the system hit its safety limit and stopped on purpose.

## Rules these demos follow

1. Every important check is a clear yes/no test.
2. Real tests (not the model’s opinion) decide if work is good enough.
3. The same mistake is only allowed twice before the system changes approach.
4. Every failure is written down so later steps can learn.
5. The team layout only changes after a safety gate says the change is safe.

## Where the files live

```
artifacts/gxp-harness/   (or harness/executable/ in this repo)
├── pure_gxp/          # basic loop
├── hybrid/            # loop + self-check
├── memory/            # save and reuse mistakes
├── graph/             # teams of nodes + layout changes
├── tests/             # unit tests
├── logs/              # written records of runs
└── run_comparison.py  # side-by-side demo
```

## Tips

- You can run any command more than once. Each run writes new records into `logs/`.
- The demos do not need the internet or an API key.
- To use these loops with a real language model later, replace the small `act` functions with real model calls. The checking and memory parts stay the same.

Start with the simple loop. Then work your way up.
