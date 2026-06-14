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
| `product-analysis` | 产品分析、产品可视化、前端 brief、投资判断、研报、OSS investment | `topic-research-deposition` when facts are missing -> `ai-product-analyzer` -> investment lens when needed -> presentation surface when needed | 产品判断、投资判断，以及自然承接的文字 memo、可视化研报页、前端 brief 或 DD 材料 |

## Execution Rules

- Only these workflows are active unless Qihang explicitly adds another one.
- Do not insert `ai-product-analyzer` into the writing/publishing chain unless Qihang explicitly asks for product analysis.
- Do not treat `md2wechat`, `frontend-design`, or `oss-investment-scorecard` as local skills. Resolve them through `qihang-skill-index` repo-root sources.
- `product-analysis` has two dimensions: analysis path and presentation surface. They are not mutually exclusive modes.
- `product-frontend-design` means product analysis with `frontend-brief` or `visual-report` presentation surface.
- `product-investment-report` means product analysis with `investment-lens`, then choose the surface implied by the user wording.
- Any search or fact collection uses `topic-research-deposition` with `agent-reach` as the default reach layer. Do not turn a platform list into a required command sequence.
- Load and follow each underlying skill before executing its node.
- Each node must state: input, skill/source used, output, and whether the next node can proceed.
- Publishing or deployment requires an explicit environment check before claiming success.

## Product Analysis Taxonomy

Do not collapse product judgment, investment judgment, and visual output into one flat mode list.

Select in this order:

1. Analysis path: what kind of judgment is needed.
2. Presentation surface: how the judgment should be delivered.

### Analysis Path

| Path | Use when | Required output |
| --- | --- | --- |
| `product-core` | 只需要产品判断、BP 逻辑、叙事、用户场景、商业模式 | Verdict, strongest argument, weakest gap, product成立性 |
| `investment-lens` | 用户说投资、研报、IC、DD、watch triggers、是否值得投、是否值得跟踪 | `product-core` plus investment thesis, risks, DD priorities, watch triggers |
| `oss-investment-lens` | 对象是开源 AI 项目、开源公司、AI 基础设施，或用户明确要 OSS/VC 评分 | `investment-lens` plus `oss-investment-scorecard` from `qihang-skill-index` when applicable |

### Presentation Surface

| Surface | Use when | Default artifact |
| --- | --- | --- |
| `text-memo` | 用户只要文字判断、case note、IC memo、DD 问题树 | Markdown memo |
| `visual-report` | 用户说可视化、HTML、研报页、看板、页面、图文研报，或中文里说“产品投资分析研报”但没有明确排除可视化 | Single-file static HTML report by default |
| `frontend-brief` | 用户要继续做前端实现、设计稿、页面任务拆解 | Frontend brief and implementation plan |
| `interactive-dashboard` | 用户明确需要筛选、交互、动态数据、dashboard app | Dashboard spec or app plan after confirmation |

Default interpretation:

- "产品投资分析研报" = `product-core` -> `investment-lens` -> `visual-report`.
- "OSS investment 研报 / 开源项目投资分析" = `product-core` -> `oss-investment-lens` -> `visual-report` unless Qihang asks only for memo.
- "IC memo / DD 问题树 / watch triggers" = `investment-lens` -> `text-memo` unless Qihang asks for visualization.
- "产品分析后做前端设计" = `product-core` -> `frontend-brief`; add `visual-report` only if the target is a report page.

### visual-report surface

Use when product or investment judgment needs to become a readable HTML report page, visual research page, or frontend-facing report brief.

Required flow:

```text
product input -> fact collection -> ai-product-analyzer -> investment lens if needed -> narrative hierarchy -> visual report information architecture -> primary frontend source -> static HTML or brief -> browser acceptance
```

Minimum handoff:

