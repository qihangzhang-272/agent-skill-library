---
name: qihang-workflow-orchestrator
description: Use when Qihang asks to run, package, choose, or maintain a proven workflow such as topic-to-WeChat publishing, product-to-frontend, or product-to-investment IC memo / visual research report. This is the cross-package router for agent-writing, agent-product, agent-investment, and qihang-skill-pack.
---

# Qihang Workflow Orchestrator

Route proven workflows. Do not replace the underlying skills.

This skill decides which package should run and in what order. It should keep the chain simple and avoid inventing new report logic.

## Active Workflows

| Workflow | Trigger | Chain | Final Output |
| --- | --- | --- | --- |
| `topic-writing-md2wechat` | 公众号选题、写文章、排版、推草稿箱 | `topic-research-deposition` -> `qihang-writing-style` -> `qihang-skill-index` for `md2wechat` | 公众号文稿、图片/封面处理记录、草稿箱状态 |
| `product-frontend-design` | 产品洞察后做前端 brief、页面、原型或浏览器验收 | `ai-product-analyzer` -> frontend self-generation / target project implementation | 产品洞察、前端 brief、页面或实现计划 |
| `product-investment-icmemo` | 产品投资分析、AI case 是否值得投、IC memo、研报、可视化研报 | fact pack -> `qihang-ai-investment-orchestrator` -> `qihang-ic-memo-writer` -> optional visual report | AI 投资 IC Memo、DD 问题树、watch triggers、可选可视化研报页 |

## Execution Rules

- Keep packages separate: `agent-product` answers product judgment, `agent-investment` answers investability and IC memo, `agent-writing` answers article writing and publishing.
- If the request is investment-oriented, enter `agent-investment`; do not call old `oss-investment-scorecard` directly.
- If facts are missing, collect them before investment judgment. Use `topic-research-deposition` / agent-reach for broad web reach, then hand facts to `qihang-investment-research`.
- Do not search during final IC memo writing. Search belongs before the memo writer.
- Do not ask Qihang to choose product-analysis modes when the wording already implies the chain.
- Do not classify product, investment, report, and visualization as competing modes. They are sequential layers.
- Load and follow each underlying skill before executing its node.
- Each node must state: input, skill/source used, output, and whether the next node can proceed.
- Publishing or deployment requires an explicit environment check before claiming success.

## Product Investment Chain

Default chain:

```text
research object
-> fact pack
-> AI-native product judgment
-> competitive landscape
-> unit economics
-> investment scorecard
-> valuation / return logic
-> DD priorities
-> thesis tracking
-> IC memo
-> optional visual report
```

Concrete skill routing:

```text
topic-research-deposition when facts are missing
-> qihang-investment-research
-> qihang-ai-investment-orchestrator
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

Default interpretation:

- "产品投资分析研报" means product judgment + investment judgment + IC memo, with optional visual report if the user asks for HTML / 页面 / 可视化.
- "这个 AI case 值不值得投" means run enough of `agent-investment` to produce verdict, risks, DD, and tracking triggers.
- "只要产品分析" stops at `ai-product-analyzer` or `qihang-ai-product-judgment`.
- "只要前端 brief" stops in `product-frontend-design`; do not run investment nodes.
- "IC memo" can use banking / research / OSS investment references inside `qihang-ic-memo-writer`, but the output remains one coherent memo.

## Visual Report Frontend Constitution

When a completed IC memo or investment report needs a visual page, generate the frontend directly. Do not add a frontend-skill selection layer.

Required rules:

- Preserve all upstream report content. Frontend work may visualize, group, order, and emphasize content, but must not delete, omit, compress away, or rewrite substantive findings, evidence, DD questions, watch triggers, assumptions, source gaps, or risk notes.
- Preserve the memo's natural order: product judgment -> investment judgment -> IC memo -> visual explanation.
- First screen must show object, verdict, decision state, and the highest-signal facts.
- Keep the page modern, calm, information-dense, and report-like. Do not make it a marketing landing page.
- Keep core report content all-expanded. Do not hide key analysis inside accordions, tabs, nested cards, or collapsed blocks.
- Avoid card piles. Prefer full-width sections, score strips, comparison bands, matrices, timelines, tables, and simple logic diagrams.
- Separate facts, judgments, assumptions, DD priorities, watch triggers, and source gaps visually.
- Use stable responsive dimensions; text must not overflow on desktop or mobile.
- If there is no target project, use one static HTML/CSS file. Use an existing project stack only when a target project is provided.
- Browser-check the result before calling it done; review at least one desktop and one mobile viewport.

The handoff must state:

```text
Workflow:
Product/investment chain:
Report source:
Frontend approach:
Frontend constitution:
Verification:
```

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only active workflows above are default routes. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index` unless they are explicitly promoted into a package. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Treating Twitter, Reddit, Exa, or WeChat as default workflow nodes | They are agent-reach surfaces inside research, not separate required nodes. |
| Calling old `oss-investment-scorecard` directly | Use `qihang-investment-scorecard` inside `agent-investment`; old OSS content is reference material. |
| Treating product, investment, report, and visualization as competing modes | Run them as a chain when the user asks for a product investment report. |
| Dropping memo content during frontend generation | Keep all upstream report content; visualization can reorganize it but cannot remove it. |
| Creating a Next.js project too early | Ask Qihang to confirm implementation and target directory before scaffolding. |

## Handoff Template

```text
Workflow:
Input:
Required chain:
Node outputs:
References loaded:
Final artifact:
Verification:
```
