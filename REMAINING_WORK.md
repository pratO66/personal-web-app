# Remaining Work

Tracking what's left after the initial commit. Phases follow the original AGENT_PLAN.

## Status snapshot

| Phase | Status | Notes |
|---|---|---|
| 1. Scaffold | ✅ done | Next 16 + Tailwind 4 (CSS-first), Spring Boot 3.5.0 + JPA, Supabase reused |
| 2. Backend  | ✅ done | All endpoints live, JWT auth, seed runs, contact persists |
| 3. Frontend | 🟡 in progress | All components + pages written, type-check clean. Dev server not yet smoke-tested in browser |
| 4. Integration | ⬜ pending | CORS verify in browser, contact end-to-end, mobile viewport, error boundaries, Suspense skeletons |
| 5. Polish | ⬜ pending | Framer Motion reveals, particle field, terminal boot animation, Lighthouse, OG tags, CV PDF |

## Plan deviations applied

- **Spring Boot 3.5.0** instead of 3.3.x (Initializr enforces ≥3.5.0)
- **Postgres + JPA** instead of MongoDB (using existing Supabase project via MCP)
  - JSONB columns for `tech_stack`, `socials`, `skills`, `tags`, `stack`, `highlights`, `technologies`
  - `ddl-auto: validate` — schema owned by Supabase MCP migrations, not Hibernate
- **Next.js 16.2.4** instead of 14.x; **Tailwind 4** with CSS-first `@theme` (no `tailwind.config.ts`)
- **shadcn/ui skipped** — using plain Tailwind primitives (shadcn integration is shifting under Tailwind 4)
- **Frontend lives in `frontend/src/`** (Next 16 default), not at repo root
- **Direct Supabase connection** (port 5432) instead of pooler — pooler hostname/tenant lookup failed; if IPv6 ever becomes a problem, switch to `aws-0-us-east-1.pooler.supabase.com:6543` with username `postgres.nxqiuqlwyjimioosaiio`

## Phase 3 — finish

- [ ] Run `pnpm dev` in `frontend/` and visually verify all 5 pages render
- [ ] Confirm Orbitron + Share Tech Mono fonts actually load (Next 16 `next/font/google` quirks)
- [ ] Verify `clip-path` HUD chrome looks right at all breakpoints
- [ ] Check that `bg-cp-*` Tailwind utilities resolve (Tailwind 4 generates them from `@theme` tokens)

## Phase 4 — integration

- [ ] Browser DevTools: confirm `/api/profile`, `/api/projects`, `/api/experience` succeed with no CORS errors
- [ ] Submit contact form, confirm row appears in `messages` table (verify via Supabase MCP `execute_sql`)
- [ ] Configure SMTP (`MAIL_USER`, `MAIL_PASS` in `backend/.env`) and verify email actually sends
- [ ] Add Suspense + skeleton loaders for each data-fetching page
- [ ] Add `error.tsx` boundary for API failures
- [ ] Test 375px viewport: navbar collapses, timeline stacks, cards reflow

## Phase 5 — polish

- [ ] Framer Motion scroll-reveal on `ExperienceTimeline` items (stagger by index)
- [ ] Particle field canvas in hero (low-cost, ~80 particles)
- [ ] Glitch-on-hover for project card titles
- [ ] Typewriter boot sequence on hero (`init: night_city.exe ▍`)
- [ ] Neon-pulse animation on active navbar link
- [ ] Place real `cv.pdf` at `frontend/public/cv.pdf`
- [ ] Open Graph + Twitter metadata in `app/layout.tsx`
- [ ] Run Lighthouse, fix a11y contrast issues (cyan-on-dark may flag)

## Deployment (out of plan scope, future)

- [ ] Frontend → Vercel (MCP connector available)
- [ ] Backend → Railway / Render / Fly (no MCP connector for Spring hosts)
- [ ] Set production env vars: `SUPABASE_DB_PASSWORD`, `JWT_SECRET`, `MAIL_USER`, `MAIL_PASS`, `CORS_ORIGIN`, `NEXT_PUBLIC_API_URL`
- [ ] Set `admin.password-hash` (BCrypt) to enable `/api/admin/auth/login`

## Known gaps in current code

- Admin login returns 503 until `ADMIN_PASSWORD_HASH` env var is set (`admin.password-hash`). Generate via `htpasswd -bnBC 12 "" "yourpw" | tr -d ':\n'`.
- Contact emails are no-ops until `MAIL_USER`/`MAIL_PASS` are set; messages still persist to DB.
- No tests yet (`spring-boot-starter-test` is on the classpath but no test classes written).
- `public/cv.pdf` referenced by hero "Download CV" button doesn't exist yet.

## How to run locally

```bash
# Backend (Supabase Postgres + Spring Boot)
cd backend && ./run-dev.sh           # picks up backend/.env automatically

# Frontend (Next.js)
cd frontend && pnpm dev              # http://localhost:3000
```
