# Docs Index

`docs/` 保存技能库的治理文档和可复用工作流说明。它不保存完整技能包、外部来源清单或重复分类入口。

正式技能包维护在 `plugins/<plugin>/skills/<skill>/`；外部 GitHub 技能和技能源先记录在 `plugins/skill-index/skills/qihang-skill-index/references/github-skill-index.md`，明确晋升后才进入 `plugins/*/skills/`。

## 目录结构

| 目录 | 用途 | 当前文件 |
| --- | --- | --- |
| `governance/` | 仓库级原则、架构边界、引用策略、索引规范 | `README.md`、`architecture.md`、`project-purpose.md`、`reference-policy.md`、`library-constitution.md`、`catalog-schema.md` |
| `workflows/` | 可重复执行的收录、审查、Linear 协作流程和跨技能调用链 | `README.md`、`linear-workflow.md`、`prd-to-frontend.md`、`investment-product-to-research-report.md` |

## 放置规则

- 仓库级原则放 `docs/governance/`。
- 操作流程和跨技能调用链放 `docs/workflows/`。
- 外部 repo 来源、用途和边界放 `qihang-skill-index`，不再单独维护分类文档。
- 临时实验、网页运行结果和人工评审记录不放正式 `docs/`。

## 当前入口

- [governance/architecture.md](governance/architecture.md)：技能库架构和三层 plugins 分层。
- [governance/project-purpose.md](governance/project-purpose.md)：仓库目的、边界和运行库定位。
- [governance/reference-policy.md](governance/reference-policy.md)：引用式技能库规则和外部包迁移例外。
- [governance/library-constitution.md](governance/library-constitution.md)：长期约束、收录问题、复制边界和插件分发规则。
- [governance/catalog-schema.md](governance/catalog-schema.md)：插件内技能记录方式。
- [workflows/linear-workflow.md](workflows/linear-workflow.md)：Linear 项目和 Issue 工作流。
- [workflows/prd-to-frontend.md](workflows/prd-to-frontend.md)：PRD 到前端实现的调用链。
- [workflows/investment-product-to-research-report.md](workflows/investment-product-to-research-report.md)：产品判断到投资研报的调用链。
