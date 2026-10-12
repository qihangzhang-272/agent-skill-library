# 将文章情境写成可执行的生图提示

适用：已经有明确段落、插图位置与固定人物参考的正文插图。内容与形式判断归 editorial-visual-storytelling；本文件负责把其 brief 转成图像模型能执行的空间、动作、参考与文字约束，不重新选择文章观点。

## 已确认的经验

2026-09-06，用户明确认可“课堂中的签到与提问”和“听讲、独读、与 AI 讨论”的新版，特别肯定场景化内容。此前四种以头像表现形式为中心的候选全部被否定。

本例支持的方法判断：有效信息来自学习场所、人的动作和情境关系；头像稳定提供熟悉感。成功不能只归因于某个形容词或模型名，也不意味着以后都应画三个学生或三分栏。

## 写提示词时保留的六块

1. **位置与意思**：用两句写图片前后在论述什么、读者此处要看见什么。先给场景要完成的任务，不从“画一个头像 IP”开头。
2. **空间与动作**：具体写谁在什么地方、看向哪里、手在做什么、正在使用哪个物件。讲不同学习方法时，用教室中的视线、书桌上的阅读动作和电脑前的追问区分情境。
3. **情境关系**：明确并列、先后、因果或对照。并列情境要写 different people, equally valid alternatives, not sequential steps；否则同一 IP 容易把它变成三步教程。
4. **人物身份与主次**：原图只锁定指定人物的脸、发型、眼镜、服装设计和原生笔触。原构图、巨大头像比例、背景标语不继承。其他人物独立外貌；人物尺度相对同场景其他人定义，百分比只作起点，生成后实际检查。
5. **有作用的环境与文字**：教室、书架、床架等只用来确认情境；让背景线条轻于动作主体。画内短文案列出 Exact text，图外图注单独处理。书页用整齐短线、钟面用刻度，避免环境产生伪文字。
6. **保留项与修改项**：局部修图同时传原头像和待改图，逐一声明用途；只改已观察到的偏差，保留已经成立的场景、关系、景别和画风。

不把本流程升级为文章固定链条；内容与位置已明确时，直接执行已有 brief。

## 可复用示例：同一意思的多个并列情境

下面是本次有效提示结构的缩写。括号由当前正文替换；不能无条件照搬学习主题。

```text
Create one finished horizontal editorial illustration for [article paragraph].
It is inserted after [specific argument] and before [next paragraph].
The reader should see [one concrete meaning].

SCENES AND RELATION:
Combine [scene A], [scene B], and [scene C] in one cohesive picture.
These are parallel alternatives involving DIFFERENT PEOPLE, not successive steps.
In each scene specify:
- who is present, their distinct appearance and role;
- setting and the environmental cue that makes it identifiable;
- gaze, hand action and the object being used.
Give equally valid alternatives comparable visual weight.
Use architectural edges and breathing space to connect the scenes;
do not add arrows, rankings or numbered steps unless the brief requires them.

REFERENCE ROLES:
Image 1 is the original identity and native ink reference for ONLY [named role].
Use the same person. Preserve face, hair, glasses, age, proportions and fixed costume.
Change the action and composition required by this scene.
Do not inherit the reference portrait framing, giant head or background slogans.
Other people share the drawing style, not the avatar's face.
Keep this participant at a scale comparable to the other focal people.

STYLE:
Follow the actual reference's uneven ink strokes, dry edges and restrained palette.
Use lighter environmental linework, legible actions and enough breathing room.
Do not turn scene richness into unrelated decorative clutter.

EXACT TEXT:
[List only approved short phrases; specify fixed costume marks separately.]
No other readable text or pseudo-writing.
Use clean ruled lines for books and unlabeled geometric sketches where needed.

CHECK:
The scene must still explain the paragraph if the avatar is mentally replaced
by an ordinary participant. Identity adds continuity; the situation carries the meaning.
```

## 局部修图模板

```text
Edit image 2 only. Image 1 is the original identity reference.
Preserve image 2's composition, distinct people, spatial relationships,
actions, text and native ink rendering.
Correct only [observed facial/accessory/lettering issue].
Keep the character's present size, position and pose.
Do not replace the good scene with a portrait or redesign the whole picture.
```

实际返工例：课堂图清除钟面额外数字；三情境图清除黑板字母和书页伪文字，并收紧头像的审视眼神与大号透明眼镜。两图均保留第一版已成立的场景，而非重新发明构图。

## 验收与证据

先检查段落意思与并列/先后关系，再比原头像身份，再查文字、图文位置和阅读效果。不得把同色系当作同一个人，不能靠正确脸型掩盖泛泛场景。用户已认可的内容构图可以作为构图参考，原头像仍是身份真源。

完整首轮与局部修图提示词、v1、最终 PNG 和联读稿保留在文章 Case 的 visual-lab/2026-09-06-context-first。正式技能保存的是上述可迁移方法，不把 Case 路径作为运行依赖。调用宿主原生图像工具或本 Skill 已有 Provider，不新增执行器。

