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
- Load and follow each underlying skill before executing its node.
- Each node must state: input, skill/source used, output, and whether the next node can proceed.
- Publishing or deployment requires an explicit environment check before claiming success.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Turning every old workflow doc into a skill | Only these three proven workflows are active. |
| Re-vendoring external skills | Keep external repos in `qihang-skill-index`. |
| Skipping writing style before md2wechat | `md2wechat` formats and publishes; it does not create Qihang-style writing. |
| Jumping from product analysis straight to code | First turn product judgment into frontend brief and design source choice. |
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
