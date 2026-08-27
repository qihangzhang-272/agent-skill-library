#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";

import {
  buildQihangStudio,
  loadQihangStudioCatalog,
  totalStudioVariants,
} from "./qihang-studio.ts";

interface BuildPreviewOptions {
  inputPath: string;
  outputPath?: string;
}

interface BuildPreviewResult {
  studioPath: string;
  variantCount: number;
}

function extractTitle(html: string, fallback: string): string {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || fallback;
}

function extractArticleBody(html: string): string {
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]?.trim() || html;
}

function defaultOutputPath(inputPath: string): string {
  const extension = path.extname(inputPath);
  return path.join(
    path.dirname(inputPath),
    `${path.basename(inputPath, extension)}.studio.html`,
  );
}

export function buildStudioPreview(options: BuildPreviewOptions): BuildPreviewResult {
  const inputPath = path.resolve(options.inputPath);
  const outputPath = path.resolve(options.outputPath || defaultOutputPath(inputPath));
  const sourceHtml = fs.readFileSync(inputPath, "utf-8");
  const catalog = loadQihangStudioCatalog();
  const studioHtml = buildQihangStudio({
    articleHtml: extractArticleBody(sourceHtml),
    title: extractTitle(sourceHtml, path.basename(inputPath, path.extname(inputPath))),
    catalog,
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, studioHtml, "utf-8");

  return {
    studioPath: outputPath,
    variantCount: totalStudioVariants(catalog),
  };
}

function parseArgs(argv: string[]): BuildPreviewOptions {
  let inputPath = "";
  let outputPath: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--html") inputPath = argv[index + 1] || "";
    if (argument === "--output") outputPath = argv[index + 1];
  }

  if (!inputPath) {
    throw new Error("用法：bun scripts/build-preview.ts --html <06-final.html> [--output <path>]");
  }

  return { inputPath, outputPath };
}

if (import.meta.main) {
  try {
    console.log(JSON.stringify(buildStudioPreview(parseArgs(process.argv.slice(2))), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
