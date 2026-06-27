---
name: skill-architecture
description: >-
  Use when adding a new skill, a new domain, a new chain, or extending principles
  in this agent skill library. Generates spec-compliant plugin/skill skeletons,
  enforces the on-disk delivery protocol, and updates marketplace.json. Always use
  this instead of hand-creating skill folders, so the architecture stays consistent.
---

# Skill Architecture（元技能）

在本库新增技能/领域/链时使用，保证产出符合架构约定。

## 创建新领域时必做
1. 在 plugins/ 下建 `domain-<name>/`，含 `.claude-plugin/plugin.json`（name 必填）。
2. 瓦技能放 `skills/<skill>/SKILL.md`（裸 name，三层渐进披露）。
3. **强制定义落盘协议**：在 orchestrator 的 references/chains 下新建 `<name>.md`，
   写明 项目夹结构 + 过程包文件 + 端到端成品。无落盘协议不算完成。
4. orchestrator SKILL.md 路由表加一行指向新 chain。
5. 在 marketplace.json 注册新 plugin（source ./plugins/<name>）。
6. 跑 `claude plugin validate . --strict`。

## 创建/扩展 principles 时
principles 是上位价值观（AI 理念、设计偏好、系统目标）。要新增时，
按本节约定在 plugins/foundation/skills/principles/ 下生成对应 reference 并定义触发范围。
（本轮 principles 仅空占位，详见 references/principles-authoring.md。）

## 参考
- references/plugin-conventions.md：官方规范 + 本库命名/版本/落盘约定
- references/chain-authoring.md：怎么写一条 chain
- references/migration-checklist.md：加领域要改哪些文件
- references/principles-authoring.md：怎么创建/扩展 principles
