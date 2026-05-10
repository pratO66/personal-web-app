#!/usr/bin/env bash
# Run this ONCE after `gh auth login` to wire up all CI/CD secrets.
# Usage: bash scripts/setup-github-secrets.sh
set -e

REPO="justcallmepratt/personal-web-app"
BACKEND_URL="https://personal-web-app-backend-production.up.railway.app"
VERCEL_URL="https://frontend-liard-theta-28.vercel.app"

echo "▶ Setting GitHub Actions secrets for $REPO"

# ── Already-known values (safe to set automatically) ──────────────────────
gh secret set RAILWAY_SERVICE_ID  --repo "$REPO" --body "d5126614-ffaa-40cf-9fed-a54ecbab805e"
gh secret set VERCEL_ORG_ID       --repo "$REPO" --body "team_iQJEonhbOwfEtvJEUZVAJohX"
gh secret set VERCEL_PROJECT_ID   --repo "$REPO" --body "prj_F1NLpirzAyMGkDlhnhV1btjpwvC9"
gh secret set BACKEND_URL         --repo "$REPO" --body "$BACKEND_URL"
echo "  ✅ RAILWAY_SERVICE_ID, VERCEL_ORG_ID, VERCEL_PROJECT_ID, BACKEND_URL"

# ── Repository variables (public, non-secret) ─────────────────────────────
gh variable set NEXT_PUBLIC_API_URL   --repo "$REPO" --body "$BACKEND_URL"
gh variable set NEXT_PUBLIC_SITE_URL  --repo "$REPO" --body "$VERCEL_URL"
gh variable set NEXT_PUBLIC_SITE_NAME --repo "$REPO" --body "V // Night City Dev"
echo "  ✅ NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_NAME"

# ── Tokens you must provide manually ──────────────────────────────────────
echo ""
echo "⚠️  Two tokens need to be set manually:"
echo ""
echo "  1. RAILWAY_TOKEN"
echo "     → https://railway.com/account/tokens"
echo "     → Create a token, then run:"
echo "       gh secret set RAILWAY_TOKEN --repo $REPO"
echo ""
echo "  2. VERCEL_TOKEN"
echo "     → https://vercel.com/account/tokens"
echo "     → Create a token (type: 'Full Account'), then run:"
echo "       gh secret set VERCEL_TOKEN --repo $REPO"
echo ""
echo "Once both tokens are set, every push to main will auto-deploy. ✅"
