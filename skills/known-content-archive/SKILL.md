---
name: known-content-archive
description: Retrieve and archive explicit URLs, local files, URL lists, or precisely named collections as immutable local source packages. Use when the user already knows what should be preserved; do not use for open-ended discovery, recommendations, account crawling, or private collections without current-turn authorization.
---

# Known Content Archive

Turn material the user has already identified into a bounded, auditable local archive. The current Host performs retrieval; this Skill defines the handoff and owns durable preservation.

## Boundary

- Accept explicit URLs, local files, a supplied URL list, or a collection named precisely enough to enumerate.
- Do not expand the scope with keyword search, related links, account history, bookmarks, recommendations, or model memory.
- Use the current Mode's installed retrieval route. Prefer Agent Reach/opencli when present; do not create another cross-platform router or duplicate login storage.
- Ask for current-turn authorization before accessing logged-in or user-specific content. A public URL supplied by the user needs no extra adoption Trial.
- An inaccessible item is a recorded result, not permission to substitute a different source.

## End-to-end operation

### Retrieve

Read or download each supplied item with the smallest available Host capability:

- ordinary pages and public platform URLs: the Host's browser, web reader, or installed retrieval Skill;
- X, video, podcast, social, and creator-platform URLs: the corresponding Agent Reach/opencli route already available in the Mode;
- local files: direct local read;
- media: download only when requested or necessary to preserve the supplied item.

Keep intermediate retrieval files inside the current Case or a temporary run directory. Do not create a second global cache.

### Record the retrieval handoff

For multiple items, write one UTF-8 JSON receipt. Paths are relative to the receipt:

```json
{
  "collection": "the exact collection requested by the user",
  "items": [
    {
      "source": "https://example.com/article",
      "title": "Article title",
      "status": "ready",
      "content_file": "retrieved/article.md",
      "assets": ["retrieved/cover.jpg"],
      "retrieved_at": "2026-09-01T00:00:00+00:00",
      "access": "public-or-local"
    },
    {
      "source": "https://example.com/private",
      "title": "Unavailable item",
      "status": "unavailable",
      "reason": "login required"
    }
  ]
}
```

Do not mark an item `ready` until its referenced files actually exist.

### Preserve

For one item, run `scripts/archive_item.py`. For a list or collection, run:

```bash
python scripts/archive_batch.py retrieval.json --output ./inputs/source-archive/run-name
```

The batch output is immutable and contains:

```text
run-name/
├── <item-slug>/
│   ├── source.json
│   ├── receipt.md
│   ├── content.<ext>
│   └── assets/
├── archive-manifest.jsonl
├── failures.json
└── run-summary.json
```

Successful items remain available even when another item fails. Existing run and item paths are never overwritten.

## Handoff

Return the run path, exact requested scope, archived/unavailable/failed counts, access method, and any unavailable reason. Name the downstream Case or Skill only when it is already known; do not invent a workflow.

## 完成标准

- Every archived item traces to the user's explicit input or precisely named collection.
- Preserved files have hashes and source identities; batch outcomes have a manifest and honest failure list.
- Public and authorized-private access remain distinguishable.
- No adjacent account content, inferred collection, recommendation, or substitute source was silently added.
- Retrieval used the Host's existing capability; this package did not create a competing router or credential store.
