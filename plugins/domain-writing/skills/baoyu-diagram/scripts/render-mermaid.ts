#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, extname, resolve } from "path";
import { renderMermaidSVG } from "beautiful-mermaid";

type ThemeName = "editorial" | "mono";

interface Options {
  input: string;
  output: string;
  theme: ThemeName;
  json: boolean;
}

const themes = {
  editorial: {
    bg: "#F7F2E8",
    fg: "#101827",
    line: "#7F8998",
    accent: "#2447D8",
    muted: "#667085",
    surface: "#FFFDFC",
    border: "#CDD4DF",
  },
  mono: {
    bg: "#FFFFFF",
    fg: "#171717",
    line: "#8A8A8A",
    accent: "#171717",
    muted: "#737373",
    surface: "#FAFAFA",
    border: "#D4D4D4",
  },
} as const;

type Theme = (typeof themes)[ThemeName];

function materializeTheme(svg: string, theme: Theme): string {
  const colors: Record<string, string> = {
    "--_text": theme.fg,
    "--_text-sec": theme.muted,
    "--_text-muted": theme.muted,
    "--_text-faint": theme.border,
    "--_line": theme.line,
    "--_arrow": theme.accent,
    "--_node-fill": theme.surface,
    "--_node-stroke": theme.border,
    "--_group-fill": theme.bg,
    "--_group-hdr": theme.surface,
    "--_inner-stroke": theme.border,
    "--_key-badge": theme.border,
    "--bg": theme.bg,
    "--fg": theme.fg,
    "--line": theme.line,
    "--accent": theme.accent,
    "--muted": theme.muted,
    "--surface": theme.surface,
    "--border": theme.border,
  };

  let output = svg;
  for (const [variable, color] of Object.entries(colors)) {
    output = output.replaceAll(`var(${variable})`, color);
  }

  output = output.replace(
    /<style>[\s\S]*?<\/style>/,
    `<style>text { font-family: "Microsoft YaHei", "Noto Sans CJK SC", sans-serif; }</style>`,
  );
  return output.replace(/(<svg\b[^>]*>)/, `$1\n<rect width="100%" height="100%" fill="${theme.bg}" />`);
}

function printHelp() {
  console.log(`Usage: bun render-mermaid.ts <input.mmd> --output <output.svg> [options]

Options:
  -o, --output <path>   Required SVG output path
      --theme <name>    editorial (default) | mono
      --json            Print JSON result
  -h, --help            Show help`);
}

function parseArgs(args: string[]): Options | null {
  let input = "";
  let output = "";
  let theme: ThemeName = "editorial";
  let json = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "-o" || arg === "--output") {
      output = args[++i] ?? "";
    } else if (arg === "--theme") {
      const value = args[++i] as ThemeName;
      if (!(value in themes)) {
        console.error(`Unknown theme: ${value}`);
        return null;
      }
      theme = value;
    } else if (arg === "--json") {
      json = true;
    } else if (!arg.startsWith("-") && !input) {
      input = arg;
    }
  }

  if (!input || !output) {
    console.error("Input and --output are required.");
    printHelp();
    return null;
  }

  return { input: resolve(input), output: resolve(output), theme, json };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options) process.exit(1);
  if (!existsSync(options.input)) {
    console.error(`Input not found: ${options.input}`);
    process.exit(1);
  }
  if (extname(options.input).toLowerCase() !== ".mmd") {
    console.error("Input must use the .mmd extension.");
    process.exit(1);
  }

  const source = readFileSync(options.input, "utf8").trim();
  const theme = themes[options.theme];
  const svg = materializeTheme(renderMermaidSVG(source, theme), theme);
  mkdirSync(dirname(options.output), { recursive: true });
  writeFileSync(options.output, svg, "utf8");

  const result = {
    input: options.input,
    output: options.output,
    theme: options.theme,
    bytes: Buffer.byteLength(svg),
  };
  console.log(options.json ? JSON.stringify(result, null, 2) : `${result.input} -> ${result.output}`);
}

main();
