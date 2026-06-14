# Skill Library Maintenance

Use when the user asks to maintain this repository, classify skills, sync GitHub, update plugins, normalize workflow design, or decide whether an external source should be indexed or vendored.

## Chain

```text
user request
-> inspect repo state
-> classify change: internal skill / workflow reference / external index / plugin distribution
-> edit source under skills/ and catalog/
-> rebuild generated outputs
-> validate
-> commit and push when requested or implied
```

## Rules

- Source of truth is `skills/` and `catalog/`; `plugins/` and `apps/skill-orchestrator/data.js` are generated outputs.
- `SKILL.md` should route and expose only essential rules. Detailed workflows belong in `references/`.
- Do not create a new plugin package when an existing marketplace category can hold the capability.
- External sources default to `qihang-skill-index` as repo-root URLs. Promote only when Qihang explicitly wants a reusable local skill package.
- If an external skill is absorbed into a Qihang skill, keep upstream content as reference and remove the old runtime entry.
- Rebuild plugins with `scripts/build-claude-plugins.ps1`.
- Rebuild orchestrator data with `scripts/build-skill-orchestrator-data.ps1`.
- Validate skills and plugins before reporting completion.

## Minimum Handoff

```text
Change type:
Source files changed:
Generated files rebuilt:
Validation:
Commit:
Push:
Residual untracked files:
```
