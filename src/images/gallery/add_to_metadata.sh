#!/bin/bash
FOLDER="${1:-.}"

# produces   { "file": "12-2024/money/perfume-liquor-venn.jpg", "created": "2024-12-01" }
# for metadata.json
# TODO: created date might be off

echo "["
first=true
find "$FOLDER" -type f -not -path '*/.git/*' -not -name '.DS_Store' -not -name 'metadata.json' | sort | while read -r file; do
  # Normalize path to be relative to the folder
  rel="${file#"$FOLDER"/}"
  # Get birth date (created date) on macOS
  created=$(stat -f '%SB' -t '%Y-%m-%d' "$file")
  if [ "$first" = true ]; then
    first=false
  else
    echo ","
  fi
  printf '  {"file": "%s", "created": "%s"}' "$rel" "$created"
done
echo ""
echo "]"