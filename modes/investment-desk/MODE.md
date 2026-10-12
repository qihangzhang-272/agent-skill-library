# Investment Desk

面向私募、AI 项目和复杂投资判断的长期研究工作场。

## 适合做什么

事实研究、AI 产品判断、竞争格局、单位经济、投资评分、财务模型、估值回报、尽调、论点跟踪、IC Memo、投资图表与视觉报告。

## 会用到哪些资料

AI 先了解你的长期要求和可用技能，再按当前问题读取公司材料、PDF、模型、来源证据、历史项目及反馈。

## 技能怎么配合

围绕你要完成的研究选择技能。已有公司资料，可以直接做估值、尽调或投资备忘录；需要补充事实时，再调用研究技能。

## 开始前需要确认

缺失事实不能填零或伪造。对外发送、付费数据、登录、投资操作与任何具有现实金融影响的动作继续要求用户明确授权。本 Mode 不自动承担公开市场持续覆盖。

## 会得到什么，如何改进

可以得到研究资料、评分卡、财务模型、估值、尽调清单、投资备忘录和图表报告。单次问题在当前项目修正；反复需要的新方法再补充到技能或工作模式。

以下图按不同视角描述技能协作，AI 依当前问题选择适用部分；分支、往返与并行关系不强制执行顺序。

## 项目初筛与反证

```mermaid
flowchart LR
  skill_agent_reach("网络检索与读取")
  skill_investment_research("事实研究")
  skill_investment_ai_product_judgment("AI 产品投资判断")
  skill_investment_competitive_landscape("竞争格局")
  skill_investment_unit_economics("单位经济")
  skill_investment_scorecard("投资评分")
  skill_investment_valuation_returns("估值与回报")
  skill_agent_reach -.->|"公开来源"| skill_investment_research
  skill_investment_research -->|"产品事实"| skill_investment_ai_product_judgment
  skill_investment_research -->|"竞品证据"| skill_investment_competitive_landscape
  skill_investment_research -->|"收入与成本"| skill_investment_unit_economics
  skill_investment_ai_product_judgment -->|"产品判断"| skill_investment_scorecard
  skill_investment_competitive_landscape -->|"竞争判断"| skill_investment_scorecard
  skill_investment_unit_economics -->|"经济性判断"| skill_investment_scorecard
  skill_investment_scorecard -->|"反证与缺口"| skill_investment_research
  skill_investment_scorecard -.->|"需评估价格时"| skill_investment_valuation_returns
  skill_investment_valuation_returns -.->|"敏感假设待核实"| skill_investment_research
```

## 模型与回报推演

```mermaid
sequenceDiagram
  participant skill_investment_unit_economics as 单位经济
  participant skill_investment_financial_model_builder as 财务模型
  participant skill_investment_valuation_returns as 估值与回报
  participant skill_investment_chart_pack as 投资图表
  skill_investment_unit_economics->>skill_investment_financial_model_builder: 经营假设与证据
  alt 输入充分
    skill_investment_financial_model_builder->>skill_investment_valuation_returns: 可核查模型
    loop 敏感假设需要修订
      skill_investment_valuation_returns-->>skill_investment_financial_model_builder: 回报敏感点
      skill_investment_financial_model_builder-->>skill_investment_unit_economics: 待核验的成本与收入
      skill_investment_unit_economics->>skill_investment_financial_model_builder: 修订依据
      skill_investment_financial_model_builder->>skill_investment_valuation_returns: 更新模型
    end
    par 需要数字图表
      skill_investment_valuation_returns->>skill_investment_chart_pack: 回报区间及口径
    and 补充假设说明
      skill_investment_financial_model_builder->>skill_investment_chart_pack: 假设与敏感性
    end
  else 证据不足
    skill_investment_financial_model_builder-->>skill_investment_unit_economics: 返回缺口，不填造数字
  end
```

## 尽调、决策材料与跟踪

```mermaid
stateDiagram-v2
  direction LR
  state "尽职调查" as skill_investment_dd
  state "投资备忘录" as skill_investment_ic_memo_writer
  state "论点跟踪" as skill_investment_thesis_tracking
  state "投资图表" as skill_investment_chart_pack
  state "投资视觉报告" as skill_investment_visual_report
  [*] --> skill_investment_dd: 已有疑点
  [*] --> skill_investment_ic_memo_writer: 已有研究材料
  skill_investment_dd --> skill_investment_ic_memo_writer: 证据与未决问题
  skill_investment_ic_memo_writer --> skill_investment_dd: 关键判断缺证
  skill_investment_ic_memo_writer --> skill_investment_thesis_tracking: 形成待验证论点
  skill_investment_thesis_tracking --> skill_investment_dd: 新证据触发复核
  skill_investment_ic_memo_writer --> skill_investment_visual_report: 审定叙事
  skill_investment_chart_pack --> skill_investment_visual_report: 证据图表
  skill_investment_visual_report --> [*]: 本次交付完成
```

## 技能分工

```mermaid
mindmap
  root((Investment Desk))
    研究与判断
      skill_investment_research(事实研究)
      skill_investment_ai_product_judgment(AI 产品投资判断)
      skill_investment_competitive_landscape(竞争格局)
      skill_investment_scorecard(投资评分)
    数字与回报
      skill_investment_unit_economics(单位经济)
      skill_investment_financial_model_builder(财务模型)
      skill_investment_valuation_returns(估值与回报)
    决策与复核
      skill_investment_dd(尽职调查)
      skill_investment_ic_memo_writer(投资备忘录)
      skill_investment_thesis_tracking(论点跟踪)
    表达
      skill_investment_chart_pack(投资图表)
      skill_investment_visual_report(投资视觉报告)
    按需取资料
      skill_agent_reach(网络检索与读取)
```

## 通用能力

```mermaid
flowchart LR
  skill_agent_reach("网络检索与读取")
```
