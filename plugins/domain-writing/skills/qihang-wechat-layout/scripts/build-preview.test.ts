import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildStudioPreview } from "./build-preview.ts";

test("buildStudioPreview turns an existing Qihang HTML article into a complete studio file", () => {
  const runDir = fs.mkdtempSync(path.join(os.tmpdir(), "qihang-studio-test-"));
  const inputPath = path.join(runDir, "06-final.html");
  const outputPath = path.join(runDir, "06-final.studio.html");
  fs.writeFileSync(
    inputPath,
    [
      "<!doctype html><html><head><title>真实文章标题</title></head><body>",
      '<div id="output" data-layout-theme="qihang-editorial">',
      "<h1>原始标题</h1><p>原始正文</p>",
      "</div></body></html>",
    ].join(""),
    "utf-8",
  );

  const result = buildStudioPreview({ inputPath, outputPath });
  const studioHtml = fs.readFileSync(outputPath, "utf-8");

  assert.equal(result.studioPath, outputPath);
  assert.equal(result.variantCount, 11);
  assert.match(studioHtml, /<title>真实文章标题 · 启航排版工作台<\/title>/);
  assert.match(studioHtml, /原始标题/);
  assert.match(studioHtml, /原始正文/);
  assert.doesNotMatch(studioHtml, /<!doctype html>.*<!doctype html>/is);
});
