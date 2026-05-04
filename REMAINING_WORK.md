# Remaining Work

This document tracks project progress using AI-guided development phases. Each phase maps to concrete work items for the current personal portfolio web app.

## Phase 1 — Foundation

Status: ✅ completed

- [x] Bootstrap Spring Boot backend with JWT auth, seed runner, and message persistence
- [x] Bootstrap Next.js 16 + React 19 frontend with Tailwind 4
- [x] Add Docker stack for backend, frontend, and Supabase Postgres
- [x] Add database initialization via `supabase/init.sql`
- [x] Add `.env.example` and Docker Compose environment structure

## Phase 2 — AI-assisted design correction

Status: 🔴 blocked by token and theme alignment

- [ ] Replace frontend theme tokens with CP2077 Neo Militarism palette in `frontend/src/app/globals.css`
- [ ] Load and use `Rajdhani`, `Orbitron`, and `Share Tech Mono` fonts consistently
- [ ] Change component accent values from cyan/magenta to red/yellow/teal
- [ ] Align `HUDChrome`, `Navbar`, `NeonButton`, `NeonCard`, `SkillBar`, `GlitchText`, and `ContactForm` to the design system
- [ ] Verify the design palette in browser previews and fix any token mismatches

## Phase 3 — AI-assisted integration

Status: ⬜ pending

- [ ] Confirm backend API endpoints work end-to-end with the frontend
- [ ] Verify CORS and contact form submission in browser testing
- [ ] Configure SMTP and verify outgoing email delivery from contact submissions
- [ ] Add `error.tsx` boundaries and Suspense/skeleton loading states for data pages
- [ ] Validate dark mode / responsive layouts for mobile breakpoints
- [ ] Add basic tests for contact form submission and admin message retrieval

## Phase 4 — AI-assisted polish

Status: ⬜ pending

- [ ] Add motion and animation polish using Framer Motion
- [ ] Add hero terminal/boot sequence and neon pulse interactions
- [ ] Add open graph metadata and `cv.pdf` download support
- [ ] Run Lighthouse and fix accessibility contrast issues
- [ ] Document production deployment steps for backend and frontend
- [ ] Add a CI workflow that validates README, linting, and build steps

## Notes

- The AI phase breakdown is intended as a working roadmap, not a final release plan.
- Design token corrections are the current critical path before frontend visual verification.
- Backend and Docker setup are complete; next work focuses on polish and integration.
