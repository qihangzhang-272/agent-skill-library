---
name: qihang-ai-investment-orchestrator
description: Route Qihang's AI investment workflow from fact pack to IC memo. Use when Qihang asks whether an AI product, AI company, open-source AI project, infrastructure layer, or case is worth investing in, tracking, passing, or turning into an IC memo / investment memo / visual research report. This skill coordinates the agent-investment package without loading all references at once.
---

# Qihang AI Investment Orchestrator

This is the entry point for the `agent-investment` package.

It routes the work. It does not replace the underlying skills and must not load every reference at once.

## Default Chain

```text
fact pack
-> qihang-ai-product-judgment
-> qihang-competitive-landscape
-> qihang-unit-economics
-> qihang-investment-scorecard
-> qihang-valuation-returns
-> qihang-investment-dd
-> qihang-thesis-tracking
-> qihang-ic-memo-writer
```

## Execution Rules

- Do not write the IC memo before facts are collected.
- Do not search during the IC memo writing stage.
- Do not load all investment references in one step.
- Do not treat the old `oss-investment-scorecard` as the final output format. Use it through `qihang-investment-scorecard`.
- Do not skip competitive landscape. Every IC memo needs a market and competitor view, even if concise.
- Each node must output a structured handoff that the next node can consume.
- If a previous node already produced a result, reuse it. Do not rerun the node unless facts changed.

## Node Outputs

Each node should return:

```text
Node:
Inputs used:
References loaded:
Facts:
Judgments:
Assumptions:
Unknowns:
Next-node handoff:
```

## Stop Points

- If facts are missing, stop after `qihang-investment-research` and ask for or collect sources.
- If product成立性 fails badly, still produce a short DD and pass rationale instead of forcing a full memo.
- If valuation data is unavailable, mark valuation as scenario logic / not enough data, not as zero.
- Final output defaults to IC Memo unless Qihang explicitly asks for only scorecard, DD list, or visual report.
