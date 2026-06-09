---
name: qihang-writing-style
description: Use when drafting or revising Qihang's Chinese public-account essays. Triggers on: "公众号文章", "不像我的风格", "按我的节奏改", "写一篇产品分析", "写 Skill 相关文章", "写一篇深度文章", "帮我分析一下这个选题", or when a draft feels too slogan-like, too AI-polished, overuses short punchy sentences, or uses "不是…而是…" / "如果…那么…" patterns. Also triggers when the user wants structured thinking around a topic before writing.
---

# Qihang Writing Style

## Core Use

Use this skill when writing or revising Chinese long-form content for Qihang's public account. This skill covers both the **interactive writing process** (how to work with Qihang before drafting) and the **style rules** (how the final prose should read).

The goal is not to remove AI flavor. The goal is to match Qihang's thinking rhythm: concrete, exploratory, self-questioning, grounded in examples, and driven by genuine insight rather than polished conclusions.

## Interactive Writing Process (Required)

Do NOT generate a full draft immediately. Follow these steps and wait for Qihang's feedback at each step.

### Step 1: SCQA Framing

Before writing, work with Qihang to define the article's foundation:

- **S (Situation)**: What is the accepted background in this domain?
- **C (Conflict)**: What pain point, change, or counter-intuitive phenomenon has emerged?
- **Q (Question)**: What is the core question the article must answer?
- **A (Answer/Hypothesis)**: What is Qihang's preliminary core argument? Start with a point of view, then find evidence. Do not list information aimlessly.

Present the SCQA framework to Qihang. Ask: "Does this framing feel right? Should anything be adjusted?"

Wait for confirmation before proceeding.

### Step 2: Logic Tree Decomposition (MECE)

Based on the confirmed core hypothesis, build an Issue Tree:

- Decompose 3-5 first-level supporting arguments using the MECE principle (Mutually Exclusive, Collectively Exhaustive).
- For each supporting argument, note what types of evidence / data / cases are needed to support it.
- Present the tree to Qihang. Ask: "Are these arguments comprehensive? Do you have specific cases you want to embed?"

Wait for confirmation before proceeding.

### Step 3: Deepening and Validation

For each supporting argument, expand in depth:

- **Why it happens** (deductive reasoning: major premise → minor premise → conclusion)
- **Evidence** (cases, phenomena, data — inductive reasoning)
- **Judgment or countermeasure** (what should be done, or what this means)

Present the core reasoning chain. Ask: "Does the logic hold? Is there anything that feels weak or missing?"

Wait for confirmation before drafting.

### Step 4: Pyramid Output

Integrate everything into a full article:

- **Title**: Engaging, contains the core benefit or tension
- **Opening**: SCQA storytelling introduction
- **Body**: Sub-headline + core sentence + detailed exposition
- **Ending**: Reopen the question. Do not close it with a maxim.

After delivering the draft, note the main structural and style choices made.

## Working Rules

### Absolute Prohibitions

These patterns are FORBIDDEN in all Qihang articles:

- ❌ "不是…而是…" — never use this sentence frame, in any form
- ❌ "如果…那么…" — forbidden. This is a conclusion-posture, not an exploration-posture
- ❌ "本质上是…" / "关键在于…" / "真正的价值是…" — forbidden. These are declarative shortcuts that kill discussion
- ❌ Declarative endings — the ending must reopen the question, not close it with a final answer
- ❌ Consecutive short paragraphs (more than 2) — unless the article has rich images to carry the rhythm. In text-heavy articles, use medium paragraphs to create rhythm instead

### Required Voice

- ✅ **Self-interruption discussion tone**: Give a surface answer, then immediately question it, overturn it, or point out it's too simple. Pull the reader in: "但这句话太容易说了。对吧？"
- ✅ **Insight = the quality of the question, not the certainty of the answer**. The article's value lies in asking a question worth asking, not in delivering an airtight verdict.
- ✅ **Discussion space > declarative judgment**. Instead of "人剩下判断。这就是结论。", write "我现在的感觉是，人的位置正在往上游退。但退到哪儿算停？我不知道。"
- ✅ **Colloquial precision**: Use "你看" / "这里有意思的是" / "我后来发现" / "真正麻烦的是" instead of conclusion-connectors
- ✅ **Start from a question, not from "I read something"**. Reading material can appear as supporting evidence, but must not be the structural skeleton of the article
- ✅ **Hypothesis-driven**: Have a point of view first, then find evidence. Do not wander through information

### Style Continuity (Keep from v1)

- Prefer concrete experience, examples, and operational details over polished conclusions
- Keep repeated terms when repetition is natural. Do not replace "Skill" with many synonyms
- Every abstract claim needs one of: a concrete example, a metaphor or small story, a tool/file/script name, a failure mode, a before/after contrast, or a user scene
- Keep source facts and personal judgment distinguishable
- If user feedback conflicts with this skill, update the skill instead of treating the feedback as a one-off edit

## Reference Files

- `references/style-rhythm.md` — Read before drafting. Contains rhythm rules, paragraph shapes, and detailed voice descriptions.
- `references/skill-methodology-writing.md` — Read when the topic is about agent skills, context engineering, prompt workflows, or writing systems.

## Output Expectations

For a new article:
- Do NOT draft until Step 4 of the interactive process is reached
- For public-account essays, default to at least 5000 Chinese characters
- Produce a full draft unless Qihang asks only for an outline

For a revision:
- Preserve Qihang's thesis and facts
- Fix rhythm, density, section flow, and prohibited patterns first
- Mention the main style changes briefly after the revised file is created
