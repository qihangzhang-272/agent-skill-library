#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";

interface BuildPublishPreviewOptions {
  inputPath: string;
  outputPath?: string;
}

interface BuildPublishPreviewResult {
  previewPath: string;
  themeDetected: boolean;
  headingCount: number;
  imageCount: number;
  missingImages: string[];
}

function decodeHtml(value: string): string {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractTitle(html: string, fallback: string): string {
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return decodeHtml(title?.replace(/<[^>]+>/g, "").trim() || fallback);
}

function defaultOutputPath(inputPath: string): string {
  const extension = path.extname(inputPath);
  return path.join(path.dirname(inputPath), `${path.basename(inputPath, extension)}.preview.html`);
}

function imageReferences(tag: string): string[] {
  return [
    tag.match(/\bdata-local-path\s*=\s*["']([^"']+)["']/i)?.[1],
    tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1],
  ].filter((reference): reference is string => Boolean(reference));
}

function localImagePath(reference: string, inputDir: string): string | undefined {
  const decoded = decodeHtml(reference).trim();
  if (!decoded || /^(?:https?:|data:|blob:|#)/i.test(decoded)) return undefined;

  let pathname = decoded.replace(/[?#].*$/, "");
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Keep the literal path when percent decoding is not valid.
  }
  if (/^file:\/\//i.test(pathname)) {
    pathname = pathname.replace(/^file:\/\/\/?/i, "");
  }
  if (/^\/[A-Za-z]:[\\/]/.test(pathname)) pathname = pathname.slice(1);

  return path.resolve(inputDir, pathname);
}

function inspectImages(html: string, inputDir: string): { imageCount: number; missingImages: string[] } {
  const tags = html.match(/<img\b[^>]*>/gi) || [];
  const missingImages = tags
    .map((tag) => {
      const references = imageReferences(tag);
      const localPaths: string[] = [];
      const hasAvailableReference = references.some((reference) => {
        const decoded = decodeHtml(reference).trim();
        if (/^(?:https?:|data:|blob:)/i.test(decoded)) return true;
        const imagePath = localImagePath(reference, inputDir);
        if (!imagePath) return false;
        localPaths.push(imagePath);
        return fs.existsSync(imagePath);
      });
      return hasAvailableReference ? undefined : localPaths.at(-1);
    })
    .filter((imagePath): imagePath is string => Boolean(imagePath));

  return { imageCount: tags.length, missingImages: [...new Set(missingImages)] };
}

function buildPreviewDocument(inputPath: string, sourceHtml: string): {
  html: string;
  themeDetected: boolean;
  headingCount: number;
  imageCount: number;
  missingImages: string[];
} {
  const title = extractTitle(sourceHtml, path.basename(inputPath, path.extname(inputPath)));
  const themeDetected = /data-layout-theme=["']qihang-editorial["']/i.test(sourceHtml);
  const headingCount = (sourceHtml.match(/<h[1-6]\b/gi) || []).length;
  const { imageCount, missingImages } = inspectImages(sourceHtml, path.dirname(inputPath));
  const sourceName = path.basename(inputPath);
  const embeddedArticle = escapeHtml(sourceHtml);
  const missingSummary = missingImages.length === 0
    ? "断图 0 张"
    : `断图 ${missingImages.length} 张`;
  const missingDetails = missingImages.length === 0
    ? ""
    : `<p class="missing">缺失：${missingImages.map((imagePath) => escapeHtml(path.relative(path.dirname(inputPath), imagePath))).join("、")}</p>`;

  return {
    themeDetected,
    headingCount,
    imageCount,
    missingImages,
    html: `<!doctype html>
<html lang="zh-CN" data-qihang-publish-preview="true">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)} · 发布前预览</title>
  <style>
    :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #eef1f5; color: #172033; }
    .qa { position: sticky; top: 0; z-index: 2; padding: 16px 20px; border-bottom: 1px solid #d9e0ea; background: rgba(255,255,255,.96); backdrop-filter: blur(12px); }
    .qa-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; max-width: 1180px; margin: 0 auto; }
    h1 { margin: 0 10px 0 0; font-size: 18px; }
    .source { color: #6b7280; font-size: 12px; }
    .check { padding: 5px 9px; border: 1px solid #d9e0ea; border-radius: 999px; background: #fff; color: #40506a; font-size: 12px; }
    .check[data-state="pass"] { border-color: #b9dec8; color: #187443; }
    .check[data-state="warn"] { border-color: #f0c7a8; color: #a34f13; }
    .missing { max-width: 1180px; margin: 9px auto 0; color: #a34f13; font-size: 12px; overflow-wrap: anywhere; }
    .frames { display: grid; grid-template-columns: minmax(0, 1fr) 423px; gap: 24px; max-width: 1180px; margin: 24px auto; padding: 0 20px 40px; align-items: start; }
    .frame-card { min-width: 0; padding: 16px; border: 1px solid #d9e0ea; border-radius: 16px; background: #f8fafc; box-shadow: 0 14px 38px rgba(31,45,70,.08); }
    .frame-meta { display: flex; justify-content: space-between; margin-bottom: 12px; color: #5d6a80; font-size: 12px; }
    .viewport { margin: 0 auto; overflow: hidden; border: 1px solid #cbd5e1; border-radius: 10px; background: #fff; }
    iframe { display: block; width: 100%; height: 760px; border: 0; background: #fff; }
    [data-preview-width="677"] { width: min(100%, 677px); }
    [data-preview-width="375"] { width: 375px; max-width: 100%; }
    @media (max-width: 980px) { .frames { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header class="qa">
    <div class="qa-row">
      <h1>发布前只读预览</h1>
      <span class="source">正式源：${escapeHtml(sourceName)}</span>
      <span class="check" data-state="${themeDetected ? "pass" : "warn"}">${themeDetected ? "启航主题已加载" : "未检测到启航主题"}</span>
      <span class="check">标题 ${headingCount} 个</span>
      <span class="check">图片 ${imageCount} 张</span>
      <span class="check" data-state="${missingImages.length === 0 ? "pass" : "warn"}">${missingSummary}</span>
      <span class="check" data-qa="overflow-677">公众号宽度：检测中</span>
      <span class="check" data-qa="overflow-375">手机宽度：检测中</span>
    </div>
    ${missingDetails}
  </header>
  <main class="frames">
    <section class="frame-card">
      <div class="frame-meta"><strong>公众号正文宽度</strong><span>677 px</span></div>
      <div class="viewport" data-preview-width="677"><iframe title="公众号正文宽度预览" data-viewport="677" srcdoc="${embeddedArticle}"></iframe></div>
    </section>
    <section class="frame-card">
      <div class="frame-meta"><strong>手机阅读宽度</strong><span>375 px</span></div>
      <div class="viewport" data-preview-width="375"><iframe title="手机阅读宽度预览" data-viewport="375" srcdoc="${embeddedArticle}"></iframe></div>
    </section>
  </main>
  <script>
    document.querySelectorAll("iframe[data-viewport]").forEach((frame) => {
      frame.addEventListener("load", () => {
        const width = frame.dataset.viewport;
        const doc = frame.contentDocument;
        const root = doc && doc.documentElement;
        const body = doc && doc.body;
        const overflow = Boolean(root && body && Math.max(root.scrollWidth, body.scrollWidth) > root.clientWidth + 1);
        const status = document.querySelector('[data-qa="overflow-' + width + '"]');
        if (status) {
          status.dataset.state = overflow ? "warn" : "pass";
          status.textContent = (width === "677" ? "公众号宽度" : "手机宽度") + (overflow ? "：存在横向溢出" : "：无横向溢出");
        }
      });
    });
  </script>
</body>
</html>`,
  };
}

export function buildPublishPreview(options: BuildPublishPreviewOptions): BuildPublishPreviewResult {
  const inputPath = path.resolve(options.inputPath);
  const outputPath = path.resolve(options.outputPath || defaultOutputPath(inputPath));
  const sourceHtml = fs.readFileSync(inputPath, "utf-8");
  const preview = buildPreviewDocument(inputPath, sourceHtml);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, preview.html, "utf-8");

  return {
    previewPath: outputPath,
    themeDetected: preview.themeDetected,
    headingCount: preview.headingCount,
    imageCount: preview.imageCount,
    missingImages: preview.missingImages,
  };
}

function parseArgs(argv: string[]): BuildPublishPreviewOptions {
  let inputPath = "";
  let outputPath: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--html") inputPath = argv[index + 1] || "";
    if (argument === "--output") outputPath = argv[index + 1];
  }

  if (!inputPath) {
    throw new Error("用法：bun scripts/build-publish-preview.ts --html <06-final.html> [--output <path>]");
  }

  return { inputPath, outputPath };
}

if (import.meta.main) {
  try {
    console.log(JSON.stringify(buildPublishPreview(parseArgs(process.argv.slice(2))), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
