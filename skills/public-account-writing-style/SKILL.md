---
name: public-account-writing-style
description: >
  Use when drafting or revising Chinese public-account essays in the library's editorial style. Triggers
  on: "公众号文章", "不像我的风格", "按我的节奏改", "写一篇产品分析", "写 Skill 相关文章", "写一篇深度文章",
  "帮我分析一下这个选题", or when a draft feels too slogan-like, too AI-polished,
  overuses short punchy sentences, or uses "不是…而是…" / "如果…那么…" patterns.
  Also triggers when the user wants structured thinking around a topic before
  writing, account positioning, editorial series, post-publication content review,
  or adapting an existing article for another platform. Account-data collection
  and external publishing remain with their respective tools and authorization.
---

# Public Account Writing Style

## 按任务进入

在 `creator-studio` 中，先遵守该 Mode 的作者主导边界：用户负责核心灵感、详实大纲和最终改稿，AI 不自行起草或代拟论点。仅在用户详实大纲范围内扩充；缺少大纲时提供素材、截图、风格与视觉支持，不运行生成核心论点的起草步骤。内部核查不要求在文章中呈现逻辑编号或框架。中文已有文本可按需交给 `humanizer-zh` 润色，优先保留作者声音、语义与文体，不机械改写自然的排比、连接词或标点。其他任务仍按其已明确的作者分工和编辑范围执行。

账号定位、栏目规划、对标拆解、多平台改编或发布后复盘时，先读 `references/account-editorial-practice.md`，交付对应判断与下一步验证，不强制起草一篇文章。起草、改稿沿用下文适用步骤；已有成稿或授权转载只补当前缺口，不因新增账号方法重写已确认的正文。

## 核心结构：两层

- **Layer 1: Framework（可选脚手架）** -- 文章的结构骨架。可选、可只取局部、可不用。AI 根据题材自主判断是否需要、用哪个、取哪部分。
- **Layer 2: AI-Flavor Filter（强制）** -- 通用 AI 味检测，分结构层 / 语言层 / 认知层三组。强制启用，不可跳过。

Framework 和 Filter 解耦。可以不用任何 Framework，但 Filter 必过。

## 设计理由（为什么是两层不是三层）

原来的三层是 Framework + Voice + Filter。Voice 层强制加载个人 voice，容易制造口头禅、伪造临场感和虚构个人经历--模型会为了"像某个人"而反复使用那套标志句式，反而成了另一种 AI 味。Voice 应该是作者自己的，不是 skill 注入的。移除 Voice 层后，语言质地由 Filter 的"该避免什么"来约束，而不是由"该模仿谁"来注入。

Framework 改可选：不同题材需要不同结构自由度。探索型 essay 可能不需要任何框架（meander 本身就是结构）；产品分析可能只取 SCQA 的开场。强制"选一个完整框架、逐步确认、默认 5000 字"会让文章天然形成论证流水线。

## 工作流（强制）

### Step 0: 理解写作场景

读用户给的题材、原始诉求、已有材料。
同时从已有上下文确定主要读者、本文在账号中的作用和读完能获得什么；简记在已有编辑判断中即可，不另造表单。区分吸引合适读者、建立信任、解释问题和商业转化的主要目标。已确认的信息直接复用，不反复提问；不为了流量擅自改变账号方向。
如果用户只给了一个话题但没有任何材料，先做一轮澄清问答，不要直接开写。澄清要问：
- 是什么题材类型？（产品分析 / 复杂概念解释 / 探索型 essay / 新闻资讯 / ...）
- 用户自己有没有论点？还是想边写边发现？
- 有没有 deadline / 字数约束？

### Step 1: 编辑判断（强制，在选框架之前）

在选框架、起草之前，先对素材做编辑判断，落盘到 `01.5-editorial-judgment.md`，写五项：

1. **竞争解释** -- 对同一现象，有哪些不同的解释路径？它们各自站不站得住？
2. **反证** -- 哪些事实会反驳我倾向的解释？我有没有回避它们？
3. **未知项** -- 哪些东西我其实不知道、素材也没覆盖？是继续查还是带着未知写？
4. **暂时结论** -- 基于现在的素材，我敢说到什么程度？哪里是判断、哪里是猜测？
5. **删除哪些材料** -- 收集到的素材里，哪些不进最终文章？（素材是原料，不是装饰品。大多数收集到的材料永远不应该在最终草稿中被命名。）

在“暂时结论”中说清本文的信息增量与依据：真实试用、可核查案例、新的比较或推理，哪一项让读者有理由读本篇。原创分析与授权转载分开评估；转载可以凭选材和编排服务读者，保留署名和授权边界，不强塞作者未说过的观点。

这一步在"素材"和"成稿"之间加一层判断，避免素材直接堆进文章变成综述，也避免带着预设结论找证据。这层判断比选框架更重要。

### Step 2: 选 Framework（可选）

1. 加载 `references/_index-frameworks.md` 信号路由表
2. 根据题材特征，**自主判断**是否需要框架、用哪个、取哪部分。框架是脚手架不是模具：
   - 可以选一个完整框架
   - 可以只取一个框架的局部（比如只用 SCQA 的 S+C 铺开场，不用 Q+A）
   - 可以组合多个框架的局部
   - 可以不用任何框架（编辑判断本身已经够支撑结构时）
3. 如果选了框架，加载 `references/frameworks/<chosen>.md`，按需取用
4. 向用户告知选择和理由。**不强制逐步确认**，除非用户明确要求。
5. 框架是脚手架：写到一半发现框架不适合，可以丢掉，不要为了走完框架而硬撑。

