# Remaining Work

This document tracks project progress using AI-guided development phases.

## Phase 1 — Foundation

Status: ✅ completed

- [x] Bootstrap Spring Boot backend with JWT auth, seed runner, and message persistence
- [x] Bootstrap Next.js 16 + React 19 frontend with Tailwind 4
- [x] Add Docker stack for backend, frontend, and Supabase Postgres
- [x] Add database initialization via `supabase/init.sql`
- [x] Add `.env.example` and Docker Compose environment structure

## Phase 2 — Design system & theme

Status: ✅ completed

- [x] Replace frontend theme tokens with CP2077 Neo Militarism palette (`cp-red`, `cp-teal`, `cp-yellow`)
- [x] Load Rajdhani, Orbitron, and Share Tech Mono fonts via `next/font/google`
- [x] Align `HUDChrome`, `Navbar`, `NeonButton`, `NeonCard`, `SkillBar`, `GlitchText`, `TerminalInput`, `ContactForm` to design system
- [x] Fix stale `cp-magenta`/`cp-cyan` token refs across all components and pages
- [x] Clean `.next` cache; TypeScript check passes clean

## Phase 3 — Integration & resilience

Status: 🟡 partially complete

- [x] Add `error.tsx` global error boundary (reconnect button, red error display)
- [x] Add `loading.tsx` + per-route skeleton loaders (projects, experience, skills, contact)
- [x] Add Open Graph + Twitter Card metadata in `app/layout.tsx`
- [x] Add `cv.pdf` and `og.png` placeholders in `public/`
- [ ] Verify CORS headers in browser DevTools (no blocked requests from frontend → backend)
- [ ] Submit contact form end-to-end and confirm message appears in Supabase `messages` table
- [ ] Configure SMTP (`MAIL_USER`, `MAIL_PASS` in `.env`) and verify email delivery
- [ ] Test 375px mobile viewport: navbar collapse, timeline stacks, cards reflow

## Phase 4 — Polish & CI

Status: ⬜ pending

- [ ] Framer Motion scroll-reveal on `ExperienceTimeline` items (stagger by index)
- [ ] Hero terminal/boot typewriter animation
- [ ] Neon-pulse on active navbar link
- [ ] Particle field canvas in hero background
- [ ] Glitch-on-hover for project card titles
- [ ] Run Lighthouse; fix a11y contrast issues (`cp-red` on dark may fail WCAG AA)
- [ ] Replace `cv.pdf` and `og.png` placeholders with real assets
- [ ] Add CI workflow: build validation + lint for both frontend and backend
- [ ] Document production deployment steps (Vercel + Railway/Render for backend)

## Deployment (future)

- [ ] Frontend → Vercel (MCP connector available)
- [ ] Backend → Railway / Render / Fly
- [ ] Set production env vars: `SUPABASE_DB_PASSWORD`, `JWT_SECRET`, `MAIL_USER`, `MAIL_PASS`, `CORS_ORIGIN`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`
- [ ] Generate real `ADMIN_PASSWORD_HASH` via `htpasswd -bnBC 12 "" "yourpw" | tr -d ':\n'`

## Known gaps

- Admin login returns 503 until `ADMIN_PASSWORD_HASH` env var is set (default provided in `.env.example`)
- Contact emails are no-ops until `MAIL_USER`/`MAIL_PASS` are set; messages still persist to DB
- `og.png` and `cv.pdf` are byte-level placeholders — replace with real files before launch
- No tests written yet (`spring-boot-starter-test` is available but unused)

## How to run locally

```bash
# Option A — Docker (all services)
cp .env.example .env        # fill in SUPABASE_DB_PASSWORD and JWT_SECRET
docker compose up

# Option B — Manual
cd backend && ./run-dev.sh  # Spring Boot on :8080, picks up backend/.env
cd frontend && pnpm dev     # Next.js on :3000
```
