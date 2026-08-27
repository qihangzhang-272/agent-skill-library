---
name: skill-architecture
description: >-
  Use when adding a tile skill, defining its input/output interface, composing
  skills as a dependency graph, creating a truly linear chain, adding a domain,
  bootstrapping the library, or extending principles. Keeps skills independently
  usable and workflow composition explicit without creating wrapper routers.
---

# Skill Architecture（元技能）

本库新增技能 / 新领域 / 从零建库 / 维护 principles 时使用，保证产出符合架构约定。

## 核心理念
- **瓦技能是核心**。每个瓦技能用输入、产物和副作用边界描述能力，可独立存在。
- **技能图是默认组合方式**。节点是瓦技能，边是材料依赖；只选择完成目标所需的最小子图（见 `graph-authoring.md`）。
- **chain 是技能图的特殊情况**。只有依赖确实构成一条不可交换的路径时才建线性 chain（见 `chain-authoring.md`）。
- **本模块自包含**。`assets/` 带完整范本，`references/` 带全部规则，单独拎出即可复现架构。

## 场景 A：加瓦技能（最高频）
1. 用 `assets/skill-template/SKILL.md` 建技能文件夹。
2. description 写到能触发。
3. 按需加 references/。
4. bump 所在 plugin version，并同步 marketplace 中的 version。
5. `claude plugin validate . --strict` + `node scripts/validate-repository.mjs --base HEAD`。
6. 不自动修改任何 graph 或 chain。

## 场景 B：建新 domain
1. 建 `plugins/domain-<name>/` + `.claude-plugin/plugin.json`。
2. 瓦技能进 `skills/<skill>/SKILL.md`。
3. marketplace.json 注册新 plugin。
4. 同步 plugin/marketplace version，运行两项仓库验证。
5. graph / chain 均可选，不自动建。

## 场景 C：主动建/改技能图
当多个瓦技能按材料依赖自由组合、允许分支、汇合、并行或回退时，读 `graph-authoring.md`。改 graph 后同步 workflow 文档、bump orchestrator version 并通过两项仓库验证。

## 场景 D：主动建/改线性 chain
只有节点顺序不可交换、没有有意义的旁路时才读 `chain-authoring.md`。chain 不是加技能的副作用。

## 从零建库
换环境或单独使用本模块时，读 `references/bootstrap-from-scratch.md`，从空目录长出三层架构。

## 维护 principles
principles 是 Agent 操作原则：认知原型、DO/DON'T、CALIBRATION。被动参考库，不是全局强制规则。更新时保持克制：只写跨 domain 成立、可执行、可检验的原则。详见 `principles-authoring.md`。

## 参考
- `assets/skill-template/SKILL.md`：瓦技能范本
- `assets/graph-template.md`：技能图范本
- `assets/chain-template.md`：chain 范本
- `assets/skill-index-template/`：skill-index plugin 模板（SKILL.md + 2 references）
- `references/plugin-conventions.md`：架构全貌 + 命名/版本/落盘约定
- `references/bootstrap-from-scratch.md`：从零建库
- `references/graph-authoring.md`：技能图的节点、材料边、最小子图与反馈规则
- `references/chain-authoring.md`：chain 生命周期
- `references/migration-checklist.md`：加/改技能 checklist
- `references/principles-authoring.md`：维护 principles
