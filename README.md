# Agent Skill Library

不是 prompt 收藏夹。不是知识库附属目录。

是 Agent 的运行能力库——给 Codex / Claude / 后续 agent 用的、可调用、可组合、可配置的工作能力。

本库面向需要维护和调用 Agent 技能的使用者。外部技能默认只做索引（URL + 来源 + 调用方式），只有许可证、边界、复用价值都清楚时才 vendored 进 `plugins/`。网页 prompt、UI 库源码、项目资料、一次性实验——不进正式库。

## 架构：三层 plugins

源技能直接维护在 `plugins/` 下，按角色分层。没有独立的 `skills/` 源目录，没有 `catalog/` 总账，没有"先生成再分发"的两步流程——`plugins/` 既是源也是分发。

```
plugins/
├── workspace-core/      # 个人 Workspace 种子 Skill：目标、发现、培养、演化与整理
├── foundation/          # 元层：principles Agent 操作原则 + skill-architecture 元技能
├── orchestrator/        # workflow-orchestrator：唯一工作流路由入口
├── skill-index/         # external-skill-index：外部 GitHub 技能索引
├── domain-writing/      # 公众号写作瓦技能
├── domain-investment/   # 投资决策瓦技能（研究、模型、估值、IC memo）
├── domain-capital-markets/ # 公开市场研究、首次覆盖与投行交付物瓦技能
└── domain-product/      # AI 产品分析瓦技能
```

每个 plugin 共用一份 `skills/` 正文，同时带有 `.claude-plugin/plugin.json` 和 `.codex-plugin/plugin.json`。Claude Code 与 Codex 只读取各自的分发元数据，不复制第二份技能正文。技能正文放 `plugins/<plugin>/skills/<skill>/SKILL.md`，三层渐进披露：`SKILL.md` → `references/` → `assets/`。

| 运行时 | Marketplace | Plugin manifest | 技能正文 |
| --- | --- | --- | --- |
| Claude Code | `.claude-plugin/marketplace.json` | `plugins/<plugin>/.claude-plugin/plugin.json` | `plugins/<plugin>/skills/` |
| Codex | `.agents/plugins/marketplace.json` | `plugins/<plugin>/.codex-plugin/plugin.json` | 同一份 `plugins/<plugin>/skills/` |

## 技能清单

**Foundation**

- `principles` — Agent 操作原则。认知原型 + DO/DON'T + CALIBRATION。被动参考库，不是全局强制规则。
- `skill-architecture` — 元技能。新增技能/领域/链时生成 spec 合规骨架，更新 marketplace.json。瓦技能可独立存在，chain 是可选主动编排。**不要手创建 skill 文件夹。**

**Workspace Core**

- `initialize-workspace` — 创建最小 Git-backed 个人工作区，记录现有 Library 为第一优先上游；不预装领域能力，不生成索引、缓存或双宿主源树。
- `pursue-goal` — 从用户一句最终目标匹配场景 Skill，按 Benchmark 连续执行和返工；缺能力时先培养本地 Trial，最终成品不暴露内部协议术语。
- `discover-capability` — 个人 Workspace 缺能力时，按“当前 Workspace → 现有 Agent Skill Library → 本地候选/上游 → 互联网”寻找来源并沉淀候选；不直接安装或运行。
- `cultivate-skill` — 完整读取候选包并在个人 Workspace 培养为带来源说明和内嵌完成标准的本地 Trial Skill；不靠额外质量 YAML，也不静默晋升。
- `cultivate-workflow` — 把真实 Case 中反复成立的完整 Skill 顺序保存为场景 Skill、极简 Workflow 和最终结果 Benchmark；不创建第二套节点、质量或状态系统。
- `evolve-workspace` — 只把用户明确反馈或上游候选转成最小可验证改动；区分单次与长期范围，不从行为信号推断偏好，也不自动覆盖本地真源。

**Orchestrator + Index**

- `workflow-orchestrator` — 已跑通工作流的统一路由入口。`SKILL.md` 只做路由，具体 chain 压缩在 `references/chains/`。
- `external-skill-index` — 两层生态索引：本地技能 vs GitHub 外部候选；只在稳定 Run 外发现和沉淀，不在运行中安装。

**Domain**

| 领域 | 瓦技能 |
| --- | --- |
| `domain-writing` | `wechat-account-corpus-research` · `topic-research-deposition` · `public-account-writing-style` · `baoyu-format-markdown` · `editorial-visual-storytelling` · `baoyu-image-gen` · `baoyu-article-illustrator` · `baoyu-infographic` · `baoyu-diagram` · `baoyu-comic` · `baoyu-cover-image` · `baoyu-markdown-to-html` · `baoyu-post-to-wechat` · `baoyu-compress-image` |
| `domain-investment` | `investment-research` · `investment-ai-product-judgment` · `investment-competitive-landscape` · `investment-unit-economics` · `investment-financial-model-builder` · `investment-scorecard` · `investment-valuation-returns` · `investment-dd` · `investment-thesis-tracking` · `investment-ic-memo-writer` · `investment-visual-report` |
| `domain-capital-markets` | `public-equity-coverage-writer` · `investment-chart-pack` · `financial-company-profile` · `investment-banking-pitch-deck` · `sell-side-ma-materials` · `financial-artifact-qc` |
| `domain-product` | `ai-product-analyzer` |

## 运行链

调用链由 `workflow-orchestrator` 路由，chain 定义在 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/`。

```
公众号选题 → [按需：账号历史/对标账号语料] → agent-reach 搜索 → 公众号编辑判断与深度写作 → Markdown 排版 → 视觉路由（截图/插图/信息图/SVG 图解/知识漫画）与封面 → HTML 预览 → 草稿箱发布
  chain: wechat-writing.md

