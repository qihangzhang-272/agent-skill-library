---
name: reference-video-analysis
description: Use when the user provides a benchmark video, transcript, or short-form creator sample and wants to understand its audience promise, narrative structure, pacing, evidence, transferable mechanisms, and concrete improvement opportunities without copying the creator's wording or identity.
---

# Reference Video Analysis

Analyze a reference video as a complete communication object. The output should make it easier to create an original piece with comparable clarity and audience pull; it must not turn the source into a sentence-replacement template.

## Boundary

- Accept a transcript, subtitle file, notes, or an already collected source package.
- If the user supplies only a URL, use the current Mode's existing known-content collection Skill first. This Skill does not add another downloader or search route.
- Keep source wording, creator identity, personal anecdotes and distinctive phrases in the evidence section only. Do not reuse them as the user's own voice.
- Analyze only the supplied source. Do not silently expand to the creator's other accounts or private data.

## Analyze

Start with the question the video answers for its audience:

1. **Audience and promise** — who should care, what tension makes them continue, and what the viewer expects to gain.
2. **Narrative map** — divide the piece into meaningful blocks such as setup, tension, evidence, turn, payoff and action. Use the source's actual structure rather than forcing a fixed template.
3. **Contextual close reading** — quote or paraphrase only decisive lines. For every line discussed, state what came immediately before, what follows, and why the line works in that position. Never point to an isolated sentence or image without its background and consequence.
4. **Pacing and cognitive load** — identify where new concepts arrive, where examples make them concrete, where the viewer gets lost, and where the piece repeats itself.
5. **Evidence and material** — separate demonstrations, data, screenshots, cases, authority claims and pure assertion. Mark claims that would need verification in a new work.
6. **Transferable mechanisms** — extract reusable choices such as the question shape, reveal order, example type, visual rhythm or proof pattern. Express them abstractly; do not preserve distinctive wording.
7. **Improvement options** — give specific cuts, moves, missing context, stronger demonstrations or alternative openings. Explain the tradeoff of each change.

Scale the depth to the source. A simple one-minute clip may need one page; a dense long video may need a timestamped table. Do not produce a ceremonial checklist merely because the Skill is part of a larger task.

## Output

Return a self-contained analysis with:

- one-sentence audience promise;
- a compact narrative map with timestamps or paragraph anchors when available;
- the few decisive moments and their before/after context;
- pacing, cognitive-load and evidence findings;
- reusable mechanisms stated without source-specific language;
- prioritized improvement options;
- a short handoff describing what an original creator piece may borrow at the mechanism level and what must remain source-owned.

## 完成标准

- A reader who has not seen the source can explain what it is about, why the intended audience keeps watching, and how the argument unfolds.
- Every highlighted sentence, screenshot or turn includes enough preceding and following context to be understood without hidden assumptions.
- The analysis distinguishes transferable mechanisms from source-owned wording, identity, anecdotes and factual claims.
- Recommendations are specific to the supplied source and do not force every item into a fixed module count.
- No new downloader, router, review Skill or fixed workflow was introduced.
