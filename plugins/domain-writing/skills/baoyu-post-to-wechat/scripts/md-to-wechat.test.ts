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
const SCRIPT_PATH = path.join(SCRIPT_DIR, "md-to-wechat.ts");
const API_SCRIPT_PATH = path.join(SCRIPT_DIR, "wechat-api.ts");

test("publishing renderer uses the shared qihang editorial theme", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "qihang-wechat-layout-publish-"));
  const markdownPath = path.join(root, "article.md");
  await fs.writeFile(
    markdownPath,
    [
      "---",
      "title: 发布测试",
      "---",
      "",
      "# 发布测试",
      "",
      "## 从预览到草稿箱",
      "",
      "正文包含 **同一套排版**。",
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
    ],
    { cwd: SCRIPT_DIR },
  );
  const result = JSON.parse(stdout.trim()) as { htmlPath: string };
  const html = await fs.readFile(result.htmlPath, "utf-8");

  assert.match(html, /data-layout-theme="qihang-editorial"/);
  assert.match(html, /<h2[^>]*style="[^"]*border-bottom: 1px solid #DCE5FF/);
  assert.match(html, /<strong[^>]*style="[^"]*color: #2447D8/);
});

test("API dry-run inherits the project qihang theme", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "qihang-wechat-layout-api-"));
  const configDir = path.join(root, ".baoyu-skills", "baoyu-post-to-wechat");
  const markdownPath = path.join(root, "article.md");
  await fs.mkdir(configDir, { recursive: true });
  await fs.writeFile(
    path.join(configDir, "EXTEND.md"),
    [
      "---",
      "default_theme: qihang-editorial",
      'default_color: "#2447D8"',
      "---",
    ].join("\n"),
    "utf-8",
  );
  await fs.writeFile(
    markdownPath,
    [
      "---",
      "title: API 预览测试",
      "---",
      "",
      "## 默认主题",
      "",
      "正文包含 **统一排版**。",
    ].join("\n"),
    "utf-8",
  );

  const { stdout } = await execFileAsync(
    process.execPath,
    [API_SCRIPT_PATH, markdownPath, "--dry-run"],
    { cwd: root },
  );
  const result = JSON.parse(stdout.trim()) as { htmlPath: string };
  const html = await fs.readFile(result.htmlPath, "utf-8");

  assert.match(html, /data-layout-theme="qihang-editorial"/);
  assert.match(html, /<strong[^>]*style="[^"]*color: #2447D8/);
});
