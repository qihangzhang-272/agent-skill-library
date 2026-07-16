# Chain: Public Equity Coverage

## 适用

对已上市公司做首次覆盖、深度股票研究、目标价/评级框架、业绩前瞻，或需要机构风格公开市场研究报告时使用。它不替代私募股权 IC memo 链，也不适用于只有泛行业观点而没有明确标的的请求。

## 链路（8 瓦技能，顺序执行）

research object → domain-investment:investment-research →
domain-investment:investment-competitive-landscape →
domain-investment:investment-financial-model-builder →
domain-investment:investment-valuation-returns →
domain-investment:investment-thesis-tracking →
domain-capital-markets:investment-chart-pack →
domain-capital-markets:public-equity-coverage-writer →
domain-capital-markets:financial-artifact-qc

按需插入而非默认加入的瓦技能：`domain-capital-markets:financial-company-profile`（需要 tear sheet / strip profile）、`domain-capital-markets:investment-banking-pitch-deck`（需要投行演示稿）、`domain-capital-markets:sell-side-ma-materials`（需要卖方 M&A 材料）。它们不是子调度器，也不改写本链顺序。

## 落盘协议（领域细则）

项目夹：`research/<YYYY-MM-DD>-<ticker>-public-equity-coverage/`

路径相对「用户当前工作项目目录」，不是技能库/插件仓库。若项目根不明确，先确认；绝不把公司材料、模型或输出写进 `plugins/`。

过程包：

```text
01-scope-source-register.md
02-company-fact-pack.md
03-competitive-landscape.md
04-financial-model-handoff.md
05-valuation-returns.md
06-thesis-earnings-watch.md
07-chart-pack/
08-initiating-coverage-draft.html
09-qc-findings.json
```

端到端成品：

```text
10-public-equity-coverage.html (or .docx / .pdf when requested)
```

## 执行规则

- 先确认标的、交易所代码、估值日期、目标读者、目标价/评级需求和可用数据源；没有批准历史数据时，模型与估值必须显式标记为数据不足。
- 研究节点保存原始来源登记和事实包；竞争、模型、估值、thesis、图表和成稿只消费上游 handoff，不把搜索留到最终 writer。
- 目标价、评级和任何预测都必须带估值日期、情景、方法和数据限制；没有足够证据时输出观察框架，而不是伪造结论。
- 图表包只可视化已批准数据，不重新建模；writer 只组装机构风格报告，不承担链路调度。
- QC 在最终文件前执行。发现数值、单位、期间或引文冲突时，回退到相应 owner 修正，并保留 `09-qc-findings.json`。
