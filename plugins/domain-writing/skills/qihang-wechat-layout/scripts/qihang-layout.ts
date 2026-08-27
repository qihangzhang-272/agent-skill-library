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

function buildQihangCss(config: QihangThemeConfig, accent: string): string {
  const { tokens, typography, layout } = config;
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
  padding: 0 0 18px;
  border-bottom: 3px solid ${tokens.ink};
  color: ${tokens.ink};
  font-size: 28px;
  font-weight: 760;
  line-height: 1.38;
  letter-spacing: -0.02em;
  text-align: left;
}
#output h2 {
  margin: ${layout.sectionGap} 0 22px;
  padding: 0 0 12px;
  border-bottom: 1px solid ${tokens.accentSoft};
  color: ${tokens.ink};
  font-size: 21px;
  font-weight: 740;
  line-height: 1.45;
  letter-spacing: -0.01em;
  text-align: left;
}
#output h3 {
  margin: 34px 0 18px;
  padding: 2px 0 2px 12px;
  border-left: 4px solid ${tokens.warm};
  color: ${tokens.ink};
  font-size: 19px;
  font-weight: 720;
  line-height: 1.55;
}
#output h4, #output h5, #output h6 {
  margin: 28px 0 14px;
  color: ${tokens.ink};
  font-size: 17px;
  font-weight: 700;
  line-height: 1.55;
}
#output strong {
  color: ${accent};
  font-weight: 720;
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
  padding: 17px 18px;
  border-left: 4px solid ${accent};
  border-radius: 0 10px 10px 0;
  background: ${tokens.paper};
  color: ${tokens.body};
}
#output blockquote p {
  margin: 0;
  color: ${tokens.body};
  font-size: 15px;
  line-height: 1.82;
}
#output ul, #output ol {
  margin: 0 0 22px;
  padding-left: 1.5em;
  list-style: none;
  color: ${tokens.body};
}
#output li {
  margin: 8px 0;
  padding-left: 3px;
  color: ${tokens.body};
  line-height: 1.82;
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
  width: 100%;
  margin: 0 0 26px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
}
#output th, #output td {
  padding: 10px 11px;
  border: 1px solid ${tokens.border};
  color: ${tokens.body};
  line-height: 1.65;
  text-align: left;
  vertical-align: top;
  word-break: break-word;
  overflow-wrap: anywhere;
}
#output th {
  background: ${tokens.accentPale};
  color: ${tokens.ink};
  font-weight: 700;
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
  const accent = options.accent || config.tokens.accent;
  const css = buildQihangCss(config, accent);
  const codeThemeCss = loadCodeThemeCss(options.codeTheme || "github");
  const document = buildHtmlDocument(rendered.meta, css, rendered.contentHtml, codeThemeCss);
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
