import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildHtmlDocument,
  inlineCss,
  loadCodeThemeCss,
  modifyHtmlStructure,
  normalizeInlineCss,
  type StyleConfig,
} from "baoyu-md";

export const QIHANG_THEME = "qihang-editorial";
export const QIHANG_BASE_THEME = "simple";

interface QihangThemeConfig {
  id: string;
  name: string;
  description: string;
  tokens: {
    canvas: string;
    paper: string;
    ink: string;
    body: string;
    muted: string;
    accent: string;
    accentSoft: string;
    accentPale: string;
    warm: string;
    warmPale: string;
    border: string;
    code: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: number;
  };
  layout: {
    maxWidth: string;
    paragraphGap: string;
    sectionGap: string;
    imageRadius: string;
  };
}

interface QihangStyleVariant {
  id: string;
  style: string;
  accentStyle?: string;
  marker?: string;
}

interface QihangStyleCatalog {
  defaults: Record<string, string>;
  components: Array<{
    id: string;
    options: QihangStyleVariant[];
  }>;
}

interface RenderedDocument {
  contentHtml: string;
  meta: {
    title: string;
    author?: string;
    description?: string;
  };
  style: StyleConfig;
}

interface QihangRenderOptions {
  accent?: string;
  codeTheme?: string;
}

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(SKILL_DIR, "assets", "qihang-editorial.json");
const CATALOG_PATH = path.join(SKILL_DIR, "assets", "qihang-studio-catalog.json");

export function isQihangTheme(theme?: string): boolean {
  return theme === QIHANG_THEME;
}

export function resolveBaoyuTheme(theme?: string): string | undefined {
  return isQihangTheme(theme) ? QIHANG_BASE_THEME : theme;
}

export function loadQihangTheme(): QihangThemeConfig {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8")) as QihangThemeConfig;
  if (config.id !== QIHANG_THEME || !config.tokens?.accent || !config.typography?.fontFamily) {
    throw new Error(`Invalid ${QIHANG_THEME} config: ${CONFIG_PATH}`);
  }
  return config;
}

function loadQihangStyleCatalog(): QihangStyleCatalog {
  return JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8")) as QihangStyleCatalog;
}

function defaultVariant(catalog: QihangStyleCatalog, componentId: string): QihangStyleVariant {
  const component = catalog.components.find((item) => item.id === componentId);
  const variant = component?.options.find((item) => item.id === catalog.defaults[componentId]);
  if (!variant) throw new Error(`Missing default Qihang style: ${componentId}`);
  return variant;
}

function resolveVariantStyle(
  style: string | undefined,
  config: QihangThemeConfig,
  accent: string,
): string {
  if (!style) return "";
  const values: Record<string, string> = {
    accent,
    warm: config.tokens.warm,
    ink: config.tokens.ink,
    body: config.tokens.body,
    paper: config.tokens.paper,
    pale: config.tokens.accentPale,
    border: config.tokens.border,
  };
  return style.replace(/var\(--([a-z-]+)\)/g, (match, token: string) => values[token] || match);
}

function stripGeneratedListPrefix(html: string): string {
  return html.replace(/^\s*(?:[•●▪◦*-]|\d+[.)])\s*/u, "");
}

