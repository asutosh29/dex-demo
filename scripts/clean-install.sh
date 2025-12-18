#!/bin/bash

echo "🧹 Cleaning node_modules and lock files..."

# Remove all node_modules directories
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Remove pnpm lock file
rm -f pnpm-lock.yaml

echo "✨ Installing dependencies..."

# Reinstall dependencies
pnpm install

echo "✅ Done! All dependencies reinstalled."
