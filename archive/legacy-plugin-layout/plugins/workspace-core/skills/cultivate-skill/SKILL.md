---
name: cultivate-skill
description: Use when a candidate from the user's Agent Skill Library, another local repository, GitHub, an MCP, Prompt, Agent, API, script, or service must become a complete local Trial Skill before it can be called, tested, adopted, or inserted into a Personal Workspace Workflow.
---

# Cultivate Skill

Turn one candidate into a faithful, inspectable local Skill package. The Skill is the smallest unit; do not split its instructions into extra protocol objects.

## Core Rule

Nothing external is callable midway through a Workflow. First localize the capability as `<workspace>/trials/<skill-name>/`, preserve its full usable content, record its exact source, and test it in isolation. A Trial may serve the current case; permanent adoption into `skills/` requires explicit user acceptance.

## Apply

1. Confirm the target Personal Workspace and the candidate created by `discover-capability`. Never use the global Agent Skill Library as the destination for a personal capability.
2. Inspect the complete source package before drafting any local quality requirement: `SKILL.md`, every referenced instruction, scripts, assets, templates, dependencies, license, and source history available at the chosen commit or version. If a referenced item cannot be obtained, state the gap rather than pretending the package is complete.
3. Choose the least distorting relation:
   - `import`: preserve the complete package without summarizing or deleting content;
   - `fork`: preserve the package, then record intentional local changes;
   - `wrap`: write a local Skill around a remote MCP, API, Agent, model, command, or service so that the Workflow calls only the local Skill;
   - `absorb`: rewrite a small Prompt or technique into a self-contained local Skill only when its license and semantics permit it.
4. Create `<workspace>/trials/<skill-name>/`. Copy every file required for the capability to work. Never copy secrets, caches, generated artifacts, dependency folders, or unrelated repository files.
5. Keep the original `SKILL.md` content. If it lacks `## 完成标准`, append standards derived only after the complete package has been read. Put the actual outcome obligations there; do not create a separate quality-contract YAML or Review Skill.
6. Add `SOURCE.md` beside `SKILL.md` with the upstream repository or URL, exact source path, commit/version, license, relation, imported files, excluded files with reasons, local changes, and the date checked. Unknown facts remain explicitly unknown.
7. Inspect executable files and remote effects before trial use. State required permissions, credentials, network access, side effects, and any action that still needs user authorization. A wrapper must expose these boundaries in its `SKILL.md`.
8. Run the smallest isolated trial that exercises the real completion standards. Keep trial artifacts with the case or run, never inside the Skill package. The producing Skill checks its own artifact against its completion standards.
9. If the artifact misses an executable standard, reject it and return to the same Skill with the missing obligations. If a standard is genuinely impossible or evidence cannot be found, record that fact and continue honestly instead of deadlocking.
10. Report the Trial path, source identity, material risks, trial result, and whether it is ready for the current case. Do not move it to `<workspace>/skills/`, add it to a stable Workflow, or describe it as adopted until the user explicitly accepts it.

## Preserve Existing Library Skills

The maintained `libraries/agent-skill-library/` is the first-party upstream for Personal Workspaces, not the Workspace itself. When importing from it, preserve the complete Skill package—including all referenced files, scripts, assets, templates, and applicable license notices—at the exact Library commit. Do not distill a migrated Skill merely to make the Workflow shorter.

## 完成标准

- The target is one Personal Workspace Trial package, not a global Library edit or a loose external call.
- The complete source package was inspected before its completion standards were drafted.
- All files required for correct behavior were preserved; every intentional exclusion is explained.
- `SKILL.md` contains the outcome obligations under `## 完成标准`; no parallel quality-contract YAML or Review Skill was introduced.
- `SOURCE.md` identifies the exact upstream source, version/commit, path, license status, relation, and local changes without invented facts.
- Executable, credential, network, permission, and side-effect risks are visible before use.
- At least one isolated trial exercised the real completion standards, or the inability to trial is stated honestly.
- The Trial was not silently promoted, projected into a stable Workflow, or presented as permanently adopted.
