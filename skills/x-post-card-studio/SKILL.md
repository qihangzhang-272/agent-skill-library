---
name: x-post-card-studio
description: Turn one explicitly supplied public X post, quote post, or same-author direct thread into source-faithful 1080×1440 cards, a ZIP, contact sheet, and optional MP4 with native video and source audio in place. Use for X card publications and visual archives; do not use for discovery, rewriting, narration, or publishing.
---

# X Post Card Studio

Create a readable visual edition of a known X source. Preserve what the selected author posted and make source selection auditable; do not smuggle unrelated replies, quoted bodies, editorial copy, or synthetic media into the result.

## Boundary

- Accept one public X status URL or normalized JSON for one focus post.
- A thread contains the focus post plus direct reply descendants from the same author. Other-author replies are excluded.
- A quote post keeps the focus author's own text and media. The quoted post body/media remain excluded and are recorded in the selection manifest.
- Do not invent connective copy, commentary, narration, music, TTS, calls to action, or missing media.
- The command may read a public supplied URL through the Mode's installed `opencli` X adapter. Authentication and private access remain the Host's responsibility.
- Creating files is allowed. Publishing or saving an external draft requires a separate explicit request.

## Run from a public X URL

```bash
python scripts/render_x_cards.py \
  "https://x.com/example/status/123" \
  --output ./artifacts/x-cards
```

The script uses `opencli twitter thread` for this exact URL, keeps the focus/same-author chain, downloads selected X CDN media into the output, and renders the cards. This is a direct retrieval adapter, not a discovery engine.

For a pre-retrieved source, pass normalized JSON instead. Local media paths are resolved relative to that JSON.

```json
{
  "source_url": "https://x.com/example/status/123",
  "author": {"name": "Example", "handle": "@example", "avatar": "./avatar.png"},
  "posts": [
    {
      "id": "123",
      "text": "Post text",
      "created_at": "2026-09-01",
      "media": [
        {"type": "image", "path": "./image.png"},
        {"type": "video", "path": "./clip.mp4"}
      ]
    }
  ]
}
```

## Choose a visual treatment

List the eleven built-in treatments:

```bash
python scripts/render_x_cards.py --list-styles
```

Select one with `--style`. The treatments change palette and typographic character while retaining the same source-selection and readability rules. The default is `blue-paper`.

## Delivery formats

With Chrome or Edge available, the output contains:

```text
x-cards/
├── card-01.html / card-01.png ...
├── contact-sheet.png
├── cards.json
├── source-assets/             # only when public X media was downloaded
└── x-cards.zip
```

Add `--video` when `ffmpeg` is installed. Still cards remain silent. On a card containing native video, the source video plays inside the card and only its original audio is retained; silence resumes on other cards. The Skill never adds BGM, TTS, or synthetic sound.

Use `--html-only` only for diagnosis. It intentionally skips PNG, contact-sheet, and MP4 production.

## Quality check

Read the contact sheet, then every card in order. Inspect `cards.json` for:

- focus ID, included IDs, and excluded reply/quote IDs;
- card order and source media ownership;
- style, 1080×1440 target, hashes, file sizes, and image dimensions;
- MP4 timeline showing exactly where source video/audio appears.

If any source item is inaccessible, stop or use user-supplied normalized JSON. Do not replace it with a screenshot, paraphrase, or model memory.

## 完成标准

- The result contains only the selected focus post and its same-author direct thread descendants.
- Quote bodies/media and other-author replies are excluded and visible in the selection record.
- Source text is not rewritten merely to fit a card.
- PNG cards are 1080×1440; the ZIP, contact sheet, and quality manifest are present.
- Native video is embedded in the MP4 and source audio exists only for its corresponding segment.
- No discovery, private-login reuse, publishing, BGM, TTS, narration, or invented content occurred.
