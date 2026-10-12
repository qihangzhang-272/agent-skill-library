# Visual Copy Contract

## 文件位置

读取当前确认的正文后生成；优先使用本次明确的定稿路径，不强制要求 `04-revised.md` 或 `05-formatted.md`：

`05.5-visual-plan.md`

## 顶层字段

```markdown
# Visual Plan

- Audience:
- Article atmosphere:
- Visual thesis:
- Shared visual system:
- Asset budget:
- Existing evidence images:
- What must remain unseen:
```

`What must remain unseen` 用来记录不应视觉化的内容，例如来源不足的数字、虚构场景、作者没有经历过的时刻。

## 逐资产字段

| 字段 | 回答的问题 |
| --- | --- |
| `ID` | 如何在 plan、prompt 和发布资产间追踪？ |
| `Position` | 图片插在哪里，前后论述是什么，为什么此处需要理解、比较、推进或停顿？ |
| `Viewer job` | 哪一句段落意思需要被看见？一个任务可以由多个情境共同表达。 |
| `Human/material anchor` | 哪些人、环境、动作或材料承载意思？情境是并列、先后还是因果？ |
| `Character anchor` | 场景确定后，头像参考哪张原图，在其中担任什么角色、动作、景别与尺度？其他人物如何区分？ |
| `Central logic visual` | 如果是单幅知识漫画，用什么可见关系让读者看懂逻辑？不要求固定居中。 |
| `Scene fact` | 画面和文章能确认的具体事实或动作是什么？ |
| `Copy role` | title / caption / label / narration / dialogue / none；解释图可组合标题、正文和证据标注。 |
| `Copy candidates` | 需要比较表达角度时写 2–3 个候选；不是同义改写。 |
| `Exact text` | 经 Humanizer-ZH 审校的全部定稿文字及对应原文／素材；短标签记录字符数，解释图保留必要正文，不套短标签字数上限。 |
| `Caption outside image` | 不适合写进图片、但应随图出现的说明与来源。 |
| `Form candidates` | 评估过的 cover / source / illustration / infographic / diagram / comic / none |
| `Selected form` | 最终选择的唯一形式。 |
| `Render owner` | source reuse / baoyu-article-illustrator / baoyu-infographic / baoyu-diagram / baoyu-comic / baoyu-cover-image / none |
| `Complexity cap` | 节点、分镜、标签或比较项上限。 |
| `Source` | 截图、原文、数据或生成依据。 |
| `Avoid` | 这张图最容易落入的俗套。 |
| `Target path` | 最终发布资产路径。 |

## 文案规则

1. 先确定本图问题和材料，再写文案；场景插图先写 `Scene fact`，解释图选取原文所需背景、判断、依据、顺序与条件，不能只把小标题当作完整图内稿。
2. 场景插图避免复述已经看得见的动作；解释图允许完整正文，使读者能在图内理解问题、依据和结论。
3. 场景插图的标题、标签、旁白和气泡补充画面无法表达的那一层；解释图的文字与素材共同讲清必要关系。
4. 装饰封面不同时塞入摘要、结论和行动号召；解释图可用标题、展开和收束共同回答同一问题。
5. 图外补充和来源链接留在 `Caption outside image`；解释图的必要正文保留在图内，精确长中文可用原生文字组装。
6. 下游 prompt 的 `Text (verbatim)` 必须来自本文件，不得临场扩写。
7. `Exact text` 必须通过对应媒介的语义与可读性检查；场景插图做朗读、去图和反复述检查，解释图逐项核对背景、判断、依据、关系和限定，具体方法见 `visual-copy-desk.md`。
8. 短场景插图的标签、旁白和气泡优先简短；解释图按阅读任务、画幅和已认可基准决定正文密度，不能为凑字数移走定义、例子、关系和边界。
9. 单幅知识漫画必须分别写清 `Character anchor` 与 `Central logic visual`；禁止只写“角色讲解该概念”。

## 合格示例

```markdown
### V02

- Position: “第一版来得很快”之后
- Viewer job: 让读者看见工作并没有消失，只是移到生成之后
- Human/material anchor: 编辑低头对照三份互相矛盾的材料；屏幕上的初稿已经完成
- Scene fact: 初稿已经打印出来，编辑仍在逐页核对原始材料
- Copy role: narration
- Copy candidates:
  - “初稿出来了”（6 字）
  - “逐页核对”（4 字）
  - 无画内文字，只写图注
- Exact text: “初稿出来了”（6 字）
- Caption outside image: “生成结束以后，作者重新核对初稿与来源材料。”
- Form candidates: illustration / three-panel comic
- Selected form: three-panel comic
- Render owner: baoyu-comic
- Complexity cap: 1 人物，1 屏幕，3 份材料；不画流程箭头
- Source: 作者真实写作链经验
- Avoid: AI 机器人、发光大脑、四步闭环
- Target path: imgs/02-comic-after-first-draft.png
```
