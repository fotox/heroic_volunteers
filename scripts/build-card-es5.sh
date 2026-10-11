#!/usr/bin/env bash
#
# Builds the card copy that Home Assistant's legacy frontend loads.
#
# HA ships two frontend builds and picks one by user agent. The legacy one loads
# extra JavaScript as a classic script and reaches every Android WebView below
# version 130, so the card needs a variant those browsers can parse: a single
# syntax error stops the whole file from running, and then the custom element
# never exists.
#
# The result is checked in, because HACS copies repository contents and runs no
# build. That makes it an artefact that can drift from its source, so CI runs
# this script with --check: it rebuilds and compares, and a stale copy turns the
# pipeline red.
#
#   scripts/build-card-es5.sh            write the file
#   scripts/build-card-es5.sh --check    fail if the checked-in file is stale
#
set -euo pipefail

# Pinned, because --check compares bytes: a different esbuild would report drift
# that is not there.
ESBUILD="esbuild@0.25.12"

# chrome61 is below the floor the CSS sets (see README, "Ältere Tablets"). It is kept
# low anyway because the failure modes differ: a syntax the parser rejects kills the
# entire file, while CSS a browser does not know degrades one declaration at a time.
TARGET="chrome61,safari11,firefox60"

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$root/custom_components/helferhelden/frontend/helferhelden-card.js"
out="$root/custom_components/helferhelden/frontend/helferhelden-card.es5.js"
# The banner travels with the file into the published package, where this script is
# not present -- so it says what to do, rather than naming a path that is not there.
banner='/* Helferhelden card, build for the legacy Home Assistant frontend.
   GENERATED from helferhelden-card.js by scripts/build-card-es5.sh -- do not edit.
   Change the source and rebuild; `--check` rebuilds and compares byte for byte. */'

build() {
  npx --yes "$ESBUILD" "$src" \
    --target="$TARGET" \
    --format=iife \
    --banner:js="$banner" \
    --outfile="$1" \
    --log-level=warning
}

if [[ "${1:-}" == "--check" ]]; then
  tmp="$(mktemp -t helferhelden-card-es5.XXXXXX.js)"
  trap 'rm -f "$tmp"' EXIT
  build "$tmp"
  if ! cmp -s "$tmp" "$out"; then
    echo "FAIL  helferhelden-card.es5.js does not match the source." >&2
    echo "      Run scripts/build-card-es5.sh and commit the result." >&2
    diff <(head -40 "$out") <(head -40 "$tmp") >&2 || true
    exit 1
  fi
  echo "PASS  helferhelden-card.es5.js is in step with the source"
  exit 0
fi

build "$out"
echo "OK  wrote $(basename "$out") ($(wc -c <"$out" | tr -d ' ') bytes)"