function injectDefaultMarkers(contentHtml: string, catalog: QihangStyleCatalog): string {
  const h1 = defaultVariant(catalog, "h1");
  const h2 = defaultVariant(catalog, "h2");
  const unordered = defaultVariant(catalog, "unordered-list");
  let h2Index = 0;
  let marked = contentHtml.replace(
    /(<h1\b[^>]*>)/gi,
    `$1<span data-qihang-marker="h1">${h1.marker || ""}</span>`,
  );
  marked = marked.replace(/(<h2\b[^>]*>)/gi, (opening) => {
    h2Index += 1;
    return `${opening}<span data-qihang-marker="h2">${String(h2Index).padStart(2, "0")}</span>`;
  });
  marked = marked.replace(/<ol\b[^>]*>[\s\S]*?<\/ol>/gi, (list) => {
    let itemIndex = 0;
    return list.replace(
      /(<li\b[^>]*>)([\s\S]*?)(<\/li>)/gi,
      (_match, opening: string, body: string, closing: string) => {
        itemIndex += 1;
        return `${opening}<span data-qihang-marker="ordered">${String(itemIndex).padStart(2, "0")}</span>${stripGeneratedListPrefix(body)}${closing}`;
      },
    );
  });
  return marked.replace(/<ul\b[^>]*>[\s\S]*?<\/ul>/gi, (list) =>
    list.replace(
      /(<li\b[^>]*>)([\s\S]*?)(<\/li>)/gi,
      (_match, opening: string, body: string, closing: string) =>
        `${opening}<span data-qihang-marker="check">${unordered.marker || "✓"}</span>${stripGeneratedListPrefix(body)}${closing}`,
    ),
  );
}

export function qihangImageStyle(): string {
  const config = loadQihangTheme();
  return [
    "display: block",
    "width: 100%",
    "height: auto",
    `margin: 28px auto 10px`,
    `border: 1px solid ${config.tokens.border}`,
    `border-radius: ${config.layout.imageRadius}`,
    "box-sizing: border-box",
  ].join("; ") + ";";
}

