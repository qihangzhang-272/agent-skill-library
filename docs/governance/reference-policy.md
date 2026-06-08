# 引用策略

## 原则

技能里不复制框架内容，只写执行逻辑和引用路径。

这条规则优先级高于“让技能自包含”。自包含会带来短期方便，但长期会造成框架漂移。

## 允许写入技能卡片的内容

- 这个技能解决什么问题。
- 什么时候触发。
- 输入需要什么。
- 输出是什么格式。
- 依赖哪些框架路径。
- 依赖哪些模板、案例、脚本。
- 当前状态：已收录、待审查、待迁移、废弃。

## 不允许复制的内容

- `03_Resources/Frameworks/` 下的大段理论正文。
- 某个框架的完整表格和长案例。
- 仍在快速演进的商业模式、产品判断、技术判断理论。

## 允许复制的例外

只有在满足全部条件时，才可以复制正文：

1. 内容是你自己创建或明确可再分发的。
2. 复制后不会造成双写，或已经把来源文件标为废弃。
3. `catalog/skills.yml` 中记录迁移原因。
4. Linear 中有对应审查任务。

## 外部完整技能迁移

如果用户明确要求“直接迁移”某个外部技能，并且该项目允许复用，可以把它作为完整 skill 包放进 `skills/`。

迁移时必须记录：

- 上游仓库 URL。
- 上游 commit。
- 许可说明。
- 是否替代了本地旧技能。

示例：

```yaml
upstream_source:
  repo: "https://github.com/lucy-cxy/oss-investment-scorecard"
  commit: "28a210d0a194ba0f31fe59edaf413abfafa2008e"
  replaced_local_skill: "vc-investment-evaluator"
copy_policy: "vendored_external_skill"
```

这种迁移不再遵循“只写执行逻辑”的轻量规则；它是外部技能包归档和复用。

## 推荐写法

```yaml
framework_references:
  - path: "03_Resources/Frameworks/AI产品分析框架.md"
    anchors:
      - "VC 投资评估框架"
      - "维度 5: 商业模式"
copy_policy: "do_not_copy_framework_body"
```
