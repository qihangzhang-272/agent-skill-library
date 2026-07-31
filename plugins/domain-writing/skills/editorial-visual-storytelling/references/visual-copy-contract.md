# Visual Copy Contract

## 文件位置

读取 `04-revised.md` 与 `05-formatted.md` 后生成：

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
| `Position` | 图片插在哪里，前后读者刚读到什么？ |
| `Viewer job` | 读者看完这张图只需要得到什么？ |
| `Human/material anchor` | 谁在做什么，或哪种材料状态承载内容？ |
| `Scene fact` | 画面和文章能确认的具体事实或动作是什么？ |
| `Copy role` | title / caption / label / narration / dialogue / none |
| `Copy candidates` | 2–3 个从不同角度写出的候选；不是同义改写。 |
| `Exact text` | 文案审校后允许出现的全部文字及逐条字符数；单个文本单元默认不超过 10 个中文字符。 |
| `Caption outside image` | 不适合写进图片、但应随图出现的说明与来源。 |
| `Form candidates` | 评估过的 cover / source / illustration / infographic / diagram / comic / none |
| `Selected form` | 最终选择的唯一形式。 |
| `Render owner` | source reuse / baoyu-article-illustrator / baoyu-infographic / baoyu-diagram / baoyu-comic / baoyu-cover-image / none |
| `Complexity cap` | 节点、分镜、标签或比较项上限。 |
| `Source` | 截图、原文、数据或生成依据。 |
| `Avoid` | 这张图最容易落入的俗套。 |
| `Target path` | 最终发布资产路径。 |

## 文案规则

1. 先写 `Scene fact`，再写文案；禁止从文章小标题直接生成 `Exact text`。
2. 画内文字不能代替正文，也不能复述已经看得见的动作。
3. 标题、标签、旁白和气泡只写画面无法表达的那一层。
4. 同一张图不同时承担标题、摘要、结论和行动号召。
5. 复杂中文、来源和解释优先留在 `Caption outside image`。
6. 下游 prompt 的 `Text (verbatim)` 必须来自本文件，不得临场扩写。
7. `Exact text` 必须通过朗读、去图和反复述检查；具体方法见 `visual-copy-desk.md`。
8. 画内文字优先 4–8 字，硬上限 10 个中文字符；长解释必须移到 `Caption outside image`。

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
