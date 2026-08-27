import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface StudioTheme {
  id: string;
  label: string;
  description: string;
  tokens: Record<string, string>;
}

interface StudioVariant {
  id: string;
  label: string;
  style: string;
  accentStyle?: string;
  marker?: string;
}

interface StudioComponent {
  id: string;
  label: string;
  sample: string;
  options: StudioVariant[];
}

interface StudioFont {
  id: string;
  label: string;
  value: string;
}

interface StudioSpacing {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export interface QihangStudioCatalog {
  themes: StudioTheme[];
  typography: {
    fonts: StudioFont[];
    targets: string[];
    size: { min: number; max: number; step: number };
    weights: number[];
  };
  spacing: StudioSpacing[];
  components: StudioComponent[];
  imageStyles: StudioVariant[];
}

interface BuildStudioOptions {
  articleHtml: string;
  title: string;
  catalog?: QihangStudioCatalog;
}

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = path.join(SKILL_DIR, "assets", "qihang-studio-catalog.json");

export function loadQihangStudioCatalog(): QihangStudioCatalog {
  return JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8")) as QihangStudioCatalog;
}

export function totalStudioVariants(catalog: QihangStudioCatalog): number {
  const componentCount = catalog.components.reduce(
    (total, component) => total + component.options.length,
    0,
  );
  const imageCount = catalog.imageStyles.filter((variant) => variant.id !== "theme").length;
  return componentCount + imageCount;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeScriptJson(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function renderOptions<T extends { id: string; label: string }>(items: T[]): string {
  return items
    .map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</option>`)
    .join("");
}

function renderNumberOptions(min: number, max: number, step: number, selected: number): string {
  const options: string[] = [];
  for (let value = min; value <= max; value += step) {
    options.push(`<option value="${value}"${value === selected ? " selected" : ""}>${value}px</option>`);
  }
  return options.join("");
}

function renderVariantPreview(component: StudioComponent, variant: StudioVariant): string {
  const style = escapeHtml(variant.style);
  const accentStyle = escapeHtml(variant.accentStyle || "display:none;");
  const marker = escapeHtml(variant.marker || "");
  const sample = escapeHtml(component.sample);
  let preview: string;

  if (component.id === "quote") {
    preview = `<blockquote style="${style}">${sample}</blockquote>`;
  } else if (component.id === "code") {
    preview = `<pre style="${style}">${sample}</pre>`;
  } else if (component.id === "inline-code") {
    preview = `<p>正文里的 <code style="${style}">${sample}</code> 仍然清楚。</p>`;
  } else if (component.id === "strong") {
    preview = `<p>这是一处 <strong style="${style}">${sample}</strong>，用于检验强调。</p>`;
  } else if (component.id === "em") {
    preview = `<p>这是一句 <em style="${style}">${sample}</em>，用于检验语气。</p>`;
  } else if (component.id === "ordered-list" || component.id === "unordered-list") {
    preview = [1, 2, 3]
      .map((index) => {
        const itemMarker = component.id === "ordered-list" && marker === "1." ? `${index}.` : marker;
        return `<div style="${style}"><span style="${accentStyle}">${escapeHtml(itemMarker)}</span>${sample}</div>`;
      })
      .join("");
  } else if (component.id === "table") {
    preview = `<table style="${style}"><thead><tr><th style="${accentStyle}">元素</th><th style="${accentStyle}">作用</th></tr></thead><tbody><tr><td>标题</td><td>建立层级</td></tr><tr><td>引用</td><td>补充判断</td></tr></tbody></table>`;
  } else if (component.id === "divider") {
    preview = `<hr style="${style}">`;
  } else if (component.id === "link") {
    preview = `<p><a href="#" style="${style}">${sample}</a></p>`;
  } else {
    preview = `<div style="${style}"><span style="${accentStyle}">${marker}</span>${sample}</div>`;
  }

  return `
    <article class="variant-card" data-preview-variant="${escapeHtml(component.id)}:${escapeHtml(variant.id)}">
      <header><span>${escapeHtml(component.label)}</span><strong>${escapeHtml(variant.label)}</strong></header>
      <div class="variant-stage">${preview}</div>
    </article>`;
}

function renderImagePreview(variant: StudioVariant): string {
  return `
    <article class="variant-card" data-preview-variant="image:${escapeHtml(variant.id)}">
      <header><span>图片</span><strong>${escapeHtml(variant.label)}</strong></header>
      <div class="variant-stage">
        <div class="image-mock" style="${escapeHtml(variant.style)}">
          <span class="image-mock-orbit"></span>
          <span class="image-mock-title">视觉中心</span>
          <span class="image-mock-note">图片边界与正文节奏</span>
        </div>
      </div>
    </article>`;
}

function renderGallery(catalog: QihangStudioCatalog): string {
  const components = catalog.components.flatMap((component) =>
    component.options.map((variant) => renderVariantPreview(component, variant)),
  );
  const images = catalog.imageStyles
    .filter((variant) => variant.id !== "theme")
    .map(renderImagePreview);
  return [...components, ...images].join("");
}

export function buildQihangStudio(options: BuildStudioOptions): string {
  const catalog = options.catalog ?? loadQihangStudioCatalog();
  const defaultTheme = catalog.themes[0]!;
  const themeOptions = renderOptions(catalog.themes);
  const fontOptions = catalog.typography.fonts
    .map((font) => `<option value="${escapeHtml(font.id)}" data-value="${escapeHtml(font.value)}">${escapeHtml(font.label)}</option>`)
    .join("");
  const typeTargetOptions = catalog.typography.targets
    .map((target) => `<option value="${target}">${target.toUpperCase()}</option>`)
    .join("");
  const componentOptions = renderOptions([
    ...catalog.components.flatMap(({ id, label }) =>
      id === "h3"
        ? [
            { id, label },
            { id: "h4", label: "四级标题 H4" },
            { id: "h5", label: "五级标题 H5" },
            { id: "h6", label: "六级标题 H6" },
          ]
        : [{ id, label }],
    ),
    { id: "image", label: "图片" },
  ]);
  const gallery = renderGallery(catalog);
  const tokenCss = Object.entries(defaultTheme.tokens)
    .map(([name, value]) => `--${name}:${value};`)
    .join("");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(options.title)} · 启航排版工作台</title>
  <style>
    :root{${tokenCss}--studio-bg:#E9EEF7;--studio-panel:rgba(255,255,255,.92);--studio-shadow:0 24px 80px rgba(16,24,39,.14);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 10% 8%,var(--pale),transparent 32%),radial-gradient(circle at 88% 14%,color-mix(in srgb,var(--warm) 20%,transparent),transparent 26%),var(--studio-bg);color:var(--body)}
    button,input,select{font:inherit}.studio-shell{min-height:100vh}.studio-masthead{display:flex;justify-content:space-between;gap:24px;padding:20px 28px;border-bottom:1px solid rgba(16,24,39,.12);background:rgba(255,255,255,.72);backdrop-filter:blur(18px);position:sticky;top:0;z-index:20}.studio-brand{display:flex;align-items:center;gap:16px}.studio-brand-mark{width:48px;height:48px;display:grid;place-items:center;background:var(--ink);color:#fff;font-weight:900;letter-spacing:-.06em}.studio-brand strong{display:block;color:var(--ink);font-size:18px}.studio-brand small,.studio-status{color:var(--muted,#667085);font-size:12px;letter-spacing:.08em}.studio-status{text-align:right;align-self:center}
    .studio-workspace{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:22px;max-width:1440px;margin:0 auto;padding:24px}.preview-bay,.control-deck,.gallery-section{border:1px solid rgba(16,24,39,.1);background:var(--studio-panel);box-shadow:var(--studio-shadow)}.preview-bay{padding:18px;border-radius:24px;min-width:0}.preview-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}.preview-toolbar strong{color:var(--ink)}.width-switch{display:flex;gap:6px}.width-switch button,.ghost-button,.primary-button,.tab-button{border:0;cursor:pointer}.width-switch button,.ghost-button,.tab-button{padding:8px 11px;border:1px solid var(--border);background:#fff;color:var(--body)}.width-switch button[aria-pressed="true"],.tab-button.active{background:var(--ink);color:#fff;border-color:var(--ink)}.article-frame{width:100%;margin:0 auto;padding:36px 34px;border:1px solid var(--border);background:#fff;transition:width .2s ease;overflow:hidden}.article-frame.mobile{width:min(100%,375px);padding:24px 16px}.article-frame #output{max-width:677px!important;margin:0 auto!important}.article-frame.mobile #output{max-width:100%!important}
    .control-deck{position:sticky;top:92px;align-self:start;max-height:calc(100vh - 116px);overflow:auto;border-radius:24px;padding:18px}.control-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:16px}.control-heading h2{margin:0;color:var(--ink);font-size:28px;letter-spacing:-.04em}.control-heading span{padding:4px 7px;background:var(--accent);color:#fff;font-size:10px;font-weight:800}.control-block{padding:15px 0;border-top:1px solid var(--border)}.control-block:first-of-type{border-top:0}.control-block h3{margin:0 0 11px;color:var(--ink);font-size:13px;text-transform:uppercase;letter-spacing:.12em}.control-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:9px}.control-row.single{grid-template-columns:1fr}.control-field label{display:block;margin-bottom:5px;color:var(--muted,#667085);font-size:11px}.control-field select,.control-field input[type="color"]{width:100%;min-height:38px;border:1px solid var(--border);border-radius:0;background:#fff;color:var(--ink)}.control-field select{padding:0 9px}.range-line{display:grid;grid-template-columns:1fr 48px;gap:8px;align-items:center;margin:9px 0}.range-line label{font-size:12px}.range-line input{width:100%;grid-column:1/-1;accent-color:var(--accent)}.range-line output{justify-self:end;color:var(--accent);font-size:11px}.action-stack{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.primary-button{grid-column:1/-1;padding:12px;background:var(--ink);color:#fff;font-weight:750}.ghost-button{padding:10px}.control-note{margin:10px 0 0;color:var(--muted,#667085);font-size:11px;line-height:1.6}
    .gallery-section{max-width:1392px;margin:0 auto 40px;border-radius:24px;padding:26px}.gallery-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:22px}.gallery-head h2{margin:0;color:var(--ink);font-size:32px;letter-spacing:-.04em}.gallery-head p{max-width:560px;margin:0;color:var(--muted,#667085);line-height:1.7}.variant-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.variant-card{min-width:0;border:1px solid var(--border);background:#fff}.variant-card>header{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-bottom:1px solid var(--border);font-size:11px}.variant-card>header span{color:var(--muted,#667085)}.variant-card>header strong{color:var(--ink)}.variant-stage{min-height:150px;padding:22px 18px;display:flex;flex-direction:column;justify-content:center;overflow:hidden}.variant-stage p{margin:0;line-height:1.8}.variant-stage blockquote{margin:0}.variant-stage pre{margin:0}.variant-stage table td,.variant-stage table th{padding:8px 10px;border-bottom:1px solid var(--border)}.image-mock{min-height:150px;padding:22px;background:linear-gradient(145deg,var(--pale),#fff);position:relative;overflow:hidden}.image-mock-orbit{position:absolute;width:116px;height:116px;border:22px solid color-mix(in srgb,var(--accent) 22%,transparent);border-radius:50%;right:-16px;top:-24px}.image-mock-title,.image-mock-note{position:relative;display:block}.image-mock-title{margin-top:25px;color:var(--accent);font-size:20px;font-weight:800}.image-mock-note{margin-top:8px;color:var(--body);font-size:12px}
    .toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);padding:10px 16px;background:var(--ink);color:#fff;opacity:0;pointer-events:none;transition:.2s;z-index:40}.toast.show{opacity:1;transform:translate(-50%,0)}
    @media(max-width:980px){.studio-workspace{grid-template-columns:1fr}.control-deck{position:static;max-height:none}.variant-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:620px){.studio-masthead{position:static;padding:15px}.studio-status{display:none}.studio-workspace{padding:12px}.preview-bay,.control-deck,.gallery-section{border-radius:14px}.article-frame{padding:24px 14px}.variant-grid{grid-template-columns:1fr}.gallery-section{margin:0 12px 24px;padding:16px}.gallery-head{display:block}.gallery-head p{margin-top:8px}.control-row{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <main class="studio-shell">
    <header class="studio-masthead">
      <div class="studio-brand"><span class="studio-brand-mark">航</span><div><strong>航的杂谈地图 · 排版工作台</strong><small>QIHANG ARTICLE STUDIO / COMPLETE VISUAL CATALOG</small></div></div>
      <div class="studio-status">实时正文 · 全量组件 · 单文件预览<br>当前生产主题与试验效果并列可见</div>
    </header>
    <section class="studio-workspace">
      <section class="preview-bay">
        <div class="preview-toolbar"><strong>文章实时预览</strong><div class="width-switch"><button type="button" data-width="desktop" aria-pressed="true">677</button><button type="button" data-width="mobile" aria-pressed="false">375</button></div></div>
        <div class="article-frame" id="articleFrame"><div id="studioArticle">${options.articleHtml}</div></div>
      </section>
      <aside class="control-deck">
        <div class="control-heading"><div><h2>排版设置</h2><p class="control-note">全部效果均保留，不按兼容等级隐藏。</p></div><span>FULL</span></div>
        <section class="control-block" data-studio-control="theme"><h3>01 / Theme</h3><div class="control-row single"><div class="control-field"><label for="studioTheme">排版主题</label><select id="studioTheme">${themeOptions}</select></div></div><div class="control-row"><div class="control-field"><label for="studioAccent">主题主色</label><input id="studioAccent" type="color" value="${defaultTheme.tokens.accent}"></div><div class="control-field"><label for="studioWarm">辅助信号</label><input id="studioWarm" type="color" value="${defaultTheme.tokens.warm}"></div></div></section>
        <section class="control-block" data-studio-control="typography"><h3>02 / Typography</h3><div class="control-row single"><div class="control-field"><label for="studioFont">文章字体</label><select id="studioFont">${fontOptions}</select></div></div><div class="control-row"><div class="control-field"><label for="typeTarget">修改位置</label><select id="typeTarget">${typeTargetOptions}</select></div><div class="control-field"><label for="typeSize">字号</label><select id="typeSize">${renderNumberOptions(catalog.typography.size.min, catalog.typography.size.max, catalog.typography.size.step, 16)}</select></div></div><div class="control-row single"><div class="control-field"><label for="typeWeight">字重</label><select id="typeWeight">${catalog.typography.weights.map((weight) => `<option value="${weight}"${weight === 400 ? " selected" : ""}>${weight}</option>`).join("")}</select></div></div></section>
        <section class="control-block" data-studio-control="component"><h3>03 / Component</h3><div class="control-row"><div class="control-field"><label for="componentTarget">修改位置</label><select id="componentTarget">${componentOptions}</select></div><div class="control-field"><label for="componentVariant">选择样式</label><select id="componentVariant"></select></div></div></section>
        <section class="control-block" data-studio-control="spacing"><h3>04 / Space</h3>${catalog.spacing.map((item) => `<div class="range-line"><label for="space-${item.id}">${escapeHtml(item.label)}</label><output id="space-${item.id}-value">${item.value}px</output><input id="space-${item.id}" data-space="${item.id}" type="range" min="${item.min}" max="${item.max}" step="${item.step}" value="${item.value}"></div>`).join("")}</section>
        <div class="action-stack"><button type="button" class="ghost-button" id="resetStudio">恢复</button><button type="button" class="ghost-button" id="copySettings">复制设置</button><button type="button" class="primary-button" id="copyArticle">复制当前排版</button></div>
      </aside>
    </section>
    <section class="gallery-section" data-studio-gallery="all-variants">
      <div class="gallery-head"><div><h2>全部视觉元素</h2><p>${totalStudioVariants(catalog)} 种组件效果同时陈列。主题、文字和间距控制在上方工作台实时查看。</p></div><p>这里不是推荐清单，也不隐藏复杂效果。每一种由组件框架提供的可见形式，都在同一页面中出现。</p></div>
      <div class="variant-grid">${gallery}</div>
    </section>
  </main>
  <div class="toast" id="studioToast" role="status"></div>
  <script>
    const catalog=${escapeScriptJson(catalog)};
    const root=document.documentElement;
    const article=document.querySelector('#studioArticle #output')||document.querySelector('#studioArticle');
    const selectorMap={h1:'h1',h2:'h2',h3:'h3',h4:'h4',h5:'h5',h6:'h6',body:'p',quote:'blockquote',code:'pre',strong:'strong',em:'em','inline-code':'code:not(pre code)','ordered-list':'ol li','unordered-list':'ul li',table:'table',divider:'hr',link:'a',image:'img'};
    const state={theme:catalog.themes[0].id,component:{},type:{},spacing:Object.fromEntries(catalog.spacing.map(item=>[item.id,item.value]))};
    const toast=(message)=>{const node=document.getElementById('studioToast');node.textContent=message;node.classList.add('show');clearTimeout(window.__qihangToast);window.__qihangToast=setTimeout(()=>node.classList.remove('show'),1800)};
    const setTokens=(theme)=>{Object.entries(theme.tokens).forEach(([key,value])=>root.style.setProperty('--'+key,value));document.getElementById('studioAccent').value=theme.tokens.accent;document.getElementById('studioWarm').value=theme.tokens.warm;state.theme=theme.id};
    document.getElementById('studioTheme').addEventListener('change',event=>setTokens(catalog.themes.find(theme=>theme.id===event.target.value)));
    document.getElementById('studioAccent').addEventListener('input',event=>root.style.setProperty('--accent',event.target.value));
    document.getElementById('studioWarm').addEventListener('input',event=>root.style.setProperty('--warm',event.target.value));
    document.querySelectorAll('[data-width]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-width]').forEach(item=>item.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');document.getElementById('articleFrame').classList.toggle('mobile',button.dataset.width==='mobile')}));
    const typeTarget=document.getElementById('typeTarget');
    const applyType=()=>{const target=typeTarget.value;const selector=selectorMap[target];if(!selector)return;const size=document.getElementById('typeSize').value;const weight=document.getElementById('typeWeight').value;article.querySelectorAll(selector).forEach(node=>{node.style.fontSize=size+'px';node.style.fontWeight=weight});state.type[target]={size:Number(size),weight:Number(weight)}};
    document.getElementById('typeSize').addEventListener('change',applyType);document.getElementById('typeWeight').addEventListener('change',applyType);
    document.getElementById('studioFont').addEventListener('change',event=>{const option=event.target.selectedOptions[0];if(option.dataset.value!=='inherit')article.style.fontFamily=option.dataset.value;else article.style.removeProperty('font-family')});
    const componentTarget=document.getElementById('componentTarget');const componentVariant=document.getElementById('componentVariant');
    const headingVariants=catalog.components.filter(component=>/^h[1-3]$/.test(component.id)).flatMap(component=>component.options);
    const variantsFor=(target)=>target==='image'?catalog.imageStyles:/^h[1-6]$/.test(target)?headingVariants:catalog.components.find(component=>component.id===target).options;
    const refreshVariants=()=>{componentVariant.innerHTML=variantsFor(componentTarget.value).map(item=>'<option value="'+item.id+'">'+item.label+'</option>').join('')};
    const restoreNodes=(selector)=>article.querySelectorAll(selector).forEach(node=>{if(node.dataset.studioBaseStyle!==undefined){node.setAttribute('style',node.dataset.studioBaseStyle);delete node.dataset.studioBaseStyle}node.querySelectorAll('[data-qihang-studio-decoration]').forEach(item=>item.remove())});
    const applyComponent=()=>{const target=componentTarget.value;const selector=selectorMap[target];const variant=variantsFor(target).find(item=>item.id===componentVariant.value);if(!selector||!variant)return;restoreNodes(selector);article.querySelectorAll(selector).forEach(node=>{node.dataset.studioBaseStyle=node.getAttribute('style')||'';node.style.cssText+=';'+variant.style;if(variant.marker){const marker=document.createElement('span');marker.dataset.qihangStudioDecoration='true';marker.textContent=variant.marker;marker.style.cssText=variant.accentStyle||'';node.insertBefore(marker,node.firstChild)}if(target==='table'&&variant.accentStyle)node.querySelectorAll('th').forEach(th=>th.style.cssText+=';'+variant.accentStyle)});state.component[target]=variant.id};
    componentTarget.addEventListener('change',refreshVariants);componentVariant.addEventListener('change',applyComponent);refreshVariants();
    document.querySelectorAll('[data-space]').forEach(input=>input.addEventListener('input',event=>{const id=event.target.dataset.space;const value=Number(event.target.value);document.getElementById('space-'+id+'-value').textContent=value+'px';state.spacing[id]=value;const map={paragraph:['p','margin-bottom'], 'heading-top':['h2,h3,h4,h5,h6','margin-top'], 'heading-bottom':['h1,h2,h3,h4,h5,h6','margin-bottom'], 'image-top':['img','margin-top'], 'image-bottom':['img','margin-bottom']};const [selector,property]=map[id];article.querySelectorAll(selector).forEach(node=>node.style.setProperty(property,value+'px'))}));
    const inlineClone=()=>{const clone=article.cloneNode(true);const originals=[article,...article.querySelectorAll('*')];const copies=[clone,...clone.querySelectorAll('*')];const properties=['display','width','max-width','height','margin','padding','border','border-radius','background','background-color','color','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-align','text-decoration','box-shadow','white-space','word-break','overflow-wrap','vertical-align','border-collapse','border-spacing','table-layout'];copies.forEach((copy,index)=>{const computed=getComputedStyle(originals[index]);copy.removeAttribute('class');copy.removeAttribute('id');copy.removeAttribute('data-layout-theme');properties.forEach(property=>copy.style.setProperty(property,computed.getPropertyValue(property)));});return clone};
    const copyRich=async()=>{const clone=inlineClone();const html=clone.outerHTML;const text=clone.innerText;try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([text],{type:'text/plain'})})]);toast('当前排版已复制')}catch(error){const range=document.createRange();range.selectNodeContents(article);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.execCommand('copy');selection.removeAllRanges();toast('已使用浏览器复制方式')}};
    document.getElementById('copyArticle').addEventListener('click',copyRich);document.getElementById('copySettings').addEventListener('click',async()=>{await navigator.clipboard.writeText(JSON.stringify(state,null,2));toast('设置 JSON 已复制')});document.getElementById('resetStudio').addEventListener('click',()=>location.reload());
    window.__QIHANG_STUDIO__={catalog,state,totalVariants:${totalStudioVariants(catalog)}};
  </script>
</body>
</html>`;
}
