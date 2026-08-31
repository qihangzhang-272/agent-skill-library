# 投研视觉研报 — 设计系统

这套设计语言提炼自本库采用的研报参考范例（secondme IC memo visual）。照它来，保证每份研报观感统一、专业、像出自同一只手。

## 设计哲学

- **投委读物，不是营销页**：克制、信息密度高、专业感。深色 header 压阵，白卡承载内容，语义色传递判断。
- **一眼看懂结论**：评级和评分放最显眼处（header），用颜色编码强弱，让人 3 秒内 get 到 watch/pass/recommend。
- **数据可信感**：表格规整、来源标注、数字右对齐感。让投委信任这份分析。

## 配色系统（CSS variables）

放在 `:root`，全文复用：

```css
:root{
  --bg:#f8f9fa;        /* 页面背景，浅灰 */
  --surface:#fff;      /* 卡片/section 背景，白 */
  --border:#e2e8f0;    /* 边框线 */
  --text:#1a202c;      /* 主文字 */
  --text2:#64748b;     /* 次要文字 */
  --accent:#2563eb;    /* 主强调色，蓝 */
  --green:#16a34a;     /* 利好/强/通过 */
  --yellow:#d97706;    /* 中性/观察/警示 */
  --red:#dc2626;       /* 风险/弱/否决 */
  --orange:#ea580c;    /* 矛盾/悖论提示 */
  --purple:#7c3aed;    /* 辅助分类 */
  --g100:#f1f5f9;--g200:#e2e8f0;--g500:#64748b;--g700:#334155;--g900:#0f172a;
}
```

## 语义色规则（关键 — 必须和 memo 结论一致）

颜色不是装饰，是判断的编码。上色前先看 memo 怎么说：

| 含义 | 色 | 用在 |
| --- | --- | --- |
| 利好 / 强项 / 通过 / bull | `--green` | 高分维度、最强论点、bull 场景、通过的否决项 |
| 中性 / 观察 / 假设 / base | `--yellow` | 中等分、待验证项、base 场景、watch 状态 |
| 风险 / 短板 / 否决 / bear | `--red` | 低分维度、最弱缺口、bear 场景、红旗 |
| 结构性矛盾 / 悖论 | `--orange` | 商业模式悖论这类"非简单好坏"的提示框 |

评级 badge 的颜色跟随综合评分区间：Recommend(高)→绿，Watch/Track(中)→黄/金，Pass(低)→红。secondme 是 Watch，用的金黄 `#fbbf24`。

## 排版

- 字体栈（系统字，不引 CDN）：`font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif`
- 正文 `font-size:15px; line-height:1.7`
- 代码/等宽：`'Fira Code',monospace`（也是系统回退）
- 标题层级：header h1 `32px/800`；section 标题 `20px/700`（带编号方块）；小标题 h4 `15px/600`

## 整体布局

```
.ct  容器 max-width:1200px; margin:0 auto; padding:24px   ← 单列居中
├── .hdr     深色 header（--g900 底），含 meta/标题/副标题/评级badge/大评分
├── .sstrip  评分条 strip（白底），N 个维度横向均分，每个含标签+分值+进度条
└── .sec ×N  编号 section（白底卡），每节一个主题，全展开
```

- **单列**，不要多栏复杂布局——投委线性阅读。
- **全展开**，section 之间用 `border-bottom` 分隔，圆角只在首尾。
- header 圆角 `12px 12px 0 0`，最后一个 section 圆角 `0 0 12px 12px`，整体像一张连续的卡。

## 响应式

唯一断点 `@media(max-width:768px)`：

```css
@media(max-width:768px){
  .ct{padding:12px}
  .hdr{padding:32px 20px}.hdr h1{font-size:24px}
  .sec{padding:24px 20px}
  .sstrip{flex-wrap:wrap}.si{min-width:45%}
  .g2,.g3{grid-template-columns:1fr}   /* 多栏网格降级单列 */
  .vstrip{flex-direction:column;align-items:flex-start}
}
```

移动端：网格塌成单列、header 缩小、评分条换行。保证手机上不横向溢出。

## 组件类名速查

完整 HTML 片段见 `components.md`。类名约定：

- `.hdr .hdr-meta .vbadge .score-big` — header 区
- `.sstrip .si .bar .bf` — 评分条
- `.sec .st .n` — section 与编号标题
- `.card .card-t .card-v .card-n` — 指标卡
- `.sc .sc-b/.sc-a/.sc-r` — bull/base/bear 场景卡
- `.pl .pl-n .pl-b .pl-f` — 评分进度条（带数值）
- `.t .tg/.ty/.tr/.tb/.tp/.tgr` — 状态标签 chip（绿/黄/红/蓝/紫/灰）
- `.tl-i .tl-d .tl-c` — 时间线
- `blockquote .warn .danger .ok` — 引用与三色提示框
- `.g2 .g3` — 两栏/三栏网格
- `table th td` — 数据表
