import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = path.join(SCRIPT_DIR, "main.ts");

async function makeTempDir(prefix: string): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

test("CLI forwards wrapper title and package render options", async () => {
  const root = await makeTempDir("baoyu-markdown-to-html-cli-");
  const markdownPath = path.join(root, "article.md");
  await fs.writeFile(markdownPath, "## Section\n\nParagraph with **bold** text.\n", "utf-8");

  const { stdout } = await execFileAsync(
    process.execPath,
    [
      SCRIPT_PATH,
      markdownPath,
      "--theme", "grace",
      "--color", "red",
      "--font-family", "mono",
      "--font-size", "18",
      "--keep-title",
      "--title", "Overridden",
    ],
    { cwd: SCRIPT_DIR },
  );

  const result = JSON.parse(stdout.trim()) as {
    htmlPath: string;
    title: string;
  };

  assert.equal(result.title, "Overridden");

  const html = await fs.readFile(result.htmlPath, "utf-8");
  assert.match(html, /<title>Overridden<\/title>/);
  assert.match(html, /<h2[^>]*style="[^"]*background: #A93226/);
  assert.match(html, /<strong[^>]*style="[^"]*color: #A93226/);
  assert.match(
    html,
    /<body[^>]*style="[^"]*font-family: Menlo, Monaco, 'Courier New', monospace;[^"]*font-size: 18px/,
  );
});

test("CLI renders Obsidian wikilink images with alt text and Attachments fallback", async () => {
  const root = await makeTempDir("baoyu-markdown-to-html-wikilink-cli-");
  const attachmentsDir = path.join(root, "Attachments");
  await fs.mkdir(attachmentsDir, { recursive: true });
  await fs.writeFile(path.join(root, "a.png"), "a", "utf-8");
  await fs.writeFile(path.join(attachmentsDir, "b.webp"), "b", "utf-8");

  const markdownPath = path.join(root, "article.md");
  await fs.writeFile(
    markdownPath,
    [
      "## Section",
      "",
      "![[a.png]]",
      "",
      "![[b.webp|B alt]]",
    ].join("\n"),
    "utf-8",
  );

  const { stdout } = await execFileAsync(
    process.execPath,
    [
      SCRIPT_PATH,
      markdownPath,
      "--keep-title",
    ],
    { cwd: SCRIPT_DIR },
  );

  const result = JSON.parse(stdout.trim()) as {
    contentImages: Array<{
      alt?: string;
      localPath: string;
      originalPath: string;
      placeholder: string;
    }>;
    htmlPath: string;
  };

  assert.deepEqual(
    result.contentImages.map(({ alt, localPath, originalPath, placeholder }) => ({
      alt,
      localPath,
      originalPath,
      placeholder,
    })),
    [
      {
        alt: "",
        localPath: path.join(root, "a.png"),
        originalPath: "a.png",
        placeholder: "MDTOHTMLIMGPH_1",
      },
      {
        alt: "B alt",
        localPath: path.join(attachmentsDir, "b.webp"),
        originalPath: "b.webp",
        placeholder: "MDTOHTMLIMGPH_2",
      },
    ],
  );

  const html = await fs.readFile(result.htmlPath, "utf-8");
  assert.match(html, /<img src="a\.png" data-local-path="[^"]+a\.png" alt=""/);
  assert.match(
    html,
    /<img src="b\.webp" data-local-path="[^"]+Attachments[^"]+b\.webp" alt="B alt"/,
  );
});

test("CLI renders the shared qihang editorial theme", async () => {
  const root = await makeTempDir("qihang-wechat-layout-preview-");
  const markdownPath = path.join(root, "article.md");
  await fs.writeFile(path.join(root, "figure.png"), "image", "utf-8");
  await fs.writeFile(
    markdownPath,
    [
      "# 测试标题",
      "",
      "## 一个清楚的判断",
      "",
      "正文包含 **关键判断**。",
      "",
      "### 一个局部判断",
      "",
      "> 引用只承担补充说明。",
      "",
      "- 列表只显示一个项目符号。",
      "",
      "1. 有序列表第一项。",
      "2. 有序列表第二项。",
      "",
      "| 元素 | 作用 |",
      "| --- | --- |",
      "| 标题 | 建立层级 |",
      "",
      "![配图](figure.png)",
    ].join("\n"),
    "utf-8",
  );

  const { stdout } = await execFileAsync(
    process.execPath,
    [
      SCRIPT_PATH,
      markdownPath,
      "--theme", "qihang-editorial",
      "--color", "#2447D8",
      "--keep-title",
    ],
    { cwd: SCRIPT_DIR },
  );

  const result = JSON.parse(stdout.trim()) as { htmlPath: string };
  const html = await fs.readFile(result.htmlPath, "utf-8");

  assert.match(html, /data-layout-theme="qihang-editorial"/);
  assert.match(html, /<h1[^>]*style="[^"]*border-top: 4px double #2447D8/);
  assert.match(html, /data-qihang-marker="h1"[^>]*>ISSUE 01<\/span>/);
  assert.match(html, /<h2[^>]*style="[^"]*border-bottom: 1px solid #D9E0EA/);
  assert.match(html, /data-qihang-marker="h2"[^>]*>01<\/span>/);
  assert.match(html, /<h3[^>]*style="[^"]*background: linear-gradient/);
  assert.match(html, /<strong[^>]*style="[^"]*color: #2447D8/);
  assert.match(html, /<blockquote[^>]*style="[^"]*text-align: center/);
  assert.match(html, /data-qihang-marker="ordered"[^>]*>01<\/span>/);
  assert.match(html, /data-qihang-marker="check"[^>]*>✓<\/span>/);
  assert.match(html, /<table[^>]*style="[^"]*border-top: 2px solid #2447D8/);
  assert.match(html, /<ul[^>]*style="[^"]*list-style: none/);
  assert.match(html, /<img src="figure\.png"[^>]*border-radius: 12px/);
});
