# 投研视觉研报 — 组件片段库

按 memo 实际内容挑用。每个组件给出 HTML 片段，配色用 `design-system.md` 的 CSS variables。缺的内容删掉对应组件，不硬凑。

## 1. Header（深色，每份研报都要）

标的名 + 评级 badge + 大评分，是投委第一眼。

```html
<div class="hdr">
  <div class="hdr-meta">Investment Committee Memo &bull; 2026-06-27</div>
  <h1>公司名 / 项目名</h1>
  <div class="sub">一句话定位 &bull; 地区 &bull; 累计融资 &bull; 最新轮次（领投）</div>
  <div class="vstrip">
    <div class="vbadge"><span class="dot"></span> WATCH / TRACK</div>
    <div><div class="score-big">6.08</div><div class="score-lbl">/ 10 投资评分</div></div>
  </div>
</div>
```
评级文字按 memo 结论：RECOMMEND / WATCH / TRACK / PASS。badge 和 score-big 的颜色按区间（绿/金/红）。

## 2. 评分条 strip（有评分卡时）

各维度横向均分，一眼看强弱分布。

```html
<div class="sstrip">
  <div class="si"><div class="lb">维度名 (权重%)</div><div class="vl" style="color:var(--green)">7.0</div><div class="bar"><div class="bf" style="width:70%;background:var(--green)"></div></div></div>
  <!-- 重复 N 个维度 -->
</div>
```

## 3. 编号 Section（每个主题一节）

```html
<div class="sec">
  <div class="st"><span class="n">1</span> Executive Summary</div>
  <p>正文…</p>
  <h4>小标题</h4>
  <ul><li>要点…</li></ul>
</div>
```

## 4. 指标卡网格（关键数字三连）

执行摘要里"最强维度/最弱维度/加权回报"这类三连最适合。

```html
<div class="g3">
  <div class="card"><div class="card-t">最强维度</div><div class="card-v" style="color:var(--green)">7.5</div><div class="card-n">技术壁垒 — 说明</div></div>
  <div class="card"><div class="card-t">最弱维度</div><div class="card-v" style="color:var(--red)">4.5</div><div class="card-n">商业化 — 说明</div></div>
  <div class="card"><div class="card-t">加权回报</div><div class="card-v" style="color:var(--yellow)">~2.0x</div><div class="card-n">MOIC / IRR</div></div>
</div>
```

## 5. Bull / Base / Bear 场景卡（估值/回报节）

三色并列，投委最爱看的回报情景。

```html
<div class="g3">
  <div class="sc sc-b"><div class="sc-l" style="color:var(--green)">🐂 Bull (25%)</div><div class="sc-m" style="color:var(--green)">4-6x</div><div class="sc-d" style="color:var(--green)">IRR 60-80%</div><div class="sc-d">退出 $2B-$3B</div><div class="sc-d">触发条件…</div></div>
  <div class="sc sc-a"><div class="sc-l" style="color:var(--yellow)">📊 Base (50%)</div><div class="sc-m" style="color:var(--yellow)">1-1.6x</div><div class="sc-d">…</div></div>
  <div class="sc sc-r"><div class="sc-l" style="color:var(--red)">🐻 Bear (25%)</div><div class="sc-m" style="color:var(--red)">0.2-0.4x</div><div class="sc-d">…</div></div>
</div>
```

## 6. 评分进度条（评分卡节，带数值）

比 strip 更详细，每维度一行、带权重。

```html
<div class="pl"><div class="pl-n">A. 维度名 (25%)</div><div class="pl-b"><div class="pl-f" style="width:55%;background:var(--yellow)">5.5</div></div></div>
```

## 7. 数据表（事实、融资、产品矩阵、可比交易）

memo 里大量结构化事实用表格。表头大写小字灰色，斑马线靠 border。

```html
<table>
  <tr><th>列1</th><th>列2</th><th>来源</th></tr>
  <tr><td>…</td><td>…</td><td>来源名</td></tr>
</table>
```
强调行用 `<strong>`；关键轮次/数字加粗。

## 8. 状态标签 chip（表格内嵌状态）

```html
<span class="t tg">通过</span>   <!-- 绿 -->
<span class="t ty">观察</span>   <!-- 黄 -->
<span class="t tr">风险</span>   <!-- 红 -->
<span class="t tb">投资人名</span> <!-- 蓝 -->
<span class="t tp">分类</span>   <!-- 紫 -->
<span class="t tgr">中性</span>  <!-- 灰 -->
```

## 9. 时间线（产品演变、融资历程）

```html
<div class="tl-i"><div class="tl-d" style="background:var(--accent)"></div><div class="tl-c"><div class="tl-dt">2025-03</div><div class="tl-tx"><strong>事件</strong> — 描述</div></div></div>
```

## 10. 提示框（引用、利好、警示、风险）

```html
<blockquote>最强论点 / thesis 引用，斜体蓝边</blockquote>
<div class="ok">利好信号，绿边</div>
<div class="warn">需注意，橙边</div>
<div class="danger">最弱缺口 / 红旗，红边</div>
```

## 11. 综合评级总卡（评分卡节收尾）

```html
<div class="card" style="text-align:center;background:var(--g100)">
  <div class="card-t">综合评级</div>
  <div class="card-v" style="color:var(--yellow);font-size:40px">6.08 / 10</div>
  <div class="card-n" style="font-size:14px">🟠 Watch / Track — 建议 6 个月后重新评估</div>
</div>
```

## 12. 键值对（参数清单）

```html
<div class="kv"><span class="kv-k">键</span><span class="kv-v">值</span></div>
```

## section 顺序参考（跟随 IC memo）

1 执行摘要 → 2 公司/产品概览 → 3 竞争格局 → 4 单元经济 → 5 估值/回报 → 6 评分卡 → 7 风险/一票否决 → 8 DD 优先级 → 9 thesis/watch triggers → 10 来源/缺口。
memo 没有的节就跳过编号，不留空壳。
