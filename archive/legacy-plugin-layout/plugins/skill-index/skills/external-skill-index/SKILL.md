---
name: external-skill-index
description: >-
  Use outside a stable Run when looking up curated external GitHub skill sources,
  deciding how to localize one, or replacing vendored external skill folders with
  lightweight source references.
---

# External Skill Index

This skill is a lightweight index for useful external GitHub skill/source repositories curated by the library maintainers.

It is not a mirror. Do not treat indexed external repositories as local source packages.

## When To Use

Use this skill when:

- You need to find a previously collected external skill or source repository.
- You need to decide whether an external source should stay as an index or be imported, forked, wrapped, or absorbed into a locally maintained Skill.
- You are preparing, outside a stable Run, to localize an external capability such as agent-reach, `baoyu-skills`, GSAP skills, Impeccable, Humanizer-zh, or OSS investment scoring.
- The repository feels bloated because external skill files were copied into `skills/`.

Do not use this skill to replace locally maintained skills:

- `ai-product-analyzer`
- `topic-research-deposition`
- `public-account-writing-style`

Those are source skills and should remain local.

## Core Rule

External skills are candidate links first, never direct stable-Workflow nodes.

A stable Workflow can use a capability only after it has been imported, forked, wrapped, or absorbed into a local Skill with origin fields, a quality contract, and an isolated trial.

Only copy an external skill into this repository when all of these are true:

1. The library maintainers explicitly promote it from reference to core capability.
2. The license and maintenance boundary are clear.
3. The copied files are small, self-contained, and actually needed at runtime.
4. The external source cannot be used cleanly through upstream install instructions, or an approved domain workflow must distribute a pinned release as a local runtime.

Otherwise, keep only the GitHub source, role, and usage notes.

## Index

Read `references/github-skill-index.md` for the current curated list. Source URLs intentionally point to GitHub repository roots unless the user asks for a specific subdirectory.

## Registering A New Skill

要登记一个新发现的外部技能时，读 `references/registration-guide.md`。它定义了：填哪 5 个字段（Source/Role/Status/Domain/Notes）、Status 阶梯（reference -> absorbed/migrated）、以及**归 Domain 的门槛**（只有真融入某条 chain 才标 domain，否则留空）。不要凭印象往索引里加行--按指南走。

## How To Apply

1. Identify the domain: writing, publishing, product/investment, frontend/design, or skill discovery.
2. Find the matching source in the index.
3. Record the repository, version or commit, license, source path, and expected role in the candidate area.
4. Outside the Run, import, fork, wrap, or absorb it into a local Skill, then record its origin fields, draft its quality contract, and trial it in isolation. A maintainer-approved exact vendoring exception still must meet these local-Skill requirements.
5. Only after user confirmation may that local Skill enter a stable Workflow. Never install or directly reference an indexed source during the Workflow Run.

## Maintenance

- Keep this skill compact.
- Keep detailed external notes in the reference file, not in `SKILL.md`.
- Remove local external folders after their source is represented in the index, except when the index records a maintainer-approved vendored runtime.
- Do not list every interesting AI repo. Only include sources that have already affected the library's workflows or are likely to be reused.
- Validate indexed URLs as reachable repo roots. Do not rewrite them to `tree/.../SKILL.md` unless the workflow specifically needs that path.
