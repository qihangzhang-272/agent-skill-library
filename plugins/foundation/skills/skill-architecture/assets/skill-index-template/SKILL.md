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
- 需要判断一个外部技能该留作索引、装进项目、还是晋升为自培养技能。
- 工作流引用了外部能力（搜索底座、排版、设计等）。
- 仓库因为外部技能文件被复制进来而臃肿。

## Core Rule

外部技能默认是链接，不是本库资产。

只有当全部满足时才复制进本仓库：

1. 明确晋升为核心能力。
2. 许可证和维护边界清楚。
3. 文件小、自包含、运行时真需要。
4. 无法通过上游安装指令干净使用。

否则只保留 GitHub 来源、角色、用法说明。

## How To Apply

1. 识别领域：writing / publishing / product / investment / frontend / skill discovery。
2. 在索引里找匹配来源。
3. 优先在目标项目里上游安装或直接 GitHub 引用。
4. 若工作流依赖该来源，引用 repo 名和预期角色，不复制文件。
5. 若反复重写或定制某外部技能，创建新的自培养技能，不修补外部副本。

## References

- `references/github-skill-index.md` - 当前索引清单
- `references/registration-guide.md` - 怎么登记一个新外部技能

## Maintenance

- 保持紧凑，详细笔记放 references 不放 SKILL.md。
- 复制进来的外部文件夹在索引里有代表后，删除本地副本。
- 不列举每个有趣的 AI repo，只收已影响工作流或大概率复用的来源。
- 验证索引 URL 是可达的 repo 根。
