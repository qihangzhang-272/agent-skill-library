# 从零搭建技能库

本模块被单独拎出来用、或换环境重建技能库时，按本步骤从空目录长出三层 plugins 架构。manifest 字段太少，用内联代码块展示，不单独建模板文件。

## 目标架构

```
<库名>/
├── .claude-plugin/marketplace.json   # 分发入口
├── README.md                          # 架构树 + 定位 + 验证
└── plugins/
    ├── foundation/          # 元层：skill-architecture 元技能 + principles 个人操作手册
    ├── orchestrator/        # 工作流路由入口（SKILL.md 只做路由，chain 压缩在 references/chains/）
    ├── skill-index/         # 外部 GitHub 技能索引（默认是链接，不收编正文）
    └── domain-*/            # 按需：按领域组织的瓦技能
```

源技能直接维护在 `plugins/<plugin>/skills/`，没有独立 skills/ 源目录，没有"先生成再分发"两步流程。

## 步骤

### 1. 建 marketplace 入口
在仓库根建 `.claude-plugin/marketplace.json`。`source` 用 `./plugins/<name>` 相对路径格式：

```json
{
  "name": "<your-skill-library>",
  "description": "<一句话 marketplace 用途>",
  "owner": { "name": "<owner>" },
  "plugins": [
    { "name": "foundation", "source": "./plugins/foundation", "version": "0.1.0", "description": "元层：架构章程、元技能、个人操作手册。" }
  ]
}
```

顶层 `description` 是 `--strict` 必填项，缺了 validate 会失败。每加一个 plugin 往 `plugins[]` 加一个对象，四字段（name / source / version / description）缺一不可。

### 2. 建 foundation plugin
```
plugins/foundation/
├── .claude-plugin/plugin.json
└── skills/
    ├── skill-architecture/   # 本模块自身
    └── principles/           # 个人操作手册
```

> 循环说明：skill-architecture 既是建库指引来源、又是 foundation 的一个瓦技能产物。操作顺序是「先把 skill-architecture 当种子放在 `.claude/skills/` 读它的 bootstrap 指引，建库后再整体复制进 `plugins/foundation/skills/skill-architecture/` 归位」。

plugin.json：
```json
{
  "name": "foundation",
  "displayName": "Foundation",
  "version": "0.1.0",
  "description": "元层：架构章程、元技能、个人操作手册。",
  "author": { "name": "<owner>" }
}
```
principles 的 SKILL.md 用 `principles-authoring.md` 规定的三段结构（认知原型 + DO/DON'T + CALIBRATION），不套 skill-template 六段式。把 marketplace.json 的 `plugins[]` 加上 foundation 一行。

### 3. 建 orchestrator plugin（空路由表）
```
plugins/orchestrator/
├── .claude-plugin/plugin.json
└── skills/qihang-workflow-orchestrator/
    ├── SKILL.md              # 只含路由表骨架，先空
    └── references/chains/    # 空目录，等你主动建 chain
```

SKILL.md 骨架（含 frontmatter，先空路由表，建 chain 时加行）：

```markdown
---
name: qihang-workflow-orchestrator
description: >-
  Route proven workflows. Use when asked to run, package, choose, or maintain
  workflows. This skill only routes; workflow details live in references.
---

# Workflow Orchestrator

Route to one chain definition, then follow that chain. This file only routes; chain bodies live in `references/chains/`.

## 路由表
| 用户意图 | 链定义 |
| --- | --- |
| （建 chain 时加行） | `references/chains/<name>.md` |
```

plugin.json 按 foundation 格式套用，在 marketplace.json 注册。此时没有任何 chain--合规。chain 等你按 `chain-authoring.md` 主动建。

### 4. 建 skill-index plugin（必须建）
skill-index 是外部 GitHub 技能的目录收束--对已有技能和不方便 vendored 但有用的 GitHub 技能建立索引结构。默认是链接，不收编正文。

```
plugins/skill-index/
├── .claude-plugin/plugin.json
└── skills/<skill-index-name>/
    ├── SKILL.md
    └── references/
        ├── github-skill-index.md    # 空索引表 + Promotion Rule
        └── registration-guide.md    # 登记 5 字段 + Status 阶梯 + Domain 门槛
```

从 `assets/skill-index-template/` 整体复制三个文件，按你的库名改 frontmatter 的 `name`。索引表初始为空（不预建分类、不预置条目），登记外部技能时按 `registration-guide.md` 加行。plugin.json 按 foundation 格式套用，在 marketplace.json 注册。

### 5. 按需建 domain plugin
用 `migration-checklist.md` 走。每个 domain 独立 plugin，瓦技能进 `skills/<skill>/SKILL.md`（用 `assets/skill-template/SKILL.md`）。

### 6. 建 README
在仓库根建 `README.md`，最小结构（架构树复制上方"目标架构"段）：

```markdown
# <库名>

一句话定位：Agent 运行能力库。

## 架构
（复制上方"目标架构"段的架构树）

## 安装验证
claude plugin validate . --strict
```

### 7. 验证
```powershell
claude plugin validate . --strict
```

## 不做什么
- 不为"以后可能用"预建跨领域共享插件（如 commons）——真有明确共享能力时再用本元技能建。
- 不预建 chain（chain 主动建）。
- 不为"以后可能用"建 plugin。
- skill-index 索引表不预建分类、不预置条目，登记时再加。
