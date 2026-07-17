# 插件内技能记录方式

三层架构总览见 `library-constitution.md`。本文档只讲字段级约定：技能正文只有一份，Claude Code 与 Codex 分别维护自己的分发元数据：

- `.claude-plugin/marketplace.json` — marketplace 入口，列出所有可安装 plugin。
- `plugins/<plugin>/.claude-plugin/plugin.json` — 单个 plugin 的 manifest，含 name / displayName / version / description。
- `.agents/plugins/marketplace.json` — Codex marketplace 入口。
- `plugins/<plugin>/.codex-plugin/plugin.json` — Codex manifest，含相同 name/version、`skills: "./skills/"` 与 interface。

技能正文放在 `plugins/<plugin>/skills/<skill>/SKILL.md`，三层渐进披露：`SKILL.md` → `references/` → `assets/`。

## `.claude-plugin/marketplace.json`

回答"本仓库分发哪些可安装 plugin"。

| 字段 | 含义 |
| --- | --- |
| `name` | marketplace ID |
| `description` | marketplace 用途 |
| `owner` | 维护者 |
| `plugins[]` | 分发的 plugin 列表 |

`plugins[]` 中每项至少包含：

| 字段 | 含义 |
| --- | --- |
| `name` | plugin ID，也是安装后的命名空间 |
| `source` | plugin 目录路径，例如 `./plugins/domain-investment` |
| `version` | semver 版本号；plugin 内容变化时必须更新 |
| `description` | plugin 用途 |

## `plugins/<plugin>/.claude-plugin/plugin.json`

回答"这个 plugin 是什么、版本是多少"。

| 字段 | 含义 |
| --- | --- |
| `name` | plugin ID，与 marketplace.json 中的 `name` 一致 |
| `displayName` | plugin 展示名 |
| `version` | semver 版本号；plugin 包含的技能正文、支撑文件或 manifest 变化时必须 bump |
| `description` | plugin 用途 |
| `author` | 维护者 |

## 记录粒度

技能的元数据分散在三处，各司其职：

- **触发与用途**：写在 `SKILL.md` 的 frontmatter（`name` + `description`）和正文。
- **调用链角色**：写在 orchestrator 的 `references/chains/<chain>.md`。
- **分发关系**：分别写在 Claude/Codex marketplace 和各 plugin 的双 manifest；两端共享 `skills/`。

例如前端设计来源：

- `plugins/skill-index/skills/external-skill-index/references/github-skill-index.md` 记录 `frontend-design`、TypeUI、GSAP、Awesome Design Skills 等外部来源和使用边界。
- `docs/workflows/prd-to-frontend.md` 记录 UI 调用链和选择规则（该 chain 目前是草稿，未挂入 orchestrator 路由表）。
- 除非某个设计技能被长期验证并重写为本地维护核心能力，否则不新增本地技能包。

例如写作、产品和工作流：

- `ai-product-analyzer` 是本地维护的产品洞察技能，进入 `domain-product` plugin。
- `topic-research-deposition` 和 `public-account-writing-style` 是本地维护的写作链路技能，进入 `domain-writing` plugin。
- `external-skill-index` 是本库的外部 GitHub 技能源索引，进入 `skill-index` plugin。
- `domain-investment` 是本库的投资决策工作包，包含研究、产品判断、竞争格局、单位经济、财务模型、评分、估值、DD、跟踪、IC Memo 写作和可视化研报节点。
- `domain-capital-markets` 承接公开市场首次覆盖、股票研究、金融图表、公司资料、投行演示、卖方 M&A 材料与金融交付物 QC；它只提供瓦技能，固定链仍由 orchestrator 路由。
- `oss-investment-scorecard` 已被 `investment-scorecard` 吸收为 reference，不再作为独立默认运行入口。
- `workflow-orchestrator` 是已跑通工作流入口，进入 `orchestrator` plugin；`SKILL.md` 只做路由，具体 chain 压缩到 `references/chains/`。
- Baoyu 中已晋升的 10 个公众号与内容视觉技能随 `domain-writing` 分发，其中 `baoyu-image-gen` 为非 Codex 运行时提供可配置图像生成后端；上游 URL、commit 与许可仍由 `external-skill-index` 记录，`agent-reach` 等其余外部能力继续由索引引用。

## 验证规则

改动技能正文或 plugin manifest 后，运行：

```powershell
claude plugin validate . --strict
node scripts/validate-repository.mjs --base HEAD
```

第一项验证 Claude plugin schema；第二项验证 Claude/Codex 双 marketplace、双 manifest、版本一致、内容变化已 bump、chain 引用、相对链接和废弃路径。Codex 官方 validator 可用时还须逐插件运行。任一失败都不得推送。

## 禁止事项

- 不在 `plugin.json` 里写长篇技能正文。
- 不让插件目录引用仓库外部路径；需要的技能文件必须复制进插件目录。
- 不把临时实验、网页 prompt 正文或 UI 库源码塞进插件。
- 不让同一个技能在 marketplace.json 和 plugin.json 中出现互相矛盾的元数据。
- 不手创建 skill 文件夹——用 `skill-architecture` 元技能生成 spec 合规骨架。
