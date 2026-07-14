# 注册一个外部技能 -- 操作指南

本指南讲「发现一个有用的 GitHub 外部技能后，怎么把它登记进本索引」。索引内容存在同目录的 `github-skill-index.md`。

核心立场（贯穿全程）：**外部技能默认是链接，不是本库资产。** 登记 = 记下"它在哪、干嘛的、和我的工作流什么关系"，不是把它搬进来。

## 一、登记一个新外部技能：填 5 个字段

在 `github-skill-index.md` 找到合适的类别表格，加一行，填这 5 列：

| 字段 | 填什么 | 注意 |
| --- | --- | --- |
| **Source** | GitHub 仓库根 URL | 指向 repo 根，不要指向 `tree/.../SKILL.md`，除非工作流确实需要某子目录 |
| **Role** | 一句话：它提供什么能力 | 用动作描述（"把 Markdown 转成公众号格式"），不要抄它的营销语 |
| **Status** | 见下方"二、Status 阶梯" | 决定它和本库的关系深度 |
| **Domain** | 见下方"三、归 Domain 的门槛" | **默认留空 / 未归类** |
| **Notes** | 怎么用、边界、license 风险、何时别用 | 写"别让它覆盖 qihang-writing-style"这类护栏 |

## 二、Status 阶梯（外部技能和本库的关系深度）

一个外部技能随着你用得越深，Status 逐级升高。**不靠复制晋升，靠提炼晋升**：

| Status | 含义 | 何时用 |
| --- | --- | --- |
| `reference` | 纯链接参考，没动它 | 刚发现、还没真用过。**新登记默认就是这个** |
| `installed external capability` | 已在本机/项目安装，运行时真在调用 | 像 agent-reach、baoyu-skills 这种已成为某 chain 默认依赖的 |
| `skill collection` | 一个含多技能的合集，按需取用 | 如 taste-skill、anthropics/skills |
| `absorbed reference` | 它的判断/规则已被提炼进某个本地瓦技能 | 提炼进了 `domain-*/skills/.../references/` |
| `migrated reference source` | 部分文件已迁入某 domain，上游留作更新源 | 如 financial-services 迁入 agent-investment |

晋升原则（沿用 SKILL.md 的 Promotion Rule）：一个外部源要从"链接"变成"本地技能"，**必须是你反复用过、把稳定可复用的判断用自己的话提炼出来**之后。Do not promote by copying. Promote by distilling.

## 三、归 Domain 的门槛（关键 -- 别随手贴标签）

Domain 字段不是"看起来像哪个领域就标哪个"。**门槛**：

> 只有当某个 domain **明确有调用必要**、且这个外部技能**确实融入了那条 domain 的工作流（chain）**里，才标上对应 domain。

判定方法 -- 问自己一个问题：

- **"这个技能进了哪条 chain？"**
  - 进了某条 chain（如 baoyu-skills 进了 wechat-writing chain）-> 标该 domain（`writing`）
  - 没进任何 chain，只是"将来也许能用" -> **Domain 留空 / 标 `未归类`**，不要强行归类

可选值：`writing` / `investment` / `product` / `commons`（绝对通用，如 agent-reach）/ 多个（跨领域，逗号分隔）/ 空（未归类）。

为什么这么严：和 Promotion Rule 同一个克制--**一个技能要"属于"某 domain，得拿出它真在那条 chain 里被用的证据**，否则索引会被一堆"看着相关但没真用"的标签污染，失去导航价值。

## 四、什么时候不该登记

- 只是一个"有趣的 AI repo"，没影响过你任何工作流，也没有明确复用计划 -> 不登记。索引只收"已经影响过工作流、或大概率会复用"的源。
- 没有稳定 GitHub 源、只有一个本地压缩包 -> 不作为正式索引项（如历史上的 `.zip` 导入，应找到上游源或淘汰）。

## 五、登记后

- 保持 `github-skill-index.md` 紧凑，详细笔记放 Notes 列，不要写进 skill-index 的 SKILL.md。
- 定期用 `git ls-remote --symref <repo> HEAD` 验证 URL 仍可达，并更新文件顶部的"Last repo-root verification"日期。
- 若某外部技能被提炼进了本地 domain，把它的 Status 升级为 `absorbed`/`migrated`，并在 Notes 里写明进了哪个 domain、哪个 commit。
