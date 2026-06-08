# Orchestrations

这里保存技能编排定义。它不是 runner，也不直接调用 Claude；它描述一条工作流应该按什么顺序使用哪些技能、每段输入什么、输出什么、如何验收。

## 文件格式

当前使用 JSON，原因是本地可视化页面和生成脚本都能无依赖读取。

每个 workflow 至少包含：

- `id`：稳定标识。
- `title`：人可读标题。
- `entryInputs`：整条链启动前需要填写的输入。
- `nodes`：按顺序执行的节点。
- `finalArtifacts`：整条链结束后应该得到的成果。
- `handoffRules`：复制给 Claude 的执行规则。

## 节点字段

- `id`：节点稳定标识。
- `title`：节点名。
- `skills`：需要参考的 skill id。必须尽量匹配 `skills/**/SKILL.md` 的 frontmatter `name`。
- `input`：该节点吃什么。
- `output`：该节点产出什么。
- `instructions`：执行要点。
- `acceptance`：验收标准。

## 维护规则

1. 节点只描述链路，不复制技能正文。
2. 缺失技能可以先写入 `skills`，可视化页面会标记为 missing。
3. 新技能迁移进 `skills/` 后，运行 `scripts/build-skill-orchestrator-data.ps1` 刷新页面数据。
4. 具体项目产物不进入本目录。
