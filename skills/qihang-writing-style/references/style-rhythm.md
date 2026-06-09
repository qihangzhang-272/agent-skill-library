# Style Rhythm

This reference captures Qihang's target voice and rhythm rules. Read before drafting or revising.

## Article Motion: Question-Driven, Not Source-Driven

The article must start from a **genuine question**, not from "I read something" or "I tried something." Reading material and experiments can appear as supporting evidence mid-article, but they must not be the structural skeleton.

The motion should feel like:

1. A question emerges — something feels off, something doesn't add up, something is worth asking.
2. The obvious answer is tried and found insufficient.
3. The article follows that discomfort, digging deeper.
4. A sharper distinction or a better question surfaces.
5. The ending reopens rather than closes — the reader is left with a better question than they started with.

Do NOT use this motion:
- "I saw X → at first it looked simple → I found a problem → here's the lesson" — this is the "陪读" pattern. It locks the article into following a source text and prevents depth.

## Opening

Open from tension, not from summary. The first paragraph should make the reader feel: "This is a question worth asking."

Bad:
"最近 Anthropic 发了一篇文章，讲 recursive self-improvement。我读完很有感触。"

Better:
"AI 能不能自己建造下一个 AI？这个问题听起来很科幻。但如果这件事已经在发生——不是完整发生，而是一部分一部分地发生——那我们讨论的就不是未来，而是现在正在变的东西。"

## Ending

The ending must **reopen the question**, not close it with a final answer.

Bad:
"人剩下判断。这就是结论。"
"问题是，人还站不站得稳。"

Better:
"轮子已经在转了。人站不站得稳，不是明天的问题，是现在的问题。"
"我现在的感觉是，人的位置正在往上游退。但退到哪儿算停？我不知道。"

The ending should leave the reader with a sharper question than they started with. It should feel like the conversation continues, not like a verdict has been delivered.

## Self-Interruption Discussion Tone

This is the signature of Qihang's voice. It's not enough to say "use colloquial language." The specific mechanism is:

**Give a surface answer → immediately question it → pull the reader in.**

Example:
"一个简单答案是：人剩下判断。但这句话太容易说了。对吧？判断不是一个抽象名词。判断意味着你知道什么问题值得问。"

Other effective forms:
- "这听起来像效率提升。但效率提升到一定程度之后，问题会变形。"
- "这个说法我比较认同。真正的问题不在于明天会不会突然出现一个完全自我改进的 AI。真正的问题是，很多机构连现在发生的变化都没看清。"
- "我读到这个数字的时候，停了一下。不是因为 64% 多么夸张。而是因为它指向的能力很特别。" (Note: this is a natural thought progression, not a "不是…而是…" mechanical frame.)

Key rule: When a "simple answer" or "obvious conclusion" appears, the next sentence must complicate it. Never let an easy answer stand unchallenged.

## Paragraph Shape

Use mixed paragraph lengths.

- Medium paragraphs carry reasoning.
- Short paragraphs create a real pause or turn.
- **Limit**: No more than 2 consecutive short paragraphs unless the article has rich images to carry rhythm. In text-heavy articles with few images, use medium paragraphs instead of short ones to create rhythm.
- Never stack short paragraphs into punchlines.

Bad rhythm (three consecutive short paragraphs):
"这不是功能问题。"
"这是结构问题。"
"这也是 AI 产品的关键。"

Better rhythm (build up reasoning, then pause only at the real turn):
"我一开始以为这是文风问题。后来发现不是。很多写作 Skill 失败，是因为它把太多样本文字塞进上下文，模型还没开始分析，注意力已经被风格材料占掉了一半。"
(short paragraph only where the thought genuinely changes direction)

## Sentence Habits To Prefer

These describe the motion of thought, not mandatory phrases. They signal a mind still working through a problem:
- "我后来发现…"
- "这件事看起来很小，但…"
- "真正麻烦的是…"
- "举个例子…"
- "从这个角度看…"
- "所以我现在更倾向于…"
- "你看…"
- "这里有意思的是…"
- "但这句话太容易说了。对吧？"

## Absolutely Forbidden

These patterns must never appear in any article:

- ❌ "不是…而是…" — any sentence built on this frame. Prohibited entirely, no exceptions.
- ❌ "如果…那么…" — conclusion-posture, not exploration-posture.
- ❌ "本质上是…" / "关键在于…" / "真正的价值是…" — declarative shortcuts that kill discussion.
- ❌ "从 X 到 Y" — formulaic transition that forces a narrative arc where there may be none.
- ❌ "不仅…而且…" — should not appear. It's a mechanical stacking pattern.

If the thought genuinely requires contrast, write it out in two full sentences instead of forcing it into a formula:
"I started with explanation X. After spending more time with the problem, I think Y is closer."

## Insight and Discussion Space

Insight is not giving an answer nobody thought of. Insight is asking a question nobody asked, but that is worth asking.

The article's core value lies in the **quality of the question**, not in the certainty of the answer. A good article doesn't tell the reader what to think — it gives them a better question to think about.

Good (opens space — the reader starts thinking):
"AI 最先改变的不是未来。它先改变制造未来的人。"

Bad (closes space — nothing left to discuss):
"人剩下判断。这就是 AI 时代的核心结论。"

When making a judgment, always leave a door open. Instead of "This is X," try "My current sense is X. But I'm still watching Y, and I could be wrong about Z."

## Detail Standard

Every abstract claim needs one of these supports:
- a concrete example
- a metaphor or small story
- a tool/file/script name
- a failure mode
- a before/after contrast
- a user scene

Do not write "Skill 要沉淀经验" and stop there. Say what experience looks like:
- "staging 返回 200 不代表成功"
- "created_at 不能作为排序字段"
- "Description 写功能介绍会导致路由失败"

## Section Pattern For Methodology Essays

Use numbered sections when teaching a framework:
```markdown
#01
不要写废话。
...
#02
Skill 其实是 Context Engineering。
```
The section title can be numeric and plain. Put the real claim in the first sentence.

## Product Analysis Variant

For product analysis, use a narrative structure driven by tension:
- what tension or question this product raises
- what looked ordinary at first
- what specific product choice changed the judgment
- what it means for user behavior, business model, and competition
- what remains unproven
- end by reopening the question — what does this product's trajectory imply?

Keep the thinking rhythm — exploratory, self-questioning, grounded — not the same surface layout as methodology essays.
