# Agent Skill Library

这是 Penn 的私有高质量技能库，用来收集、分类和维护可复用的 Agent skills。

本仓库采用“引用式技能库”架构：

- 技能仓库只保存分类、索引、执行边界、维护规则和必要的轻量技能卡片。
- 框架理论继续保存在来源知识库，例如 `product-hunter/03_Resources/Frameworks/`。
- 技能只写执行逻辑和引用路径，不复制框架正文，避免“框架更新了但技能没同步”。
- 对于明确要完整迁移、且允许复用的外部技能，可以作为独立 skill 包 vendored 进 `skills/`。

## 分类

| 板块 | 用途 |
| --- | --- |
| `sections/investment/` | VC、投资评估、融资判断、IC 论述、DD 问题 |
| `sections/product/` | 产品分析、案例研究、用户/场景/商业模式判断 |
| `sections/technology/` | 技术架构、AI 基础设施、工程可行性 |
| `sections/development-paradigms/` | AI Agent Native 开发范式、TDD、review、调试 |
| `sections/operations/` | 自动化、工作流、知识库同步、投稿与治理 |

## 当前种子技能

| 技能 | 板块 | 来源 | 状态 |
| --- | --- | --- | --- |
| `oss-investment-scorecard` | investment | `skills/oss-investment-scorecard/` | 已从 `lucy-cxy/oss-investment-scorecard` 完整迁移 |
| `ai-product-analyzer` | product | `skills/ai-product-analyzer/` | 已从 `product-hunter/.claude/skills/` 迁移为自包含技能包 |

## 维护规则

1. 新增技能前先判断它属于哪个板块。
2. 如果技能依赖已有理论框架，只在技能卡片里写引用路径。
3. 框架正文只在来源框架文件维护。
4. 每次收录都更新 `catalog/skills.yml`。
5. Linear 项目用于跟踪收录、审查、去重和重构任务。

## 重要边界

`oss-investment-scorecard` 已经作为单独 skill 包放在本仓库中，替代之前临时整理的 `vc-investment-evaluator`。

`product-hunter/03_Resources/Frameworks/AI产品分析框架.md` 仍作为本地产品研究框架源，不再和这个外部 VC 评分技能混写。

`ai-product-analyzer` 是明确需要跨环境复用的例外：它随包携带必要 `references/`，迁移后不依赖 `product-hunter` 的 Obsidian 路径或 wikilink。
