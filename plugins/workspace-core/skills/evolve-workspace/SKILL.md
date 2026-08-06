---
name: evolve-workspace
description: Use when the user explicitly evaluates an outcome, corrects a method, states a lasting preference, asks to upgrade a local capability, or when a registered upstream version should be considered as a candidate update to the Personal Workspace.
---

# Evolve Workspace

Turn explicit evidence into the smallest durable improvement. Do not infer preferences from silence, clicks, dwell time, retries, or other ambiguous behavior.

## Capture The Signal

1. Preserve the user's exact words or a faithful summary with `feedback.record-explicit`. Attach the narrowest known target: current Artifact, Case, scenario, Skill, or Workspace Profile.
2. Separate scope before changing anything:
   - “这次”“这一篇” is Case-specific unless the user says otherwise;
   - “以后”“我的文章都” is a lasting preference;
   - a factual correction fixes the responsible content or Skill regardless of preference;
   - an upstream release is only an update candidate, never implicit consent to replace local truth.
3. Do not manufacture learning signals from objective runtime data whose meaning is unclear. Failed commands may diagnose a tool problem, but they do not reveal a human preference.

## Locate Responsibility

1. Compare the feedback with the Goal, final Benchmark evidence, and Artifact chain.
2. Identify the smallest owner: current Artifact, Profile, one business Skill, one scenario Benchmark, or one Workflow condition. Do not edit all of them to make the decision look important.
3. Read the complete owner Skill package before changing its method or `## 完成标准`. If the Skill has `SOURCE.md`, preserve upstream identity and record local changes.

## Change And Reprove

1. First repair the current Case at the responsible Artifact and rerun affected downstream Skills.
2. Make a durable Workspace change only when the feedback scope is lasting or repeated evidence supports it. Case-specific visual density, wording, or layout stays in that Case.
3. Change the fewest relevant lines. Add no Review Skill, policy engine, preference database, telemetry hook, automatic reward score, or duplicate rule file.
4. Re-run the Case that produced the feedback and at least one relevant previous Case when the change is durable. Judge the same outcome Benchmark; add a regression example only when it prevents the demonstrated failure.
5. Show the user the changed outcome and concise rule diff. If it solves the feedback without degrading the comparison Case, update `SOURCE.md` as needed and save one focused Git commit.
6. If the change does not improve the evidence, revert only this attempted change and keep the explicit feedback record for a better hypothesis.

## Upstream Updates

For a Library or GitHub update, compare the registered source path and commit with the local package. Treat the new version as a Candidate, inspect the complete diff, reapply intentional local changes, and trial it on relevant Cases. Never auto-pull over an adopted Workspace Skill.

## 完成标准

- The input is explicit user feedback, an explicit upgrade request, or an inspectable upstream candidate—not inferred behavior.
- Case-specific and lasting scope are distinguished from the user's wording before any durable edit.
- One smallest responsible owner was changed after its complete package was read.
- The current Case was repaired; durable changes also passed at least one relevant regression Case when available.
- Completion standards, Benchmark, Profile, Workflow, and business instructions were not redundantly edited.
- External source identity and intentional local changes remain traceable; upstream updates never overwrote local truth automatically.
- The user can see the result change, the minimal rule change, and any remaining uncertainty in normal language.
