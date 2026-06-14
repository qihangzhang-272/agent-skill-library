# Topic -> Writing -> md2wechat

Use when the user asks for a WeChat article, public-account draft, article layout, image pairing, or draft-box publishing.

## Chain

```text
topic / source material
-> topic-research-deposition with agent-reach
-> qihang-writing-style
-> Codex layout preparation
-> qihang-skill-index for md2wechat
-> WeChat layout / draft-box publish
```

## Node Rules

- Run `topic-research-deposition` when facts, screenshots, source links, or topic context are missing. Use agent-reach as the default reach layer.
- Run `qihang-writing-style` before layout or publishing. `md2wechat` formats and publishes; it does not create Qihang-style writing.
- Codex owns layout preparation in the current writing workspace: cover/body image mapping, Markdown structure, preview artifacts, and publish handoff.
- Resolve `md2wechat` through `qihang-skill-index`; do not treat it as a local skill unless explicitly vendored later.
- Use the writing/layout constitution from the writing project when handling cover image, body images, captions, and draft metadata.

## Minimum Handoff

```text
Topic:
Source folder:
Research reach:
Article draft:
Image plan:
Codex layout artifact:
md2wechat source:
Draft-box status:
Unfinished risks:
```