function buildQihangCss(
  config: QihangThemeConfig,
  accent: string,
  catalog: QihangStyleCatalog,
): string {
  const { tokens, typography, layout } = config;
  const h1 = defaultVariant(catalog, "h1");
  const h2 = defaultVariant(catalog, "h2");
  const h3 = defaultVariant(catalog, "h3");
  const quote = defaultVariant(catalog, "quote");
  const strong = defaultVariant(catalog, "strong");
  const ordered = defaultVariant(catalog, "ordered-list");
  const unordered = defaultVariant(catalog, "unordered-list");
  const table = defaultVariant(catalog, "table");
  return `
body {
  margin: 0;
  padding: 24px 16px;
  background: ${tokens.canvas};
  color: ${tokens.body};
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  line-height: ${typography.lineHeight};
  word-break: break-word;
  overflow-wrap: anywhere;
}
#output {
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  color: ${tokens.body};
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  line-height: ${typography.lineHeight};
  text-align: left;
}
#output section, #output .container {
  color: ${tokens.body};
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  line-height: ${typography.lineHeight};
}
#output p {
  margin: 0 0 ${layout.paragraphGap};
  color: ${tokens.body};
  font-size: ${typography.fontSize};
  line-height: ${typography.lineHeight};
  letter-spacing: 0.02em;
  text-align: left;
}
#output h1 {
  margin: 0 0 34px;
  line-height: 1.38;
  letter-spacing: -0.02em;
  text-align: left;
  ${resolveVariantStyle(h1.style, config, accent)}
}
#output h2 {
  margin: ${layout.sectionGap} 0 22px;
  line-height: 1.45;
  letter-spacing: -0.01em;
  text-align: left;
  ${resolveVariantStyle(h2.style, config, accent)}
}
#output h3 {
  margin: 34px 0 18px;
  line-height: 1.55;
  ${resolveVariantStyle(h3.style, config, accent)}
}
#output h4, #output h5, #output h6 {
  margin: 28px 0 14px;
  color: ${tokens.ink};
  font-size: 17px;
  font-weight: 700;
  line-height: 1.55;
}
#output strong {
  ${resolveVariantStyle(strong.style, config, accent)}
}
#output em {
  color: ${tokens.body};
  font-style: italic;
  text-decoration-color: ${tokens.warm};
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
#output blockquote {
  margin: 4px 0 26px;
  ${resolveVariantStyle(quote.style, config, accent)}
}
#output blockquote p {
  margin: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
  text-align: inherit;
}
#output ul, #output ol {
  margin: 0 0 22px;
  padding-left: 0;
  list-style: none;
  color: ${tokens.body};
}
#output li {
  margin: 0;
  line-height: 1.82;
}
#output ol li {
  ${resolveVariantStyle(ordered.style, config, accent)}
}
#output ul li {
  ${resolveVariantStyle(unordered.style, config, accent)}
}
#output [data-qihang-marker="h1"] {
  ${resolveVariantStyle(h1.accentStyle, config, accent)}
}
#output [data-qihang-marker="h2"] {
  ${resolveVariantStyle(h2.accentStyle, config, accent)}
}
#output [data-qihang-marker="ordered"] {
  ${resolveVariantStyle(ordered.accentStyle, config, accent)}
}
#output [data-qihang-marker="check"] {
  ${resolveVariantStyle(unordered.accentStyle, config, accent)}
}
#output a {
  color: ${accent};
  text-decoration: none;
  border-bottom: 1px solid ${tokens.accentSoft};
}
#output code, #output .codespan {
  padding: 2px 6px;
  border: 1px solid ${tokens.border};
  border-radius: 4px;
  background: ${tokens.accentPale};
  color: ${tokens.ink};
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
#output pre, #output pre.code__pre, #output .hljs.code__pre {
  margin: 0 0 24px;
  padding: 18px;
  border: none;
  border-radius: 10px;
  background: ${tokens.code};
  color: #E7EDF7;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
#output pre code, #output pre.code__pre code {
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
}
#output img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 28px auto 10px;
  border: 1px solid ${tokens.border};
  border-radius: ${layout.imageRadius};
  box-sizing: border-box;
}
#output figcaption, #output .md-figcaption {
  margin: 0 auto 26px;
  color: ${tokens.muted};
  font-size: 13px;
  line-height: 1.65;
  text-align: center;
}
#output table {
  margin: 0 0 26px;
  table-layout: fixed;
  font-size: 14px;
  ${resolveVariantStyle(table.style, config, accent)}
}
#output th, #output td {
  padding: 10px 11px;
  border: none;
  border-bottom: 1px solid ${tokens.border};
  color: ${tokens.body};
  line-height: 1.65;
  text-align: left;
  vertical-align: top;
  word-break: break-word;
  overflow-wrap: anywhere;
}
#output th {
  font-weight: 700;
  ${resolveVariantStyle(table.accentStyle, config, accent)}
}
#output hr {
  width: 88px;
  height: 3px;
  margin: 42px auto 34px;
  border: none;
  background: linear-gradient(90deg, ${accent} 0 62%, ${tokens.warm} 62% 100%);
}
#output .markdown-alert-note,
#output .markdown-alert-tip,
#output .markdown-alert-info,
#output .markdown-alert-important,
#output .markdown-alert-warning,
#output .markdown-alert-caution {
  margin: 0 0 24px;
  padding: 16px 18px;
  border: 1px solid ${tokens.border};
  border-left: 4px solid ${accent};
  border-radius: 8px;
  background: ${tokens.canvas};
}
#output .footnotes {
  margin-top: 42px;
  padding-top: 18px;
  border-top: 1px solid ${tokens.border};
  color: ${tokens.muted};
  font-size: 13px;
}
`.trim();
}

export async function renderQihangHtml(
  rendered: RenderedDocument,
  options: QihangRenderOptions = {},
): Promise<string> {
  const config = loadQihangTheme();
  const catalog = loadQihangStyleCatalog();
  const accent = options.accent || config.tokens.accent;
  const css = buildQihangCss(config, accent, catalog);
  const codeThemeCss = loadCodeThemeCss(options.codeTheme || "github");
  const contentHtml = injectDefaultMarkers(rendered.contentHtml, catalog);
  const document = buildHtmlDocument(rendered.meta, css, contentHtml, codeThemeCss);
  const style = {
    ...rendered.style,
    primaryColor: accent,
    fontFamily: config.typography.fontFamily,
    fontSize: config.typography.fontSize,
  };
  const inlined = normalizeInlineCss(await inlineCss(document), style);
  return modifyHtmlStructure(inlined).replace(
    "<body",
    `<body data-layout-theme="${QIHANG_THEME}"`,
  );
}
