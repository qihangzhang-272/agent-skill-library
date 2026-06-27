# Chain: Investment IC Memo

## 适用
AI 产品/公司/开源项目/case 是否值得投、IC memo、DD、watch triggers、可视化研报。

## 链路（9 瓦技能，顺序执行）
research object → qihang-investment-research → qihang-ai-product-judgment →
qihang-competitive-landscape → qihang-unit-economics → qihang-investment-scorecard →
qihang-valuation-returns → qihang-investment-dd → qihang-thesis-tracking →
qihang-ic-memo-writer → optional visual report

## 落盘协议（领域细则）
项目夹: research/<YYYY-MM-DD>-<target>-investment/
  ↑ 路径相对「用户当前工作项目目录」（运行时所在的项目根），不是技能库/插件仓库本身。
    绝不把产物写进 plugins/ 或本技能库 repo 内。若不确定项目根在哪，先问用户。
过程包:
  01-source-intake.md
  02-fact-pack.md
  03-product-judgment.md
  04-competitive-landscape.md
  05-unit-economics.md
  06-investment-scorecard.md
  07-valuation-returns.md
  08-dd-questions.md
  09-ic-memo.md
端到端成品:
  10-visual-report.html（或 .pdf）

## 执行规则
- facts 收集完成前不写 IC memo。
- 不在 ic-memo-writer 阶段做 search。
- 每个节点产出立即按上表落盘；成品不替代过程包。
- 估值数据缺失时标记为 scenario logic / 数据不足，不记为零。
