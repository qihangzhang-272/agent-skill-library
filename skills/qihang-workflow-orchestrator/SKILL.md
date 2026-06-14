---
name: qihang-workflow-orchestrator
description: Use when Qihang asks to run, package, choose, or maintain a proven workflow such as topic-to-WeChat publishing or product analysis that may become a visual report, frontend brief, investment memo, or OSS investment review.
---

# Qihang Workflow Orchestrator

This skill routes Qihang's proven workflows. It is a workflow entry point, not a replacement for the underlying skills.

## Workflows

| Workflow | Trigger | Chain | Final Output |
| --- | --- | --- | --- |
| `topic-writing-md2wechat` | 公众号选题、写文章、排版、推草稿箱 | `topic-research-deposition` -> `qihang-writing-style` -> `qihang-skill-index` for `md2wechat` | 已排版公众号文稿、图片/封面处理记录、草稿箱状态 |
| `product-analysis` | 产品分析、投资判断、研报、可视化研报页、前端 brief、OSS investment | `topic-research-deposition` when facts are missing -> `ai-product-analyzer` for AI-native product view -> `oss-investment-scorecard` for structure -> visualization | AI-native 产品判断、OSS investment 结构化结果、可视化研报页；明确只要文字或 brief 时才提前停下 |

## Execution Rules

- Only these workflows are active unless Qihang explicitly adds another one.
- Do not insert `ai-product-analyzer` into the writing/publishing chain unless Qihang explicitly asks for product analysis.
- Do not treat `md2wechat` as a local skill. Resolve it through `qihang-skill-index` repo-root sources.
- Treat `oss-investment-scorecard` as a promoted local skill package. Load it directly after `ai-product-analyzer` in the product-analysis chain.
- Default product-investment chain: AI-native product view -> OSS investment structure -> visualization.
- The visualization step is frontend self-generation under the constitution below, not another frontend skill orchestration step.
- Do not ask Qihang to choose a framework when the wording already implies this chain.
- Do not classify whether `oss-investment-scorecard` is "accurately applicable" before using it in this workflow. Here it is the lightweight structure layer for final output, not a gatekeeping category.
- `product-frontend-design` means product analysis -> frontend brief; add visualization only when the target is a report page.
- `product-investment-report` means AI-native product view -> OSS investment structure -> visualization, unless Qihang explicitly asks only for text.
- Any search or fact collection uses `topic-research-deposition` with `agent-reach` as the default reach layer. Do not turn a platform list into a required command sequence.
- Load and follow each underlying skill before executing its node.
- Each node must state: input, skill/source used, output, and whether the next node can proceed.
- Publishing or deployment requires an explicit environment check before claiming success.

## Product Analysis Chain

Keep the default chain simple:

```text
ai-product-analyzer -> oss-investment-scorecard -> visual report
```

Default interpretation:

- "产品投资分析研报" means `ai-product-analyzer` first, then structure the output with `oss-investment-scorecard`, then create a visual report page.
- "OSS investment 研报 / 开源项目投资分析" uses the same chain; the OSS source determines structure, not whether the workflow is allowed to proceed.
- Stop at a text memo only when Qihang explicitly says "只要文字", "只要 IC memo", "只要 DD 问题树", or "不要可视化".
- Stop at a frontend brief only when Qihang explicitly asks for frontend implementation planning rather than a report page.

Use `ai-product-analyzer` to provide Qihang's AI-native product perspective. Then load local `oss-investment-scorecard` as the lightweight structure layer for final structured and visual output. The orchestrator must not invent a report argument structure; it should preserve the product judgment and map it into the OSS investment structure.

### Visual Report

Required flow:

```text
product input -> fact collection -> ai-product-analyzer -> oss-investment-scorecard structure -> visual report page -> browser acceptance
```

Minimum handoff:

- Product judgment to preserve: verdict, strongest argument, weakest gap, suggested narrative line.
- OSS investment structure to preserve: fact sheet, macro gate when useful, scorecard table, verdict, IC thesis, DD priorities, watch triggers.
- Report structure source: `ai-product-analyzer` for product view, `oss-investment-scorecard` for output structure.
- Page type and first-screen information. First screen should show object, verdict, and the highest-signal facts from the report.
- Frontend approach: self-generate the visual report. Do not route this step through external frontend skills or `qihang-skill-index`.
- Default artifact is static HTML/CSS unless the target project already has a stack or Qihang explicitly asks for implementation in an app.
- Obey the frontend constitution below.
- Acceptance checks: first screen expresses the right object, mobile works, text does not overflow, loading/empty/error states exist, core action works, browser screenshot is reviewed.

