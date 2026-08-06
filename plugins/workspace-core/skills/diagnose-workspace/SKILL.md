---
name: diagnose-workspace
description: Use when a Personal Workspace, capability lifecycle, source record, Host projection, inbox, or surrounding Case layout may be disorganized, duplicated, stale, or crossing its intended boundary, especially when the user asks for an inspection before any cleanup.
---

# Diagnose Workspace

Perform a deterministic, read-only health check. Diagnose structure and traceability; do not judge business conclusions or turn cleanup into another framework.

## Establish Scope

1. Resolve the exact Personal Workspace root, adjacent Case roots, `.local/inbox/<workspace-id>/`, and any protected production or delivery areas the user named.
2. Treat protected areas as read-only or excluded exactly as requested. Do not follow old host links into a protected tree just to make the audit “complete.”
3. Do not read Secret values. Report only the presence and location of `.env`, credentials, tokens, cookies, or other likely Secret files when they cross a boundary.

## Deterministic Checks

Run the smallest checks that apply:

1. **Workspace identity** — Git root, `workspace.yaml`, v0.2 empty `spec`, current status, and unexpected nested repositories.
2. **Active closure** — each `skills/*/SKILL.md` and `workflows/*/SKILL.md + workflow.yaml` loads; names match directories; completion standards are nonempty; Workflow Skills and Artifact paths resolve.
3. **Lifecycle boundary** — Candidates are not in `skills/`; Trials are not silently adopted; Case inputs, screenshots, generated Artifacts, Run folders, caches, dependency directories, or final deliverables have not leaked into the reusable Workspace.
4. **Source identity** — externally derived Skills have `SOURCE.md` with repository or URL, source path, commit/version, license status, relation, and local changes. A newer upstream is an update Candidate, not an error and not permission to overwrite.
5. **Duplicates** — report packages that share an id, exact source identity, or materially identical content. Do not declare two Skills duplicates merely because their topics sound similar.
6. **Host projections** — inspect managed manifests, expected scenario and business Skill projections, broken links, stale managed copies, and Codex App/Claude Code verification. A host projection is disposable; the Workspace remains truth.
7. **Entry cleanliness** — list unclassified inbox items and files whose correct Case, Candidate, Archive, or Deliverable destination can be determined without guessing.

Use Harness validation and Host verification where available instead of reimplementing their checks.

## Report

Return one concise human-readable inventory grouped as:

- `阻断运行` — the active Workspace or selected scenario cannot load;
- `边界污染` — reusable ability, Case, production, delivery, or Secret content is in the wrong area;
- `来源/升级候选` — traceability is missing or an upstream comparison is available;
- `可选整理` — stale projections, duplicates, or inbox items with a deterministic destination;
- `无需处理` — checks that passed and important protected areas that were not touched.

For every finding give the exact path, observable evidence, impact, and smallest suggested action. Mark uncertainty instead of inventing ownership.

## Mutation Boundary

Diagnosis does not move, archive, rename, update, adopt, or delete files. If the user separately asks to fix findings, propose one scoped operation list. Existing authorization may permit deterministic moves or archives; deletion still follows the user's explicit high-risk confirmation gate. Never treat an audit report as permission to edit a protected production area.

## 完成标准

- The exact Workspace, Case, inbox, and protected-area boundaries are explicit.
- Harness/Host checks are reused, and every additional finding is based on observable paths or contents.
- Active closure, lifecycle leakage, source identity, duplicates, projections, Git, inbox, and Secret crossings were checked where applicable.
- Findings distinguish a run blocker, boundary pollution, update candidate, optional cleanup, and a passed check.
- No business conclusion was graded, no Secret value was read, and no file was moved, archived, updated, adopted, renamed, or deleted.
- Every suggested repair is smaller than the diagnosed problem and states whether separate user authorization is required.
