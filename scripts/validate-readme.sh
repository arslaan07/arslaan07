#!/usr/bin/env bash
set -euo pipefail

readonly readme_path="README.md"
readonly header_asset_path="assets/terminal-header.svg"
readonly telemetry_asset_path="assets/github-telemetry.svg"
readonly required_content=(
  "ARSLAAN_07"
  "AI Full-Stack Engineer"
  "TypeScript"
  "Next.js"
  "React"
  "NestJS"
  "PostgreSQL"
  "Python"
  "LangChain"
  "RAG"
  "LLM applications"
  "https://github.com/arslaan07"
  "alt=\""
  "<!-- sudo collaborate --with arslaan07 -->"
)

if [[ ! -f "$readme_path" ]]; then
  echo "Missing $readme_path" >&2
  exit 1
fi

if [[ ! -f "$header_asset_path" ]]; then
  echo "Missing $header_asset_path" >&2
  exit 1
fi

if [[ ! -f "$telemetry_asset_path" ]]; then
  echo "Missing $telemetry_asset_path" >&2
  exit 1
fi

for required_item in "${required_content[@]}"; do
  if ! grep -Fq "$required_item" "$readme_path"; then
    echo "README is missing required content: $required_item" >&2
    exit 1
  fi
done

if ! grep -Fq '<title id="title">ARSLAAN_07 terminal identity banner</title>' "$header_asset_path"; then
  echo "Header asset is missing an accessible title" >&2
  exit 1
fi

if ! grep -Fq '<title id="title">Arslaan'"'"'s GitHub activity snapshot</title>' "$telemetry_asset_path"; then
  echo "Telemetry asset is missing an accessible title" >&2
  exit 1
fi

echo "README validation passed."
