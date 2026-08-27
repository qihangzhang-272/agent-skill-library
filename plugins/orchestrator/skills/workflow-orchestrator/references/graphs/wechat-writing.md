# Skill Graph: WeChat Writing

## 适用

用于公众号研究、写作、视觉生产、个人排版、HTML 或草稿箱发布的任意组合。它不是必须从头跑到尾的状态机；已有文章、已有研究或已有视觉 brief 都可以直接成为入口。

## 图模型

本图记作 `G=(V,E)`：节点是瓦技能，边是材料依赖。Orchestrator 从用户目标反向选择最小子图，只对真实依赖排序。

```text
账号语料 ─┐
用户材料 ─┼─> 研究事实包 ───────┐
已有草稿 ─┘                     ├─> 正文定稿 ─> Markdown 排印 ─┐
                               │                              ├─> 最终 Markdown ─┬─> 个人样式 HTML
视觉偏好 + 正文/段落 ─> 视觉 brief/plan ─> 若干渲染资产 ───────┘                  └─> [授权闸门] 草稿箱
```

允许的反馈边：

- 正文发现事实缺口 → 回到研究，直到缺口被补齐或明确标为未知。
- 渲染发现 brief 不可执行 → 回到 `editorial-visual-storytelling`，不得由渲染技能代写。
- HTML 移动端检查失败 → 回到 `qihang-wechat-layout` 或个人样式目录，不回写正文观点。

## 节点接口

| 节点 | Skill | 接受 | 产生 | 可跳过条件 |
| --- | --- | --- | --- | --- |
| 账号语料 | `domain-writing:wechat-account-corpus-research` | 账号、URL、范围 | 可审计语料 corpus | 不需要账号历史 |
| 主题研究 | `domain-writing:topic-research-deposition` | 主题、用户材料、可选 corpus | 事实包、来源、缺口 | 用户只要求忠实排版既有定稿 |
| 正文写作 | `domain-writing:public-account-writing-style` | 念头、素材、草稿、大纲或事实包 | 定稿正文与编辑判断 | 已有用户确认的定稿正文 |
| Markdown 排印 | `domain-writing:baoyu-format-markdown` | 定稿正文 | 结构清楚的 Markdown | 输入已经是合格 Markdown |
| 视觉编辑 | `domain-writing:editorial-visual-storytelling` | 正文/段落、研究素材、视觉偏好 | 单图 brief 或 `05.5-visual-plan.md` | 不需要配图，或用户已给完整 brief |
| 插图渲染 | `domain-writing:baoyu-article-illustrator` | 指定插图 brief | 插图过程包与图片 | plan 未选择 |
| 信息图渲染 | `domain-writing:baoyu-infographic` | 结构化信息图 brief、精确数据来源 | 信息图过程包与图片 | plan 未选择 |
| 图解渲染 | `domain-writing:baoyu-diagram` | 问题、节点、边、关系类型 | 语义源、SVG、PNG | plan 未选择 |
| 漫画渲染 | `domain-writing:baoyu-comic` | 人物、动作、分镜、短文案 | 漫画过程包与图片 | plan 未选择 |
| 封面渲染 | `domain-writing:baoyu-cover-image` | 标题、视觉 brief、身份资产 | 封面与 prompt | 不需要封面 |
| 图片压缩 | `domain-writing:baoyu-compress-image` | 发布图片 | 规范化发布资产 | 原图已满足发布要求 |
| 个人排版 | `domain-writing:qihang-wechat-layout` | 已定稿 Markdown | 微信兼容 HTML | 用户只要 Markdown |
| 草稿箱 | `domain-writing:baoyu-post-to-wechat` | 已定稿 Markdown、发布授权 | 草稿箱结果与回执 | 未授权或不要求发布 |

`workflow-orchestrator` 只选择节点、检查材料边和组装产物；不拥有正文、视觉文案、图片形式或排版样式判断。

## 最小子图示例

- 已有终稿，只要查看个人排版：`qihang-wechat-layout`。
- 已有终稿，直接进草稿箱：按需运行 `qihang-wechat-layout`，授权后运行 `baoyu-post-to-wechat`；不重跑研究和写作。
- 只做一张架构解释图：完整 brief → `baoyu-diagram`；brief 不完整时先接 `editorial-visual-storytelling`。
- 新主题完整文章：研究、写作、排印、按需视觉分支、组装、排版；发布节点仅在授权时接入。

## 产物与落盘

单瓦技能任务按用户指定位置保存，不补齐整套状态文件。需要多资产协作、审计或发布时，建立：

`writing/drafts/{YYYY-MM-DD}-{topic-slug}/`

以下文件按实际调用节点出现：

```text
01-topic-research/            # 调用研究时
01.5-editorial-judgment.md    # 调用完整编辑判断时
02-outline.md                 # 确有保留价值时
03-draft.md                   # 确有迭代价值时
04-revised.md                 # 正文语义源
05-formatted.md               # 调用 Markdown 排印时
05.5-visual-plan.md           # 多图任务；单图可只留独立 brief
imgs/                         # 调用视觉生产时
06-final.md                   # 多资产组装或发布时的唯一发布源
06-final.html                 # 调用个人排版时
07-publish-receipt.md         # 调用草稿箱发布时
```

不再生成 `06-final.studio.html`，也不要求为了编号完整而创建空文件。

## 授权与停止条件

- 用户未明确授权草稿箱发布时，发布节点不进入子图；草稿箱授权不扩大为群发授权。
- 后台登录、扫码或授权层级变化必须在动作前暂停。
- 反馈循环最多围绕同一缺口重试两次；仍无法解决时记录缺口并请求用户决定，不制造“已完成”状态。