AI case → 产品判断 → 竞争格局 → 单位经济 → 评分 → 估值 → DD → 论点追踪 → IC memo → 可视化研报
  chain: investment-icmemo.md  ·  doc: docs/workflows/investment-product-to-research-report.md

公开公司 → 事实包 → 竞争格局 → 模型 → 估值 → thesis/业绩前瞻 → 图表 → 首次覆盖 → 金融 QC
  chain: public-equity-coverage.md  ·  doc: docs/workflows/public-equity-coverage.md
```

当前只有 `investment-icmemo.md` 已迁移为 ASL-WEP v0.1 Profile。公众号与公开市场链仍是 Library-native legacy chain；它们可以保留原生工作方法，但在外部能力全部本地 Skill 化并补齐质量合同前，不得作为 ASL-WEP 稳定 Workflow 运行。

## 落盘铁律（所有链继承）

1. 先建 run folder，不许散落文件。run folder 建在**用户当前工作项目目录**下——绝不写进 `plugins/` 或本仓库。不确定项目根就先问。
2. 每个有保留价值的中间产物按 chain 定义落盘。
3. 成品不替代过程包——两者同时存在。

## 双端安装与验证

### Claude Code

```powershell
claude plugin marketplace add qihangzhang-272/agent-skill-library
claude plugin install orchestrator@agent-skill-library
```

Claude Code 读取 `.claude-plugin/`。`orchestrator` 的 Claude manifest 会声明其工作流依赖；`foundation` 与 `domain-product` 可按需单独安装。

### Codex

```powershell
codex plugin marketplace add qihangzhang-272/agent-skill-library
```

Codex 读取 `.agents/plugins/marketplace.json` 与各插件的 `.codex-plugin/plugin.json`。当前 Codex CLI 负责注册 marketplace，单插件安装在 Codex App 的 Plugins 页面完成；安装或升级后新开任务，才会载入新的技能命名空间。项目也可以通过 `.agents/skills/` 直接发现技能，但这只是项目级入口，不替代正式 Codex Plugin 分发。

Codex 不读取 Claude manifest 的 `dependencies`。公众号完整链至少同时安装 `orchestrator` 与 `domain-writing`；需要检索外部技能来源时再安装 `skill-index`。要使用整套架构，应在 Plugins 页面安装 marketplace 中全部 7 个插件。Claude Code 安装 `orchestrator` 时则会按其 manifest 解析领域依赖。

`domain-writing` 自带统一的 `package.json` 与 `bun.lock`，覆盖迁入脚本的运行依赖；`node_modules` 不进入仓库。Bun 默认会在首次脚本执行时安装缺失依赖，禁用自动安装的环境可在该 plugin 根目录运行 `bun install --frozen-lockfile`。

### 仓库门禁

```powershell
# 在本仓库根目录；提交和推送前必须两项都通过
claude plugin validate . --strict
node scripts/validate-repository.mjs --base HEAD
```

第一项验证 Claude Code schema；第二项同时检查 Claude/Codex 双 manifest、两个 marketplace、版本一致性、技能发现、chain 引用和相对链接。改动 plugin 内容后，Claude 与 Codex manifest 必须使用同一版本，并同步 Claude marketplace。本仓库已启用 `.githooks/pre-push` 与 GitHub Actions 双门禁；首次 clone 后执行 `git config core.hooksPath .githooks`。

## 边界

- `ai-product-analyzer` 是跨环境复用例外，随包携带 `references/`，可独立复制到项目或用户级 skills 目录。
- `external-skill-index` 是外部技能统一收纳入口。`public-account-writing-style` 是 `wechat-writing` chain 的唯一正文 owner；外部写作技能只保留来源记录，不复制进本库，也不进入运行链。Baoyu 中经过维护者晋升的 10 个公众号及内容视觉技能继续原样迁入 `domain-writing`。`wechat-account-corpus-research` 只维护独立编写的数据与授权契约，外部 exporter、受限参考源和高风险增强服务的 URL、commit、许可证与调用边界只在索引维护。agent-reach、humanizer-zh、frontend-design、GSAP、TypeUI、Taste Skill、Impeccable 等仍保留为外部来源。
- `oss-investment-scorecard` 已降级为 `investment-scorecard` 的内部 reference，不要直接调用旧入口。
- 投资与资本市场领域都只放瓦技能；所有固定链都由 `workflow-orchestrator` 路由，不设第二个调度器。
- 本仓库和 Product Hunter 没有长期关系。历史借用只算导入 provenance。

## 治理文档

- [docs/governance/library-constitution.md](docs/governance/library-constitution.md) — 长期约束、三层架构、收录判断、引用策略与复制边界
- [docs/governance/catalog-schema.md](docs/governance/catalog-schema.md) — 插件内技能记录方式
- [docs/workflows/](docs/workflows/) — 跨技能工作流说明

## 仓库工作规则

- **永远在 main 分支操作**。不新开 git worktree，不开长期特性分支——直接在 main 上改、验证、提交。需要隔离试验时用 `git stash` 或另起 clone，不在仓库里维护并行分支。
- **commit 格式统一为** `YYYY-MM-DD HH:mm｜中文变更描述`，不使用 `feat()` / `fix()` / `merge:` 等其他格式。示例：`2026-07-07 14:30｜修复 principles 描述滞后并 bump version`。
- 正文改动后的 version bump 与 validate 见「安装与验证」节。
