# Agent Skill Library

不是 prompt 收藏夹。不是知识库附属目录。

是 Agent 的运行能力库——给 Codex / Claude / 后续 agent 用的、可调用、可组合、可配置的工作能力。

本库面向需要维护和调用 Agent 技能的使用者。外部技能默认只做索引（URL + 来源 + 调用方式），只有许可证、边界、复用价值都清楚时才 vendored 进 `plugins/`。网页 prompt、UI 库源码、项目资料、一次性实验——不进正式库。

## 架构：三层 plugins

源技能直接维护在 `plugins/` 下，按角色分层。没有独立的 `skills/` 源目录，没有 `catalog/` 总账，没有"先生成再分发"的两步流程——`plugins/` 既是源也是分发。

```
plugins/
├── foundation/          # 元层：principles Agent 操作原则 + skill-architecture 元技能
├── orchestrator/        # workflow-orchestrator：唯一工作流路由入口
├── skill-index/         # external-skill-index：外部 GitHub 技能索引
├── domain-writing/      # 公众号写作瓦技能
├── domain-investment/   # 投资决策瓦技能（研究、模型、估值、IC memo）
├── domain-capital-markets/ # 公开市场研究、首次覆盖与投行交付物瓦技能
└── domain-product/      # AI 产品分析瓦技能
```

每个 plugin 有 `.claude-plugin/plugin.json`。技能正文放 `plugins/<plugin>/skills/<skill>/SKILL.md`，三层渐进披露：`SKILL.md` → `references/` → `assets/`。

## 技能清单

**Foundation**

- `principles` — Agent 操作原则。认知原型 + DO/DON'T + CALIBRATION。被动参考库，不是全局强制规则。
- `skill-architecture` — 元技能。新增技能/领域/链时生成 spec 合规骨架，更新 marketplace.json。瓦技能可独立存在，chain 是可选主动编排。**不要手创建 skill 文件夹。**

**Orchestrator + Index**

- `workflow-orchestrator` — 已跑通工作流的统一路由入口。`SKILL.md` 只做路由，具体 chain 压缩在 `references/chains/`。
- `external-skill-index` — 两层生态索引：本地技能 vs GitHub 外部技能，探测与提示安装。

**Domain**

| 领域 | 瓦技能 |
| --- | --- |
| `domain-writing` | `public-account-writing-style` · `topic-research-deposition` |
| `domain-investment` | `investment-research` · `investment-ai-product-judgment` · `investment-competitive-landscape` · `investment-unit-economics` · `investment-financial-model-builder` · `investment-scorecard` · `investment-valuation-returns` · `investment-dd` · `investment-thesis-tracking` · `investment-ic-memo-writer` · `investment-visual-report` |
| `domain-capital-markets` | `public-equity-coverage-writer` · `investment-chart-pack` · `financial-company-profile` · `investment-banking-pitch-deck` · `sell-side-ma-materials` · `financial-artifact-qc` |
| `domain-product` | `ai-product-analyzer` |

## 运行链

调用链由 `workflow-orchestrator` 路由，chain 定义在 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/`。

```
公众号选题 → agent-reach 搜索 → 公众号编辑写作 → Baoyu 配图、排版与草稿箱发布
  chain: wechat-writing.md

AI case → 产品判断 → 竞争格局 → 单位经济 → 评分 → 估值 → DD → 论点追踪 → IC memo → 可视化研报
  chain: investment-icmemo.md  ·  doc: docs/workflows/investment-product-to-research-report.md

公开公司 → 事实包 → 竞争格局 → 模型 → 估值 → thesis/业绩前瞻 → 图表 → 首次覆盖 → 金融 QC
  chain: public-equity-coverage.md  ·  doc: docs/workflows/public-equity-coverage.md
```

## 落盘铁律（所有链继承）

1. 先建 run folder，不许散落文件。run folder 建在**用户当前工作项目目录**下——绝不写进 `plugins/` 或本仓库。不确定项目根就先问。
2. 每个有保留价值的中间产物按 chain 定义落盘。
3. 成品不替代过程包——两者同时存在。

## 安装与验证

```powershell
# 在本仓库根目录；提交和推送前必须两项都通过
claude plugin validate . --strict
node scripts/validate-repository.mjs --base HEAD
```

改动技能正文后，bump 对应 `plugins/<plugin>/.claude-plugin/plugin.json` 的 `version`，并同步 `.claude-plugin/marketplace.json`。本仓库已启用 `.githooks/pre-push` 与 GitHub Actions 双门禁；首次 clone 后执行 `git config core.hooksPath .githooks`。

## 边界

- `ai-product-analyzer` 是跨环境复用例外，随包携带 `references/`，可独立复制到项目或用户级 skills 目录。
- `external-skill-index` 是外部技能统一收纳入口。Baoyu、agent-reach、humanizer-zh、frontend-design、GSAP、TypeUI、Taste Skill、Impeccable 等保留上游来源与使用边界，不把完整外部仓库堆进本库。
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
