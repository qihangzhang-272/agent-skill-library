---
name: x-post-card-studio
description: Turn an explicitly supplied public X post or same-author thread into readable 1080×1440 image cards and, when requested, a silent slideshow MP4. Use for X content cards, thread slices, social carousels, or visual preservation after the source has been retrieved; do not use for X discovery, rewriting, narration, or publishing.
---

# X Post Card Studio

Render already retrieved X content as a small visual publication. This Skill owns card composition, not source discovery or editorial rewriting.

## Boundary

- Accept normalized data for one supplied public post or one same-author thread.
- Retrieve the source first with the current Mode's installed retrieval capability. Do not add another X client, search route, login system, or browser scraper.
- Preserve the selected author's sequence. Exclude quote-post bodies and unrelated replies unless the user explicitly includes them.
- Do not invent connective copy, commentary, narration, music, or calls to action.
- Native videos remain separately listed source assets. The renderer does not pretend a frozen thumbnail is the original video.
- Creating files is allowed; publishing or saving an external draft requires a separate explicit request.

## Input

Prepare UTF-8 JSON:

```json
{
  "source_url": "https://x.com/example/status/123",
  "title": "Optional collection title",
  "author": {"name": "Example", "handle": "@example", "avatar": "./avatar.png"},
  "posts": [
    {
      "text": "Post text",
      "created_at": "2026-08-31",
      "media": [
        {"type": "image", "path": "./image.png"},
        {"type": "video", "path": "./clip.mp4"}
      ]
    }
  ]
}
```

Paths are resolved relative to the JSON file. Missing optional fields are allowed; missing post text is not.

## Render

Run:

```bash
python scripts/render_x_cards.py source.json --output ./artifacts/x-cards
```

The renderer creates card HTML, PNG screenshots when Chrome or Edge is available, and `cards.json`. Add `--video` for a silent slideshow MP4 when `ffmpeg` is installed. Use `--html-only` only for diagnosis or hosts without a browser.

The default blue-orange paper treatment is intentionally simple. Adjust content density before adding decorative elements. A card must remain understandable on a phone without knowledge of the surrounding Case.

## Check

- Read every card in order at phone width.
- Confirm no sentence was cut between cards without enough continuation context.
- Confirm author, handle, source URL and order are correct.
- Confirm image assets belong to the selected post.
- If the source contains video, state that the video remains a separate asset unless another approved media-composition capability was used.

## 完成标准

- `cards.json` lists every generated card and every source media asset.
- Image cards are 1080×1440 when browser rendering is available.
- The output contains only the selected post or same-author thread.
- No source text was rewritten merely to fit the template.
- No publication, login reuse, music, TTS, or hidden discovery occurred.
