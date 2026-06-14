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
| `product-analysis` | 产品分析、产品可视化、前端 brief、投资判断、研报、OSS investment | `ai-product-analyzer` -> `qihang-skill-index` only for the selected output mode | 产品判断，以及对应模式的可视化 brief、前端实现计划、投资研报、DD 问题树或 OSS investment 评分 |

## Execution Rules

- Only these workflows are active unless Qihang explicitly adds another one.
- Do not insert `ai-product-analyzer` into the writing/publishing chain unless Qihang explicitly asks for product analysis.
- Do not treat `md2wechat`, `frontend-design`, or `oss-investment-scorecard` as local skills. Resolve them through `qihang-skill-index` repo-root sources.
- `product-frontend-design` and `product-investment-report` are output modes inside `product-analysis`, not separate workflows.
- In `product-analysis`, choose one output mode before adding frontend or investment context.
- Load and follow each underlying skill before executing its node.
- Each node must state: input, skill/source used, output, and whether the next node can proceed.
- Publishing or deployment requires an explicit environment check before claiming success.

## Product Analysis Modes

After `ai-product-analyzer`, choose exactly one mode unless Qihang explicitly asks for multiple outputs.

| Mode | Use when | Add-on source | Hard boundary |
| --- | --- | --- | --- |
| `analysis-only` | 只需要产品判断、BP 逻辑、叙事和商业模式分析 | none | Do not add frontend, DD, or investment scorecard |
| `visual-report` | 要把产品分析承接成可读 HTML、研报页、静态可视化页面或前端 brief | frontend source from `qihang-skill-index` | Do not create a Next.js/shadcn project until Qihang confirms implementation and target directory |
| `investment-report` | 要研报、IC memo、case note、DD 问题树、watch triggers | `oss-investment-scorecard` only when applicable | Do not leak `InvestmentScorecard`, DD, or watch triggers into visual frontend mode |
| `oss-investment` | 对象是开源 AI 项目、开源公司、AI 基础设施，或用户明确要 VC / OSS 投资评分 | `oss-investment-scorecard` | This is an add-on to product analysis, not a separate workflow |

If the user says `product-frontend-design`, treat it as `product-analysis` with mode `visual-report`.

If the user says `product-investment-report`, treat it as `product-analysis` with mode `investment-report`.

### visual-report mode

Use when product judgment needs to become a PRD, visual report, dashboard, agent workspace, or frontend implementation brief.

Required flow:

```text
product input -> ai-product-analyzer -> page type -> primary frontend source -> information architecture -> component system -> optional implementation tasks -> browser acceptance
```

Minimum handoff:

- User role, business action, core page, key states, required data, external dependencies.
- Product judgment to preserve: verdict, strongest argument, weakest gap, suggested narrative line.
- Page type and first-screen information.
- Primary frontend source from `qihang-skill-index`, plus rejected sources and upgrade trigger.
- For a product visual report, default artifact is a static HTML / visual report brief. Do not default to an app scaffold.
- Component system default: existing project system first. If there is no target project, use static HTML/CSS for report pages; use shadcn/ui + Tailwind only for dashboards, agent workspaces, or confirmed React implementation.
- Ant Design is only for dense enterprise data unless the project already uses MUI.
- Acceptance checks: first screen expresses the right object, mobile works, text does not overflow, loading/empty/error states exist, core action works, browser screenshot is reviewed.

### investment-report and oss-investment modes

Use when product judgment needs to become an investment memo, research report, IC memo, case note, or DD question tree.

Required flow:

```text
research object -> scope question -> fact collection -> ai-product-analyzer -> investment judgment -> report structure -> DD questions -> watch triggers
```

Minimum handoff:

- Research object, object type, core question, target output, known materials, missing materials.
- Separate facts from judgment; current facts about financing, customers, GitHub data, pricing, team, and competitors must be checked when relevant.
- Use `ai-product-analyzer` for BP logic, product成立性, business model, narrative, traction, team, and strongest / weakest points.
- Use `qihang-skill-index` for `oss-investment-scorecard` only when the object is open source, AI infrastructure, an open-source company, or the user asks for VC-style investment scoring.
- Do not force open-source scorecards onto non-open-source products; use an investment question tree instead.
- Final output must include verdict, thesis, fact card, product judgment, investment judgment, DD priorities, uncertainty, and watch triggers.

## Product Frontend Source Choice

After `ai-product-analyzer`, pick exactly one primary source:

| Output type | Primary source | Upgrade only when |
| --- | --- | --- |
| Product visual report / memo | TypeUI | Dense tables, filters, or enterprise states require Ant Design; existing MUI projects keep MUI; generic visuals need Taste or Impeccable as critique only |
| SaaS dashboard / agent workspace | shadcn/ui + Tailwind | Enterprise data complexity requires Ant Design; motion is allowed only for state clarity |
| Landing page | Awesome Design Skills | Magic UI is only for local polish, not the page system |
| Generic creative frontend | Anthropic `frontend-design` | Use only when the output is not a report, dashboard, or enterprise product surface |

The handoff must state:

```text
Product analysis mode:
Primary frontend source:
Reason:
Rejected sources:
Upgrade trigger:
```

If a selected source is only present in `qihang-skill-index`, say it is an indexed external source. Do not claim its rules were applied unless you actually read or installed the upstream source.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only the listed active workflows and modes are active. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index`. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Jumping from product analysis straight to code | First turn product judgment into frontend brief and design source choice. |
| Turning frontend references into a long chain | Pick one primary source from `qihang-skill-index`; use at most one critique source when a specific gap appears. |
| Splitting product frontend and investment into competing workflows | Use one `product-analysis` workflow, then choose the output mode. |
| Letting investment context leak into visual report mode | Do not include `InvestmentScorecard`, DD priority, or watch triggers unless the selected mode is `investment-report`, `oss-investment`, or explicitly both. |
| Treating TypeUI as loaded context just because it is indexed | Read or install the upstream source first, or state that only the index entry was used. |
| Creating a Next.js project too early | Ask Qihang to confirm implementation and target directory before scaffolding. |

## Handoff Template

```text
Workflow:
Mode:
Input:
Required chain:
Node 1 input/output:
Node 2 input/output:
External source from qihang-skill-index:
Final artifact:
Verification:
```
