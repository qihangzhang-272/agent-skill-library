# Workflow Docs

这里放可以重复执行的流程，不放具体技能正文。Claude Code 运行时的压缩 workflow 入口在 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/`；本目录保留更完整的治理说明和背景说明。

## 当前文件

- `prd-to-frontend.md`：从模糊需求或 PRD 到前端实现、浏览器验收和复用沉淀的调用链。**草稿，未跑通，未挂入 orchestrator 路由表**（对应 chain 见 `product-frontend.md`）。
- `investment-product-to-research-report.md`：从 AI-native 产品判断到 `domain-investment` IC Memo，再到可选 `investment-visual-report` 可视化研报页的调用链。
- `public-equity-coverage.md`：从公开公司事实包、模型、估值与 thesis，到首次覆盖报告和数值终审的资本市场调用链。

稳定写作发布链在 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/wechat-writing.md`：agent-reach 搜索沉淀 -> 公众号编辑写作 -> Markdown 排版 -> 自动视觉路由（截图复用 / 通用插图 / 信息图 / SVG 图解 / 知识漫画）与封面 -> HTML 预览 -> 以最终 Markdown 推送公众号草稿箱。Codex 优先使用原生 imagegen；Claude Code 等没有原生图像后端的运行时可路由到随 `domain-writing` 分发的 `baoyu-image-gen`。该 chain 同时定义研究、统一视觉与发布 Handoff、分支并行边界、原生过程包和公众号发布资产的归一规则。

## 放置标准

适合放这里的内容包括：

- 技能收录流程。
- 技能审查流程。
- 上游同步流程。
- GitHub 协作流程。
- 从实验到正式收录的验收流程。
- 跨技能调用链，例如 product-analysis -> AI-native 产品视角 -> domain-investment -> IC Memo -> investment-visual-report。
