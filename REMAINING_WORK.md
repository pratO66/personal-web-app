# Remaining Work

## Phase 1 — Foundation ✅

- [x] Spring Boot 3.5 + JPA + Postgres (Supabase), JWT auth, seed runner
- [x] Next.js 16 + React 19 + Tailwind 4 + Framer Motion
- [x] Docker Compose for local development
- [x] supabase/init.sql schema initialisation

## Phase 2 — Design system ✅

- [x] CP2077 Neo Militarism palette: `cp-red`, `cp-teal`, `cp-yellow`
- [x] Rajdhani + Orbitron + Share Tech Mono fonts
- [x] All components aligned: HUDChrome, Navbar, NeonButton, NeonCard, SkillBar, TerminalInput, ContactForm
- [x] TypeScript checks pass clean

## Phase 3 — Resilience & metadata ✅

- [x] `error.tsx` global error boundary with reconnect
- [x] Per-route `loading.tsx` skeleton loaders (projects, experience, skills, contact)
- [x] Open Graph + Twitter Card metadata in `layout.tsx`
- [x] `cv.pdf` + `og.png` placeholders in `public/`

## Phase 4 — 12-Factor compliance ✅

- [x] **I Codebase** — single git repo, one codebase → many deploys via env
- [x] **II Dependencies** — pom.xml (Maven) + pnpm-lock.yaml, fully pinned
- [x] **III Config** — all secrets/URLs in env vars; application-dev.yml uses `${VAR}` only
- [x] **IV Backing services** — DB attached via `SPRING_DATASOURCE_URL`; swappable per profile
- [x] **V Build/release/run** — multi-stage Dockerfiles; CI produces immutable JAR artifact
- [x] **VI Processes** — stateless Spring Boot (JWT, no server-side session); stateless Next.js
- [x] **VII Port binding** — `server.port=${PORT:8080}`; frontend `PORT=3000`
- [x] **VIII Concurrency** — HikariCP pool size via `${DB_POOL_SIZE}`
- [x] **IX Disposability** — `server.shutdown=graceful` + 30s phase timeout; JVM container flags in Dockerfile
- [x] **X Dev/prod parity** — Docker profile (`application-docker.yml`); init.sql matches JPA entities; test profile (H2) for CI
- [x] **XI Logs** — stdout-only; structured console pattern; no log files
- [x] **XII Admin processes** — `SeedRunner` gated by `@Profile("dev")`; `contextLoads` test uses H2 in-memory

## Phase 5 — GitHub Actions ✅

- [x] `ci.yml` — backend (Java 21 compile + H2 test + package) + frontend (typecheck + lint + build); runs on push/PR
- [x] `docker-build.yml` — builds + pushes backend and frontend images to GHCR on push to main
- [x] Removed 9 broken/redundant template workflows (docker-image, nextjs, node.js, static, maven-publish, manual, sonarcloud, codacy, super-linter)
- [x] Kept: `stale.yml`, `summary.yml`

## Remaining — Polish (Phase 6)

- [ ] Framer Motion scroll-reveal on ExperienceTimeline items (stagger by index)
- [ ] Hero terminal/boot typewriter animation (`init: night_city.exe ▍`)
- [ ] Neon-pulse on active navbar link
- [ ] Particle field canvas in hero background
- [ ] Glitch-on-hover for NeonCard titles
- [ ] Lighthouse audit + fix a11y contrast issues (`cp-red` on dark may fail WCAG AA)
- [ ] Replace `cv.pdf` + `og.png` with real assets
- [ ] Add integration tests with Testcontainers (real Postgres, not H2)
- [ ] Configure GitHub repo variables: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_URL` (used by docker-build.yml)

## Deployment (out of scope — when ready)

- [ ] Frontend → Vercel (`vercel.json` or MCP connector)
- [ ] Backend → Railway / Render / Fly (JAR or Docker image from GHCR)
- [ ] Set all production env vars (never in files)
- [ ] Switch `SPRING_DATASOURCE_URL` to Supabase connection pooler for production
- [ ] Generate real `ADMIN_PASSWORD_HASH` via `htpasswd -bnBC 12 "" "pw" | tr -d ':\n'`

## How to run locally

```bash
# Docker (all services — recommended)
cp .env.example .env      # fill in SUPABASE_DB_PASSWORD, JWT_SECRET
docker compose up

# Manual dev
cd backend && ./run-dev.sh   # Spring Boot :8080, reads backend/.env
cd frontend && pnpm dev      # Next.js :3000
```
