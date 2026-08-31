# 插件约定

## 目录结构
```
plugins/<group>/
├── .claude-plugin/plugin.json
└── skills/<skill>/
    ├── SKILL.md          # 三层渐进披露第一层
    ├── references/       # 第二层，按需
    └── assets/           # 第三层，按需
```
技能正文放 `skills/<skill>/SKILL.md`，裸 name（不带路径前缀）。复杂内容下沉 references/，模板/大段素材放 assets/。

## 三层架构
| 层 | 目录 | 放什么 | 不放什么 |
| --- | --- | --- | --- |
| Foundation | `plugins/foundation/` | 元技能 + Agent 操作原则 | 领域 know-how、具体 chain |
| Orchestrator + Index | `plugins/orchestrator/`、`plugins/skill-index/` | 工作流路由 + 外部技能索引 | 技能正文副本、项目产物 |
| Domain | `plugins/domain-*/` | 瓦技能，每个领域一个 plugin | 第二个领域调度器 |

跨领域共享能力不预建空插件。真出现明确的跨领域共享需求时，用本元技能新建一个 `plugins/commons/`（或按需命名）——只在有实际内容时才建，不为"以后可能用"占位。

瓦技能是核心，可独立存在。chain 是可选的主动编排层（见 `chain-authoring.md`），加瓦技能不触发自动改 chain。

## plugin.json
唯一强制字段 `name`（kebab-case）；建议补 version / displayName / description / author。
- version 用 manual semver，破坏性变更（改插件名）升 minor 起步。
- 技能正文 / 支撑文件 / manifest 变化时必须 bump version，并同步 marketplace 中该 plugin 的 version。

## marketplace.json
固定放 `.claude-plugin/marketplace.json`，列出所有可安装 plugin。每个 plugin 至少 name / source / version / description，外加顶层 description（`--strict` 必填）。`source` 用 `./plugins/<name>` 相对路径格式；version 必须与对应 `plugin.json` 一致。

提交和推送前运行：

```powershell
claude plugin validate . --strict
node scripts/validate-repository.mjs --base HEAD
```

## 落盘
- 运行时产物落项目工作区，绝不写进 plugins/ 或本仓库。
- chain 的落盘协议定义项目夹结构，见 `chain-authoring.md`。

## 禁止
- 不把 skills/ / agents/ / hooks/ 放进 `.claude-plugin/`。
- 插件不引用插件目录外部文件；需要的文件复制进来。
- 不手创建 skill 文件夹--用本元技能 + `assets/skill-template/`。
