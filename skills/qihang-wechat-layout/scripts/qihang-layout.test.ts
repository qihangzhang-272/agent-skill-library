import assert from "node:assert/strict";
import test from "node:test";

import { renderMarkdownDocument } from "baoyu-md";
import { loadQihangStyleCatalog, QIHANG_BASE_THEME, renderQihangHtml } from "./qihang-layout.ts";

test("personal style catalog contains only production component choices", () => {
  const catalog = loadQihangStyleCatalog();

  assert.deepEqual(Object.keys(catalog).sort(), ["components", "defaults"]);
  assert.deepEqual(catalog.defaults, {
    h1: "issue-cover",
    h2: "index-rule",
    h3: "marker-stroke",
    quote: "centered-quote",
    strong: "accent",
    highlight: "pale-blue",
    wave: "cobalt-wave",
    divider: "dashed",
    "ordered-list": "leading-zero",
    "unordered-list": "soft-check",
    table: "minimal-lines",
  });
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
      highlight: ["pale-blue"],
      wave: ["cobalt-wave"],
      divider: ["dashed"],
      "ordered-list": ["leading-zero"],
      "unordered-list": ["soft-check"],
      table: ["minimal-lines"],
    },
  );
});

test("editorial emphasis renders inline while preserving the author's words and uncertainty", async () => {
  const rendered = await renderMarkdownDocument([
    "# 备课记录", "", "正文有 **关键判断**。", "",
    '先读<span data-qihang-emphasis="highlight">原始资料</span>，再组织页面。', "",
    '保留<span data-qihang-emphasis="wave">可能</span>，不把猜测改成事实。', "",
    "---", "", "最后检查正文。",
  ].join("\n"), { keepTitle: true, theme: QIHANG_BASE_THEME });
  const html = await renderQihangHtml(rendered);
  const highlight = html.match(/<span\b[^>]*data-qihang-emphasis="highlight"[^>]*>/)?.[0] || "";
  const wave = html.match(/<span\b[^>]*data-qihang-emphasis="wave"[^>]*>/)?.[0] || "";
  const divider = html.match(/<hr\b[^>]*>/)?.[0] || "";

  assert.match(html, /<strong[^>]*style="[^"]*color:\s*#2447D8/);
  assert.match(highlight, /style="[^"]*background-color:\s*#EEF2FF/);
  assert.match(highlight, /color:\s*#2447D8/);
  assert.match(wave, /text-decoration-style:\s*wavy/);
  assert.match(wave, /text-decoration-color:\s*#2447D8/);
  assert.match(divider, /border-top:\s*1px dashed #2447D8/);
  assert.doesNotMatch(divider, /linear-gradient|#E98A3A/);
  assert.doesNotMatch(html, /<style\b|<script\b|var\(--/);
  const words = html.replace(/<[^>]+>/g, "");
  assert.match(words, /先读原始资料，再组织页面。/);
  assert.match(words, /保留可能，不把猜测改成事实。/);
});
