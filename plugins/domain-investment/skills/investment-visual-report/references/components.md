# 投研视觉研报组件

只选择 Memo 真实包含的组件。所有 `{{...}}` 都必须替换为 Memo 原值；没有对应内容就删除整个可选组件，不能保留占位符或创造数字。

## 1. 报告头

```html
<header class="hdr">
  <div class="hdr-meta">投资委员会备忘录 &bull; {{估值或报告日期}}</div>
  <h1>{{公司或项目名称}}</h1>
  <div class="sub">{{一句话业务定位}}</div>
  <div class="vstrip">
    <div class="vbadge {{结论颜色类}}"><span class="dot"></span>{{Memo 唯一结论}}</div>
    <div><div class="score-big">{{Memo 综合评分}}</div><div class="score-lbl">投资评分</div></div>
  </div>
</header>
```

结论只可显示为 `推进（Proceed）`、`有条件推进（Conditional proceed）`、`观察（Watch）` 或 `放弃（Pass）`，并逐字继承 Memo。Memo 没有综合评分时删除评分块，不填零。

## 2. 章节

```html
<section class="sec">
  <h2 class="st"><span class="n">1</span>执行摘要</h2>
  <p>{{Memo 对应章节的完整内容}}</p>
</section>
```

十三个必需章节都用这一结构，顺序见本文末尾。视觉组件只能帮助阅读，不能取代正文。

## 3. 评分概览

只有 Memo 有完整评分卡时使用：

```html
<div class="sstrip">
  <div class="si">
    <div class="lb">{{维度与权重}}</div>
    <div class="vl">{{分值}}</div>
    <div class="bar"><div class="bf" style="width:{{百分比}};background:var(--yellow)"></div></div>
  </div>
</div>
```

## 4. 指标卡

```html
<div class="g3">
  <div class="card"><div class="card-t">{{指标名}}</div><div class="card-v">{{Memo 原值}}</div><div class="card-n">{{口径和解释}}</div></div>
</div>
```

## 5. 乐观、基准、悲观情景

```html
<div class="g3">
  <div class="sc sc-b"><div class="sc-l">乐观情景（Bull）</div><div class="sc-m">{{回报原值}}</div><div class="sc-d">{{条件与假设}}</div></div>
  <div class="sc sc-a"><div class="sc-l">基准情景（Base）</div><div class="sc-m">{{回报原值}}</div><div class="sc-d">{{条件与假设}}</div></div>
  <div class="sc sc-r"><div class="sc-l">悲观情景（Bear）</div><div class="sc-m">{{回报原值}}</div><div class="sc-d">{{条件与假设}}</div></div>
</div>
```

内部收益率（IRR）和投资回报倍数（MOIC）沿用 Memo 的中文解释、币种、期间和精度。

## 6. 表格

```html
<div class="table-wrap">
  <table>
    <thead><tr><th>{{列名}}</th><th>{{列名}}</th><th>来源</th></tr></thead>
    <tbody><tr><td>{{Memo 原文}}</td><td>{{Memo 原值}}</td><td><a href="{{真实 URL}}" target="_blank" rel="noopener noreferrer">{{来源名称}}</a></td></tr></tbody>
  </table>
</div>
```

外部来源必须可点击。不能把内部文件名当来源名称。

## 7. 状态标签

```html
<span class="t tg">通过</span>
<span class="t ty">待验证</span>
<span class="t tr">风险</span>
<span class="t tgr">未知</span>
```

## 8. 论点与风险提示

```html
<blockquote>{{Memo 的核心论点}}</blockquote>
<div class="ok">{{已验证的正向证据}}</div>
<div class="warn">{{条件或待验证项}}</div>
<div class="danger">{{关键风险或一票否决项}}</div>
```

颜色必须跟随 Memo 的语义，不能为了好看改变判断强弱。

## 9. 跟踪触发器

```html
<div class="tl-i">
  <div class="tl-d"></div>
  <div class="tl-c"><div class="tl-dt">{{观察周期}}</div><div class="tl-tx"><strong>{{触发器}}</strong> — {{阈值、证据与行动}}</div></div>
</div>
```

## 固定章节顺序

1. 执行摘要
2. 投资建议
3. 公司与产品概览
4. AI 原生性与产品判断
5. 市场与竞争格局
6. 商业模式与单位经济
7. 技术、开源生态与护城河
8. 估值与回报逻辑
9. 投资评分卡
10. 核心风险与一票否决项
11. 尽调优先级
12. 投资论点与跟踪触发器
13. 来源、未知项与核验缺口

任一章节内容不足时，准确指出 Memo 缺少什么；确实无法取得的信息按 Memo 已披露的缺口继续展示。不要增加运行记录章节。
