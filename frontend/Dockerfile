# ── base ──────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9 --activate

# ── deps ──────────────────────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── builder ───────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# BACKEND_URL is a server-only env var used by RSC fetches at build time.
# Must point to the live backend so static pages are pre-populated with data.
ARG BACKEND_URL=https://personal-web-app-backend-production.up.railway.app
ARG NEXT_PUBLIC_API_URL=https://personal-web-app-backend-production.up.railway.app
ARG NEXT_PUBLIC_SITE_NAME="V // Night City Dev"
ARG NEXT_PUBLIC_SITE_URL=https://frontend-liard-theta-28.vercel.app
ENV BACKEND_URL=$BACKEND_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN pnpm build

# ── runtime (standalone) ──────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0

# Non-root user (12-factor: security)
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# standalone output bundles a minimal server.js — no node_modules copy needed
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
