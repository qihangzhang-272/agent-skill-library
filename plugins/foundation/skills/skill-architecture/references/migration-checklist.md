# 技能变更 checklist

## 加一个瓦技能（最高频）
- [ ] 用 `assets/skill-template/SKILL.md` 建技能文件夹
- [ ] frontmatter 的 description 写到能触发（具体意图，不是"用于 XX 任务"）
- [ ] 按需加 references/，正文保持紧凑
- [ ] bump 所在 plugin 的 version，并同步 marketplace version
- [ ] `claude plugin validate . --strict` 与 `node scripts/validate-repository.mjs --base HEAD` 通过
- [ ] graph / chain：**可选**。只有用户同时要求改变编排时才改；加技能不自动触发。

## 建一个新 domain
- [ ] 建 `plugins/domain-<name>/` + plugin.json
- [ ] 瓦技能进 skills/
- [ ] marketplace.json 注册新 plugin
- [ ] 初始化或 bump plugin version，并同步 marketplace version
- [ ] 两项仓库验证通过
- [ ] graph / chain：**可选**。domain 可以只有零散瓦技能。

## 改一个已有瓦技能
- [ ] 改 SKILL.md 正文 / 加删 references
- [ ] bump plugin version，并同步 marketplace version
- [ ] 两项仓库验证通过
- [ ] 不自动联动 graph / chain。

## 主动建/改 graph 或 chain

- 有分支、汇合、可跳过节点或反馈：见 `graph-authoring.md`。
- 真正不可交换的单路径：见 `chain-authoring.md`。
