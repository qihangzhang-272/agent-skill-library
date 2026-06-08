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

以 `vc-investment-evaluator` 为例：

- 本仓库技能包：`skills/vc-investment-evaluator/SKILL.md`
- 本仓库评分契约：`skills/vc-investment-evaluator/references/scorecard.md`
- 本仓库手动模板：`skills/vc-investment-evaluator/templates/evaluation-template.md`
- 原始技能来源：`product-hunter/.claude/skills/vc-investment-evaluator/SKILL.md`
- 产品总框架：`product-hunter/03_Resources/Frameworks/AI产品分析框架.md`
- 案例输入：`product-hunter/03_Resources/Good Cases/`

本仓库保存 `vc-investment-evaluator` 的独立执行 skill 包，但不复制产品总框架和案例正文。后续如果框架文件路径变化，更新 `catalog/skills.yml` 和技能包中的 source map。
