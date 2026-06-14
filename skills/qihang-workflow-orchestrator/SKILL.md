---
name: qihang-workflow-orchestrator
description: Use when Qihang asks to run, package, choose, or maintain a proven workflow such as topic-to-WeChat publishing, product-to-frontend design, or product-to-investment research.
---

# Qihang Workflow Orchestrator

This skill routes Qihang's proven workflows. It is a workflow entry point, not a replacement for the underlying skills.

## Workflows

| Workflow | Trigger | Chain | Final Output |
| --- | --- | --- | --- |
| `topic-writing-md2wechat` | 公众号选题、写文章、排版、推草稿箱 | `topic-research-deposition` -> `qihang-writing-style` -> `qihang-skill-index` for `md2wechat` | 已排版公众号文稿、图片/封面处理记录、草稿箱状态 |
| `product-frontend-design` | 产品分析后做前端、PRD 到页面、产品到设计实现 | `ai-product-analyzer` -> `qihang-skill-index` for frontend design sources | 产品判断、前端 brief、设计来源选择、实现/验收计划 |
| `product-investment-report` | 投资判断、研报、IC memo、DD 问题树、case memo | `ai-product-analyzer` -> `qihang-skill-index` for `oss-investment-scorecard` when needed | 产品判断、投资判断、研报结构、DD 问题树、跟踪触发器 |

## Execution Rules

- Only these three workflows are active unless Qihang explicitly adds another one.
- Do not insert `ai-product-analyzer` into the writing/publishing chain unless Qihang explicitly asks for product analysis.
- Do not treat `md2wechat`, `frontend-design`, or `oss-investment-scorecard` as local skills. Resolve them through `qihang-skill-index` repo-root sources.
- For `product-frontend-design`, choose one primary frontend source from `qihang-skill-index`; do not chain multiple frontend sources as workflow nodes.
- Load and follow each underlying skill before executing its node.
- Each node must state: input, skill/source used, output, and whether the next node can proceed.
- Publishing or deployment requires an explicit environment check before claiming success.

## Workflow Execution Notes

### product-frontend-design

Use when product judgment needs to become a PRD, visual report, dashboard, agent workspace, or frontend implementation brief.

Required flow:

```text
product input -> ai-product-analyzer -> page type -> primary frontend source -> information architecture -> component system -> implementation tasks -> browser acceptance
```

Minimum handoff:

- User role, business action, core page, key states, required data, external dependencies.
- Product judgment to preserve: verdict, strongest argument, weakest gap, suggested narrative line.
- Page type and first-screen information.
- Primary frontend source from `qihang-skill-index`, plus rejected sources and upgrade trigger.
- Component system default: existing project system first; otherwise shadcn/ui + Tailwind; Ant Design only for dense enterprise data unless the project already uses MUI.
- Acceptance checks: first screen expresses the right object, mobile works, text does not overflow, loading/empty/error states exist, core action works, browser screenshot is reviewed.

### product-investment-report

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
Primary frontend source:
Reason:
Rejected sources:
Upgrade trigger:
```

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only these three proven workflows are active. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index`. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Jumping from product analysis straight to code | First turn product judgment into frontend brief and design source choice. |
| Turning frontend references into a long chain | Pick one primary source from `qihang-skill-index`; use at most one critique source when a specific gap appears. |
| Treating investment report as frontend workflow | Keep `product-investment-report` independent from `product-frontend-design`. |

## Handoff Template

```text
Workflow:
Input:
Required chain:
Node 1 input/output:
Node 2 input/output:
External source from qihang-skill-index:
Final artifact:
Verification:
```
