# 资本市场技能晋升与调用链迁移实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标：** 将 qihang-ic-memo-writer 下隐藏的完整金融交付技能提炼为边界清楚、可独立触发的瓦技能，保留现有 Investment IC Memo 主链，并在验证门槛通过后新增 Public Equity Coverage 链。

**架构：** domain-investment 继续拥有事实、判断、估值和投资决策能力；新增 domain-capital-markets，拥有公开市场研报和金融交付物。所有端到端顺序只由 qihang-workflow-orchestrator 编排，任何领域 skill 都不得自行调度其他 skill。

**技术栈：** Claude Code plugin、Markdown SKILL.md、PowerShell、claude plugin validate、DOCX/PPTX/XLSX 交付工具、现有 qihang handoff 协议。

---

## 0. 已确认的架构决策

### 0.1 保留与新增

- 保留现有 plugins/orchestrator/skills/qihang-workflow-orchestrator/references/chains/investment-icmemo.md，默认语义仍是“投资决策 → IC Memo”。
- 新增 domain-investment:qihang-financial-model-builder，负责实际工作簿构建；qihang-valuation-returns 只负责估值、回报和模型结果解释。
- 新增 domain-capital-markets，首批包含：
  - public-equity-coverage-writer
  - investment-chart-pack
  - financial-company-profile
  - investment-banking-pitch-deck
  - sell-side-ma-materials
- 新增 Public Equity Coverage chain，但必须在瓦技能独立验证和两次代表性组合验证通过后才挂入 orchestrator 路由表。

### 0.2 不新增的包装技能

- 不新增 initiating-coverage-orchestrator。
- 不把 task1-company-research、task3-valuation、valuation-methodologies 单独晋升；分别归入现有 research、valuation owner。
- 不把 ib-check-deck 立即晋升为独立 skill；其数字、叙事、语言和视觉检查先进入各金融交付 skill 的 quality contract。
- 不把 CIM 和 Teaser 拆成两个 skill；合并为 sell-side-ma-materials 的两个模式。
- 不把 Tear Sheet 和 Strip Profile 拆成两个 skill；合并为 financial-company-profile 的两个输出模式。
- funding-digest 和 public-equity earnings 暂由现有 investment-research、thesis-tracking 持有；只有独立触发被真实使用后再晋升。

### 0.3 新 chain 与条件步骤

- 最终交付物是 IC Memo：走原 Investment IC Memo chain。
- 最终交付物是首次覆盖、评级与目标价研报：走新 Public Equity Coverage chain。
- Financial Model 只有在用户明确要求 XLSX、三表、DCF/LBO 工作簿、精确敏感性或可审计模型时，才可能成为原 IC chain 的可选步骤。
- Tear Sheet、Strip Profile、Pitch Deck、CIM、Teaser 先作为独立瓦技能；不机械塞入任何默认 chain。

## 1. 迁移映射

