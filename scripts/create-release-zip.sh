#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <version> [app-bundle-path]"
  echo "Example: $0 1.0.1 /Users/josephaguilar/Applications/ClearMic.app"
  exit 1
fi

VERSION="$1"
APP_BUNDLE_PATH="${2:-/Users/josephaguilar/Applications/ClearMic.app}"

if [[ ! -d "$APP_BUNDLE_PATH/Contents" ]]; then
  echo "Error: Expected macOS app bundle contents at: $APP_BUNDLE_PATH/Contents"
  exit 1
fi

WORK_DIR="$(mktemp -d)"
CLEAN_APP_DIR="$WORK_DIR/ClearMic.app"
OUT_FILE="$PWD/ClearMic-v${VERSION}-macOS.app.zip"

mkdir -p "$CLEAN_APP_DIR"
cp -R "$APP_BUNDLE_PATH/Contents" "$CLEAN_APP_DIR/"

ditto -c -k --sequesterRsrc --keepParent "$CLEAN_APP_DIR" "$OUT_FILE"

rm -rf "$WORK_DIR"

echo "Created release artifact: $OUT_FILE"
ls -lh "$OUT_FILE"
