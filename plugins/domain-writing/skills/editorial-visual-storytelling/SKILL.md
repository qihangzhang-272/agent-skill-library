---
name: editorial-visual-storytelling
description: >
  Use before generating covers, article illustrations, infographics, architecture diagrams, or knowledge comics
  for Chinese public-account articles. Trigger whenever visual assets feel too diagrammatic, too AI-polished,
  emotionally empty, overloaded with labels/arrows, or when the user asks for 漫画文案、配图文案、视觉叙事、
  封面概念、架构图内容设计、信息图脚本、知识漫画分镜、头像角色讲解图. Produces the visual editorial brief and exact
  on-image copy that downstream Baoyu rendering skills must follow.
---

# Editorial Visual Storytelling

先编辑视觉内容与视觉文案，再选择渲染工具。这个技能不生图；它独立负责决定一张图为什么存在、读者先感到什么、画面里允许出现哪些文字、使用哪种视觉形式，以及由哪个渲染技能执行。

## When To Use

- 公众号正文已经成形，准备进入封面、配图或排版阶段。
- 漫画、信息图、架构图看起来像文章结构的机械翻译。
- 图片逻辑很完整，却没有人物、材料、场景或情绪。
- 用户要求设计封面文案、画内短句、分镜、图注或视觉节奏。
- 同一篇文章需要多种视觉形式，但必须像同一个编辑团队做的。

## Core Rule

**一张图只承担一个读者任务。先找人和材料发生了什么，再决定要不要画结构。**

如果一张图的唯一价值是把正文重新装进方框和箭头，默认不生成。视觉不负责证明文章“有逻辑”，而负责提供证据、关系、场景、停顿或感受。

## 默认公众号角色

启航头像是本公众号生成型视觉的默认身份资产，不需要用户在每篇任务中重复指定。进入封面、概念插图、知识漫画或单幅知识漫画解释图生产前，必须加载 `references/qihang-avatar-explainer-system.md`，并把 `assets/qihang-avatar-character.jpg` 作为角色身份与配色参考。

以下情况不强行加入角色：转载原图、研究截图、产品界面、论文图表和其他需要忠实复用的证据；纯数据图或专业架构图若加入人物会降低可读性，也可以只沿用配色与编辑感。用户明确指定其他角色或要求无人画面时，以用户要求为准。

## How To Apply

### 1. 读取语义源

读取 `04-revised.md`、`05-formatted.md`、研究截图和项目视觉规范。`04-revised.md` 仍是正文语义源；本技能不得改写观点。

### 2. 写视觉编辑判断

先回答：

1. 读者读完这篇文章后，最可能留下哪一种具体感受？
2. 哪个动作、物件、人物选择或真实证据能承载这种感受？
3. 哪些内容必须精确看懂，哪些内容只需要被感到？
4. 哪些段落不需要图？

### 3. 设计视觉文案

运行 `references/visual-copy-desk.md`：从事实、动作和语境出发写 2–3 个候选，经过“离开图片是否仍成立”“是否复述画面”“朗读是否像人话”“单个文本是否不超过 10 字”四项检查后，才确定 `Exact text`。

### 4. 选择资产形式与渲染 Owner

加载 `references/asset-form-selection.md`。本技能拥有以下判断权：

- 这个位置是否需要图。
- 复用证据图，还是生成插图、信息图、架构图或知识漫画。
- 一张图的复杂度和画内文字上限。
- 由哪个下游 Baoyu 技能渲染。

这些判断不得放在 workflow chain 或下游渲染技能中。

### 5. 生成 `05.5-visual-plan.md`

文件至少包含：

- `Audience`
- `Article atmosphere`
- `Visual thesis`
- `Shared visual system`
- `Asset budget`
- 逐资产表：`ID`、插入位置、`Viewer job`、`Human/material anchor`、`Scene fact`、`Copy role`、候选文案、`Exact text`、图外 caption、最终形式、渲染 Owner、复杂度上限、来源、禁用表达和目标路径。

完整契约见 `references/visual-copy-contract.md`。

### 6. 按形式完成内容设计

- **封面**：标题承担识别，画面承担情绪；不要把摘要、结论和结构同时塞进封面。
- **概念插图**：优先人物动作、材料状态和真实物件；不要把抽象名词拟成流程图。
- **信息图**：只在读者确实需要同时比较、总览或记忆多个信息时使用。
- **架构图**：先写一句自然语言问题，再选择一个抽象层级；公众号默认只保留一条主路径。
- **知识漫画**：分镜必须包含动作、阻力或关系变化；不能只是四个会说结论的方框。
- **单幅知识漫画解释图**：当读者需要看懂一段逻辑、但架构图过冷或概念插画过虚时，使用“中央逻辑视觉 + 侧边讲解角色”。中央视觉负责关系，角色负责指出阅读入口；不能退化成角色站在流程图旁念结论。

启航头像角色按“默认公众号角色”自动加载，不需要 plan 或用户再次声明。头像不是泛化风格图：人物、透明眼镜、深蓝乱发和黑色小动物伙伴共同构成可识别角色，不得擅自替换成通用职场人物。逐资产 plan 仍必须写明角色在该图执行什么动作；不能因为角色默认存在，就省略 `Character anchor`。

具体规则见 `references/comic-copy.md` 与 `references/diagram-clarity.md`。

### 7. 运行视觉 AI-Flavor Filter

加载 `references/visual-ai-flavor-filter.md`。发现以下问题就回到 Step 2：

- 每个概念都被装进框。
- 每张图都有对称的三步或五步闭环。
- 漫画逐格完成“问题—分析—顿悟—结论”。
- 画内文字在解释画面已经画出的内容。
- 风格只剩统一配色，没有人类动作、取舍或材料痕迹。

### 8. Handoff

把 `05.5-visual-plan.md` 直接交给其中指定的渲染 Owner。下游 Owner 可以调整构图，但不得擅自新增论点、画内文案、资产形式或目标路径；需要改变 `Viewer job`、`Copy role`、`Exact text` 或 Owner 时必须退回本技能更新 plan。

## 何时不该用

- 原始截图、论文图、转载原图或数据证据只需忠实复用时，不做风格化改写。
- 用户只要单独生成一张已经给出完整视觉说明的图片时，可直接调用对应 Baoyu 技能。
- 技术团队需要完整系统文档时，用专业架构建模流程；本技能只负责公众号阅读场景。

## References

- `references/visual-copy-contract.md` - `05.5-visual-plan.md` 与逐资产文案契约。
- `references/visual-copy-desk.md` - 封面、图注、节点、旁白与对白的独立文案审校。
- `references/asset-form-selection.md` - 是否配图、选择何种资产及渲染 Owner 的领域判断。
- `references/comic-copy.md` - 让知识漫画具有人物、动作、停顿和真实材料感。
- `references/qihang-avatar-explainer-system.md` - 启航头像角色与单幅知识漫画解释图的固定视觉语法。
- `references/diagram-clarity.md` - 面向移动端阅读的低复杂度架构图规则。
- `references/visual-ai-flavor-filter.md` - 信息图、架构图和漫画的 AI 味检查。
- `references/source-notes.md` - GitHub 开源来源、提炼范围与许可证边界。
