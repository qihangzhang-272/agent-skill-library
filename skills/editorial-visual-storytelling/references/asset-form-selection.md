# Asset Form Selection

本文件属于 `editorial-visual-storytelling`。是否配图、选择什么形式和交给哪个渲染技能，都是本技能负责的视觉编辑判断。

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
| 具体场景、多个学习或生活情境的并置、材料状态、章节停顿 | illustration | baoyu-article-illustrator | 一个论点可由多个场景共同表达；并列情境不自动变成流程或数据图。 |
| 数量、趋势、精确比较或多项总览 | infographic | baoyu-infographic | 数据必须带来源、单位、口径和逐字值；移动端过密就拆。 |
| 递进、流程、循环、层次、对比、矩阵或组件关系 | diagram | baoyu-diagram | 一张图只回答一个问题，默认 3–5 个节点。 |
| 连续动作、人物关系、材料阻力或认知变化 | comic | baoyu-comic | 纯逻辑拆解不自动漫画化。 |
| 一段逻辑需要由人物动作帮助理解 | single-panel explainer comic | baoyu-comic | 角色参与关系或材料操作，位置随语义决定；不能只是站在流程图旁。 |
| 文章识别与入口情绪 | cover | baoyu-cover-image | 不与正文视觉竞争。 |
| 正文已经更清楚，或没有真实锚点 | none | none | 不生成图片不是失败。 |

## 冲突处理

- 数量、趋势或精确数据比较：infographic。
- 概念与角色之间的关系必须精确阅读：diagram。
- 人物动作或关系变化本身有阅读价值：comic。
- 逻辑关系必须看懂，但概念插画太虚、架构图太冷：single-panel explainer comic。
- 单一瞬间、材料状态或共同说明一个论点的并列情境：illustration。
- 证据已经存在：source。
- 形式之间仍然无法明确选择：先核对段落意思、场景关系与插入位置，不因形式难选就删掉论点必需的情境。试效果时比较同一位置的具体讲述方案，并放回正文联读；候选不等于全部入稿。

## 复杂度边界

- diagram 默认 3–5 个主要节点，超过 6 个拆图。
- comic 默认 3–4 格，每格一个动作。
- single-panel explainer comic 默认 1 个中央逻辑视觉、1 个讲解角色、1 个气泡、3–5 个主标签；必要时允许少量二级标签，但不画多层框线与连线网络。
- infographic 在手机宽度下不能依靠缩小字号容纳内容。
- 每个画内文本单元优先 4–8 字，硬上限 10 个中文字符。
- 同一个插入位置只有一个 `Selected form` 和一个 `Render owner`。

## 输出要求

所有判断写入 `05.5-visual-plan.md`。当前 Host 根据 `Render owner` 调用当前 Mode 内对应技能，交接时不得自行修改形式、文案、复杂度或目标路径。