### Step 3: 起草

基于编辑判断 + 可选框架起草。字数由题材和素材决定，不设默认下限。2000 字能说清的就 2000 字，需要 8000 字的就 8000 字。

### Step 4: 事实审校

草稿完成后，核对事实：
- 引用是否准确、数字是否有出处
- 人物身份和时间是否对
- 引用语是否忠实（不为了对偶或排比而曲解源材料）
- 英文引用是否给了中文翻译（见下方翻译规则）
- 标题、封面与开头的承诺是否在正文兑现；开头尽早交代具体问题和阅读价值，后文要继续提供证据、解释或应用，不靠故意藏答案延长阅读。
- 涉及同质化时检查观点、证据和用途是否只是重复已有内容，不能把换词比例或“AI 率”当成原创与质量结论。第三方报告按 `references/account-editorial-practice.md` 核对具体问题后取舍。

如果用户明确要求外部审稿，在事实审校后先落一份短的 `review-brief.md`：写清文章作用、目标读者、核心论点、数字来源、视觉计划、已知限制和希望审稿人回答的 3–5 个问题。再通过当前 Host 已发现的原生审稿宿主发送；审稿宿主不可用时记录“未执行”和原因，不把准备好的 brief 说成已完成审稿。外部意见只作为编辑输入，不能覆盖用户的核心立场、来源边界或 ContentAny 发布门禁，也不把一次审稿自动升级为全局 Mode 规则。

### Step 5: AI-Flavor Filter 三层审校（强制）

1. 完整加载 `references/ai-flavor-filter/checklist.md`，不得先自行概括、改写或压缩规则再执行
2. 先按结构层 / 语言层 / 认知层逐组扫描，再执行清单中的改写前置约束、内容与证据、格式、分场景和增量检查
3. 判断标准是**频率、分布、功能**，不是简单禁词。"反而""卡住""功能性小标题"出现一次不构成问题；整篇均匀出现才是模型指纹。
4. 发现问题时只做必要的组织、删减、顺句和排版；保留原文含义、事实、逻辑和因果。如果原句已经自然、准确、清楚，不改。
5. **去 AI 味不制造另一种 AI 味**：不能为了像真人而强制跑题、说脏话、重复观点、虚构凌晨读论文或咖啡馆写笔记。真实的经验不足时，应增加事实、观察和推理过程，不能编造个人经历。
6. 单独执行改写任务时，只交付改写后的文本，除非用户明确要求改动清单或解释。端到端写作链仍在过程文件中保留审校记录。

### Step 6: 交付

- 草稿全文
- 标注：是否用了 Framework / 哪个 / 取了哪部分；编辑判断的五项结论；AI 味审校修了什么
- 简要说明主要的结构选择

## 配图建议规则

Weave picture cues directly into the body at the natural visual break of a section -- after the core argument lands and before the next paragraph picks up.

Format: `[📷 配图建议：这里放 X 的截图/生成图，承接上文的 Y 论证点，视觉上突出 Z]`

A good cue answers three questions: what image, which argument it serves, and what it visually emphasizes.

在端到端 wechat-writing chain 中，这些 cue 只是候选位置，不是最终视觉文案。下游 `editorial-visual-storytelling` 负责把候选位置改写为 `Viewer job`、人/材料锚点和 `Scene fact`，再由 Visual Copy Desk 生成候选并确定允许画内文字；渲染技能不得直接把本节小标题、文章金句或 cue 原句搬进图片。

Rules:
- Never lean on the cue as a crutch for weak prose. Text must carry the argument.
- One cue per major section or pivotal turn; don't carpet-bomb every two paragraphs.
- Only suggest images that actually exist in the research folder, or generated concepts a human can picture. Don't hallucinate screenshots.
- Cues in Chinese, inline. Don't hoist into a separate appendix.

## English-to-Chinese Translation Rule

When quoting English source material in a Chinese article, **always provide a Chinese translation immediately after the English text**.

The translation should be natural Chinese -- capture meaning and tone, not grammar. For short embedded terms ("prompt", "loop", "agent"), inline translation is not required if already established. For full sentences or substantive clauses, always translate. When the English quote is the punchline of a section, the Chinese translation should carry equivalent weight.

## Output Expectations

**New article:** 不设默认字数下限。完整草稿，除非用户只要大纲。
**Revision:** 保留用户的论点和事实。先修结构/语言/认知层的 AI 味，再提风格建议。

## Reference Files Routing

本 skill 用渐进式加载。SKILL.md 是路由骨架，详细内容在 `references/`，按需加载。

| 文件 | 何时加载 |
|---|---|
| `references/_index-frameworks.md` | Step 2 选框架时（可选，不选框架就不加载） |
| `references/frameworks/<name>.md` | 选定框架后按需加载，可只读需要的部分 |
| `references/ai-flavor-filter/checklist.md` | Step 5 强制扫描 |
| `references/skill-methodology-writing.md` | 题材是 agent skills / context engineering / prompt workflows / writing systems 时按需加载 |
| `references/account-editorial-practice.md` | 账号定位、栏目规划、对标拆解、标题与开头优化、多平台改编、内容复盘或第三方检测报告评估 |

## 完成标准

- 完成本 Skill 正文中 Mode、Output、Handoff 或最终交付步骤声明的全部适用产物，不因它处在较大任务中而缩减。
- 执行正文已有的检查清单、视觉检查、平台兼容检查或事实检查；不适用项说明理由，失败项先在本 Skill 内返工。
- 返回用户可直接使用或交给下一个完整 Skill 的独立产物，并明确仍需用户授权的外部写入。
