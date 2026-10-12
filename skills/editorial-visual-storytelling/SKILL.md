---
name: editorial-visual-storytelling
description: >
  Use before generating covers, article illustrations, infographics, architecture diagrams, or knowledge comics
  for Chinese public-account articles. Trigger whenever visual assets feel too diagrammatic, too AI-polished,
  emotionally empty, overloaded with labels/arrows, or when the user asks for 漫画文案、配图文案、视觉叙事、
  封面概念、架构图内容设计、信息图脚本、知识漫画分镜、头像角色讲解图、固定人物 IP 配图、角色参与文章讲述. Produces the visual editorial brief and exact
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

**先确定段落要让读者理解什么和图片为何放在这里，再设计情境及关系，最后安排 IP 角色。一个读者任务可以由多个并列场景共同完成。**

如果一张图的唯一价值是把正文重新装进方框和箭头，默认不生成。视觉不负责证明文章“有逻辑”，而负责提供证据、关系、场景、停顿或感受。

## 默认公众号角色

启航头像是本公众号生成型视觉的默认身份资产，不需要用户在每篇任务中重复指定。进入封面、概念插图、知识漫画或单幅知识漫画解释图生产前，加载 `references/qihang-avatar-explainer-system.md`，实际查看并传入 `assets/qihang-avatar-character.jpg` 锁定人物身份与原生墨线；背景与整图色系按当前已确认基准安排。原件缺失或换电脑时，按 [公开视觉参考](references/public-visual-sources.md) 从固定公开来源恢复同一原件，不以相似人物替代。

沿用作者当前 PPT 风格制作公众号或 X 配图时，读取 [已认可的配图案例与提示词](references/approved-wechat-ppt-prompts.md)：按本篇正文选择封面、并列场景、连续漫画及真实原图，分别声明身份、风格和证据参考的用途。只按需要读相应的完整提示词，不把案例标题、场景或图数固定到所有文章。

以下情况不强行加入角色：转载原图、研究截图、产品界面、论文图表和其他需要忠实复用的证据；纯数据图或专业架构图若加入人物会降低可读性，也可以只沿用配色与编辑感。用户明确指定其他角色或要求无人画面时，以用户要求为准。

## How To Apply

### 1. 读取语义源

接受正文、段落、定稿 Markdown 或完整项目包。完整项目优先读取编辑判断、定稿正文、研究截图和视觉规范；单图任务不强迫补齐整套文件。本技能不得改写观点。

### 2. 写视觉编辑判断

先回答：

1. 这个位置前后在论述什么？图片要补充理解、建立比较、推进过程，还是提供停顿？
2. 该段的具体意思需要一个场景、多个并列情境、连续动作，还是可精确阅读的关系？先写人物之间、人物与环境之间发生的事。
3. 哪些内容必须精确看懂，哪些内容只需要被感到？哪些段落不需要图？
4. 场景确定后，头像适合承担哪个角色、以多大尺度出现？不同人、不同方法不得自动画成同一个头像的连续步骤。

### 3. 设计视觉文案

运行 `references/visual-copy-desk.md`：从原文和采用素材写出本图讲的具体对象、谁做什么、哪份材料解释哪一步，以及结果如何影响下一步，保留必要背景与条件；需要比较表达角度时再写 2–3 个候选。不能只写“找材料、解释关系”；采用实际材料名、原文例子及动作。封面和场景插图可以用短文案；解释图须能独立读懂，保留必要定义、例子、关系和边界，不套短标签字数上限。

本技能及其引用中的短标签、气泡长度和图外说明规则，按对应文案角色使用；解释图的必要正文以本节的独立阅读要求为准，不按短标签规则删减。

对图内标题、解释、标签、旁白、对白及内容型图注调用已有 [humanizer-zh](../humanizer-zh/SKILL.md)，检查自然表达及原文信息是否保留，再确定全部 `Exact text`。不要只润色抽象口号；定稿全文与构图、素材说明分开交接，不要求下游再次概括。内容过多先减装饰、缩小角色或分图，不删独立信息。

### 4. 选择资产形式与渲染 Owner

加载 `references/asset-form-selection.md`。本技能拥有以下判断权：

- 这个位置是否需要图。
- 复用证据图，还是生成插图、信息图、架构图或知识漫画。
- 一张图的复杂度和画内文字上限。
- 由哪个下游 Baoyu 技能渲染。

这些判断不得放在 workflow chain 或下游渲染技能中。

### 5. 生成可交接 brief

多图文章生成 `05.5-visual-plan.md`；单图任务生成独立 brief。至少包含：

- `Audience`
- `Article atmosphere`
- `Visual thesis`
- `Shared visual system`
- `Asset budget`
- 逐资产表：`ID`、插入位置、`Viewer job`、`Human/material anchor`、`Scene fact`、`Copy role`、候选文案、`Exact text`、图外 caption、最终形式、渲染 Owner、复杂度上限、来源、禁用表达和目标路径。

