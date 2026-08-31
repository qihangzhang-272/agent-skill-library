import assert from "node:assert/strict";
import test from "node:test";

import { loadQihangStyleCatalog } from "./qihang-layout.ts";

test("personal style catalog contains only production component choices", () => {
  const catalog = loadQihangStyleCatalog();

  assert.deepEqual(Object.keys(catalog).sort(), ["components", "defaults"]);
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
});
