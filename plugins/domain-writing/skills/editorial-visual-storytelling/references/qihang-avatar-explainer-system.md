# 启航头像角色·单幅知识漫画解释系统

本文件沉淀启航公众号的固定讲解角色与配图语法。启航头像是原创公众号生成型视觉的默认身份资产，无需用户逐篇指定。它属于 `editorial-visual-storytelling` 的视觉判断层；workflow orchestrator 只按 plan 调用，不负责决定是否使用角色、说什么或画什么关系。

## 默认加载规则

- `cover`、`illustration`、`comic` 与 `single-panel explainer comic` 默认加载本角色参考图，并在 visual plan 中写清角色动作。
- `infographic` 与 `diagram` 仍优先保证信息清晰；适合加入讲解入口时使用头像角色，不适合时只继承暖纸色、深海军蓝、钴蓝与橙黄信号色。
- `source reuse` 不加入角色，不覆盖转载原图、研究截图、产品界面、论文图表或真实证据。
- 用户明确指定其他角色、其他品牌身份或无人画面时，遵循用户要求，并在 visual plan 记录覆盖原因。
- 下游渲染技能不得因为提示词中没有再次出现“使用启航头像”，就退回通用人物；角色参考由本默认规则自动继承。

## 角色身份参考

直接参考：`../assets/qihang-avatar-character.jpg`

这张图同时承担 `character identity` 与 `palette`，不只是泛化的“动漫风格参考”。后续角色图至少保留：

- 年轻男性动漫形象，深蓝近黑的蓬松乱发。
- 大号透明框眼镜，略带不耐烦、疑问或审视的眼神。
- 深海军蓝上衣，钴蓝高光，暖纸色肤色与背景。
- 身边可出现一只小型黑色猫/鸟式伙伴，作为追问、反应或指示角色；不要求每张图都出现。
- 黑色粗细不匀的手绘线条、少量钴蓝涂抹与橙黄小点，不改成光滑 3D、标准企业扁平人或通用日漫男主。

禁止把角色替换为圆框眼镜、整齐短发、商务衬衫的通用“研究员”。那会保留颜色，却丢掉人物身份。

## 适用形式

当正文需要亲民解释一段逻辑、而架构图过冷或概念插画过虚时，优先评估 `single-panel explainer comic`；不再以用户是否主动提到头像作为触发条件：

```text
中央：一段关系或判断的视觉中心
侧边：头像角色做一个明确动作
文字：一个气泡 + 少量原文短语
图外：完整解释、限定条件和来源
```

这不是概念插画，也不是在架构图旁贴一个人物。

## 画面职责

### 中央逻辑视觉

- 只回答一个 `Viewer job`。
- 通过聚散、大小、共同参与、选择、替换、核验等可见关系讲清逻辑。
- 可以出现简洁图标与分组，但默认不用组件框、泳道、箭头网络、仪表盘和多层卡片。
- 关系必须来自正文，不得先重新总结出一套新名词再生图。

### 头像角色

每张图只选一种动作：

- **指出**：告诉读者先看哪里。
- **追问**：把正文中的关键问题说出来。
- **核验**：检查来源、权限、记录或结果。
- **选择**：在多个能力中挑出当前任务需要的部分。
- **退后观察**：让中央关系成为主角。

不要连续使用托腮、皱眉、灵光一现、竖大拇指或演讲姿势。小黑伙伴可以承担惊讶、疑问、递标签或看向异常点的动作，减少人物自说自话。

## 文案规则

1. `Exact text` 直接从 `04-revised.md` 取短语；不得先改写观点，再让图服从改写后的词。
2. 主标签一般 2–10 字，优先 3–5 个。
3. 气泡只保留一句 4–10 字的人话，用来指出阅读入口，不复述整个结论。
4. 需要完整句子、限定条件或来源时移到图片 caption。
5. 生成提示词必须列出 `Use only these exact phrases`，并写明 `No other text or pseudo-text`。
6. 中文错字或多余文字只能重新生成，不得用 SVG、Canvas、Pillow 或图片覆盖修补。

## 公众号构图

- 默认 4:3 横图，适合正文手机宽度；封面仍由 cover 技能单独判断。
- 人物占画面约 20%–30%，中央逻辑视觉占 55%–65%，其余留白用于呼吸和气泡。
- 人物放左或右侧，视线和动作指向中央；不遮挡主标签。
- 画面在缩到 375px 宽时，仍应先看见一个关系、一个人物动作和一句短话。

## 提示词骨架

```text
Create a single-panel Chinese knowledge-comic explainer, 4:3 landscape.
Use the supplied qihang avatar as character identity and palette reference.

CENTRAL LOGIC VISUAL:
[只描述一个关系，来自 05.5-visual-plan.md]

CHARACTER ACTION:
[指出 / 追问 / 核验 / 选择 / 退后观察]

TEXT (VERBATIM):
[逐条列出 Exact text]
Use only these exact phrases. No other text or pseudo-text.

STYLE:
warm cream paper, deep navy, cobalt blue, small orange accents;
hand-drawn anime editorial linework; approachable, not corporate-flat.

AVOID:
architecture diagram, boxes, arrow network, card grid, generic consultant,
3D CGI, sci-fi hologram, purple/pink, extra labels, logos, watermark.
```

## 交付检查

- 角色是否仍能被认作头像里的人，而不是同色系陌生人？
- 中央是否真的讲清一段正文逻辑？
- 去掉气泡后，画面关系是否仍然成立？
- 角色是否执行了动作，而不是当贴纸？
- 所有文字是否来自 `Exact text`，且没有模型擅自添加？
- 这张图更像一幅亲民的知识漫画，而不是技术图或抽象比喻图？
