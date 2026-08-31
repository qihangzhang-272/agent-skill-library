# Workflow Docs

这里放可以重复执行的流程，不放具体技能正文。Claude Code 运行时的压缩 workflow 入口在 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/`；本目录保留更完整的治理说明和背景说明。

## 当前文件

- `prd-to-frontend.md`：从模糊需求或 PRD 到前端实现、浏览器验收和复用沉淀的调用链。**草稿，未跑通，未挂入 orchestrator 路由表**（对应 chain 见 `product-frontend.md`）。
- `investment-product-to-research-report.md`：从 AI-native 产品判断到 `domain-investment` IC Memo，再到可选 `investment-visual-report` 可视化研报页的调用链。
- `public-equity-coverage.md`：从公开公司事实包、模型、估值与 thesis，到首次覆盖报告和数值终审的资本市场调用链。
- `wechat-writing.md`：可选账号语料采集、主题研究、公众号编辑判断与深度写作、领域视觉计划、按计划生产、HTML 预览与草稿箱发布。

稳定写作发布链在 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/wechat-writing.md`：按需采集账号级公开语料 -> agent-reach 搜索沉淀 -> `public-account-writing-style` 完成编辑判断、深度写作、事实审校与 AI 味终审 -> Markdown 排版 -> 由 `editorial-visual-storytelling` 独立生成视觉计划 -> 按计划调用截图复用 / 通用插图 / 信息图 / SVG 图解 / 知识漫画与封面 -> HTML 预览 -> 以最终 Markdown 推送公众号草稿箱。账号语料为可选；Chain 只规定顺序、交接和落盘，不承担领域判断。

## 放置标准

适合放这里的内容包括：

- 技能收录流程。
- 技能审查流程。
- 上游同步流程。
- GitHub 协作流程。
- 从实验到正式收录的验收流程。
- 跨技能调用链，例如 product-analysis -> AI-native 产品视角 -> domain-investment -> IC Memo -> investment-visual-report。
