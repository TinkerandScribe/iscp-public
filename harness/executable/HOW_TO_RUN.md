# How to run the ISCP harnesses

## Status

This folder holds `experience_store.py`, a small Experience Memory writer, and the notes from our first runnable harness (impl-001). The full Python demos described in earlier notes (`pure_gxp`, `hybrid`, `graph`, `run_comparison.py`, `tests`) **aren't included in this repo**. For runnable code today, use [`harness/iscp-research`](../iscp-research/) (`npm install && npm test`), or the Python loop in [GXP](https://github.com/TinkerandScribe/gxp).

The design notes for the loops live one folder up: [`pure_gxp_loop.md`](../pure_gxp_loop.md), [`hybrid_verification_node.md`](../hybrid_verification_node.md), [`multi_agent_topology.md`](../multi_agent_topology.md), [`self_modifying_graph.md`](../self_modifying_graph.md).

## Rules the harnesses follow

1. Every important check is a clear yes/no test.
2. Real tests (not the model's opinion) decide if work is good enough.
3. The same mistake is only allowed twice before the system changes approach.
4. Every failure is written down so later steps can learn.
5. The team layout only changes after a safety gate says the change is safe.
