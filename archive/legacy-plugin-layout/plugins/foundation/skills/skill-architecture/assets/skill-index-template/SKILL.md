---
name: <skill-index-name>
description: >-
  Use when looking up curated external GitHub skill sources, deciding whether to
  install an external skill, or replacing vendored external skill folders with
  lightweight source references.
---

# Skill Index

外部 GitHub 技能/来源的轻量索引。记录有用的外部能力在哪、如何融入当前工作流。不镜像内容。

## When To Use

- 需要找一个之前收集的外部技能或来源 repo。
- 需要判断一个外部技能该留作索引、装进项目、还是晋升为本地维护技能。
- 计划为未来工作流寻找外部能力（搜索底座、排版、设计等）；此动作必须发生在稳定 Run 外。
- 仓库因为外部技能文件被复制进来而臃肿。

## Core Rule

外部技能默认是候选链接，不是可直接运行的本地节点。稳定 Workflow 只能引用已经本地 Skill 化、记录来源、完成质量合同和隔离试跑的能力。

只有当全部满足时才复制进本仓库：

1. 明确晋升为核心能力。
2. 许可证和维护边界清楚。
3. 文件小、自包含、运行时真需要。
4. 无法通过上游安装指令干净使用。

否则只保留 GitHub 来源、角色、用法说明。

## How To Apply

1. 识别领域：writing / publishing / product / investment / frontend / skill discovery。
2. 在索引里找匹配来源。
3. 在候选区记录 repo、版本、许可、预期角色和来源路径；不得在稳定 Run 中安装或直接 GitHub 引用。
4. 在 Run 外选择导入、fork、包装或吸收方式，形成带来源字段和质量合同的本地 Skill，并隔离试跑。
5. 用户确认后，本地 Skill 才能进入稳定 Workflow；若反复重写或定制，维护本地版本，不修补临时外部副本。

## References

- `references/github-skill-index.md` - 当前索引清单
- `references/registration-guide.md` - 怎么登记一个新外部技能

## Maintenance

- 保持紧凑，详细笔记放 references 不放 SKILL.md。
- 复制进来的外部文件夹在索引里有代表后，删除本地副本。
- 不列举每个有趣的 AI repo，只收已影响工作流或大概率复用的来源。
- 验证索引 URL 是可达的 repo 根。
