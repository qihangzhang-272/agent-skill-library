#!/usr/bin/env bash
# 用法: verify-fingerprints.sh <baseline.txt> <new-root>
# 对 13 个瓦技能目录求 sha256，与 baseline 比对。任何差异即报错退出。
set -euo pipefail
BASELINE="$1"; NEWROOT="$2"
SKILLS="ai-product-analyzer topic-research-deposition qihang-writing-style \
qihang-investment-research qihang-ai-product-judgment qihang-competitive-landscape \
qihang-unit-economics qihang-investment-scorecard qihang-valuation-returns \
qihang-investment-dd qihang-thesis-tracking qihang-ic-memo-writer qihang-skill-index"
tmp="$(mktemp)"
for s in $SKILLS; do
  found="$(find "$NEWROOT" -type d -name "$s" -print -quit)"
  if [ -z "$found" ]; then echo "MISSING: $s under $NEWROOT"; exit 1; fi
  find "$found" -type f -print0 | sort -z | xargs -0 sha256sum \
    | sed "s#$found#<SKILL:$s>#" >> "$tmp"
done
sort "$tmp" -o "$tmp"
if diff -u "$BASELINE" "$tmp"; then
  echo "FINGERPRINT OK: 13 零改动瓦技能内容完全一致"
else
  echo "FINGERPRINT MISMATCH — 迁移改变了内容，必须回滚"; exit 1
fi
