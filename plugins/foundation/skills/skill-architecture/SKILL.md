---
name: skill-architecture
description: >-
  Use when adding a skill, a new domain, bootstrapping the skill library from
  scratch, or extending principles. Generates spec-compliant plugin/skill
  skeletons, enforces the on-disk delivery protocol, and keeps the architecture
  self-contained and iterable. Always use this instead of hand-creating skill
  folders.
---

# Skill Architecture（元技能）

本库新增技能 / 新领域 / 从零建库 / 维护 principles 时使用，保证产出符合架构约定。

## 核心理念
- **瓦技能是核心**。一个瓦技能可独立存在，不要求进任何 chain。
- **chain 是可选的主动编排**。只有你需要把多个瓦技能串成端到端交付时才主动建（见 `chain-authoring.md`）。加瓦技能不触发自动改 chain。
- **本模块自包含**。`assets/` 带完整范本，`references/` 带全部规则，单独拎出即可复现架构。

## 场景 A：加瓦技能（最高频）
1. 用 `assets/skill-template/SKILL.md` 建技能文件夹。
2. description 写到能触发。
3. 按需加 references/。
4. bump 所在 plugin version，并同步 marketplace 中的 version。
5. `claude plugin validate . --strict` + `node scripts/validate-repository.mjs --base HEAD`。
6. 不碰 chain。

## 场景 B：建新 domain
1. 建 `plugins/domain-<name>/` + `.claude-plugin/plugin.json`。
2. 瓦技能进 `skills/<skill>/SKILL.md`。
3. marketplace.json 注册新 plugin。
4. 同步 plugin/marketplace version，运行两项仓库验证。
5. chain 可选，不自动建。

## 场景 C：主动建/改 chain
你主动要把多个瓦技能串成工作流时，读 `chain-authoring.md`。chain 不是加技能的副作用；改 chain 后必须同步 workflow 文档、bump orchestrator version 并通过两项仓库验证。

## 从零建库
换环境或单独使用本模块时，读 `references/bootstrap-from-scratch.md`，从空目录长出三层架构。

## 维护 principles
principles 是个人操作手册：认知原型、DO/DON'T、CALIBRATION。被动参考库，不是全局强制规则。更新时保持克制：只写跨 domain 成立、可执行、可检验的偏好。详见 `principles-authoring.md`。

## 参考
- `assets/skill-template/SKILL.md`：瓦技能范本
- `assets/chain-template.md`：chain 范本
- `assets/skill-index-template/`：skill-index plugin 模板（SKILL.md + 2 references）
- `references/plugin-conventions.md`：架构全貌 + 命名/版本/落盘约定
- `references/bootstrap-from-scratch.md`：从零建库
- `references/chain-authoring.md`：chain 生命周期
- `references/migration-checklist.md`：加/改技能 checklist
- `references/principles-authoring.md`：维护 principles