完整契约见 `references/visual-copy-contract.md`。

### 6. 按形式完成内容设计

- **封面**：标题承担识别，画面承担情绪；不要把摘要、结论和结构同时塞进封面。
- **概念插图**：通过具体情境、人物关系和材料状态承载段落意思。一个比较可由多个场景共同表达；不能为了单一视觉中心删掉必要情境，也不要把并列选项画成先后流程。
- **信息图**：只在读者确实需要同时比较、总览或记忆多个信息时使用。
- **架构图**：先写一句自然语言问题，再选择一个抽象层级；公众号默认只保留一条主路径。
- **知识漫画**：分镜必须包含动作、阻力或关系变化；不能只是四个会说结论的方框。
- **单幅知识漫画解释图**：当读者需要看懂一段逻辑、但架构图过冷或概念插画过虚时，让角色通过操作或观察帮助理解关系。可以使用“中央关系 + 侧边角色”，也可让角色进入关系中；不能退化成站在流程图旁念结论。

关系图与数据图先读 `references/structured-visual-grammar.md`。递进、流程、循环、层次、对比和矩阵是关系语法，不是六种必须都画的模板；精确数据图必须保留来源、单位、口径和逐字数值。

启航头像角色按“默认公众号角色”自动加载，不需要 plan 或用户再次声明。人物身份与原生墨线保持一致，小黑伙伴按需出现。逐资产 plan 的 `Character anchor` 写清头像在既定情境中的角色、动作、景别与尺度；其他人物按正文关系独立设计，不能都复制头像。IP 是阅读中的熟悉角色，不必成为每张图的主角或解释者；具体方法见角色参考的“内容参与与文章节奏”。

具体规则见 `references/comic-copy.md` 与 `references/diagram-clarity.md`。

### 7. 运行视觉 AI-Flavor Filter

加载 `references/visual-ai-flavor-filter.md`。发现以下问题就回到 Step 2：

- 每个概念都被装进框。
- 每张图都有对称的三步或五步闭环。
- 漫画逐格完成“问题—分析—顿悟—结论”。
- 场景插图的文字只复述画面动作，没有补充语境或关系；解释图的必要说明不据此删除。
- 风格只剩统一配色，没有人类动作、取舍或材料痕迹。
- 换掉段落仍能复用同一张头像图，或必须靠大标题才能知道画面与正文的关系。
- 内容要求比较不同情境，却被画成单人连续动作；人物身份正确，但场景和插入位置没有服务论述。

### 8. Handoff

把 `05.5-visual-plan.md` 直接交给其中指定的渲染 Owner。下游 Owner 可以调整构图，但不得擅自新增论点、画内文案、资产形式或目标路径；需要改变 `Viewer job`、`Copy role`、`Exact text` 或 Owner 时必须退回本技能更新 plan。最终图片实际打开后，逐字对照定稿文字、逐关系对照原文和素材：解释不足返回内容步骤，错字、缺字、无关占位图或人物错误返回渲染步骤。图外文章完整不代替解释图自身的验收。

## 何时不该用

- 原始截图、论文图、转载原图或数据证据只需忠实复用时，不做风格化改写。
- 用户只要单独生成一张已经给出完整视觉说明的图片时，可直接调用对应 Baoyu 技能。
- 技术团队需要完整系统文档时，用专业架构建模流程；本技能只负责公众号阅读场景。

## References

- `references/visual-copy-contract.md` - `05.5-visual-plan.md` 与逐资产文案契约。
- `references/visual-copy-desk.md` - 封面、图注、节点、旁白与对白的独立文案审校。
- `references/asset-form-selection.md` - 是否配图、选择何种资产及渲染 Owner 的领域判断。
- `references/comic-copy.md` - 让知识漫画具有人物、动作、停顿和真实材料感。
- `references/qihang-avatar-explainer-system.md` - 启航头像身份、内容参与、多图节奏与生图检查。
- `references/diagram-clarity.md` - 面向移动端阅读的低复杂度架构图规则。
- `references/structured-visual-grammar.md` - 数据图、关系图、漫画解释图的输入契约与六类关系语法。
- `references/visual-ai-flavor-filter.md` - 信息图、架构图和漫画的 AI 味检查。
- `references/source-notes.md` - GitHub 开源来源、提炼范围与许可证边界。

## 完成标准

- 完成本 Skill 正文中 Mode、Output、Handoff 或最终交付步骤声明的全部适用产物，不因它处在较大任务中而缩减。
- 执行正文已有的检查清单、视觉检查、平台兼容检查或事实检查；不适用项说明理由，失败项先在本 Skill 内返工。
- 返回用户可直接使用或交给下一个完整 Skill 的独立产物，并明确仍需用户授权的外部写入。
