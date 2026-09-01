---
name: reference-video-analysis
description: Analyze a supplied benchmark video, transcript, subtitle file, or creator sample at title, opening, sentence-role, narrative, pacing, evidence, cognitive-load, material, and creation-workflow levels. Use to explain why a video works and how to build an original piece with equivalent communication strength without copying the creator's identity or wording.
---

# Reference Video Analysis

Treat the reference as a complete communication system, not a bag of quotable lines. The result must let an unseen reader understand what the video says, why the audience keeps watching, and which mechanisms can transfer into an original work.

## Boundary

- Accept a video URL, transcript, SRT/VTT/JSON subtitle file, notes, or an archived source package.
- For a URL, use the current Mode's installed retrieval/transcription route first. Do not add another downloader, login store, or discovery router.
- Analyze only the supplied source. Do not crawl the creator's other work unless the user asks.
- Keep distinctive phrases, identity, personal anecdotes, and factual claims source-owned. Transfer mechanisms, not a sentence-replacement template.

## Prepare complete reading context

When a transcript or subtitle file exists, run:

```bash
python scripts/prepare_video_analysis.py transcript.srt \
  --title "Reference title" \
  --source-url "https://example.com/video" \
  --output ./analysis-input.json
```

The prepared input preserves timestamps, every readable sentence, and each segment's previous/next context. Use it as a coverage ledger, not as the final report. If no transcript can be obtained, state the visual/audio evidence actually available and lower the confidence instead of filling gaps from memory.

## Analyze for decisions

Cover the following questions at a depth proportional to the source. Combine related findings when that reads better; do not force ceremonial headings.

- **Audience promise** — who should care, what problem or tension opens, and what payoff is promised.
- **Title and opening** — whether the title promise is fulfilled and what the first useful move does.
- **Narrative and peaks** — setup, turns, demonstrations, strongest moments, payoff, and action in actual source order.
- **Sentence roles in context** — for decisive or representative sentences, show the preceding setup, the sentence's role, and its consequence. For a short reference, account for every sentence; for a long reference, cover every block and all decisive lines.
- **Pacing and expression efficiency** — acceleration, pauses, repetition, overload, removable wording, and places where examples restore clarity.
- **Voice and synthetic patterns** — rhetoric, sentence rhythm, tone, formulaic transitions, mechanical summary habits, and why they help or hurt.
- **Evidence and material inventory** — demonstrations, examples, screenshots, data, authority, assertion, and claims that require independent verification.
- **Cognitive gap** — assumed prior knowledge, unexplained concepts, and missing bridges.
- **Creation workflow** — infer a usable research, drafting, visual, recording, and revision sequence for an original piece.
- **Transferable mechanisms** — rank the few most valuable choices and express a generalized structure that does not preserve source wording or identity.

Specific improvement proposals must name the affected timestamp/segment, the problem, the change, and the tradeoff. Never criticize an isolated line or image without its background and what follows.

## Output

Return one self-contained analysis containing:

- audience promise and title/opening diagnosis;
- timestamped or anchored narrative map;
- contextual close reading with enough sentence-role coverage for the source length;
- pacing, voice, efficiency, cognitive-load, evidence, and material findings;
- practical original-creation workflow;
- prioritized transferable mechanisms, improvement options, and a source-ownership boundary.

## 完成标准

- A reader who has not seen the video can easily retell what it is, why it matters, and how it unfolds.
- Every highlighted sentence, visual, or turn includes preceding context and consequence.
- Short sources have complete sentence coverage; long sources have complete block coverage and no unexplained skipped turn.
- The report separates source facts and identity from reusable communication mechanisms.
- The proposed creation workflow and generalized structure help make an original work rather than imitate wording.
- No new retrieval router, review Skill, or fixed linear workflow was introduced.
