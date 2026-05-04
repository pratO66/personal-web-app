#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# apply-updates.sh
# Run from the ROOT of your repo to apply all CP2077 design
# corrections and updated MD files, then push to GitHub.
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel 2>/dev/null || echo "$SCRIPT_DIR")"

echo "── Applying updates to: $REPO_ROOT"

# ── MD / docs ────────────────────────────────────────────────
cp "$SCRIPT_DIR/REMAINING_WORK.md"  "$REPO_ROOT/REMAINING_WORK.md"
cp "$SCRIPT_DIR/README.md"          "$REPO_ROOT/README.md"

# ── GitHub Actions workflows ────────────────────────────────
cp "$SCRIPT_DIR/.github/workflows/maven.yml"         "$REPO_ROOT/.github/workflows/maven.yml"
cp "$SCRIPT_DIR/.github/workflows/maven-publish.yml" "$REPO_ROOT/.github/workflows/maven-publish.yml"

# ── Frontend: globals.css (design token corrections) ────────
cp "$SCRIPT_DIR/frontend/src/app/globals.css"   "$REPO_ROOT/frontend/src/app/globals.css"
cp "$SCRIPT_DIR/frontend/src/app/layout.tsx"    "$REPO_ROOT/frontend/src/app/layout.tsx"

# ── Frontend: component corrections ─────────────────────────
cp "$SCRIPT_DIR/frontend/src/components/layout/HUDChrome.tsx"  "$REPO_ROOT/frontend/src/components/layout/HUDChrome.tsx"
cp "$SCRIPT_DIR/frontend/src/components/layout/Navbar.tsx"     "$REPO_ROOT/frontend/src/components/layout/Navbar.tsx"
cp "$SCRIPT_DIR/frontend/src/components/ui/NeonButton.tsx"     "$REPO_ROOT/frontend/src/components/ui/NeonButton.tsx"
cp "$SCRIPT_DIR/frontend/src/components/ui/NeonCard.tsx"       "$REPO_ROOT/frontend/src/components/ui/NeonCard.tsx"
cp "$SCRIPT_DIR/frontend/src/components/ui/SkillBar.tsx"       "$REPO_ROOT/frontend/src/components/ui/SkillBar.tsx"

echo "── Files copied. Staging changes..."
git -C "$REPO_ROOT" add \
  REMAINING_WORK.md \
  README.md \
  .github/workflows/maven.yml \
  .github/workflows/maven-publish.yml \
  frontend/src/app/globals.css \
  frontend/src/app/layout.tsx \
  frontend/src/components/layout/HUDChrome.tsx \
  frontend/src/components/layout/Navbar.tsx \
  frontend/src/components/ui/NeonButton.tsx \
  frontend/src/components/ui/NeonCard.tsx \
  frontend/src/components/ui/SkillBar.tsx

echo "── Committing..."
git -C "$REPO_ROOT" commit -m "fix: apply CP2077 Neo Militarism design corrections + update docs

Design system (P0 fixes from DESIGN_UPDATE_PLAN.md):
- globals.css: red #C5003C as primary (not yellow/cyan); correct teal
  #55EAD4 (was #00D4FF); red grid overlay (was blue); add Rajdhani
  import (PRIMARY font per fontsinuse.com/uses/60926)
- layout.tsx: load Rajdhani as --font-ui (primary), Orbitron as
  --font-display (secondary), Share Tech Mono as --font-mono
- HUDChrome: rename accent types cyan/magenta → teal/red
- Navbar: active link text-cp-red + border-cp-red (primary, not teal)
- NeonButton: default accent red; correct hex map
- NeonCard: left stripe bg-cp-red (was bg-cp-magenta); accent=red
- SkillBar: level>70→red, 40-70→yellow, <40→teal (was inverted)

CI:
- maven.yml: JDK 17 → 21 Corretto; point --file at backend/pom.xml
- maven-publish.yml: JDK 11 → 21 Corretto; point at backend/pom.xml

Docs:
- REMAINING_WORK.md: P0 design correction table, decision rules,
  updated phase status (Phase 3 blocked on design fixes)
- README.md: correct design system table, full API endpoint table,
  updated stack badges (Tailwind v4, Java 21 Corretto)"

echo "── Pushing to origin/main..."
git -C "$REPO_ROOT" push origin main

echo ""
echo "✓ Done. All updates pushed to GitHub."
