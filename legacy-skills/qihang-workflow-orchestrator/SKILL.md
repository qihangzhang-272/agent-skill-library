---
name: qihang-workflow-orchestrator
description: Route Qihang's proven workflows. Use when Qihang asks to run, package, choose, or maintain workflows for agent-reach research to Qihang writing to Codex/md2wechat layout, product-to-frontend, product-to-investment IC memo / visual report, or skill-library maintenance. This skill only routes; workflow details live in references.
---

# Qihang Workflow Orchestrator

Route to one workflow reference, then follow that reference.

Do not execute detailed workflow logic from this file. Do not add a second workflow orchestrator inside a package.

## Workflow Routing

| User intent | Workflow reference |
| --- | --- |
| 公众号选题、agent-reach 搜索、启航写作、Codex 排版、md2wechat 推草稿箱 | `references/topic-writing-md2wechat.md` |
| 产品洞察后做前端 brief、页面、原型、HTML 或浏览器验收 | `references/product-frontend-design.md` |
| AI case 是否值得投、产品投资分析、IC memo、DD、watch triggers、可视化研报 | `references/product-investment-icmemo.md` |
| 技能库分类、同步 GitHub、plugin 分发、catalog 维护、工作流沉淀 | `references/skill-library-maintenance.md` |

## Rules

- Read exactly one workflow reference unless the user explicitly asks to combine workflows.
- Keep the chain sequential. Do not turn product, investment, report, and visualization into competing modes.
- Keep packages separate: `agent-writing` writes and publishes, `agent-product` judges products, `agent-investment` performs investment analysis, `qihang-skill-pack` indexes and routes.
- Domain packages expose node skills only. Workflow routing stays in `qihang-workflow-orchestrator`.
- Search and source collection happen before writing or memo assembly.
- External capabilities are resolved through `qihang-skill-index` unless they have been promoted into a local package.
- Each node must state its input, skill/source used, output, and whether the next node can proceed.

## Handoff

```text
Workflow:
Reference loaded:
Input:
Required chain:
Node outputs:
Final artifact:
Verification:
```
