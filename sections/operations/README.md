# 运营

运营板块收集自动化、知识库同步、投稿、治理和协作流程相关技能。

当前工具：

- `apps/skill-orchestrator/index.html`：本地技能可视化编排台，用于展示工作流、技能可用性、人工状态和整条链 Claude handoff prompt。
- `scripts/build-skill-orchestrator-data.ps1`：扫描 `skills/` 和 `orchestrations/`，生成编排台使用的 `apps/skill-orchestrator/data.js`。

当前编排定义：

- `orchestrations/product-bp-visual-report.json`
- `orchestrations/prd-to-frontend-console.json`

待收录方向：

- 外部知识源同步
- 技能投稿与审核
- Linear 协作流程
- GitHub 私有仓库维护
- 自动化心跳任务
