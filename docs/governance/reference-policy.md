# 引用策略

## 原则

正式库里不默认复制大段资料、网页 prompt 或 UI 库源码。优先保存索引、来源、调用方式和验证状态。

这条规则优先级高于“先搬进来再说”。复制会带来短期方便，但会增加授权、同步和维护成本。

## 允许写入技能卡片的内容

- 这个技能解决什么问题。
- 什么时候触发。
- 输入需要什么。
- 输出是什么格式。
- 依赖哪些来源、工具或项目配置。
- 依赖哪些模板、案例、脚本。
- 当前状态：已收录、待审查、待迁移、废弃。

## 不允许复制的内容

- 网页 prompt 原文。
- UI 库源码。
- 项目资料正文。
- 未验证技能包的大段内容。
- 仍在快速演进、没有稳定边界的判断理论。

## 允许复制的例外

只有在满足全部条件时，才可以复制正文：

1. 内容是你自己创建或明确可再分发的。
2. 复制后不会造成双写，或已经把来源文件标为废弃。
3. `catalog/skills.yml` 中记录迁移原因。
4. Linear 中有对应审查任务。

## 外部完整技能迁移

如果用户明确要求“直接迁移”某个外部技能，先确认它是否只是候选收藏，还是要晋升为本地可调用技能包。候选收藏先进入 `qihang-skill-index`；明确晋升后才允许放进 `skills/`。

新增本地技能包时必须记录：

- 上游仓库 URL。
- 上游 commit。
- 许可说明。
- 是否替代了本地旧技能。
- 如果外部技能被吸收到启航工作包，只保留为 `references/`，不要再把旧技能作为平行 runtime 入口分发。

示例：

```yaml
upstream_source:
  repo: "https://github.com/lucy-cxy/oss-investment-scorecard"
  commit: "28a210d0a194ba0f31fe59edaf413abfafa2008e"
  replaced_local_skill: null
copy_policy: "promoted_external_skill_package"
```

这种新增不是无边界归档，而是“明确晋升为运行技能”。外部原仓库仍作为更新来源保留在索引里。若后续被启航自培养工作包吸收，旧入口应从插件分发层移除，只保留迁移后的 reference。

## 推荐写法

```yaml
upstream_source:
  repo: "https://github.com/example/agent-skill"
  commit: "abcdef123"
copy_policy: "source_index_first"
selection_role: "used during project initialization when this capability is needed"
```
