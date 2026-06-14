# Orchestrations

这里保存稳定的技能链定义。它不是 runner，也不直接调用 Claude；它只描述一条人工验证过的工作流应该按什么顺序使用哪些技能、每段输入什么、输出什么、如何验收。

`apps/skill-orchestrator/index.html` 只是辅助编排台，不是工作流源头。临时链路可以先在页面里拖拽和导出；一旦某条链被反复验证、值得沉淀，就放入本目录，由 Git 管理。

## 当前工作流

| 工作流 | 文件 | 用途 |
| --- | --- | --- |
| 公众号产品/选题文章链 | `wechat-product-research-writing-publish.json` | 连接产品洞察、选题素材沉淀、启航写作风格和公众号排版发布 |

## 文件格式

当前建议使用 JSON，原因是本地可视化页面和生成脚本都能无依赖读取。

每个 workflow 至少包含：

- `id`：稳定标识。
- `title`：人可读标题。
- `goal`：整条链目标。
- `context`：给 Claude 的项目背景。
- `nodes`：按顺序执行的节点。
- `finalOutput`：整条链结束后应该得到的成果。

## 节点字段

- `id`：节点稳定标识。
- `skillId`：需要参考的 skill id，必须匹配 `skills/**/SKILL.md` 的 frontmatter `name`。
- `title`：节点名。
- `input`：该节点吃什么。
- `output`：该节点产出什么。
- `role`：该节点在整条链里的职责。

## 维护规则

1. 节点只描述链路，不复制技能正文。
2. 新技能迁移进 `skills/` 后，运行 `scripts/build-skill-orchestrator-data.ps1` 刷新页面数据。
3. 具体项目产物不进入本目录。
4. 未验证的临时链路只保存在浏览器 localStorage，不提交到仓库。
5. 自培养技能可以进入 Claude Code plugin；外部收藏技能默认只在 workflow 中按需引用，不进入插件分发层。
