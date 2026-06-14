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
- Do not treat `md2wechat` or external frontend design sources as local skills. Resolve them through `qihang-skill-index` repo-root sources.
- Treat `oss-investment-scorecard` as a promoted local skill package. Load it directly after `ai-product-analyzer` in the product-analysis chain.
- Default product-investment chain: AI-native product view -> OSS investment structure -> visualization.
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
- Primary frontend source from `qihang-skill-index`, plus rejected sources and upgrade trigger.
- For a product visual report, default artifact is a static HTML / visual report brief. Do not default to an app scaffold.
- Component system default: existing project system first. If there is no target project, use static HTML/CSS for report pages; use shadcn/ui + Tailwind only for dashboards, agent workspaces, or confirmed React implementation.
- Ant Design is only for dense enterprise data unless the project already uses MUI.
- Visual experience principles: modern, calm, information-dense, not old enterprise-table style unless data demands it.
- Layout principle: all-expanded by default. Do not hide core report content inside accordions, nested cards, or stacked collapsible blocks.
- Structure follows the upstream report. Do not impose a fixed section order from this workflow.
- Avoid card piles. Use full-width sections, comparison bands, score strips, timelines, matrices, and diagrams when they express logic better than another card.
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

## Product Frontend Source Choice

When visualization is needed, pick exactly one primary frontend source:

| Output type | Primary source | Upgrade only when |
| --- | --- | --- |
| Product visual report / memo | TypeUI | Dense tables, filters, or enterprise states require Ant Design; existing MUI projects keep MUI; generic visuals need Taste or Impeccable as critique only |
| SaaS dashboard / agent workspace | shadcn/ui + Tailwind | Enterprise data complexity requires Ant Design; motion is allowed only for state clarity |
| Landing page | Awesome Design Skills | Magic UI is only for local polish, not the page system |
| Generic creative frontend | Anthropic `frontend-design` | Use only when the output is not a report, dashboard, or enterprise product surface |

The handoff must state:

```text
Product/investment chain:
Report structure source:
Primary frontend source:
Reason:
Rejected sources:
Upgrade trigger:
```

If a selected source is only present in `qihang-skill-index`, say it is an indexed external source. Do not claim its rules were applied unless you actually read or installed the upstream source.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only the listed active workflows and current chain are active. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index`. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Treating Twitter, Reddit, Exa, or WeChat as the workflow itself | They are `agent-reach` surfaces inside `topic-research-deposition`, not default workflow nodes. |
| Jumping from product analysis straight to code | First turn product judgment into frontend brief and design source choice. |
| Turning frontend references into a long chain | Pick one primary source from `qihang-skill-index`; use at most one critique source when a specific gap appears. |
| Treating visual report, investment report, and product analysis as competing modes | Use the default chain: AI-native product view -> OSS investment structure -> visualization. |
| Hiding a report inside collapsed UI | Keep report content all-expanded unless interaction is explicitly requested. |
| Inventing report structure inside the orchestrator | Product perspective comes from `ai-product-analyzer`; structure comes from `oss-investment-scorecard`. |
| Treating TypeUI as loaded context just because it is indexed | Read or install the upstream source first, or state that only the index entry was used. |
| Creating a Next.js project too early | Ask Qihang to confirm implementation and target directory before scaffolding. |

## Handoff Template

```text
Workflow:
Product/investment chain:
Report structure source:
Input:
Required chain:
Node 1 input/output:
Node 2 input/output:
External or promoted source:
Final artifact:
Verification:
```
