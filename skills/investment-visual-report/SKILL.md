---
name: investment-visual-report
description: >-
  Use when turning a completed investment IC memo into a polished, single-file
  HTML visual research report (投资研报/可视化研报/IC memo 可视化/前端展示/网页版研报).
  Triggers whenever the user wants to visualize, present, or make a webpage/HTML
  out of investment analysis — scorecards, valuation, competitive landscape, DD,
  bull/base/bear scenarios. This is the visual-report node of the investment chain;
  it consumes the memo's text, never re-researches. Always use this skill for
  investment report visualization so the house style stays consistent.
---

# Investment Visual Report

把已经写好的投资 IC memo（过程包 01–09）转成一份**单文件、零依赖、全展开**的 HTML 可视化研报。这是投研链的 `10-visual-report.html` 节点。

## 核心原则

- **只可视化，不重新研究。** 你的输入是已完成的 memo 文本（fact-pack、判断、评分、估值、DD 等）。把内容如实搬进视觉结构，不新增结论、不改判断、不补搜索。
- **忠于 memo 的自然顺序。** 章节顺序跟随 IC memo：执行摘要 → 公司/产品概览 → 竞争格局 → 单元经济 → 估值/回报 → 评分卡 → 风险/一票否决 → DD → thesis/watch triggers → 来源。
- **单文件、零依赖。** 所有 CSS 内联在 `<style>` 里，不引外部 JS/CSS/字体 CDN（字体用系统栈）。一个 .html 文件能独立打开。
- **全展开、不折叠、不堆叠。** 信息一屏滚到底全部可见，不用 tab/accordion 把内容藏起来——投委要快速通读。
- **落盘**：产物是投研链项目夹里的 `10-visual-report.html`（路径见投研 chain 定义，落到用户项目工作区，不写进技能库 repo）。

## 怎么做

1. **读设计系统**：先读 `references/design-system.md`，它定义了配色、排版、组件类名、响应式断点——这是房子的"风格基因"，照它来保证每份研报观感一致。
2. **用骨架模板起步**：复制 `assets/report-template.html` 作为起点，它已含完整 `<style>` 和所有组件的占位结构。把 memo 内容填进对应 section。
3. **按需选组件**：`references/components.md` 列出了所有可用组件（评分条、bull/base/bear 场景卡、时间线、风险矩阵、来源标签等）及其 HTML 片段，按 memo 实际有的内容挑用。缺的 section 就删掉，不要硬凑。
4. **填评级与配色**：根据 memo 的结论给 header 的评级 badge 和评分上色（见设计系统的语义色规则：绿=利好/强、黄=中性/观察、红=风险/弱）。
5. **自检**：对照 `references/quality-checklist.md` 过一遍——单文件能打开、响应式不溢出、评分色与结论一致、没有把判断改掉。

## 不要做

- 不要引入 React/Vue/构建工具——这是一份静态 HTML，不是 App。
- 不要用外部 CDN（离线打不开就失败了）。
- 不要折叠内容到交互组件后面（投委要一眼看全）。
- 不要在可视化阶段"修正"memo 的判断或补数据——有疑问回到 memo 节点，不在这里改。
- 不要把文件写进 plugins/ 或技能库 repo——产物属于用户项目工作区。

## 参考文件

- `references/design-system.md` — 配色、排版、组件类名、布局、响应式（**先读这个**）
- `references/components.md` — 所有组件的 HTML 片段库（按需取用）
- `references/quality-checklist.md` — 交付前自检清单
- `assets/report-template.html` — 完整可复制的骨架模板（含全部内联 CSS）

## 完成标准

- 只读取并转换 10-ic-memo；所有内容、结论、建议、评分和措辞强度均来自 Memo，不读取 01–09 补洞，也不创建第三套投资结论
- 忠实保留 Memo 的推进（Proceed）、有条件推进（Conditional proceed）、观察（Watch）或放弃（Pass），以及分数、估值、回报、单位、日期、情景、缺口和限制
- 完整承接 Memo 的十三个投资人章节，不压薄或用视觉组件替代正文
- 章节名、标签和解释面向中文投资人；专业缩写和英文投资术语沿用 Memo 的中文解释，不以内部工程术语代替业务表达
- 完整保留 Memo 中的真实外部 URL，并在 HTML 中使用可读锚文本、可点击链接以及安全的新窗口属性
- HTML 只呈现投资业务正文，不展示内部工作区元数据、检查过程、尝试记录或运行证明
- 输出为指定路径的单一 HTML，CSS 全部内联，无运行时外部依赖，并包含十三个命名 section；外部来源链接可在联网时点击
- 桌面与移动端均可读、无关键溢出、具备基本可访问性，且 verdict class 和语义色忠于 Memo
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
