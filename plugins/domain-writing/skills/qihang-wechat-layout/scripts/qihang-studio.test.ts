import assert from "node:assert/strict";
import test from "node:test";

import {
  buildQihangStudio,
  loadQihangStudioCatalog,
  totalStudioVariants,
} from "./qihang-studio.ts";

test("studio catalog exposes the complete visual system", () => {
  const catalog = loadQihangStudioCatalog();

  assert.equal(catalog.themes.length, 5);
  assert.deepEqual(
    catalog.components.map((component) => component.id),
    [
      "h1",
      "h2",
      "h3",
      "quote",
      "code",
      "inline-code",
      "strong",
      "em",
      "ordered-list",
      "unordered-list",
      "table",
      "divider",
      "link",
    ],
  );
  assert.equal(catalog.imageStyles.length, 7);
  assert.equal(totalStudioVariants(catalog), 75);
  assert.deepEqual(
    catalog.typography.targets,
    ["h1", "h2", "h3", "h4", "h5", "h6", "body", "quote", "code", "strong", "em"],
  );
  assert.deepEqual(
    catalog.spacing.map((item) => item.id),
    ["paragraph", "heading-top", "heading-bottom", "image-top", "image-bottom"],
  );
});

test("studio renders every catalog variant without changing article content", () => {
  const catalog = loadQihangStudioCatalog();
  const articleHtml = [
    '<div id="output" data-layout-theme="qihang-editorial">',
    "<h1>原始标题</h1>",
    "<p>原始正文 <strong>原始强调</strong></p>",
    "</div>",
  ].join("");
  const html = buildQihangStudio({
    articleHtml,
    title: "全量预览",
    catalog,
  });

  assert.match(html, /<title>全量预览 · 启航排版工作台<\/title>/);
  assert.match(html, /原始标题/);
  assert.match(html, /原始正文/);
  assert.match(html, /data-studio-control="theme"/);
  assert.match(html, /data-studio-control="typography"/);
  assert.match(html, /data-studio-control="spacing"/);
  assert.match(html, /data-studio-gallery="all-variants"/);
  assert.match(html, /<option value="h4">四级标题 H4<\/option>/);
  assert.match(html, /<option value="h5">五级标题 H5<\/option>/);
  assert.match(html, /<option value="h6">六级标题 H6<\/option>/);
  assert.match(html, /<option value="16" selected>16px<\/option>/);
  assert.match(html, /<option value="400" selected>400<\/option>/);
  assert.match(html, /node\.style\.setProperty\(property,value\+'px'\)/);
  assert.equal((html.match(/data-preview-variant=/g) ?? []).length, 75);
  assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
});
