# Skill Graph: WeChat Writing

## 适用

用于公众号想法讨论、研究、边聊边写、局部修改、视觉生产、个人排版、HTML 或草稿箱发布的任意组合。任何用户表达、链接、文件或已有产物都可以成为入口；不需要先声明“从哪一步开始”。

## 动态调用模型

本文件是一张真实技能能力图，不是待执行步骤清单。Orchestrator 每轮只看三件事：用户此刻要推进什么、当前已经有什么、主要缺口是什么。能直接聊天或写作时不强行调用技能；确有缺口时才选择一个或少数几个真实技能，产物回来后重新判断。

这里的“技能图”是工作流编排结构，不是文章里生成的技术架构图，也不是公众号配图形式。

```text
                         ┌─ 研究与账号语料
用户对话 / 想法 / 链接 ─┤
文件 / 草稿 / 已有图片 ─┼─ 写作、局部修改与 Markdown 排印
当前已验证产物 ─────────┤
                         ├─ 视觉判断与选定形式的渲染
                         └─ 个人排版、发布前预览与授权发布

每次产物都回到当前材料集合，再按新的缺口选择；没有默认前进方向。
```

隐式调用时在 commentary 中标注真实技能名、原因、实际输入和预期产物。该标注服务当前协作，不默认生成 `skill-trace.md`。

## 真实技能池

表格顺序只用于查找能力，不表示执行顺序。所有技能默认都是可选的。

| 当前缺口 | 真实 Skill | 接受 | 产生 |
| --- | --- | --- | --- |
| 需要理解账号既有表达 | `domain-writing:wechat-account-corpus-research` | 账号、URL、范围 | 可审计语料 corpus |
| 当前观点缺事实或来源 | `domain-writing:topic-research-deposition` | 主题、用户材料、可选 corpus | 事实包、来源、缺口 |
| 需要把想法、讨论或草稿推进成文章 | `domain-writing:public-account-writing-style` | 念头、对话、素材、草稿、大纲或事实包 | 新段落、局部修订、定稿正文或编辑判断 |
| 内容已定，只缺 Markdown 结构 | `domain-writing:baoyu-format-markdown` | 已定稿正文 | 结构清楚的 Markdown |
| 需要判断是否配图及采用何种形式 | `domain-writing:editorial-visual-storytelling` | 正文/段落、研究素材、视觉偏好 | 单图 brief 或 `05.5-visual-plan.md` |
| brief 已指定普通插图 | `domain-writing:baoyu-article-illustrator` | 指定插图 brief | 插图过程包与图片 |
| brief 已指定数据或结构化信息图 | `domain-writing:baoyu-infographic` | 信息图 brief、精确数据来源 | 信息图过程包与图片 |
| brief 已指定关系图解 | `domain-writing:baoyu-diagram` | 问题、节点、边、关系类型 | 语义源、SVG、PNG |
| brief 已指定人物讲解或知识漫画 | `domain-writing:baoyu-comic` | 人物、动作、分镜、短文案 | 漫画过程包与图片 |
| 文章需要封面 | `domain-writing:baoyu-cover-image` | 标题、视觉 brief、身份资产 | 封面与 prompt |
| 图片需要满足发布规格 | `domain-writing:baoyu-compress-image` | 发布图片 | 规范化发布资产 |
| 已有定稿，需要个人排版或发布预览 | `domain-writing:qihang-wechat-layout` | 已定稿 Markdown | 微信兼容 HTML、只读发布前预览 |
| 预览通过且获得草稿箱授权 | `domain-writing:baoyu-post-to-wechat` | 已定稿 Markdown、预览检查、发布授权 | 草稿箱结果与回执 |

`workflow-orchestrator` 只选择节点、检查材料接口和组装真实产物；不拥有正文、视觉文案、图片形式或排版样式判断。当前环境没有表中技能时，经 skill-index 探测或提示安装，不能假装已经调用。

## 反馈与硬约束

- 写作发现具体事实缺口时，可以临时调用研究技能；缺口补齐后只回到受影响的段落，不补跑全流程。
- 渲染发现 brief 不可执行时，回到 `editorial-visual-storytelling`；渲染技能不能代写 brief。
- 发布前预览发现主题缺失、断图或移动端溢出时，回到 `qihang-wechat-layout` 或对应资产 owner，不回写正文观点。
- 只有真实材料依赖、质量失败或外部授权形成硬边；能力池中的相邻位置不是流程顺序。

## 运行时选择示例

- 用户边聊边形成观点：先继续对话；需要落成段落时调用 `public-account-writing-style`。写到具体事实但证据不足，再调用 `topic-research-deposition`，研究结果回来后重新修改相关段落，不补跑无关步骤。
- 用户给出定稿，只要查看个人排版：直接调用 `qihang-wechat-layout`，不调用研究和写作。
- 用户只缺一张解释图：brief 完整时直接调用对应渲染技能；brief 不完整时先调用 `editorial-visual-storytelling`，不触碰正文。
- 用户要求直接进草稿箱：只补齐尚缺的定稿、个人排版、预览与授权材料；已有且验证通过的部分全部复用。

## 产物与落盘

单瓦技能任务按用户指定位置保存，不补齐整套状态文件。多资产协作、需要审计或包含发布时，可以建立：

`writing/drafts/{YYYY-MM-DD}-{topic-slug}/`

以下名称是跨技能协作时的兼容约定，不是必须依次出现的状态：

```text
01-topic-research/            # 实际调用研究时
01.5-editorial-judgment.md    # 确有保留价值的编辑判断
02-outline.md                 # 确有保留价值的提纲
03-draft.md                   # 确有迭代价值的草稿
04-revised.md                 # 正文语义源
05-formatted.md               # 实际调用 Markdown 排印时
05.5-visual-plan.md           # 多图任务；单图可只留独立 brief
imgs/                         # 实际调用视觉生产时
06-final.md                   # 多资产组装或发布时的唯一发布源
06-final.html                 # 实际调用个人排版时
06-final.preview.html         # 个人排版的只读发布前质检页
07-publish-receipt.md         # 实际调用草稿箱发布时
```

不再生成 `06-final.studio.html`。未调用的能力不建文件，也不为了编号完整创建空文件。

## 授权与停止条件

- 用户未明确授权草稿箱发布时，发布技能不调用；草稿箱授权不扩大为群发授权。
- 发布前预览是发布任务的固定技术闸门；已明确“直接进草稿箱”只免除再次询问，不免除预览检查。
- 后台登录、扫码或授权层级变化必须在动作前暂停。
- 围绕同一缺口最多重试两次；仍无法解决时记录缺口并请求用户决定，不制造“已完成”状态。
