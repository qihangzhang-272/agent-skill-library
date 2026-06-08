# Docs Index

`docs/` 保存技能库的治理文档、工作流、板块资料和调用链说明。它不保存完整技能包；正式技能包放在 `skills/`，机器可读索引放在 `catalog/`，板块入口放在 `sections/`。

## 目录结构

| 目录 | 用途 | 当前文件 |
| --- | --- | --- |
| `governance/` | 仓库级原则、架构边界、引用策略 | `README.md`、`architecture.md`、`reference-policy.md` |
| `workflows/` | 可重复执行的收录、审查、Linear 协作流程和跨板块调用链 | `README.md`、`linear-workflow.md`、`investment-product-to-research-report.md`、`prd-to-frontend.md` |
| `sections/` | 各业务/能力板块自己的来源清单、调用链、prompt 索引 | `README.md`、`frontend-design/` |

## 放置规则

- 仓库级原则放 `docs/governance/`，例如“框架不复制进技能”“何时允许 vendored 外部包”。
- 操作流程放 `docs/workflows/`，例如 Linear 管理、技能收录、审查和同步流程。
- 某个板块自己的资料放 `docs/sections/<section>/`，例如前端设计的候选来源、网页 prompt 索引和 UI 调用链。
- 临时实验、网页运行结果和人工评审记录不放正式 `docs/`，默认放 `local-experiments/`。

## 当前入口

- [governance/architecture.md](governance/architecture.md)：技能库架构和分层。
- [governance/project-purpose.md](governance/project-purpose.md)：仓库目的、边界和运行库定位。
- [governance/reference-policy.md](governance/reference-policy.md)：引用式技能库规则和外部包迁移例外。
- [workflows/linear-workflow.md](workflows/linear-workflow.md)：Linear 项目和 Issue 工作流。
- [workflows/investment-product-to-research-report.md](workflows/investment-product-to-research-report.md)：投资 / 产品问题到研报的调用链。
- [workflows/prd-to-frontend.md](workflows/prd-to-frontend.md)：PRD 到前端实现的调用链。
- [sections/README.md](sections/README.md)：板块文档放置规则。
- [sections/frontend-design/sources.md](sections/frontend-design/sources.md)：前端设计候选来源和收录结果。
- [sections/frontend-design/ui-call-chain.md](sections/frontend-design/ui-call-chain.md)：前端 UI 规划和开发调用链。
- [sections/frontend-design/prompt-index.md](sections/frontend-design/prompt-index.md)：前端网页 prompt 索引。

## 后续扩展

新增板块文档时按 `docs/sections/<section>/` 扩展，例如：

- `docs/sections/investment/`
- `docs/sections/product/`
- `docs/sections/technology/`
- `docs/sections/development-paradigms/`
- `docs/sections/operations/`
