# Remaining Work

Tracking what's left after the initial commit. Phases follow the original AGENT_PLAN.

## Status snapshot

| Phase | Status | Notes |
|---|---|---|
| 1. Scaffold | ✅ done | Next 16.2.4 + Tailwind 4 (CSS-first `@theme`), Spring Boot 3.5.0 + JPA, Supabase reused |
| 2. Backend  | ✅ done | All endpoints live, JWT auth, seed runs, contact persists to DB |
| 3. Frontend | 🔴 blocked | Components written and type-check clean, but `globals.css` has **wrong design tokens** — see Design Corrections below. Must fix before browser-testing. |
| 4. Integration | ⬜ pending | CORS verify in browser, contact end-to-end, mobile viewport, error boundaries, Suspense skeletons |
| 5. Polish | ⬜ pending | Framer Motion reveals, particle field, terminal boot animation, Lighthouse, OG tags, CV PDF |

---

## Design Corrections Required (P0 — must fix before Phase 3 can be marked done)

The frontend was scaffolded with **wrong design tokens**. The official CP2077 Neo Militarism palette is documented in `CP2077_DESIGN_BIBLE.html` (source: Vladimír Vilimovský, Senior UI Artist @ CDPR — behance.net/gallery/118663901 + /133185623).

### `frontend/src/app/globals.css` — full `@theme` replacement

| Token | Current (WRONG) | Correct |
|---|---|---|
| Primary accent | `#FCE300` (yellow) | `#C5003C` (red) — Neo Militarism primary |
| Cyan/teal | `#00D4FF` (wrong hex) | `#55EAD4` (confirmed) |
| Grid overlay | `#1E2235` blue tint | `rgba(197,0,60,0.04)` red tint |
| Rajdhani font | missing entirely | Must import — it's the PRIMARY UI font (all game UI) |
| Orbitron role | listed as primary | SECONDARY only — logos/headings, never body |

**Correct `@theme` block:**
```css
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');
@import "tailwindcss";

@theme {
  /* PRIMARY — Neo Militarism red (confirmed: color-hex.com/color-palette/1041326) */
  --color-cp-red:       #C5003C;
  --color-cp-red-dark:  #880425;
  --color-cp-red-glow:  #FF003C;   /* neon shadow only, never fill */
  /* SECONDARY */
  --color-cp-yellow:    #F3E600;
  --color-cp-yellow-alt:#FCEC0C;
  /* TERTIARY — hacker/NET contexts only */
  --color-cp-teal:      #55EAD4;
  --color-cp-teal-dark: #136377;
  --color-cp-gold:      #D8BC66;
  /* SURFACES */
  --color-cp-black:     #000000;
  --color-cp-dark:      #0D0D0D;
  --color-cp-panel:     #111318;
  --color-cp-border:    #1C2030;
  --color-cp-muted:     #3A4060;
  --color-cp-text:      #A8B0C8;
  --color-cp-bright:    #E8ECF8;
  /* CONFIRMED FONTS (fontsinuse.com/uses/60926) */
  --font-ui:      'Rajdhani', sans-serif;       /* PRIMARY — entire game UI */
  --font-display: 'Orbitron', sans-serif;        /* SECONDARY — logo/headings only */
  --font-mono:    'Share Tech Mono', monospace;  /* TERTIARY — terminal/data */
}
```

### Component-level fixes

| File | Issue | Fix |
|---|---|---|
| `HUDChrome.tsx` | `Accent` type includes `'cyan'`/`'magenta'` — wrong names | Rename to `'red'`/`'yellow'`/`'teal'` matching design bible |
| `Navbar.tsx` | Active link uses `text-cp-cyan` | Change to `text-cp-red` (primary = red) |
| `NeonButton.tsx` | `accent='cyan'` default, `#00D4FF` hex | Default to `'red'`, use `#C5003C` / `#F3E600` / `#55EAD4` |
| `SkillBar.tsx` | Level > 70 → cyan; Level < 40 → magenta | Fix: > 70 → red `#C5003C`; 40–70 → yellow `#F3E600`; < 40 → teal `#55EAD4` |
| `NeonCard.tsx` | Left stripe uses `bg-cp-magenta` | Change to `bg-cp-red` |
| `ContactForm.tsx` | `accent="cyan"` on HUDChrome | Change to `accent="teal"` (terminal = NET context); submit button → `accent="red"` |
| `ExperienceTimeline.tsx` | Timeline dot `bg-cp-cyan` | Change to `bg-cp-red` for active, `bg-cp-yellow` for past |
| `GlitchText.tsx` | `::before` / `::after` colors in globals.css | `::before` = `#FF003C` (red), `::after` = `#55EAD4` (teal) |
| `layout.tsx` | Only loads Orbitron + Share Tech Mono | Add Rajdhani load |

