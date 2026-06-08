# 运营

运营板块收集自动化、知识库同步、投稿、治理和协作流程相关技能。

当前工具：

- `apps/skill-orchestrator/index.html`：本地技能可视化编排台，用于从当前技能库拖拽拼链，并生成整条链 Claude handoff prompt。
- `scripts/build-skill-orchestrator-data.ps1`：扫描 `skills/`，生成编排台使用的 `apps/skill-orchestrator/data.js`。
- `orchestrations/`：只保存从编排台导出的、已经验证值得沉淀的链路 JSON。

待收录方向：

- 外部知识源同步
- 技能投稿与审核
- Linear 协作流程
- GitHub 私有仓库维护
- 自动化心跳任务