### Investment View

Use when product judgment needs to become an investment memo, research report, IC memo, case note, DD question tree, or structured visual report.

Required flow:

```text
research object -> scope question -> fact collection -> ai-product-analyzer -> investment judgment -> report structure -> DD questions -> watch triggers
```

Minimum handoff:

- Research object, object type, core question, target output, known materials, missing materials.
- If facts are missing, run `topic-research-deposition` in `product-research` or `investment-research` mode before `ai-product-analyzer`.
- Separate facts from judgment; current facts about financing, customers, GitHub data, pricing, team, and competitors must be checked when relevant.
- Use `ai-product-analyzer` for BP logic, product成立性, business model, narrative, traction, team, and strongest / weakest points.
- Load local `oss-investment-scorecard` as the output structure source.
- Do not over-classify object type before using the structure. If a field does not fit a non-OSS product, mark it adapted or not applicable instead of blocking the workflow.
- Final output must include verdict, thesis, fact card, AI-native product judgment, OSS investment scorecard structure, DD priorities, uncertainty, and watch triggers.
- If the user asked for a report or visual report, include those investment elements in the report and visualization. Do not downgrade to pure text just because investment judgment is present.

## Visual Report Frontend Constitution

When product-analysis needs a visual report, generate the frontend directly. Do not add another skill-selection layer.

Required rules:

- Preserve the `oss-investment-scorecard` structure. Do not invent a new argument order.
- Preserve all upstream report content. Frontend work may visualize, group, order, and emphasize content, but must not delete, omit, compress away, or rewrite substantive findings, evidence, DD questions, watch triggers, assumptions, source gaps, or risk notes.
- First screen must show object, verdict, total score or decision state, and the highest-signal facts.
- Keep the page modern, calm, information-dense, and report-like. Do not make it a marketing landing page.
- Keep core report content all-expanded. Do not hide key analysis inside accordions, tabs, nested cards, or collapsed blocks.
- Avoid card piles. Prefer full-width sections, score strips, comparison bands, matrices, timelines, tables, and simple logic diagrams.
- Separate facts, judgments, assumptions, DD priorities, watch triggers, and source gaps visually.
- Use stable responsive dimensions; text must not overflow on desktop or mobile.
- If there is no target project, use one static HTML/CSS file. Use an existing project stack only when a target project is provided.
- Browser-check the result before calling it done; review at least one desktop and one mobile viewport.

The handoff must state:

```text
Product/investment chain:
Report structure source:
Frontend approach:
Frontend constitution:
Verification:
```

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only the listed active workflows and current chain are active. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index`. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Treating Twitter, Reddit, Exa, or WeChat as the workflow itself | They are `agent-reach` surfaces inside `topic-research-deposition`, not default workflow nodes. |
| Jumping from product analysis straight to code | First finish OSS investment structure, then self-generate the visual report under the frontend constitution. |
| Turning visual report generation into frontend skill orchestration | Generate the frontend directly and obey the frontend constitution. |
| Treating visual report, investment report, and product analysis as competing modes | Use the default chain: AI-native product view -> OSS investment structure -> visualization. |
| Hiding a report inside collapsed UI | Keep report content all-expanded unless interaction is explicitly requested. |
| Dropping report content during frontend generation | Keep all upstream report content; visualization can reorganize it but cannot remove it. |
| Inventing report structure inside the orchestrator | Product perspective comes from `ai-product-analyzer`; structure comes from `oss-investment-scorecard`. |
| Creating a Next.js project too early | Ask Qihang to confirm implementation and target directory before scaffolding. |

## Handoff Template

```text
Workflow:
Product/investment chain:
Report structure source:
Frontend approach:
Frontend constitution:
Input:
Required chain:
Node 1 input/output:
Node 2 input/output:
External or promoted source:
Final artifact:
Verification:
```