### Decision rules (copy-paste these when reviewing PRs)

```
IF text-cp-cyan on primary heading / CTA   → change to text-cp-red
IF text-cp-cyan on terminal / tech tags    → KEEP (teal = NET context, correct)
IF text-cp-yellow on logo / primary CTA   → change to text-cp-red
IF #00D4FF anywhere                        → change to #55EAD4
IF #FCE300 anywhere                        → change to #F3E600
IF accent prop default = 'cyan'            → change to 'red'
IF border-bottom on navbar                 → border-cp-red
IF HUDChrome accent for data panels        → accent="red"
IF submit button                           → accent="red" (primary action)
IF tech tags / terminal inputs             → teal context OK
```

---

## Plan deviations applied

- **Spring Boot 3.5.0** instead of 3.3.x (Initializr enforces ≥ 3.5.0)
- **Postgres + JPA** instead of MongoDB (using existing Supabase project via MCP)
  - JSONB columns for `tech_stack`, `socials`, `skills`, `tags`, `stack`, `highlights`, `technologies`
  - `ddl-auto: validate` — schema owned by Supabase MCP migrations, not Hibernate
- **Next.js 16.2.4** instead of 14.x; **Tailwind 4** with CSS-first `@theme` (no `tailwind.config.ts`)
- **shadcn/ui skipped** — using plain Tailwind primitives
- **Frontend lives in `frontend/src/`** (Next 16 default)
- **Direct Supabase connection** (port 5432) — if IPv6 issues, switch to pooler `aws-0-us-east-1.pooler.supabase.com:6543`

---

## Phase 3 — finish (blocked on design corrections above)

- [ ] Apply all P0 design corrections (see table above)
- [ ] Run `pnpm dev` in `frontend/` and visually verify all 5 pages render
- [ ] Confirm Rajdhani + Orbitron + Share Tech Mono all load via Next.js `next/font/google`
- [ ] Verify `clip-path` HUD chrome looks correct at all breakpoints
- [ ] Check `bg-cp-red` / `text-cp-red` Tailwind utilities resolve from corrected `@theme`
- [ ] Smoke-test GlitchText glitch offsets (red `::before`, teal `::after`)

## Phase 4 — integration

- [ ] Browser DevTools: confirm `/api/profile`, `/api/projects`, `/api/experience` succeed with no CORS errors
- [ ] Submit contact form, confirm row appears in `messages` table (verify via Supabase MCP `execute_sql`)
- [ ] Configure SMTP (`MAIL_USER`, `MAIL_PASS` in `backend/.env`) and verify email sends
- [ ] Add Suspense + skeleton loaders for each data-fetching page
- [ ] Add `error.tsx` boundary for API failures
- [ ] Test 375px viewport: navbar collapses, timeline stacks, cards reflow

## Phase 5 — polish

- [ ] Framer Motion scroll-reveal on `ExperienceTimeline` items (stagger by index)
- [ ] Particle field canvas in hero (~80 particles)
- [ ] Glitch-on-hover for project card titles
- [ ] Typewriter boot sequence on hero (`init: night_city.exe ▍`)
- [ ] Neon-pulse animation on active navbar link
- [ ] Place real `cv.pdf` at `frontend/public/cv.pdf`
- [ ] Open Graph + Twitter metadata in `app/layout.tsx`
- [ ] Run Lighthouse, fix a11y contrast issues

## Deployment (future)

- [ ] Frontend → Vercel (MCP connector available)
- [ ] Backend → Railway / Render / Fly
- [ ] Set production env vars: `SUPABASE_DB_PASSWORD`, `JWT_SECRET`, `MAIL_USER`, `MAIL_PASS`, `CORS_ORIGIN`, `NEXT_PUBLIC_API_URL`
- [ ] Set `admin.password-hash` (BCrypt) — generate via `htpasswd -bnBC 12 "" "yourpw" | tr -d ':\n'`

## Known gaps in current code

- Admin login returns 503 until `ADMIN_PASSWORD_HASH` env var is set.
- Contact emails are no-ops until `MAIL_USER`/`MAIL_PASS` are set; messages still persist to DB.
- No tests written (`spring-boot-starter-test` on classpath but no test classes).
- `public/cv.pdf` referenced by hero "Download CV" doesn't exist yet.
- GitHub Actions `maven.yml` used JDK 17 (fixed → 21 corretto). `maven-publish.yml` used JDK 11 (fixed → 21 corretto).

## How to run locally

```bash
# Backend (Supabase Postgres + Spring Boot)
cd backend && ./run-dev.sh           # picks up backend/.env automatically

# Frontend (Next.js)
cd frontend && pnpm dev              # http://localhost:3000
```
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