- Analysis path and presentation surface.
- Product judgment to preserve: verdict, strongest argument, weakest gap, suggested narrative line.
- Investment judgment to preserve when present: thesis, key score, main upside, main risk, DD priorities, watch triggers.
- Page type and first-screen information. First screen should show object, verdict, core tension, and the highest-signal facts.
- Primary frontend source from `qihang-skill-index`, plus rejected sources and upgrade trigger.
- For a product visual report, default artifact is a static HTML / visual report brief. Do not default to an app scaffold.
- Component system default: existing project system first. If there is no target project, use static HTML/CSS for report pages; use shadcn/ui + Tailwind only for dashboards, agent workspaces, or confirmed React implementation.
- Ant Design is only for dense enterprise data unless the project already uses MUI.
- Visual experience principles: modern, calm, information-dense, not old enterprise-table style unless data demands it.
- Layout principle: all-expanded by default. Do not hide core report content inside accordions, nested cards, or stacked collapsible blocks.
- Structure by natural argument logic, not by tool names or internal taxonomy. Preferred order: verdict -> fact card -> product mechanism -> investment judgment -> risks and DD -> watch triggers -> sources.
- Avoid card piles. Use full-width sections, comparison bands, score strips, timelines, matrices, and diagrams when they express logic better than another card.
- Acceptance checks: first screen expresses the right object, mobile works, text does not overflow, loading/empty/error states exist, core action works, browser screenshot is reviewed.

### investment-lens and oss-investment-lens

Use when product judgment needs to become an investment memo, research report, IC memo, case note, or DD question tree.

Required flow:

```text
research object -> scope question -> fact collection -> ai-product-analyzer -> investment judgment -> report structure -> DD questions -> watch triggers
```

Minimum handoff:

- Research object, object type, core question, target output, known materials, missing materials.
- If facts are missing, run `topic-research-deposition` in `product-research` or `investment-research` mode before `ai-product-analyzer`.
- Separate facts from judgment; current facts about financing, customers, GitHub data, pricing, team, and competitors must be checked when relevant.
- Use `ai-product-analyzer` for BP logic, product成立性, business model, narrative, traction, team, and strongest / weakest points.
- Use `qihang-skill-index` for `oss-investment-scorecard` only when the object is open source, AI infrastructure, an open-source company, or the user asks for VC-style investment scoring.
- Do not force open-source scorecards onto non-open-source products; use an investment question tree instead.
- Final output must include verdict, thesis, fact card, product judgment, investment judgment, DD priorities, uncertainty, and watch triggers.
- If the presentation surface is `visual-report`, include those investment elements visually. Do not downgrade to pure text just because investment judgment is present.

## Product Frontend Source Choice

After choosing analysis path and presentation surface, pick exactly one primary source:

| Output type | Primary source | Upgrade only when |
| --- | --- | --- |
| Product visual report / memo | TypeUI | Dense tables, filters, or enterprise states require Ant Design; existing MUI projects keep MUI; generic visuals need Taste or Impeccable as critique only |
| SaaS dashboard / agent workspace | shadcn/ui + Tailwind | Enterprise data complexity requires Ant Design; motion is allowed only for state clarity |
| Landing page | Awesome Design Skills | Magic UI is only for local polish, not the page system |
| Generic creative frontend | Anthropic `frontend-design` | Use only when the output is not a report, dashboard, or enterprise product surface |

The handoff must state:

```text
Analysis path:
Presentation surface:
Primary frontend source:
Reason:
Rejected sources:
Upgrade trigger:
```

If a selected source is only present in `qihang-skill-index`, say it is an indexed external source. Do not claim its rules were applied unless you actually read or installed the upstream source.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only the listed active workflows and current taxonomy are active. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index`. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Treating Twitter, Reddit, Exa, or WeChat as the workflow itself | They are `agent-reach` surfaces inside `topic-research-deposition`, not default workflow nodes. |
| Jumping from product analysis straight to code | First turn product judgment into frontend brief and design source choice. |
| Turning frontend references into a long chain | Pick one primary source from `qihang-skill-index`; use at most one critique source when a specific gap appears. |
| Treating visual report, investment report, and product analysis as competing modes | Choose analysis path first, then presentation surface. Product investment visual report is a normal chain. |
| Hiding a report inside collapsed UI | Keep report content all-expanded unless interaction is explicitly requested. |
| Organizing report sections by internal skill taxonomy | Organize by natural argument logic: verdict, facts, mechanism, investment, risks, DD, triggers, sources. |
| Treating TypeUI as loaded context just because it is indexed | Read or install the upstream source first, or state that only the index entry was used. |
| Creating a Next.js project too early | Ask Qihang to confirm implementation and target directory before scaffolding. |

## Handoff Template

```text
Workflow:
Analysis path:
Presentation surface:
Input:
Required chain:
Node 1 input/output:
Node 2 input/output:
External source from qihang-skill-index:
Final artifact:
Verification:
```
