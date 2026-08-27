# Workflow Docs

这里放可以重复执行的流程，不放具体技能正文。可分支组合放 `references/graphs/`，真正线性的流程保留在 `references/chains/`。

## 当前文件

- `prd-to-frontend.md`：从模糊需求或 PRD 到前端实现、浏览器验收和复用沉淀的调用链。**草稿，未跑通，未挂入 orchestrator 路由表**（对应 chain 见 `product-frontend.md`）。
- `investment-product-to-research-report.md`：从 AI-native 产品判断到 `domain-investment` IC Memo，再到可选 `investment-visual-report` 可视化研报页的调用链。
- `public-equity-coverage.md`：从公开公司事实包、模型、估值与 thesis，到首次覆盖报告和数值终审的资本市场调用链。
- `wechat-writing.md`：可选账号语料采集、主题研究、公众号编辑判断与深度写作、领域视觉计划、按计划生产、启航个人样式排版、HTML 预览与草稿箱发布。

公众号定义在 `plugins/orchestrator/skills/workflow-orchestrator/references/graphs/wechat-writing.md`。它按现有材料选择最小子图：既可从主题研究开始，也可从已有草稿、定稿 Markdown 或单张视觉 brief 开始；个人排版只生成普通 HTML，不再生成效果工作台。

## 放置标准

适合放这里的内容包括：

- 技能收录流程。
- 技能审查流程。
- 上游同步流程。
- GitHub 协作流程。
- 从实验到正式收录的验收流程。
- 跨技能调用链，例如 product-analysis -> AI-native 产品视角 -> domain-investment -> IC Memo -> investment-visual-report。
