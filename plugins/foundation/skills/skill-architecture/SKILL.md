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

## 维护 principles 时
principles 是启航的个人操作手册：认知原型、DO/DON'T、CALIBRATION。
它是被动参考库，不是全局强制规则；只有当某个 workflow/skill 需要对齐启航的思考、交付、审美或不确定性处理偏好时才读取。
更新 principles 时保持克制：只写跨 domain 都成立、可执行、可检验的偏好；领域专属的协作方式、专业 know-how、数据源 checklist 应放回具体 domain chain 或瓦技能，不写进通用 principles。

## 参考
- references/plugin-conventions.md：官方规范 + 本库命名/版本/落盘约定
- references/chain-authoring.md：怎么写一条 chain
- references/migration-checklist.md：加领域要改哪些文件
- references/principles-authoring.md：怎么创建/扩展 principles
