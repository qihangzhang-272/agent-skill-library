# 公开市场首次覆盖调用链

日期：2026-07-09

定位：这是 `workflow-orchestrator` 中唯一的公开市场研究与首次覆盖入口。它复用 `domain-investment` 的研究、竞争、模型、估值和 thesis 瓦技能，并由 `domain-capital-markets` 承接图表、成稿与金融交付物 QC；资本市场领域不设第二个调度器。

## 适用场景

- 对一只已上市股票进行首次覆盖、深度研究或评级/目标价框架。
- 在已有财报、模型或研究材料的基础上，形成机构风格公开市场报告。
- 在财报前形成以共识、情景、催化剂和可证伪条件为核心的股票研究更新。

不适用：私募股权交易审批（用 IC memo 链）、没有明确公司的泛行业研究、只需要单页公司资料或单独投行材料。

## 调用顺序与职责

| 顺序 | 技能 | 责任 | 必留产物 |
| --- | --- | --- | --- |
| 1 | `investment-research` | 事实、来源登记、公开公司与行业材料 | `02-company-fact-pack.md` |
| 2 | `investment-competitive-landscape` | 同业、替代、定位与风险 | `03-competitive-landscape.md` |
| 3 | `investment-financial-model-builder` | 审计可追溯的历史与预测模型 | `04-financial-model-handoff.md` 与模型文件 |
| 4 | `investment-valuation-returns` | 方法选择、估值桥、目标价/区间与敏感性 | `05-valuation-returns.md` |
| 5 | `investment-thesis-tracking` | 财报前瞻、催化剂、证伪条件与跟踪节奏 | `06-thesis-earnings-watch.md` |
| 6 | `investment-chart-pack` | 只用已批准数据制图 | `07-chart-pack/` |
| 7 | `public-equity-coverage-writer` | 组装首次覆盖报告，不重新研究或建模 | `08-initiating-coverage-draft.html` |
| 8 | `financial-artifact-qc` | 数字、单位、期间、引文与格式终审 | `09-qc-findings.json`、`10-public-equity-coverage.*` |

`financial-company-profile`、`investment-banking-pitch-deck` 和 `sell-side-ma-materials` 是按交付物插入的独立瓦技能，不是本链的隐性步骤。

## 约束

- 先在用户项目目录创建 `research/<YYYY-MM-DD>-<ticker>-public-equity-coverage/`；不能写进技能库。
- 每个判断带来源、日期、期间和不确定性。最终 writer 不补搜、不补算、不悄悄解决矛盾；证据不足时交付观察框架，不伪造目标价或评级。
- 目标价、评级和预测必须能回溯到模型、估值日期、方法与 bull/base/bear 情景；数据不足时交付观察框架并标示缺口。
- 终审发现问题，回到其责任瓦技能修正；不得在 QC 或 writer 中越权改动模型逻辑。
