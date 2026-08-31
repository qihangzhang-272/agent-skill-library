---
name: investment-dd
description: Generate diligence priorities, red flags, data-room requests, management questions, expert-call questions, and one-vote-veto checks for an AI investment memo. Use after product, market, unit economics, scorecard, and valuation nodes have produced preliminary judgments.
---

# Investment DD

This node answers: what must be verified before we believe the memo?

## References

Read when relevant:

- `references/dd-checklist.md` for workstream diligence checklists.
- `references/dd-meeting-prep.md` for management, expert, and customer reference questions.
- `references/datapack-builder.md` for data pack, normalization, and investment committee data organization.

## Output

```text
Critical DD questions:
Workstream checklist:
Management meeting questions:
Expert call questions:
Customer reference questions:
Data-room request list:
One-vote veto items:
Red flags:
What would change the verdict:
Handoff to IC memo:
```

## 完成标准

- 尽调问题从前序材料的未知项、冲突、关键假设、否决风险和估值敏感点追溯生成
- 问题按 P0、P1、P2 或等价优先级排序，并说明答案会如何改变投资决策
- 每个问题包含待验证命题、所需证据、来源或责任方、合格标准、异常处理和决策影响
- 覆盖管理层、专家和客户三类适用受众，以及商业、产品技术、财务、法律、团队和运营等适用工作流
- 证据请求去重、可执行并与问题一一映射，包含优先级、格式、期间、责任人、状态和关闭标准
- 重大风险和否决项具有关闭条件、无法关闭时的决策后果及后续重新检查触发器
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；不得用宽泛尽调问题掩盖上游分析缺失
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
