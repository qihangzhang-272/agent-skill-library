---
name: cultivate-workflow
description: Use when several adopted local Skills have formed a repeatable end-to-end sequence in real Cases, or when the user explicitly asks to preserve a proven way of working as a stable scenario Workflow with an outcome Benchmark.
---

# Cultivate Workflow

Preserve a proven scenario as one scenario Skill plus the smallest readable Skill sequence. Do not create a second orchestration language.

## Before Writing

1. Identify the concrete repeated Goal and inspect the successful Cases, explicit feedback, responsible Skills, Artifact sequence, and real exceptions. One user request can justify cultivation, but speculative flexibility cannot.
2. Confirm every stable step is an adopted local Skill under `skills/`. A Candidate is not callable; a Trial may serve its current Case but must be explicitly adopted before entering the stable Workflow.
3. Reuse each Skill's existing `## 完成标准`. Do not copy its business method, Prompt, scripts, templates, or quality obligations into the Workflow.

## Scenario Package

Create only:

```text
workflows/<scenario-id>/
├── SKILL.md
├── workflow.yaml
└── references/
    └── benchmark.md       # only when the Benchmark is too large for SKILL.md
```

The scenario `SKILL.md` defines when the Goal matches, which Profile or Case inputs matter, how the current Host uses the Workflow, the final outcome Benchmark, stopping conditions, and `## 完成标准`. Its description must let Codex App or Claude Code select it from a short Goal.

The Benchmark judges the final user-visible outcome. Each criterion states:

- what acceptable means;
- what Artifact, screenshot, or objective signal proves it;
- which Owner Skill must be rerun when it fails;
- how to proceed honestly when the evidence or action is unavailable.

Do not introduce a Benchmark command, quality YAML, Reviewer Skill, or review node.

## Minimal Workflow

```yaml
mode: sequential
steps:
  - skill: research
    artifact: 01-research.md
  - skill: article-writing
    artifact: 02-article.md
  - skill: visual-storytelling
    artifact: 03-visual-plan.md
    when: visualizationRequested
```

Only `mode`, `steps`, `skill`, `artifact`, and optional `when` are valid. `when` names a boolean Run parameter and includes the whole Skill only when the value is exactly `true`.

Do not add node ids, edges, inputs, agents, prompts, handoffs, reviewers, retry counts, status, locks, versions, events, or nested condition trees. When a complex branch becomes a repeated proven need, first express the decision inside the responsible complete Skill; extend Workflow syntax only after multiple Cases show that the scenario itself owns the branch.

## Verify Before Adoption

1. Validate directory scanning and closure with Harness.
2. Project the scenario and business Skills to both Codex App and Claude Code, then verify both projections.
3. Run at least one representative existing Case from the original Goal. Check every final Benchmark criterion and compare the result to the pre-Workflow case.
4. Fix missing behavior in the Owner Skill, not in extra Workflow fields. Keep the new Workflow only if it reduces repeated coordination without lowering output quality.
5. Commit the scenario package and related adopted Skill changes as a focused Git diff. Do not move Case artifacts into the Workspace.

## 完成标准

- The Workflow reflects a real repeated Goal and uses only adopted local Skills.
- The scenario is one complete Skill package with a selectable description and outcome Benchmark.
- `workflow.yaml` contains only a sequential list of Skill, Artifact, and proven optional boolean conditions.
- Business instructions and per-Skill completion standards remain owned by the business Skills.
- Every Benchmark criterion has evidence, an Owner Skill, and honest unavailable handling.
- No scheduler, status machine, Review Skill, quality YAML, edge graph, or speculative branch system was added.
- Harness validation, both Host projections, and one representative Case demonstrate that the stable Workflow actually works.
