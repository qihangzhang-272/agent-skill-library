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

This skill covers both the **interactive writing process** (how to work with Qihang before drafting) and the **style rules** (how the final prose should read).

The goal is not to remove AI flavor. The goal is to match Qihang's thinking rhythm: concrete, exploratory, self-questioning, grounded in examples, and driven by genuine insight rather than polished conclusions.

## Interactive Writing Process (Required)

Do NOT generate a full draft immediately. Follow these steps and wait for Qihang's feedback at each step.

### Step 1: SCQA Framing

Define the article's foundation with Qihang:

- **S (Situation)**: What is the accepted background in this domain? Be specific — names, events, timelines.
- **C (Conflict)**: What pain point, change, or counter-intuitive phenomenon has emerged? This should stand on its own as an interesting tension, without needing your opinion to make it interesting.
- **Q (Question)**: What is the core question the article must answer? Not a rhetorical question — one you genuinely don't have a settled answer for.
- **A (Answer/Hypothesis)**: What is your preliminary core argument? Have a point of view first, then find evidence. Do not list information aimlessly.

Present the SCQA framework. Ask: "Does this framing feel right? Should anything be adjusted?" Wait for confirmation.

### Step 2: Logic Tree Decomposition (MECE)

Decompose 3-5 first-level supporting arguments using MECE (Mutually Exclusive, Collectively Exhaustive). For each argument, note what types of evidence are needed.

Present the tree. Ask: "Are these arguments comprehensive? Specific cases you want to embed?" Wait for confirmation.

### Step 3: Deepening and Validation

For each supporting argument, expand in depth: why it happens (deductive reasoning), what evidence supports it (inductive reasoning), and what judgment it points to.

Present the reasoning chain. Ask: "Does the logic hold? Anything weak or missing?" Wait for confirmation.

### Step 4: Pyramid Output

Integrate into a full article: engaging title, SCQA storytelling opening, body with sub-headlines and inline picture cues, ending that reopens the question (never close with a maxim). Default at least 5000 Chinese characters.

After delivering the draft, note the main structural and style choices made.

> **Detailed process guide:** `references/writing-process.md` — read when stuck or needing deeper guidance on any step.

## Picture Cues Inside the Draft

Weave picture cues directly into the body at the natural visual break of a section — after the core argument lands and before the next paragraph picks up.

Format: `[📷 配图建议：这里放 X 的截图/生成图，承接上文的 Y 论证点，视觉上突出 Z]`

A good cue answers three questions: what image, which argument it serves, and what it visually emphasizes.

Rules:
- Never lean on the cue as a crutch for weak prose. Text must carry the argument.
- One cue per major section or pivotal turn; don't carpet-bomb every two paragraphs.
- Only suggest images that actually exist in the research folder, or generated concepts a human can picture. Don't hallucinate screenshots.
- Cues in Chinese, inline. Don't hoist into a separate appendix.

## Absolute Prohibitions

These patterns are FORBIDDEN in all Qihang articles. Scan for them before delivering any draft.

| Pattern | Why forbidden |
|---------|--------------|
| "不是…而是…" | Mechanical contrast frame. Write it out in two full sentences instead. |
| "如果…那么…" | Conclusion-posture, not exploration-posture. |
| "本质上是…" / "关键在于…" / "真正的价值是…" | Declarative shortcuts that kill discussion. |
| "它不是 A，而是 B" | Semantic substitution that looks like thinking but stays in place. |
| Arrow chains in prose ("A → B → C") | PPT logic. Narrate the causality instead of diagramming it. |
| Meta-narration ("到这儿其实可以停了", "这里卡住了") | Never explain your writing decisions to the reader. |
| Frame words ("暴露了一件事", "这段分析放在X身上也成立") | Enter the analysis directly, don't announce it. |
| Macro-assertion sentences ("所有人都在做同一件事") | If you can't show it with a specific case, don't declare it. |
| Declarative endings | The ending must reopen the question, not close it with a final answer. |
| Consecutive short paragraphs (>2) | In text-heavy articles, use medium paragraphs for rhythm. |

## Required Voice

- **Self-interruption discussion tone**: Give a surface answer, then immediately question it. Pull the reader in: "但这句话太容易说了。对吧？"
- **Insight = quality of the question, not certainty of the answer.** The article's value lies in asking a question worth asking.
- **Discussion space > declarative judgment.** Instead of "人剩下判断。这就是结论。", write "我现在的感觉是，人的位置正在往上游退。但退到哪儿算停？我不知道。"
- **Colloquial precision**: Use "你看" / "这里有意思的是" / "我后来发现" / "真正麻烦的是" instead of conclusion-connectors.
- **Start from a question, not from "I read something".** Reading material supports your argument; it is not the structural skeleton.
- **Hypothesis-driven**: Have a point of view first, then find evidence.

## English-to-Chinese Translation Rule

When quoting English source material in a Chinese article, **always provide a Chinese translation immediately after the English text**.

The translation should be natural Chinese — capture meaning and tone, not grammar. For short embedded terms ("prompt", "loop", "agent"), inline translation is not required if already established. For full sentences or substantive clauses, always translate. When the English quote is the punchline of a section, the Chinese translation should carry equivalent weight.

## Style Continuity

- Prefer concrete experience, examples, and operational details over polished conclusions.
- Keep repeated terms when repetition is natural. Don't replace terms with many synonyms.
- Every abstract claim needs one: concrete example, metaphor/story, tool/file/script name, failure mode, before/after contrast, or user scene.
- Keep source facts and personal judgment distinguishable.
- If user feedback conflicts with this skill, update the skill instead of treating the feedback as a one-off edit.

## Reference Files

This skill uses **progressive disclosure**. SKILL.md is the routing skeleton (<200 lines). Detailed content lives in references/ — read them when the task calls for it.

| Reference file | When to read |
|---------------|-------------|
| `references/writing-process.md` | Stuck or needing deeper guidance on the 4-step interactive process |
| `references/voice-quality.md` | Before drafting — how to achieve the right language texture: colloquial feel, sentence rhythm, Chinese-English mixing, emotional leakage |
| `references/ai-flavor-checklist.md` | After completing a draft — scan all 11 patterns and remove every instance before delivery |
| `references/style-rhythm.md` | During revision — rhythm rules, paragraph shapes, opening/closing examples, voice descriptions |
| `references/skill-methodology-writing.md` | Only when the topic is about agent skills, context engineering, prompt workflows, or writing systems |

## Output Expectations

**New article:** Do not draft until Step 4. Default at least 5000 Chinese characters. Full draft unless Qihang asks for outline only.

**Revision:** Preserve Qihang's thesis and facts. Fix rhythm, density, section flow, and prohibited patterns first. Mention main style changes briefly after the revised file.
