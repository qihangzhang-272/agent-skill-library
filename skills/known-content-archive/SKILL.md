---
name: known-content-archive
description: Archive URLs, local files, or an explicitly named collection that the user has already supplied. Use when the task is to read, download, normalize, or preserve known content without expanding into keyword search, account discovery, recommendations, or private collections.
---

# Known Content Archive

Turn already identified material into a local, auditable source package. This Skill owns archiving, not discovery.

## Boundary

- Accept explicit URLs, local files, a URL list, or a collection the user has named precisely.
- Do not add related links, search by keyword, crawl an account, export bookmarks, or infer a larger collection.
- Use the current Host and an existing local retrieval Skill for platform access. Do not add another cross-platform router or duplicate platform login logic here.
- Ask for current-turn authorization before reading private, logged-in, or user-specific data. Public URLs supplied by the user do not require a separate adoption Trial.
- Preserve source identity and retrieval facts. Archiving content does not grant permission to republish it.

## Retrieve

Choose the smallest available route that can read the supplied item:

- ordinary web pages and public platform URLs: use the current Mode's installed retrieval capability;
- local files: read them directly;
- media: download only when the user asked for the media or it is necessary to preserve the supplied item;
- inaccessible content: record the failure honestly instead of replacing it with search results or model memory.

Keep retrieval output in the current Case or a temporary directory until it is normalized. Do not write a second global cache.

## Normalize

For each item, run `scripts/archive_item.py` with the retrieved text or HTML and any downloaded assets. The script creates one immutable package:

```text
<output-root>/<slug>/
├── source.json
├── receipt.md
├── content.<ext>       # when text or HTML was retrieved
└── assets/             # when media was explicitly preserved
```

Example:

```bash
python scripts/archive_item.py \
  --source "https://example.com/article" \
  --title "Article title" \
  --text-file ./retrieved.md \
  --output-root ./inputs/source-archive
```

The script never performs network access and refuses to overwrite an existing package. Retrieve first; archive second.

## Handoff

Return:

- the package path;
- the original source and retrieval time;
- what was preserved and what was unavailable;
- whether access used a public route or current-turn private authorization;
- the exact downstream Case or Skill that should consume the package, if one is already known.

## 完成标准

- Every archived item came from an explicit user input or precisely named collection.
- `source.json` contains hashes for preserved files and enough metadata to trace the source.
- No discovery result, recommendation, private collection, or adjacent account content was silently added.
- Existing packages were not overwritten.
- Platform access remains owned by the current Host and installed retrieval Skills.
