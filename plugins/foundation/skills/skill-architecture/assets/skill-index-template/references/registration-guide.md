# 注册一个外部技能 -- 操作指南

本指南讲「发现一个有用的 GitHub 外部技能后，怎么把它登记进本索引」。索引内容存在同目录的 `github-skill-index.md`。

核心立场（贯穿全程）：**外部技能默认是链接，不是本库资产。** 登记 = 记下"它在哪、干嘛的、和本库工作流什么关系"，不是搬进来。

## 一、登记一个新外部技能：填 5 个字段

在 `github-skill-index.md` 找到合适的类别表格，加一行，填这 5 列：

| 字段 | 填什么 | 注意 |
| --- | --- | --- |
| **Source** | GitHub 仓库根 URL | 指向 repo 根，不要指向 `tree/.../SKILL.md`，除非工作流确实需要某子目录 |
| **Role** | 一句话：它提供什么能力 | 用动作描述，不要抄它的营销语 |
| **Status** | 见下方"二、Status 阶梯" | 决定它和本库的关系深度 |
| **Domain** | 见下方"三、归 Domain 的门槛" | **默认留空 / 未归类** |
| **Notes** | 怎么用、边界、license 风险、何时别用 | 写护栏 |

## 二、Status 阶梯（外部技能和本库的关系深度）

一个外部技能随着用得越深，Status 逐级升高。**不靠复制晋升，靠提炼晋升**：

| Status | 含义 | 何时用 |
| --- | --- | --- |
| `reference` | 纯链接参考，没动它 | 刚发现、还没真用过。**新登记默认就是这个** |
| `installed` | 已安装，运行时真在调用 | 成为某 chain 默认依赖的 |
| `skill collection` | 含多技能的合集，按需取用 | 如 taste-skill、anthropics/skills |
| `absorbed` | 判断/规则已提炼进某个本地瓦技能 | 提炼进了 `domain-*/skills/.../references/` |
| `migrated` | 部分文件已迁入某 domain，上游留作更新源 | |

晋升原则：一个外部源要从"链接"变成"本地技能"，必须是你反复用过、把稳定可复用的判断用自己的话提炼出来之后。Do not promote by copying. Promote by distilling.

## 三、归 Domain 的门槛（别随手贴标签）

Domain 字段不是"看起来像哪个领域就标哪个"。**门槛**：

> 只有当某个 domain 明确有调用必要、且这个外部技能确实融入了那条 domain 的工作流（chain）里，才标上对应 domain。

判定方法 -- 问自己：

- **"这个技能进了哪条 chain？"**
  - 进了某条 chain -> 标该 domain
  - 没进任何 chain，只是"将来也许能用" -> **Domain 留空**，不要强行归类

## 四、什么时候不该登记

- 只是一个"有趣的 AI repo"，没影响过你任何工作流，也没明确复用计划 -> 不登记。
- 没有稳定 GitHub 源、只有本地压缩包 -> 不作为正式索引项。

## 五、登记后

- 保持 `github-skill-index.md` 紧凑，详细笔记放 Notes 列。
- 定期用 `git ls-remote --symref <repo> HEAD` 验证 URL 仍可达，更新文件顶部的验证日期。
- 若某外部技能被提炼进了本地 domain，把 Status 升级为 `absorbed`/`migrated`，并在 Notes 写明进了哪个 domain。
