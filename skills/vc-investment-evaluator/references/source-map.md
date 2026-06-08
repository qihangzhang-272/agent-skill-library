# Source Map

## 本技能来源

源 vault：

`C:/Users/Administrator/Desktop/AI/codex/产品/产品第二大脑/product-hunter`

源技能：

- `.claude/skills/vc-investment-evaluator/SKILL.md`
- `.claude/skills/vc-investment-evaluator/references/scored-examples.md`
- `.claude/skills/vc-investment-evaluator/template/evaluation-template.md`

相关框架：

- `03_Resources/Frameworks/AI产品分析框架.md`
- `03_Resources/Good Cases/`

## 迁移原则

本仓库中的 `vc-investment-evaluator` 是一个单独技能包，但不是 product-hunter 框架全文的复制。

保留在本技能中的内容：

- 触发条件。
- 执行流程。
- 五维投资评分契约。
- One-Vote Veto。
- 输出格式。
- 评分模板。
- 校准锚点。

不复制的内容：

- `AI产品分析框架.md` 的完整理论正文。
- Good Cases 的案例正文。
- 商业模式框架的长篇演进记录。

## 为什么这样拆

VC 投资评估是一个可独立使用的技能；但它经常需要引用产品分析框架中的商业模式、竞争定位和案例库。

如果把产品框架正文复制进技能，会造成框架和技能双写。正确结构是：

```text
vc-investment-evaluator = 投资评估执行壳 + 评分契约
AI产品分析框架 = 产品/商业模式理论源
Good Cases = 案例输入源
```

