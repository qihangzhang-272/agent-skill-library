# 投研视觉研报 — 交付前自检清单

生成 HTML 后，逐条过一遍再交付。

## 单文件 / 零依赖
- [ ] 全部 CSS 在 `<head>` 的 `<style>` 内联，没有 `<link rel="stylesheet">` 引外部 CSS
- [ ] 没有 `<script src="...cdn...">` 引外部 JS（这份研报不需要 JS；若有交互也用内联）
- [ ] 字体用系统栈，没引 Google Fonts 之类的 CDN
- [ ] 把 .html 文件直接双击能在浏览器打开、样式完整（离线可用）

## 忠于 memo（最重要 — 不能改判断）
- [ ] `10-ic-memo.md` 是唯一结论源；01–09 只用于核对来源、完整性与冲突
- [ ] 评级原样使用 memo 的 `Proceed / Conditional proceed / Watch / Pass`，没有压缩、改名或自行映射
- [ ] 综合评分、各维度分值与评分卡节点的数字一致
- [ ] 没有新增 memo 里没有的结论或数据
- [ ] 缺数据的地方如实标"未验证/数据不足"，没有编造
- [ ] 若 memo 与 01–09 在关键事实、评分、估值或结论上冲突，已拒收 memo，未生成第三套判断

## 配色与判断一致
- [ ] 高分/利好/bull 用绿，中性/观察/base 用黄，低分/风险/bear 用红
- [ ] header 评级 badge 的文字与颜色跟随 memo 原结论；大评分只做一致性展示，不反向决定评级
- [ ] 没有"低分维度却标绿"这种色义矛盾

## 布局与响应式
- [ ] 单列、全展开，没有把内容折叠进 tab/accordion
- [ ] 章节顺序跟随 IC memo 自然顺序
- [ ] 在窄屏（模拟 375px 宽）下不横向溢出：多栏网格塌成单列、评分条换行
- [ ] 表格内容不被截断

## 完整性
- [ ] 15 个合同章节均有对应 section：Executive Summary、Investment Recommendation、Company/Product、AI-native Product Judgment、Market/Competitive、Business Model/Unit Economics、Technical/OSS/Ecosystem Moat、Valuation/Return、Scorecard、Risks/Veto、DD、Thesis/Watch、Sources/Unknowns/Gaps、Artifact Provenance、Completion Record
- [ ] 必需章节缺失或过薄时已拒收 memo；只删除 memo 明确标为不适用的非必需展示组件
- [ ] 反证、来源、未知项、已接受缺口和决策影响在末尾有交代

## 落盘
- [ ] 文件名是投研 chain 定义的 `11-visual-report.html`
- [ ] 落在用户项目的 `.asl/runs/<run-id>/artifacts/`，**没有**写进 plugins/ 或技能库 repo