| 当前来源 | 目标 owner | 处理 |
| --- | --- | --- |
| references/ic-memo.md | qihang-ic-memo-writer | 提炼 PE deal addendum，删除原文件 |
| initiating-coverage/task1-company-research.md | qihang-investment-research | 提炼 public-company source checklist |
| initiating-coverage/task2-financial-modeling.md | qihang-financial-model-builder | 提炼模型输入、工作簿、审计和 handoff 契约 |
| initiating-coverage/task3-valuation.md | qihang-valuation-returns | 只提炼 price-target handoff；删除重复流程 |
| initiating-coverage/task4-chart-generation.md | investment-chart-pack | 保留图表选择和来源规则；不迁移硬编码示例 |
| initiating-coverage/task5-report-assembly.md | public-equity-coverage-writer | 保留报告结构、输入映射、引用和数字 QA |
| initiating-coverage/valuation-methodologies.md | qihang-valuation-returns | 删除完全重复副本 |
| tear-sheet.md、tear-sheet/*、strip-profile.md | financial-company-profile | 提炼为 Tear Sheet / Strip Profile 两种模式 |
| pitch-deck.md、pitch-deck/* | investment-banking-pitch-deck | 提炼模板映射、版式和交付 QA |
| cim-builder.md、teaser.md | sell-side-ma-materials | 提炼 CIM / Teaser 两种模式 |
| ib-check-deck.md | 各 writer / artifact skill | 提炼通用终审规则，不保留独立入口 |
| funding-digest.md、funding-digest/sector-seeds.md | qihang-investment-research | 删除 writer 中的完全重复副本 |
| earnings-preview-beta.md | qihang-thesis-tracking | 只提炼财季命名、LTM/NTM、claim provenance 等 safeguard |

## 2. 全局成功标准

迁移完成必须同时满足：

1. qihang-ic-memo-writer 只保留最终 IC Memo 汇编职责，不搜索、不建模、不生成 PPTX/DOCX 交付物。
2. domain skill 中不存在 task1 → task5 之类的内部调度器。
3. 每个新 skill 有独立、可区分的 description、输入契约、输出契约、依赖声明和“不该使用”的边界。
4. 新 skill 不包含 /tmp、/mnt/skills、/mnt/user-data、/home/claude 等旧环境硬编码。
5. 所有相对 reference 链接可解析，不引用缺失的 assets、scripts 或 templates。
6. writer 中的三个完全重复副本被删除，仓库不存在同内容双 owner。
7. claude plugin validate . --strict 通过。
8. IC Memo 路由、Public Equity Coverage 路由和独立 artifact skill 的触发测试均通过。
9. 两次代表性 Public Equity Coverage 组合验证使用相同节点顺序和 handoff 后，才允许新增 chain。
10. 每个提交只包含当前任务文件，提交信息符合 YYYY-MM-DD HH:mm｜中文变更描述。

## Task 1：建立执行基线与来源许可门

**文件：**

- 检查：git status 输出的全部未提交文件
- 修改：plugins/skill-index/skills/qihang-skill-index/references/github-skill-index.md
- 修改：plugins/skill-index/.claude-plugin/plugin.json
- 修改：.claude-plugin/marketplace.json

**Step 1：隔离现有工作树**

运行：

~~~powershell
git status --short
git diff --name-only
git diff --cached --name-only
~~~

预期：明确现有未提交修改的 owner。不得把 marketplace、orchestrator manifest 或现有 chain 的未完成修改混入本迁移提交；若存在重叠，先完成或拆分已有改动。

**Step 2：记录迁移前基线**

运行：

~~~powershell
$root = "plugins/domain-investment/skills/qihang-ic-memo-writer"
$files = Get-ChildItem $root -Recurse -File
$lines = ($files | Get-Content | Measure-Object -Line).Lines
"files=$($files.Count) lines=$lines"
claude plugin validate . --strict
~~~

预期：记录 writer 当前文件数、行数和 validate 基线；若 validate 已失败，先记录原始失败，不把它误算为本迁移造成。

**Step 3：验证上游复制边界**

检查 Anthropic financial-services 上游仓库的：

- 仓库根 URL
- 固定 commit：4bbabc7cd1a474c1667fa05a2bfe58e411dcf9c1
- LICENSE 和可再分发边界
- 本迁移是“用自己的语言提炼”，不是保留上游完整 runtime 副本

在 github-skill-index.md 的 Notes 中补齐 URL、commit、license、目标 domain、替代关系五项。若 license 不允许再分发，停止迁移正文，只保留结构化契约和上游索引。

**Step 4：提交来源登记**

只暂存 skill-index 和对应版本文件，检查 staged diff 后提交：

~~~powershell
git add plugins/skill-index/skills/qihang-skill-index/references/github-skill-index.md
git add plugins/skill-index/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git diff --cached --check
git diff --cached --name-only
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜补全金融技能迁移来源、许可与替代关系"
~~~

## Task 2：新增财务模型构建瓦技能并收紧估值 owner

**文件：**

- 创建：plugins/domain-investment/skills/qihang-financial-model-builder/SKILL.md
- 创建：plugins/domain-investment/skills/qihang-financial-model-builder/references/model-build-contract.md
- 迁移：plugins/domain-investment/skills/qihang-valuation-returns/references/3-statement-model.md
- 迁移：plugins/domain-investment/skills/qihang-valuation-returns/references/dcf-model.md
- 迁移：plugins/domain-investment/skills/qihang-valuation-returns/references/lbo-model.md
- 迁移：plugins/domain-investment/skills/qihang-valuation-returns/references/audit-xls.md
- 修改：plugins/domain-investment/skills/qihang-valuation-returns/SKILL.md
- 修改：plugins/domain-investment/.claude-plugin/plugin.json
- 修改：.claude-plugin/marketplace.json

**Step 1：先写失败的结构检查**

运行：

~~~powershell
Test-Path "plugins/domain-investment/skills/qihang-financial-model-builder/SKILL.md"
~~~

预期：False。

**Step 2：用 skill-architecture 模板创建 skill**

SKILL.md 必须包含：

- 触发：明确要求 XLSX、三表、DCF/LBO 工作簿、敏感性、可审计财务模型。
- 输入：已核验历史财务、预测假设、期间、币种、单位、估值日期。
- 核心规则：不搜索；不把缺失值当零；历史、假设、公式、输出分层；所有派生值可追溯。
- 输出：

~~~text
Model type:
Input artifacts:
Historical periods:
Forecast periods:
Assumptions:
Statements and schedules:
Checks passed:
Workbook path:
Data limitations:
Handoff to valuation:
~~~

- 不该使用：只需要情景估值、没有足够财务输入、用户没有要求工作簿时。

**Step 3：迁移模型实现知识**

- 将三表、DCF、LBO、XLS 审计的完整实现规则归 financial-model-builder。
- qihang-valuation-returns 只保留估值方法选择、comps、entry/exit、IRR/MOIC 和 price-target 解释。
- 如 DCF/LBO 文件中同时含“方法选择”和“工作簿实现”，先把方法选择提炼进 valuation-methodologies，再迁移实现正文。
- 不保留两份完整副本，不允许 sibling skill 的脆弱相对路径引用。

**Step 4：验证边界**

运行：

~~~powershell
rg -n "build spreadsheets|three-statement|audit-xls|workbook" "plugins/domain-investment/skills/qihang-valuation-returns/SKILL.md"
rg -n "XLSX|three-statement|DCF|LBO|audit" "plugins/domain-investment/skills/qihang-financial-model-builder/SKILL.md"
claude plugin validate . --strict
~~~

预期：valuation 不再负责生成 workbook；model-builder 明确负责实际模型交付。

**Step 5：提交**

~~~powershell
git add plugins/domain-investment/skills/qihang-financial-model-builder
git add plugins/domain-investment/skills/qihang-valuation-returns
git add plugins/domain-investment/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜提炼财务模型构建技能并明确估值职责边界"
~~~

## Task 3：创建资本市场 domain 与 Coverage Writer

**文件：**

- 创建：plugins/domain-capital-markets/.claude-plugin/plugin.json
- 创建：plugins/domain-capital-markets/skills/public-equity-coverage-writer/SKILL.md
- 创建：plugins/domain-capital-markets/skills/public-equity-coverage-writer/references/report-structure.md
- 创建：plugins/domain-capital-markets/skills/public-equity-coverage-writer/references/assembly-quality.md
- 修改：.claude-plugin/marketplace.json

**Step 1：写失败的存在性检查**

~~~powershell
Test-Path "plugins/domain-capital-markets/.claude-plugin/plugin.json"
Test-Path "plugins/domain-capital-markets/skills/public-equity-coverage-writer/SKILL.md"
~~~

预期：均为 False。

**Step 2：创建非空 domain**

plugin.json：

- name：domain-capital-markets
- version：0.1.0
- description：公开市场研报、公司资料和投行交付物瓦技能
- author：与其他 domain 保持一致

不要先创建空 plugin；manifest 与第一个可运行 skill 同一提交落地。

**Step 3：创建 Coverage Writer**

它只消费 handoff，不做搜索、模型、估值或图表生成。输入至少包括：

- fact pack
- competitive landscape
- financial model handoff
- valuation / price target
- thesis / catalysts / risks
- chart manifest

输出至少包括：

~~~text
Coverage object:
Rating:
Price target:
Investment thesis:
Estimate summary:
Valuation:
Catalysts:
Risks:
Source and number gaps:
Report path:
~~~

report-structure.md 只保留机构研报章节和输入映射；assembly-quality.md 只保留引用、数字、期间、单位、评级与目标价一致性规则。删除“使用全部 token”“一次只跑一个 task”等旧调度指令。

**Step 4：验证**

~~~powershell
rg -n "task 1|task 2|task 3|task 4|task 5|wait for user" "plugins/domain-capital-markets/skills/public-equity-coverage-writer"
claude plugin validate . --strict
~~~

预期：rg 无调度命中；validator 通过。

**Step 5：提交**

~~~powershell
git add plugins/domain-capital-markets .claude-plugin/marketplace.json
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜新增公开市场首次覆盖成稿技能与资本市场领域"
~~~

## Task 4：创建 Investment Chart Pack

**文件：**

- 创建：plugins/domain-capital-markets/skills/investment-chart-pack/SKILL.md
- 创建：plugins/domain-capital-markets/skills/investment-chart-pack/references/chart-selection.md
- 创建：plugins/domain-capital-markets/skills/investment-chart-pack/references/chart-quality.md
- 修改：plugins/domain-capital-markets/.claude-plugin/plugin.json
- 修改：.claude-plugin/marketplace.json

**Step 1：定义图表契约**

- 只消费批准后的表格、模型和估值 handoff。
- 每张图必须记录 chart id、问题、数据文件、字段、期间、单位、计算、来源、输出路径。
- 不规定必须生成 25–35 张；只生成能回答研究问题的图。
- 不迁移 task4 中的硬编码公司数据、注释式伪实现或未声明 pip 安装。

输出：

~~~text
Chart pack path:
Chart manifest:
Charts generated:
Charts skipped:
Source gaps:
Visual QA:
Handoff to coverage writer:
~~~

**Step 2：建立最小 fixture 验证**

使用一个本地小型 CSV fixture 验证：

- 收入与增长图
- 利润率图
- 估值敏感性图
- manifest 中的期间、单位和来源映射

如果需要固定脚本，只有在代表性 fixture 通过后才创建 scripts/render_chart_pack.py；否则先保持高自由度说明，不把未经测试的旧代码迁入。

**Step 3：静态检查**

~~~powershell
rg -n "hardcoded|example company|pip install|/tmp|/mnt/" "plugins/domain-capital-markets/skills/investment-chart-pack"
claude plugin validate . --strict
~~~

预期：无旧环境和硬编码示例。

**Step 4：提交**

~~~powershell
git add plugins/domain-capital-markets/skills/investment-chart-pack
git add plugins/domain-capital-markets/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜提炼投资图表包技能并建立数据来源契约"
~~~

## Task 5：创建 Financial Company Profile

**文件：**

- 创建：plugins/domain-capital-markets/skills/financial-company-profile/SKILL.md
- 创建：plugins/domain-capital-markets/skills/financial-company-profile/references/tear-sheet.md
- 创建：plugins/domain-capital-markets/skills/financial-company-profile/references/strip-profile.md
- 创建：plugins/domain-capital-markets/skills/financial-company-profile/references/audience-variants.md
- 创建：plugins/domain-capital-markets/skills/financial-company-profile/references/artifact-quality.md
- 修改：plugins/domain-capital-markets/.claude-plugin/plugin.json
- 修改：.claude-plugin/marketplace.json

**Step 1：合并而非复制**

一个 skill 支持两个 mode：

- tear-sheet：一至两页 DOCX/PDF
- strip-profile：一至四页 PPTX

受众作为参数：

- equity research
- investment banking / M&A
- corporate development
- sales / business development

**Step 2：重写依赖边界**

- S&P/Kensho 只能是可选数据 provider，不是必备运行时。
- 如果 provider 不可用，消费 qihang-investment-research 的 fact pack。
- 所有缺失字段明确标记，不用训练知识补管理层、持股或最新财务。
- 删除 /tmp、/mnt/user-data、/mnt/skills/public/docx 和缺失 examples 依赖。
- DOCX/PPTX 输出必须声明所用文档或演示文稿能力。

**Step 3：验证触发区分**

测试以下提示：

1. “给我做一页英伟达 equity research tear sheet” → financial-company-profile / tear-sheet。
2. “做一页并购目标 strip profile” → financial-company-profile / strip-profile。
3. “这个 AI 项目值不值得投” → 不触发该 skill。

**Step 4：提交**

~~~powershell
git add plugins/domain-capital-markets/skills/financial-company-profile
git add plugins/domain-capital-markets/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜合并并提炼公司资料与条带式简介技能"
~~~

## Task 6：创建 Pitch Deck 与 Sell-side M&A 交付技能

**文件：**

- 创建：plugins/domain-capital-markets/skills/investment-banking-pitch-deck/SKILL.md
- 创建：plugins/domain-capital-markets/skills/investment-banking-pitch-deck/references/template-mapping.md
- 创建：plugins/domain-capital-markets/skills/investment-banking-pitch-deck/references/presentation-quality.md
- 创建：plugins/domain-capital-markets/skills/sell-side-ma-materials/SKILL.md
- 创建：plugins/domain-capital-markets/skills/sell-side-ma-materials/references/cim.md
- 创建：plugins/domain-capital-markets/skills/sell-side-ma-materials/references/teaser.md
- 创建：plugins/domain-capital-markets/skills/sell-side-ma-materials/references/disclosure-quality.md
- 修改：plugins/domain-capital-markets/.claude-plugin/plugin.json
- 修改：.claude-plugin/marketplace.json

**Step 1：Pitch Deck 只保留稳定能力**

- 输入必须有用户模板和已批准的数据 handoff。
- 保留 template inventory、content mapping、data gap、数字一致性、渲染验收。
- 不原样迁移 492 行 OOXML 手册；标准工具能完成的操作不用 XML。
- 只有确实需要底层 XML 且有 fixture 验证时，才增加最小 XML reference。
- calculation-standards 中的估值公式由 qihang-valuation-returns 持有；Pitch Deck 只核对展示值和 handoff 一致。

**Step 2：CIM 与 Teaser 合并**

- CIM mode：sell-side 完整销售信息材料。
- Teaser mode：匿名、短版、用于初步接触。
- 输入必须包含交易背景、批准披露范围、匿名化要求和来源材料。
- skill 不自行研究或估值；缺输入时返回 required-input checklist。

**Step 3：验证**

测试：

1. “基于这个模板和已批准估值做 pitch deck” → pitch-deck。
2. “生成匿名 sell-side teaser，不暴露公司名” → sell-side-ma-materials / teaser。
3. “编写完整 CIM” → sell-side-ma-materials / cim。
4. “写 IC Memo” → 均不触发。

运行：

~~~powershell
rg -n "reference/|/mnt/|/tmp|extract_numbers.py|report-template.md" "plugins/domain-capital-markets/skills"
claude plugin validate . --strict
~~~

预期：没有坏路径或未声明依赖。

**Step 4：提交**

~~~powershell
git add plugins/domain-capital-markets/skills/investment-banking-pitch-deck
git add plugins/domain-capital-markets/skills/sell-side-ma-materials
git add plugins/domain-capital-markets/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜提炼投行演示文稿与卖方并购材料技能"
~~~

## Task 7：把未晋升内容归还现有 owner

**文件：**

- 创建：plugins/domain-investment/skills/qihang-investment-research/references/public-company-research.md
- 修改：plugins/domain-investment/skills/qihang-investment-research/SKILL.md
- 修改：plugins/domain-investment/skills/qihang-thesis-tracking/references/earnings-preview.md
- 创建：plugins/domain-investment/skills/qihang-ic-memo-writer/references/memo-assembly.md
- 创建：plugins/domain-investment/skills/qihang-ic-memo-writer/references/quality-checklist.md
- 创建：plugins/domain-investment/skills/qihang-ic-memo-writer/references/pe-deal-addendum.md
- 修改：plugins/domain-investment/skills/qihang-ic-memo-writer/SKILL.md
- 修改：plugins/domain-investment/.claude-plugin/plugin.json
- 修改：.claude-plugin/marketplace.json

**Step 1：Research 提炼**

public-company-research.md 只保留：

- 公告、财报、电话会、监管文件等信源优先级
- 公司、行业、竞争、财务历史的 fact-pack 字段
- 每个事实的期间、单位和来源

不迁移 initiating coverage 的调度、写作和估值指令。

**Step 2：Earnings 提炼**

合并进现有 earnings-preview.md：

- 财年与自然年命名
- LTM/NTM 口径
- 原文引用完整性
- 多步计算复核
- claim-level provenance
- 中间结构化文件是数字单一事实源

不迁移 HTML 模板、Kensho 强绑定或 POSIX 路径。

**Step 3：IC Memo Writer 收缩**

SKILL.md 只引用：

- memo-assembly.md
- quality-checklist.md
- pe-deal-addendum.md

writer 不再列出 initiating coverage、tear sheet、strip profile、CIM、teaser、pitch deck、funding digest、earnings preview。

**Step 4：提交**

~~~powershell
git add plugins/domain-investment/skills/qihang-investment-research
git add plugins/domain-investment/skills/qihang-thesis-tracking
git add plugins/domain-investment/skills/qihang-ic-memo-writer
git add plugins/domain-investment/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜归并公开公司研究、财报跟踪与 IC Memo 终审规则"
~~~

## Task 8：删除 IC Memo Writer 旧技能包

**文件：**

- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/initiating-coverage.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/initiating-coverage/
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/tear-sheet.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/tear-sheet/
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/strip-profile.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/pitch-deck.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/pitch-deck/
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/cim-builder.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/teaser.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/ib-check-deck.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/funding-digest.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/funding-digest/
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/earnings-preview-beta.md
- 删除：plugins/domain-investment/skills/qihang-ic-memo-writer/references/ic-memo.md

**Step 1：迁移完整性门**

删除前逐项确认 Task 2–7 的目标文件存在；任何目标不存在时停止，不执行对应删除。

**Step 2：删除旧文件**

只删除已完成提炼、存在 canonical owner 或可由上游索引恢复的文件。不要删除 qihang-investment-research 和 qihang-valuation-returns 中的 canonical 内容。

**Step 3：检查残留**

~~~powershell
rg -n "initiating-coverage|tear-sheet|strip-profile|cim-builder|teaser|pitch-deck|funding-digest|earnings-preview-beta|ib-check-deck" "plugins/domain-investment/skills/qihang-ic-memo-writer"
rg -n "/mnt/skills|/mnt/user-data|/tmp|/home/claude" "plugins/domain-investment/skills/qihang-ic-memo-writer"
claude plugin validate . --strict
~~~

预期：无旧引用、无旧环境路径、validator 通过。

**Step 4：量化净减**

重新记录 writer 文件数和行数。目标：

- writer 总行数约 200–350
- 从 writer 节点移除约 95% 以上历史内容
- 新增技能合计内容显著小于迁移前 10,113 行

**Step 5：提交**

~~~powershell
git add plugins/domain-investment/skills/qihang-ic-memo-writer
git diff --cached --check
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜删除 IC Memo Writer 中已完成晋升的隐藏技能副本"
~~~

## Task 9：执行独立 skill 触发与契约验证

**测试矩阵：**

| 提示 | 预期 |
| --- | --- |
| 这个 AI 项目值不值得投，给我 IC Memo | 原 investment-icmemo，不触发 Coverage |
| 为某上市公司写首次覆盖、评级和目标价 | Public Equity Coverage 候选组合 |
| 根据已审核历史数据建立三表和 DCF XLSX | qihang-financial-model-builder |
| 做一页 Corp Dev tear sheet | financial-company-profile / tear-sheet |
| 做一页并购目标 strip profile | financial-company-profile / strip-profile |
| 基于模板生成投行 pitch deck | investment-banking-pitch-deck |
| 做匿名卖方 teaser | sell-side-ma-materials / teaser |
| 做完整 CIM | sell-side-ma-materials / cim |
| 做一份投资研报 | 必须询问“IC Memo 还是首次覆盖” |

每个测试记录：

- selected skill
- rejected adjacent skill
- required inputs
- missing dependencies
- output contract
- 是否出现隐式二次调度

失败标准：

- 一个提示同时触发两个 writer；
- skill 自行调度完整链；
- 缺输入时开始编造或搜索；
- 输出路径写入 plugins/；
- 未声明 DOCX/PPTX/XLSX 依赖。

## Task 10：执行两次 Public Equity Coverage 组合验证

**验证 A：** 成熟盈利上市公司，具备三年历史财务、共识和可比公司。

**验证 B：** 高增长或亏损上市公司，传统 P/E 不适用，需要收入倍数、情景估值和明确数据缺口。

两次都手动按相同顺序调用：

~~~text
qihang-investment-research
→ qihang-competitive-landscape
→ qihang-financial-model-builder
→ qihang-valuation-returns
→ qihang-thesis-tracking
→ investment-chart-pack
→ public-equity-coverage-writer
~~~

通过条件：

- 两次均无需新增中间调度 skill；
- handoff schema 不需要临时改名；
- 节点顺序稳定；
- 每个节点可独立重跑；
- 最终评级、目标价、模型、图表、正文中的数字一致；
- 缺失数据能阻断或降级，不会被当作零。

未通过：回到对应瓦技能修正；不得先建 chain 掩盖问题。

## Task 11：新增 Public Equity Coverage chain

**前置条件：** Task 9 和 Task 10 全部通过。

**文件：**

- 创建：plugins/orchestrator/skills/qihang-workflow-orchestrator/references/chains/public-equity-coverage.md
- 修改：plugins/orchestrator/skills/qihang-workflow-orchestrator/SKILL.md
- 修改：plugins/orchestrator/.claude-plugin/plugin.json
- 创建：docs/workflows/public-equity-coverage.md
- 修改：docs/workflows/README.md
- 修改：README.md
- 修改：docs/governance/library-constitution.md
- 修改：docs/governance/catalog-schema.md
- 修改：.claude-plugin/marketplace.json

**Step 1：定义触发**

只在用户明确要求以下任一最终产物时触发：

- initiating coverage / 首次覆盖
- 上市公司评级与目标价
- 完整公开市场股票研究报告
- 带预测模型和 price target 的机构研报

上市公司身份本身不是充分条件；如果用户说“值不值得投、给投委会看”，仍走 IC Memo。

**Step 2：定义链路**

~~~text
domain-investment:qihang-investment-research
→ domain-investment:qihang-competitive-landscape
→ domain-investment:qihang-financial-model-builder
→ domain-investment:qihang-valuation-returns
→ domain-investment:qihang-thesis-tracking
→ domain-capital-markets:investment-chart-pack
→ domain-capital-markets:public-equity-coverage-writer
~~~

**Step 3：定义落盘协议**

~~~text
research/<YYYY-MM-DD>-<target>-public-equity-coverage/
  01-source-intake.md
  02-fact-pack.md
  03-competitive-landscape.md
  04-financial-model.xlsx
  05-model-audit.md
  06-valuation-price-target.md
  07-thesis-catalysts.md
  08-chart-pack/
      manifest.md
      <chart-files>
  09-initiating-coverage.md
  10-coverage-audit.md
~~~

规则：10-coverage-audit 不通过时必须修订 09，再重新执行 audit。

**Step 4：保持唯一调度**

- orchestrator SKILL.md 只加一条路由。
- chain 只编排，不复制各瓦技能正文。
- public-equity-coverage-writer 不知道自己属于哪条 chain。
- domain-capital-markets 不新增领域 orchestrator。

**Step 5：验证并提交**

~~~powershell
claude plugin validate . --strict
rg -n "public-equity-coverage" README.md docs plugins/orchestrator .claude-plugin/marketplace.json
git diff --check
git add plugins/orchestrator docs README.md .claude-plugin/marketplace.json
git diff --cached --name-only
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "$ts｜新增公开市场首次覆盖调用链与落盘协议"
~~~

## Task 12：评估原 IC chain 的可选模型节点

**默认决策：** 不自动修改原 chain。

只有满足以下条件才改：

1. 至少两次真实 IC Memo 请求明确要求可审计 XLSX；
2. 模型 handoff 显著改善 valuation，而不是只增加交付格式；
3. 未要求模型的 IC Memo 仍可跳过该节点；
4. 可选节点不会改变原有最终文件语义。

若条件通过：

- 修改 investment-icmemo.md，增加显式条件：
  - 用户要求 XLSX、三表、DCF/LBO、精确敏感性或可审计模型时调用 qihang-financial-model-builder；
  - 其他情况直接进入 qihang-valuation-returns。
- 同步 docs/workflows/investment-product-to-research-report.md。
- 为可选 workbook 定义不破坏现有 01–10 文件协议的附加路径。

若条件未通过：不改文件，并把模型 skill 保持为独立调用能力。

## Task 13：最终全库验证

运行：

~~~powershell
claude plugin validate . --strict
git diff --check
rg -n "/mnt/skills|/mnt/user-data|/tmp|/home/claude" plugins/domain-investment plugins/domain-capital-markets
rg -n "task 1|task 2|task 3|task 4|task 5|wait for user" plugins/domain-capital-markets
git status --short
~~~

预期：

- validator 通过；
- 无空白错误；
- 新 domain 无旧环境硬编码；
- 无领域内二次调度；
- working tree 中只剩明确属于本迁移或用户已有的改动。

抽查所有新 SKILL.md：

- YAML 只有 name 和 description；
- description 能区分相邻 skill；
- SKILL.md 控制在 500 行以内；
- references 一层可达；
- 大于 100 行的 reference 有目录；
- runtime artifact 永远写入用户项目工作区。

## 3. 第二阶段候选，不阻塞首批迁移

### funding-market-digest

只有在真实出现固定周报/月报需求，而且 S&P/Kensho 或 provider-independent 输入协议稳定后，才从 qihang-investment-research 的 reference 晋升。晋升时删除旧 canonical reference，避免双 owner。

### public-equity-earnings

只有 earnings preview / earnings review 被独立反复触发时，才从 qihang-thesis-tracking 提炼为事件型 skill。thesis-tracking 继续拥有长期 thesis 状态，earnings skill 只拥有单次事件交付。

### financial-artifact-qc

只有数字抽取、来源映射和 PPTX/DOCX/XLSX 检查脚本被真实实现并通过 fixture 后，才把 ib-check 的概念晋升为独立终审 skill。没有确定性检查能力时，不新增包装入口。

## 4. 回滚策略

- 每个 skill 独立提交；某个 skill 验证失败，只回滚其对应提交，不回滚已通过的 owner 迁移。
- 删除 writer 旧文件必须晚于目标 skill 和 canonical owner 验证。
- 新 chain 是最后一个功能提交；chain 失败可单独移除，不影响独立瓦技能。
- 不使用 git reset --hard 或 checkout --；回滚使用明确的 revert 提交，提交信息仍遵循中文时间格式。
- 上游来源始终保留在 qihang-skill-index，因此即使删除本地旧副本，也能追溯原始 commit。

## 5. 完成定义

本计划完成不是“文件都移动了”，而是：

- IC Memo Writer 从隐藏技能仓库恢复成单一最终写作节点；
- 有价值的金融交付能力成为独立、可触发、可验证的瓦技能；
- Public Equity Coverage 只有在组合验证通过后才成为正式 chain；
- 原 IC Memo chain 保持稳定，模型节点只在证据充分时以显式条件加入；
- 全库 owner、依赖、落盘、版本和来源记录一致。
