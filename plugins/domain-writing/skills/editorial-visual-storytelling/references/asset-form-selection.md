# Asset Form Selection

本文件属于 `editorial-visual-storytelling`。是否配图、选择什么形式和交给哪个渲染技能，都是视觉编辑判断，不属于 workflow orchestrator。

## 判断顺序

1. 用户明确指定的视觉形式。
2. 已有且能支撑论点的原始截图或转载原图。
3. 内容是否真的需要视觉才能更快理解或被感到。
4. 在必要资产中选择最小、最直接的形式。
5. 没有视觉价值时选择 `none`。

## 形式与 Owner

| 内容需要 | Selected form | Render owner | 判断边界 |
| --- | --- | --- | --- |
| 产品界面、原文、推文、论文或数据证据 | source | source reuse | 保留来源，不生成模拟证据。 |
| 单一场景、人物动作、材料状态、章节停顿 | illustration | baoyu-article-illustrator | 不能只是抽象名词的装饰画。 |
| 多项同时比较、数据总览、矩阵或层级 | infographic | baoyu-infographic | 必须形成独立信息单元；移动端过密就拆。 |
| 流程、状态、组件关系、数据流或时间顺序 | diagram | baoyu-diagram | 一张图只回答一个问题，默认 3–5 个节点。 |
| 连续动作、人物关系、材料阻力或认知变化 | comic | baoyu-comic | 纯逻辑拆解不自动漫画化。 |
| 文章识别与入口情绪 | cover | baoyu-cover-image | 不与正文视觉竞争。 |
| 正文已经更清楚，或没有真实锚点 | none | none | 不生成图片不是失败。 |

## 冲突处理

- 关系必须精确阅读：diagram。
- 多项需要同时比较：infographic。
- 人物动作或关系变化本身有阅读价值：comic。
- 单一瞬间或材料状态：illustration。
- 证据已经存在：source。
- 形式之间仍然无法明确选择：先减少 `Viewer job`，不要并行生成多个形式赌效果。

## 复杂度边界

- diagram 默认 3–5 个主要节点，超过 6 个拆图。
- comic 默认 3–4 格，每格一个动作。
- infographic 在手机宽度下不能依靠缩小字号容纳内容。
- 每个画内文本单元优先 4–8 字，硬上限 10 个中文字符。
- 同一个插入位置只有一个 `Selected form` 和一个 `Render owner`。

## 输出要求

所有判断写入 `05.5-visual-plan.md`。Orchestrator 只读取 `Render owner` 并调用对应技能，不得自行修改形式、文案、复杂度或目标路径。
