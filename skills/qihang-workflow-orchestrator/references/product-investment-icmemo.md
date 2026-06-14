# Product -> Investment IC Memo

Use when the user asks whether an AI product, AI company, open-source AI project, infrastructure layer, or case is worth investing in, tracking, passing, or turning into an IC memo / investment memo / visual research report.

This is the only investment workflow route. Do not call a separate investment orchestrator. `agent-investment` contains investment node skills, not another router.

## Chain

```text
research object
-> fact pack
-> qihang-investment-research
-> qihang-ai-product-judgment
-> qihang-competitive-landscape
-> qihang-unit-economics
-> qihang-investment-scorecard
-> qihang-valuation-returns
-> qihang-investment-dd
-> qihang-thesis-tracking
-> qihang-ic-memo-writer
-> optional visual report
```

## Execution Rules

- Do not write the IC memo before facts are collected.
- Do not add or keep a domain-specific investment orchestrator. Put investment workflow sequencing here and keep detailed methods inside each node's references.
- Do not search during `qihang-ic-memo-writer`; search belongs in research/fact-pack nodes.
- Do not load all investment references in one step. Each node reads only its own `SKILL.md` and relevant references.
- Do not call old `oss-investment-scorecard` directly. It is a reference inside `qihang-investment-scorecard`.
- Do not skip competitive landscape. Every IC memo needs a market and competitor view, even if concise.
- If a previous node already produced a result, reuse it. Do not rerun the node unless facts changed.
- If product成立性 fails badly, still produce a short DD and pass rationale instead of forcing a full memo.
- If valuation data is unavailable, mark valuation as scenario logic / not enough data, not as zero.

## Node Output Contract

Each node returns:

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

## Visual Report Rule

If the user asks for HTML / 页面 / 可视化, visualize the completed IC memo. Do not rewrite or delete memo content.

Frontend must be modern, all-expanded, non-stacked, and organized by the memo's natural order:

```text
product judgment
-> investment judgment
-> IC memo
-> DD
-> watch triggers
-> sources / gaps
```

## Stop Points

- Stop after research if facts are missing and cannot be responsibly inferred.
- Stop after product judgment if the user only asked for product analysis.
- Stop after IC memo if the user did not ask for visual report.

## Minimum Handoff

```text
Research object:
Fact pack:
Product judgment:
Competitive landscape:
Unit economics:
Investment scorecard:
Valuation / returns:
DD priorities:
Thesis tracking:
IC memo:
Visual report, if requested:
Verification:
```
