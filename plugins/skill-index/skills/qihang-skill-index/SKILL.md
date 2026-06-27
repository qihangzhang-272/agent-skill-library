---
name: qihang-skill-index
description: >-
  Use when looking up Qihang's curated external GitHub skill sources, deciding
  whether to install an external skill, or replacing vendored external skill
  folders with lightweight source references.
---

# Qihang Skill Index

This skill is a lightweight index for useful external GitHub skill/source repositories Qihang has noticed.

It is not a mirror. Do not treat indexed external repositories as local source packages.

## When To Use

Use this skill when:

- You need to find a previously collected external skill or source repository.
- You need to decide whether an external skill should stay as an index, be installed into a target project, or be promoted into a self-cultivated skill.
- A workflow references an external capability such as `md2wechat`, GSAP skills, Impeccable, Humanizer-zh, or OSS investment scoring.
- The repository feels bloated because external skill files were copied into `skills/`.

Do not use this skill to replace Qihang's own skills:

- `ai-product-analyzer`
- `topic-research-deposition`
- `qihang-writing-style`

Those are source skills and should remain local.

## Core Rule

External skills are links first.

Only copy an external skill into this repository when all of these are true:

1. Qihang explicitly promotes it from reference to core capability.
2. The license and maintenance boundary are clear.
3. The copied files are small, self-contained, and actually needed at runtime.
4. The external source cannot be used cleanly through upstream install instructions.

Otherwise, keep only the GitHub source, role, and usage notes.

## Index

Read `references/github-skill-index.md` for the current curated list. Source URLs intentionally point to GitHub repository roots unless Qihang asks for a specific subdirectory.

## Registering A New Skill

要登记一个新发现的外部技能时，读 `references/registration-guide.md`。它定义了：填哪 5 个字段（Source/Role/Status/Domain/Notes）、Status 阶梯（reference → absorbed/migrated）、以及**归 Domain 的门槛**（只有真融入某条 chain 才标 domain，否则留空）。不要凭印象往索引里加行——按指南走。

## How To Apply

1. Identify the domain: writing, publishing, product/investment, frontend/design, or skill discovery.
2. Find the matching source in the index.
3. Prefer upstream install or direct GitHub reference in the target project.
4. If a workflow depends on the source, reference the repo name and expected role instead of copying its files.
5. If Qihang repeatedly rewrites or customizes the external skill, create a new self-cultivated skill instead of patching the external copy.

## Maintenance

- Keep this skill compact.
- Keep detailed external notes in the reference file, not in `SKILL.md`.
- Remove local external folders after their source is represented in the index.
- Do not list every interesting AI repo. Only include sources that have already affected Qihang's workflows or are likely to be reused.
- Validate indexed URLs as reachable repo roots. Do not rewrite them to `tree/.../SKILL.md` unless the workflow specifically needs that path.
