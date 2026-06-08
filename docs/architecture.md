# 技能库架构

## 核心判断

技能和框架不是同一个东西。

- 框架：解释世界的理论、分类、原则、案例和判断标准。
- 技能：让 Agent 在具体任务中按流程执行、调用框架、输出结果。

如果把框架正文复制进技能，会形成双写：

1. `03_Resources/Frameworks/` 更新了；
2. `.claude/skills/` 里的旧理论没有同步；
3. 同一个商业模式判断出现两个版本；
4. Agent 运行时引用了过期版本。

所以本仓库只做技能资产管理，不做框架正文搬运。

## 分层

| 层 | 保存什么 | 不保存什么 |
| --- | --- | --- |
| `catalog/` | 技能索引、来源路径、引用关系、状态 | 长篇框架正文 |
| `sections/` | 分板块 README、技能卡片、收录优先级 | 重复的理论内容 |
| `docs/` | 收录标准、Linear 工作流、引用规则 | 某个技能的完整运行框架 |
| 来源 vault | 真正的技能实现和框架理论 | 本仓库的管理元信息 |

## 引用关系

以 `oss-investment-scorecard` 为例：

- 本仓库技能包：`skills/oss-investment-scorecard/SKILL.md`
- 上游来源：`https://github.com/lucy-cxy/oss-investment-scorecard`
- 迁移 commit：`28a210d0a194ba0f31fe59edaf413abfafa2008e`
- 原本临时整理的本地技能：`skills/vc-investment-evaluator/`，已删除
- 本地产品总框架：`product-hunter/03_Resources/Frameworks/AI产品分析框架.md`
- 本地案例输入：`product-hunter/03_Resources/Good Cases/`

本仓库把 `oss-investment-scorecard` 作为完整外部技能包迁移。它是投资板块的正式 VC/OSS 投资评估技能；本地 `AI产品分析框架.md` 仍作为产品研究框架源，不与上游技能混写。
