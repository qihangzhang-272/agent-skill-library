# WeChat Writing Skill Graph

权威定义：`plugins/orchestrator/skills/workflow-orchestrator/references/graphs/wechat-writing.md`

## 核心变化

公众号工作流不再被理解为必须逐步完成的状态机。瓦技能通过材料接口组合：已有定稿可以直接排版，已有完整视觉 brief 可以直接渲染，只要求草稿箱时也不会重跑研究和写作。

## 常用关系

```text
用户材料 / 账号语料 -> 研究事实包 -> 正文定稿
正文定稿 -> Markdown 排印 -> 最终 Markdown
正文或段落 + 视觉偏好 -> 视觉 brief/plan -> 插图 / 数据图 / 关系图 / 漫画 / 封面
最终 Markdown + 图片 -> 个人样式 HTML
个人样式 HTML -> 只读发布前预览
最终 Markdown + 预览检查 + 明确授权 -> 公众号草稿箱
```

边只表示材料依赖，不表示某个技能有权替另一个技能做判断。视觉渲染器不能改写视觉 brief，排版不能改正文，发布不能扩大为群发。

“技能图”指上述瓦技能与材料依赖的编排结构，不是文章里的技术架构图，也不是一种配图形式。

## 视觉资产

- `editorial-visual-storytelling` 判断是否需要图、选择资产形式并写短文案。
- 精确数据图交给 `baoyu-infographic`，必须带来源、单位、时间范围和逐字数据。
- 关系图交给 `baoyu-diagram`，从递进、流程、循环、层次、对比、矩阵等关系中选择一类。
- 人物讲解与知识漫画交给 `baoyu-comic` 或插图技能，默认加载启航头像身份资产。
- 封面必须同时验证消息列表可读性和中央方形裁切兼容性。

## 个人排版

`qihang-wechat-layout` 读取 `qihang-style-catalog.json`，直接把已确认默认值编译进正式 HTML。保留 `06-final.html` 和发布前只读质检页 `06-final.preview.html`；不再生成样式效果卡或 `06-final.studio.html`。只读预览没有主题、字号、间距或组件切换控件。

## 落盘

单瓦技能任务只保存自身产物。多资产协作、审计或发布时使用：

`writing/drafts/{YYYY-MM-DD}-{topic-slug}/`

文件按实际调用节点出现。`06-final.md` 仍是发布任务的唯一语义源；进入草稿箱前必须生成并查看 `06-final.preview.html`，`07-publish-receipt.md` 只在草稿箱节点实际执行后生成。
