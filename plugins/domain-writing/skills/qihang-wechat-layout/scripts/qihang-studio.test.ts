import assert from "node:assert/strict";
import test from "node:test";

import {
  buildQihangStudio,
  loadQihangStudioCatalog,
  totalStudioVariants,
} from "./qihang-studio.ts";

test("studio catalog exposes only Qihang's confirmed personal style set", () => {
  const catalog = loadQihangStudioCatalog();

  assert.equal(catalog.themes.length, 5);
  assert.deepEqual(
    catalog.components.map((component) => component.id),
    [
      "h1",
      "h2",
      "h3",
      "quote",
      "strong",
      "ordered-list",
      "unordered-list",
      "table",
    ],
  );
  assert.deepEqual(
    Object.fromEntries(
      catalog.components.map((component) => [
        component.id,
        component.options.map((option) => option.id),
      ]),
    ),
    {
      h1: ["issue-cover", "center-axis"],
      h2: ["index-rule", "center-section"],
      h3: ["marker-stroke"],
      quote: ["centered-quote", "serif-pull"],
      strong: ["accent"],
      "ordered-list": ["leading-zero"],
      "unordered-list": ["soft-check"],
      table: ["minimal-lines"],
    },
  );
  assert.deepEqual(catalog.defaults, {
    h1: "issue-cover",
    h2: "index-rule",
    h3: "marker-stroke",
    quote: "centered-quote",
    strong: "accent",
    "ordered-list": "leading-zero",
    "unordered-list": "soft-check",
    table: "minimal-lines",
  });
  assert.deepEqual(catalog.imageStyles.map((style) => style.id), ["theme"]);
  assert.equal(totalStudioVariants(catalog), 11);
  assert.deepEqual(
    catalog.typography.targets,
    ["h1", "h2", "h3", "h4", "h5", "h6", "body", "quote", "strong"],
  );
  assert.deepEqual(
    catalog.spacing.map((item) => item.id),
    ["paragraph", "heading-top", "heading-bottom", "image-top", "image-bottom"],
  );
});

test("studio renders the confirmed style set without changing article content", () => {
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
  assert.match(html, /data-studio-gallery="selected-variants"/);
  assert.doesNotMatch(html, /<option value="h4">四级标题 H4<\/option>/);
  assert.doesNotMatch(html, /<option value="image">图片<\/option>/);
  assert.match(html, /<option value="16" selected>16px<\/option>/);
  assert.match(html, /<option value="400" selected>400<\/option>/);
  assert.match(html, /node\.style\.setProperty\(property,value\+'px'\)/);
  assert.match(html, /启航个人样式集/);
  assert.doesNotMatch(html, /深色封面/);
  assert.equal((html.match(/data-preview-variant=/g) ?? []).length, 11);
  assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
});
