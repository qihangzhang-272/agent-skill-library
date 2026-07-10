"""Extract common deck numbers and flag conflicts across slide markers."""

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path


MONEY_PATTERN = re.compile(r"\$\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*(K|M|MM|B)?\b", re.IGNORECASE)
SLIDE_PATTERN = re.compile(r"^##\s*Slide\s+(\d+)\s*$", re.IGNORECASE | re.MULTILINE)
METRICS = (
    "enterprise value",
    "equity value",
    "revenue",
    "ebitda",
    "ebit",
    "margin",
    "multiple",
    "irr",
    "moic",
)
MULTIPLIERS = {"": 1, "K": 1_000, "M": 1_000_000, "MM": 1_000_000, "B": 1_000_000_000}


def extract_numbers(text):
    values = []
    for match in MONEY_PATTERN.finditer(text):
        amount = float(match.group(1).replace(",", ""))
        suffix = (match.group(2) or "").upper()
        values.append({"raw": match.group(0), "normalized": amount * MULTIPLIERS[suffix]})
    return values


def _slides(text):
    markers = list(SLIDE_PATTERN.finditer(text))
    if not markers:
        return [(1, text)]
    blocks = []
    for index, marker in enumerate(markers):
        end = markers[index + 1].start() if index + 1 < len(markers) else len(text)
        blocks.append((int(marker.group(1)), text[marker.end() : end]))
    return blocks


def _metric_for_line(line):
    lowered = line.lower()
    for metric in METRICS:
        if metric in lowered:
            return metric
    return None


def find_conflicts(text):
    observed = defaultdict(list)
    for slide, block in _slides(text):
        for line in block.splitlines():
            metric = _metric_for_line(line)
            if not metric:
                continue
            for value in extract_numbers(line):
                observed[metric].append({"slide": slide, **value})

    findings = []
    for metric, values in observed.items():
        unique_values = {item["normalized"] for item in values}
        slides = sorted({item["slide"] for item in values})
        if len(unique_values) > 1 and len(slides) > 1:
            findings.append({"metric": metric, "slides": slides, "values": values})
    return findings


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    text = args.input.read_text(encoding="utf-8")
    payload = find_conflicts(text) if args.check else extract_numbers(text)
    print(json.dumps(payload, indent=2))
    return 1 if args.check and payload else 0


if __name__ == "__main__":
    raise SystemExit(main())
