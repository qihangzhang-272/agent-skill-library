# 公众号 PPT 漫画风格：已认可案例与提示词

适用：文章已确认，准备安排头像场景、带文字插图或漫画。作者于 2026-10-05 认可本篇 complete-v5 的呈现；这里保留该版实际输入与可复用判断，不把这一篇课文固定为每篇模板。公开身份／风格原件的恢复方法见 [公开视觉参考](public-visual-sources.md)。

## 本次采用了什么

| 插入作用 | 实际画面与材料 | 可迁移的做法 |
| --- | --- | --- |
| 封面建立备课背景 | 头像比较讲稿与课件，两位不同外貌的同伴阅读，黑鸟观察材料；三行原题 | 标题与具体活动共同成立，材料进入人物动作，头像不只是装饰半身像 |
| 解释讲 Codex 的顺序 | 左侧“下载、按钮、步骤”与“为什么需要它？”；右侧 Python 与研究材料，讲能参与什么任务 | 用当前正文的对象与问题做并列比较；不虚构安装界面或学习成绩 |
| 呈现修改一页课件 | 同一课件、讲稿、手册跨格延续；从 Agent／Prompt／Context 名词到翻原始资料 | 保持材料连续性，动作展示缺口及下一步；不只写“材料先行” |
| 让读者看见实际成果和依据 | 第 1、12、58 页原课件 | 与生成场景穿插，保留来源原像素；不重绘官方图或把原图当装饰 |

这篇的三幅生成图与三张原课件形成阅读节奏，不成为固定配额。以后按正文需要选图：关系比较可用并列场景，过程可用连续漫画，证据使用原图；内容不需要人物时不硬放头像。

## 画内文字与 HTML 正文

本次生成图的标题、对白、旁白和物件标签由图像生成模型直接生成；完整作者论述留在可编辑 HTML。图内文字承担识别、语境和关系，不重复排一遍长段正文。

这不等于“只准纯插画”或“永远只有短标题”。若当前任务需要独立读懂的解释图，先整理必要定义、例子与条件，调用既有 Humanizer-ZH 对照真实材料，再确定全部 `Exact text`；画幅承载不了，先减装饰或分图。不要用 `only short labels` 删除必要解释。

图内稿与构图说明分别输入，不让模型二次概括。`No other text` 只限制未批准的额外文字，不限制已经批准的解释全文。不要把 visual plan、QA、版本校验或“据原文整理”自动抄入图或正文；需要的真实出处另按内容选择简短署名。

## 可复用输入结构

以下是结构参考；将具体段落、动作和文案换成本篇已经确认的材料，不把括号原样发给模型。

```text
Generate a finished [cover / editorial scene / comic / explanatory image]
for [the specific article passage and reader question].
Choose an aspect ratio that fits this article's reading layout.

REFERENCE ROLES:
Image 1 locks the approved avatar identity and rough ink linework:
messy dark/cobalt hair, angular transparent glasses, navy cat shirt,
white ?! shirt mark; the small black bird is an optional companion.
Do not copy the portrait's beige background, slogans or giant-head framing.
Image 2 is the original course page 58, STYLE ONLY:
white/light base, pale washes, clear hierarchy, cobalt drawn emphasis.
Do not copy its body text or redraw its evidence.

SCENE AND RELATION:
[Who looks at or manipulates which actual material, where, and why?]
[State whether scenes compare alternatives or show successive actions.]
[Name distinct secondary people; preserve the same objects across panels
only when the passage describes a continuing process.]

TEXT (VERBATIM):
[All approved on-image copy, kept separate from these instructions.]
Render this text directly with the image generation model.
No unapproved captions, dialogue or claims, fake UI, or production notes.

STYLE AND CHECK:
White/light page, navy ink, cobalt #2447D8 emphasis and pale blue #EEF2FF.
Warm skin and small natural object colors may remain.
Keep actions, gaze and hands anatomically connected and legible.
Preserve real source pixels separately; do not generate official evidence.
```

不必每次加入所有限制。按实际问题写少量针对性禁项，不积累与本图无关的长负面提示词。

## 实际采用的完整提示词

以下四份为 v5 实际保存输入的原字节副本，便于审查与复用；它们包含本篇特定标题及场景，不是通用默认文案。

- [封面首轮](ppt-v5-prompts/00-cover.md)：身份参考 + 第 58 页风格参考，原题与备课材料同画。
- [封面局部修正](ppt-v5-prompts/00-cover-fix.md)：保留好构图，只移除第三只手及其前臂，把黄色标题强调改回同蓝色系。这里 **Image 1 是待修封面、Image 2 是身份参考**，顺序不同于新图，不能机械套用。
- [讲 Codex 的具体比较](ppt-v5-prompts/02-codex.md)：用“为什么需要它？”以及 Python／研究材料解释教学顺序；对白是漫画表达，不是作者记录的逐字对话。
- [课件、讲稿、手册的连续修改](ppt-v5-prompts/06-revision.md)：三份材料跨格保持一致，概念名与原始资料形成具体操作关系。

本次输出为 1536 × 1024（3:2），不是所有公众号图的强制比例。成品 SHA256 分别为：

- 封面修正后：`92c949cf81a4079802c804dda5deffdb0919a38aa4b9e844721a7c37f41fa32a`。
- Codex 比较图：`ceeb38c50d12dfa3e135a0b906c2e3e5b2036ca133f8953b6fb7beb7f93ff607`。
- 修改漫画：`f108ac8ffad33cab6715258ccfddc445402d6b185df7f2c36f2ba55cda8957a4`。

这些是本次已认可输出的追溯标识，不声称它们已有公开下载链接。后续 Agent 可凭公开头像与课件恢复参考，结合当前文章重新生成；不能把重新生成结果自动当作作者已确认图。

## 实际成品怎么验收

生成后打开每幅输出，与定稿逐字对照、与文章逐关系对照；检查错字、缺字、材料标签、头像身份、黑鸟、人物肩—肘—腕—手的连接。错误回到图像模型局部编辑或重做，不通过 Python／SVG／Canvas 遮盖中文字。

本次封面首轮出现第三只手与黄色强调，经图像模型编辑后采用；两幅漫画采用首轮输出。新图仍需独立检查，不因参考 case 好看跳过。关系先检查：并列比较不是已证实的学习效果；原文“可能”的训练原因假说不得画成因果机制；Agent 官方图的 Action／Feedback／Stop 及归属另用真实原页核对。

把图放回正文，检查前后文字是否讲清背景、对象、动作和原因。文章需要的来源可点击；制作回执、原尺寸入口、固定提交入口等不出现在读者版。HTML 阅读检查与真实微信编辑器回看分别记录，本参考不证明平台已提交或已发布。
