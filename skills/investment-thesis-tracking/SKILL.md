---
name: investment-thesis-tracking
description: Turn an AI investment memo into a falsifiable thesis, catalyst calendar, watch triggers, KPI monitoring plan, and update process. Use when the user wants to track an AI company, open-source project, investment case, portfolio company, or watchlist item after the initial memo.
---

# Investment Thesis Tracking

This node answers: how will we know if the thesis is getting stronger or weaker?

## References

Read when relevant:

- `references/thesis-tracker.md` for thesis pillars, risks, catalyst calendar, and conviction updates.
- `references/catalyst-calendar.md` for event tracking.
- `references/portfolio-monitoring.md` for KPI and variance monitoring.
- `references/earnings-analysis.md`, `references/earnings-preview.md`, and `references/earnings-analysis/*` for mature or public-company update patterns.

## Output

```text
Thesis statement:
Thesis pillars:
Disconfirming evidence:
Watch triggers:
Catalyst calendar:
KPI monitoring:
Update cadence:
Exit / stop tracking triggers:
Handoff to IC memo:
```

## 完成标准

- 记录当前投资论点、置信度、观察日期、依据和仍未解决的核心不确定性
- 每个论点支柱均可证伪，并同时连接支持证据、反证和关键假设
- 将尽调问题与论点支柱、风险、估值敏感项及待确认状态建立明确映射
- 每个关键指标包含定义、数据源、检查频率、阈值和触发后的明确行动
- 催化剂、负面触发器、退出条件带时间窗口并可被后续研究复核
- 明确 upgrade、maintain、downgrade 和 invalidate 的证据门槛，并规定新证据到来时保留历史判断和说明变化原因
- 当对象和期间适用时，核验最新 period，比较 actual 与 expectation 或 plan，分析 variance、guidance 与 estimate 变化，并映射到 thesis pillar 和 conviction transition
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；不得把未知指标或事件改写为事实
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
