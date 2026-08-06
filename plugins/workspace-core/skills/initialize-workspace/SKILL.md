---
name: initialize-workspace
description: Use when a person is creating a new Personal Workspace, converting an existing folder into one, or asking how the same evolving local Skill environment will be shared by Codex App and Claude Code.
---

# Initialize Workspace

Create the smallest Git-backed home in which the user's adopted Skills and scenario Workflows can become the local run truth.

## Apply

1. Confirm or infer one target directory and path-safe Workspace id. Inspect existing contents before writing; preserve unrelated user files and stop before any destructive cleanup.
2. Locate the user's maintained Agent Skill Library as the first-priority upstream. Record its current local path and, when available, Git remote and commit in the human-readable Profile. Do not copy or install its domain Skills yet.
3. Create this minimal identity file:

   ```yaml
   apiVersion: asl-wep/v0.2.0-draft.1
   kind: WorkspaceManifest
   metadata:
     id: <workspace-id>
   spec: {}
   ```

4. Create `PROFILE.md` with only known long-term goals, audience, preferences, boundaries, and the first-priority Library source. Mark unknowns as unknown; do not force a long interview before useful work can begin.
5. Create `skills/`, `workflows/`, `candidates/`, `trials/`, `feedback/`, and `archive/` as empty lifecycle areas. Do not add registries, lockfiles, caches, logs, runtime state, or placeholder Skill packages.
6. Initialize Git at the Workspace root if it is not already inside the intended repository. Keep secrets and host-generated state out of Git. Show the exact initialization diff before making the first traceable commit.
7. Validate the Workspace with the installed Harness. An empty Workspace is valid; host projection waits until a real scenario Workflow has been cultivated.
8. Explain that Codex App and Claude Code share this same Workspace. Later, `host.project` creates only their native project projections; `.agents/skills/`, `.claude/skills/`, `AGENTS.md`, and `CLAUDE.md` are not hand-maintained source trees.

## Boundaries

- The Workspace, not the upstream Library or host projection, becomes the run truth after a Skill is adopted locally.
- Empty lifecycle directories may exist locally even though Git does not retain them; do not add `.gitkeep` files merely to display the diagram.
- Runs and Case artifacts belong in the Case project under `.asl/runs/`, never under the reusable Workspace.
- No Skill is preinstalled just because its topic matches. Use `discover-capability` and `cultivate-skill` when a real Goal requires it.

## 完成标准

- One target Workspace has the v0.2 four-field `workspace.yaml` and a concise human-readable `PROFILE.md`.
- The existing Agent Skill Library is recorded as the first-priority upstream but no domain Skill was silently installed.
- Lifecycle areas are clear without indexes, caches, logs, lockfiles, runtime state, or duplicate host source trees.
- Existing user content and repository boundaries were preserved; no cleanup or deletion was inferred.
- Git ownership is explicit, secrets are excluded, and Harness validation succeeds or reports one concrete actionable error.
- The user can tell that both Hosts will project from the same local Workspace only after a scenario exists.
