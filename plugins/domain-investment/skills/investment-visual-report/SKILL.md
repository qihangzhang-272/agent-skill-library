---
name: investment-visual-report
description: Use when a completed investment IC Memo must become a polished Chinese single-file HTML report without changing its conclusions, inventing content, or placing internal process records in the report.
---

# Investment Visual Report

把一份完整 IC Memo 转换成面向中文投资人的单文件 HTML 研报。这个 Skill 只负责表达与排版，不研究、不补分析、不重做判断，也不因为它处在工作流最后一环就压缩内容。

## 唯一业务输入

- **Standalone：** 只接收一份完成的 IC Memo。
- **Managed workflow：** 只接收 `10-ic-memo.md`。01–09 不是本 Skill 的输入，不直接读取、审计、比较或引用它们。
- Memo 是唯一内容来源和唯一结论来源。HTML 中的建议、评分、估值、风险、尽调、跟踪条件、来源和未知项都必须忠实来自 Memo。
- 缺少运行上下文时，只提醒一次并继续使用当前可读的 Memo；不得要求用户重建上下文，也不得把运行记录放进 HTML。

如果 Memo 缺少可补做的业务内容，准确说明缺少什么，让 Memo 补齐后继续。若某项信息确实不可获得，则忠实展示 Memo 已披露的未知项与保守处理，不让工作流死锁。不得绕过 Memo 去 01–09 找材料补洞，也不得生成第三套判断。

## 制作方法

1. 完整阅读 `10-ic-memo.md`、`references/design-system.md` 和 `references/quality-checklist.md`，以 `assets/report-template.html` 为骨架。
2. 逐节映射 Memo 的十三个投资人章节；每节保留实质正文，视觉卡片不能替代论证。
3. 只为 Memo 已有内容选用 `references/components.md` 中的组件。删除不适用的组件和占位值，不创造 `0.00`、`0x` 或虚构示例数据。
4. 逐字保留 Memo 的唯一结论、评分、估值日期、币种、单位、期间、情景、风险强度和不确定性。结论显示为 `推进（Proceed）`、`有条件推进（Conditional proceed）`、`观察（Watch）` 或 `放弃（Pass）`。
5. 面向中文投资人写作。专业缩写和英文术语沿用 Memo 的中文解释，不能把内部运行术语当成正文。
6. 保留所有真实外部来源链接，使用描述性锚文本，例如 `<a href="https://example.com" target="_blank" rel="noopener noreferrer">来源名称</a>`。内部文件标识不显示为读者来源。
7. CSS 全部内联；不加载外部脚本、样式、字体、CDN 或构建依赖。外部来源链接可以联网点击，这与页面本身可离线打开不冲突。
8. 所有决策关键内容全展开，不使用 tab、手风琴或嵌套折叠。使用语义 HTML、清晰对比度、响应式表格和打印安全布局。
9. 完成后逐项执行 checklist。HTML 本身不包含质量检查过程或运行记录。

## 十三个必需章节

```text
1. 执行摘要
2. 投资建议
3. 公司与产品概览
4. AI 原生性与产品判断
5. 市场与竞争格局
6. 商业模式与单位经济
7. 技术、开源生态与护城河
8. 估值与回报逻辑
9. 投资评分卡
10. 核心风险与一票否决项
11. 尽调优先级
12. 投资论点与跟踪触发器
13. 来源、未知项与核验缺口
```

## 交付

唯一业务文件是 `11-visual-report.html`。它必须能作为单一文件直接打开，完整呈现 Memo，不新增第二层结论，也不展示任何运行记录或内部检查过程。

运行记录由工作区另存。**不要调用其他 Skill、启动补救工作流或修改上游 Memo。**
