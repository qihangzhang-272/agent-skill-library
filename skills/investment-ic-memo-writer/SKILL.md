---
name: investment-ic-memo-writer
description: Write the final library-standard investment committee memo from completed investment workflow node outputs. Use only after fact collection, AI product judgment, competitive landscape, unit economics, scorecard, valuation, DD, and thesis tracking have produced handoffs. This skill does not search or create new analysis.
---

# Investment IC Memo Writer

This is the final writing node for `domain-investment`.

It consumes completed node outputs. It must not search for new facts or invent missing analysis.

## References

Read when relevant:

- `references/memo-assembly.md` for final assembly rules.
- `references/pe-deal-addendum.md` only for PE deal terms, value creation, and 100-day planning.
- `references/quality-checklist.md` before delivery.

## Required Memo Structure

```text
1. Executive Summary
2. Investment Recommendation
3. Company / Product Overview
4. AI-native Product Judgment
5. Market & Competitive Landscape
6. Business Model & Unit Economics
7. Technical / OSS / Ecosystem Moat
8. Valuation / Return Logic
9. Investment Scorecard
10. Key Risks & One-Vote Veto
11. Due Diligence Priorities
12. Thesis Tracking & Watch Triggers
13. Sources, Unknowns, Verification Gaps
```

## Rules

- Keep facts, judgments, assumptions, and unknowns visibly separate.
- Preserve upstream node judgments. Reorganize them, but do not erase contradictions.
- Do not downgrade the memo into a scorecard-only output.
- Do not hide weak points. IC memo credibility depends on explicit risks.
- If a section lacks evidence, write `not enough evidence` and list what is missing.

## 完成标准

- Memo 只组装 01–09 已有业务内容，不新增搜索、事实、可比对象、评分或估值；数字、日期、币种、单位、期间和情景保持原口径
- 完整呈现执行摘要、投资建议、公司与产品概览、AI 原生性与产品判断、市场与竞争格局、商业模式与单位经济、技术开源生态与护城河、估值与回报逻辑、投资评分卡、核心风险与一票否决项、尽调优先级、投资论点与跟踪触发器、来源未知项与核验缺口十三节
- Memo 中的真实外部来源使用可读名称和可点击的 Markdown URL，不以内部系统文件标识冒充投资人引用
- 前序冲突、反证和未知项被忠实保留；正文写清未知内容、决策影响、保守处理和再核验条件，不以顺畅叙事掩盖
- 最终建议、评分、估值回报、关键风险、尽调优先级和论点触发条件彼此一致
- 只保留推进（Proceed）、有条件推进（Conditional proceed）、观察（Watch）或放弃（Pass）中的一个结论，并成为视觉报告唯一业务输入和唯一结论来源
- 面向中文投资人写作；专业缩写和英文投资术语首次出现时给出准确中文解释，避免用内部工程术语代替业务表达
- Memo 只呈现投资业务正文，不展示运行记录或内部检查过程；这些信息由工作区另存
- 私募股权交易情境适用时，在相应正文章节呈现交易条款、杠杆、治理、百日计划及 IRR/MOIC 驱动并解释术语；不适用时不填充空模板
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
