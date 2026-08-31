# 技能变更 checklist

## 加一个瓦技能（最高频）
- [ ] 用 `assets/skill-template/SKILL.md` 建技能文件夹
- [ ] frontmatter 的 description 写到能触发（具体意图，不是"用于 XX 任务"）
- [ ] 按需加 references/，正文保持紧凑
- [ ] bump 所在 plugin 的 version，并同步 marketplace version
- [ ] `claude plugin validate . --strict` 与 `node scripts/validate-repository.mjs --base HEAD` 通过
- [ ] chain：**可选**。只有当你同时要把它编进某条 chain 时才改 chain（见 `chain-authoring.md`）。加技能不自动触发改 chain。

## 建一个新 domain
- [ ] 建 `plugins/domain-<name>/` + plugin.json
- [ ] 瓦技能进 skills/
- [ ] marketplace.json 注册新 plugin
- [ ] 初始化或 bump plugin version，并同步 marketplace version
- [ ] 两项仓库验证通过
- [ ] chain：**可选**。domain 可以先只有零散瓦技能，chain 等你主动建。

## 改一个已有瓦技能
- [ ] 改 SKILL.md 正文 / 加删 references
- [ ] bump plugin version，并同步 marketplace version
- [ ] 两项仓库验证通过
- [ ] 不联动 chain（chain 是主动改的，见 `chain-authoring.md`）

## 主动建/改 chain（独立流程）
见 `chain-authoring.md`。chain 永远是你主动发起，不是加技能的副作用。
