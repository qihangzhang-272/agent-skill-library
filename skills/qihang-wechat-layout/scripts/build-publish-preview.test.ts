import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildPublishPreview } from "./build-publish-preview.ts";

test("buildPublishPreview creates a read-only pre-publication QA page", () => {
  const runDir = fs.mkdtempSync(path.join(os.tmpdir(), "qihang-publish-preview-test-"));
  const inputPath = path.join(runDir, "06-final.html");
  const existingImage = path.join(runDir, "imgs", "existing.png");
  fs.mkdirSync(path.dirname(existingImage), { recursive: true });
  fs.writeFileSync(existingImage, "image", "utf-8");
  fs.writeFileSync(
    inputPath,
    [
      "<!doctype html><html><head><title>真实文章标题</title></head>",
      '<body data-layout-theme="qihang-editorial"><div id="output">',
      "<h1>原始标题</h1><h2>第一节</h2><p>原始正文</p>",
      '<img src="imgs/existing.png" data-local-path="old-location/existing.png"><img src="imgs/missing.png">',
      "</div></body></html>",
    ].join(""),
    "utf-8",
  );

  const result = buildPublishPreview({ inputPath });
  const previewHtml = fs.readFileSync(result.previewPath, "utf-8");

  assert.equal(result.previewPath, path.join(runDir, "06-final.preview.html"));
  assert.equal(result.themeDetected, true);
  assert.equal(result.headingCount, 2);
  assert.equal(result.imageCount, 2);
  assert.deepEqual(result.missingImages, [path.join(runDir, "imgs", "missing.png")]);
  assert.match(previewHtml, /data-qihang-publish-preview="true"/);
  assert.match(previewHtml, /真实文章标题 · 发布前预览/);
  assert.match(previewHtml, /原始正文/);
  assert.match(previewHtml, /data-preview-width="677"/);
  assert.match(previewHtml, /data-preview-width="375"/);
  assert.match(previewHtml, /data-qa="overflow-677"/);
  assert.match(previewHtml, /断图 1 张/);
  assert.doesNotMatch(previewHtml, /data-studio-control/);
  assert.doesNotMatch(previewHtml, /<select\b|<input\b|<button\b/i);
});
