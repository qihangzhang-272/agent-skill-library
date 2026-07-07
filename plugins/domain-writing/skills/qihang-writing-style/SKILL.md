---
name: qihang-writing-style
description: >-
  Use when drafting or revising Qihang's Chinese public-account essays. Triggers
  on: "公众号文章", "不像我的风格", "按我的节奏改", "写一篇产品分析", "写 Skill 相关文章", "写一篇深度文章",
  "帮我分析一下这个选题", or when a draft feels too slogan-like, too AI-polished,
  overuses short punchy sentences, or uses "不是…而是…" / "如果…那么…" patterns.
  Also triggers when the user wants structured thinking around a topic before
  writing.
---

# Qihang Writing Style

## Core Use

This skill is a **three-layer system** for writing Qihang's Chinese public-account essays:

- **Layer 1: Framework** — 文章的结构骨架（从哪起、按什么顺序推进、在哪收）。10 个独立框架，由 AI 根据题材自主选择。
- **Layer 2: Voice** — 文章的语言质地（句子读起来像谁）。默认 `qihang` voice。
- **Layer 3: AI-Flavor Filter** — 通用 AI 味检测（15 条禁止模式）。强制启用。

三层**解耦**。可以独立替换任何一层而不影响其他两层。

## 调用流程（强制）

### Step 0: 理解写作场景

读用户给的题材、原始诉求、已有材料。
**如果用户只给了一个话题但没有任何材料，先做一轮澄清问答**，不要直接开写。澄清要问：
- 是什么题材类型？（产品分析 / 复杂概念解释 / 探索型 essay / 新闻资讯 / ...）
- 用户自己有没有论点？还是想边写边发现？
- 有没有 deadline / 字数约束？

### Step 1: 选 Framework

1. 加载 `references/_index-frameworks.md` 信号路由表
2. 根据 Step 0 收集到的题材特征，自主匹配 1 个 framework
3. 加载 `references/frameworks/<chosen>.md`
4. 向用户告知："我选了 X 框架，原因是 Y。如果不合适请告诉我。"
5. 按该框架的骨架步骤推进——**多数框架是 4-7 步交互式流程，每步等用户确认**

### Step 2: 应用 Voice

- 加载 `references/voices/_index.md` 看可用 voices
- 默认加载 `references/voices/qihang.md`，**贯穿写作全程**
- Voice 从第一句就生效，不是写完才套上去

### Step 3: 草稿完成后过 AI-Flavor Filter（强制）

1. 加载 `references/ai-flavor-filter/checklist.md`
2. **逐条扫描 15 条禁止模式**
3. 发现一条就修一条
4. 修完之后向用户报告做了哪些修改

### Step 4: 交付

- 草稿全文
- 标注：所选 Framework / 所用 Voice / 修复了哪些 AI 味问题
- 简要说明主要的结构和风格选择

## 配图建议规则

Weave picture cues directly into the body at the natural visual break of a section — after the core argument lands and before the next paragraph picks up.

Format: `[📷 配图建议：这里放 X 的截图/生成图，承接上文的 Y 论证点，视觉上突出 Z]`

A good cue answers three questions: what image, which argument it serves, and what it visually emphasizes.

Rules:
- Never lean on the cue as a crutch for weak prose. Text must carry the argument.
- One cue per major section or pivotal turn; don't carpet-bomb every two paragraphs.
- Only suggest images that actually exist in the research folder, or generated concepts a human can picture. Don't hallucinate screenshots.
- Cues in Chinese, inline. Don't hoist into a separate appendix.

## English-to-Chinese Translation Rule

When quoting English source material in a Chinese article, **always provide a Chinese translation immediately after the English text**.

The translation should be natural Chinese — capture meaning and tone, not grammar. For short embedded terms ("prompt", "loop", "agent"), inline translation is not required if already established. For full sentences or substantive clauses, always translate. When the English quote is the punchline of a section, the Chinese translation should carry equivalent weight.

## Output Expectations

**New article:** Do not draft until the framework's final Step. Default at least 5000 Chinese characters. Full draft unless Qihang asks for outline only.

**Revision:** Preserve Qihang's thesis and facts. Fix rhythm, density, section flow, and Filter patterns first. Mention main style changes briefly after the revised file.

## Reference Files Routing

This skill uses **progressive disclosure**. SKILL.md is the routing skeleton. Detailed content lives in `references/` — load them when the task calls for it.

| 文件 | 何时加载 |
|---|---|
| `references/_index-frameworks.md` | 每次开始写作（Step 1） |
| `references/frameworks/<name>.md` | AI 选定框架后 |
| `references/voices/_index.md` | 需要查 voice 选项时 |
| `references/voices/qihang.md` | 默认贯穿全程（Step 2） |
| `references/ai-flavor-filter/checklist.md` | 草稿完成后强制扫描（Step 3） |
| `references/skill-methodology-writing.md` | 题材是 agent skills / context engineering / prompt workflows / writing systems 时按需加载 |

## 三层架构的设计理由

为什么不把 Framework + Voice + Filter 写在一个文件里？因为它们是**三个独立层级**：

- **Framework 决定怎么"展开"**——同一个题材用 SCQA 走和用 Paul Graham essay 走，结构完全不同
- **Voice 决定怎么"说话"**——同一个骨架，用 Qihang 的语调和用 Naval 的格言式语调，读起来是完全不同的两篇文章
- **Filter 决定怎么"避坑"**——所有 AI 写出来的文章都有一些通用的味道，这些应该被强制清除，跟选了什么 framework / voice 无关

解耦三层有三个好处：
1. **可独立替换**：换 Framework 不影响 Voice 和 Filter；换 Voice 不影响 Framework 和 Filter
2. **可扩展**：未来加新 framework / voice 只是加一个文件，不影响整体
3. **可复用**：Filter 层可以被其他写作技能借用，因为它和具体作者无关
