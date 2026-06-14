# 索引和记录方式

本仓库有两类索引：技能总账和插件分发映射。两者职责不同，不能合并。

## `catalog/skills.yml`

`catalog/skills.yml` 是技能总账，回答“这个能力是什么、为什么收录、怎么用、边界在哪里”。

每个正式技能至少应包含：

| 字段 | 含义 |
| --- | --- |
| `id` | 稳定技能 ID，使用 kebab-case |
| `title` | 人类可读名称 |
| `status` | `internal`、`internal_index`、`promoted_external`、`deprecated` 等 |
| `source_type` | 来源类型，例如 `user_cultivated_product_insight_skill`、`user_curated_external_github_index`、`promoted_external_skill_package` |
| `package_path` | 本地技能入口；如果只做索引，则写来源文档路径 |
| `package_support` | 支撑文件、references、templates、cases 或 agents |
| `trigger_examples` | 触发这个技能的典型用户表达 |
| `copy_policy` | `internal_user_cultivated_skill_package`、`internal_lightweight_index` 等 |
| `pipeline_role` | 在调用链中的角色 |
| `notes` | 边界说明、替代关系、风险和维护备注 |

## `catalog/claude-plugins.json`

`catalog/claude-plugins.json` 是 Claude Code plugin 分发映射，回答“哪些源技能被打包成哪个可安装插件”。

默认只把自培养、高频复用技能、已晋升外部技能和 `qihang-skill-index` 写入这个文件。未晋升外部收藏技能通过索引引用，不作为完整插件分发。

每个插件至少应包含：

| 字段 | 含义 |
| --- | --- |
| `name` | 插件 ID，也是安装后的命名空间 |
| `displayName` | 插件展示名 |
| `description` | 插件用途 |
| `keywords` | 检索关键词 |
| `distributionStatus` | 是否进入分发层 |
| `distributionScope` | 分发范围；当前主要使用 `self_cultivated` 或 `curated_index` |
| `version` | semver 版本号；插件内容变化时必须更新 |
| `releasePolicy` | 更新策略；当前使用 `manual_semver` |
| `skills` | 源技能目录到插件技能目录的映射 |

`skills[]` 中每项至少包含：

| 字段 | 含义 |
| --- | --- |
| `id` | 源技能 ID |
| `sourcePath` | 仓库内源技能目录，必须包含 `SKILL.md` |
| `targetName` | 插件内技能目录名 |

## 记录粒度

技能总账记录能力本身，插件映射记录分发组合。

例如前端设计来源：

- `skills/qihang-skill-index/references/github-skill-index.md` 记录 `frontend-design`、TypeUI、GSAP、Awesome Design Skills 等外部来源和使用边界。
- `docs/workflows/prd-to-frontend.md` 记录 UI 调用链和选择规则。
- 除非某个设计技能被长期验证并重写为自培养核心能力，否则不新增本地技能包。

例如写作、产品和工作流：

- `ai-product-analyzer` 是自培养产品洞察技能，写入 `agent-product`。
- `topic-research-deposition` 和 `qihang-writing-style` 是自培养写作链路技能，写入 `agent-writing`。
- `qihang-skill-index` 是启航外部 GitHub 技能源索引，写入 `qihang-skill-pack`。
- `oss-investment-scorecard` 是已晋升外部技能包，写入 `qihang-skill-pack`，在 product-analysis 中作为结构化投资输出层。
- `qihang-workflow-orchestrator` 是已跑通工作流入口，写入 `qihang-skill-pack`；产品相关能力统一为 `product-analysis`，默认主链是 AI-native 产品视角 -> OSS investment 结构化 -> 可视化。
- `md2wechat`、`agent-reach` 等外部能力由 `qihang-skill-index` 引用。

## 生成规则

运行：

```powershell
.\scripts\build-claude-plugins.ps1
```

脚本会读取 `catalog/claude-plugins.json`，生成：

- `.claude-plugin/marketplace.json`
- `plugins/<plugin-name>/.claude-plugin/plugin.json`
- `plugins/<plugin-name>/skills/<skill-name>/`

生成后用以下命令验证：

```powershell
claude plugin validate .
claude plugin validate .\plugins\agent-product --strict
claude plugin validate .\plugins\agent-writing --strict
claude plugin validate .\plugins\qihang-skill-pack --strict
```

## 禁止事项

- 不在 `catalog/claude-plugins.json` 里写长篇技能正文。
- 不在 `plugins/` 里长期手改源技能。
- 不让插件目录引用仓库外部路径。
- 不把临时实验、网页 prompt 正文或 UI 库源码塞进插件。
- 不让同一个技能在 `catalog/skills.yml` 和插件映射中出现互相矛盾的状态。
