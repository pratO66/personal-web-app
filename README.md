# Personal Web App

This repository contains a personal portfolio / resume web application with a Next.js frontend and a Spring Boot backend. The app provides a public profile, project list, experience timeline, and a contact form; there are admin endpoints protected by JWT for reading contact messages.

---

## Repository layout

- backend/ — Spring Boot (Java 21, Maven)
  - src/ — Java sources (controllers, services, models, repositories)
  - run-dev.sh — development helper (reads .env)
  - .env.example — example env variables (copy to .env)
  - HELP.md — developer notes and references
- frontend/ — Next.js (React 19 / Next 16)
  - src/ — React components and pages
  - public/ — static assets
  - package.json — scripts: `dev`, `build`, `start`

---

## Technologies

- Backend: Java 21, Spring Boot 3.x, Spring Data JPA, Spring Security, jjwt, Postgres
- Frontend: Next.js (app router), React 19, TailwindCSS (dev deps), Framer Motion
- Database: Postgres (supabase URL present in application-dev.yml)
- Auth: JWT for admin endpoints; admin credentials via `admin.password-hash`

---

## Quick start (local)

Prereqs: Java 21, Maven (or use included mvnw), Node 18+, npm/yarn/pnpm

1) Backend

- Copy example env: `cp backend/.env.example backend/.env` and fill secrets (SUPABASE_DB_PASSWORD, JWT_SECRET, MAIL_USER, MAIL_PASS, optional admin.username and admin.password-hash)
- Start backend in dev profile (reads .env):

  cd backend
  ./run-dev.sh

  Or with Maven wrapper:
  ./mvnw spring-boot:run

Backend listens on :8080 by default (see application-dev.yml). CORS_ORIGIN defaults to `http://localhost:3000`.

2) Frontend

  cd frontend
  npm install
  npm run dev

Open http://localhost:3000 to view the site. The frontend talks to the backend using relative `/api/*` endpoints; when running separately the backend must allow CORS from the frontend origin.

---

## Environment variables (backend)

The backend expects the following (see backend/.env.example):

- SUPABASE_DB_PASSWORD — Postgres password
- JWT_SECRET — secret used to sign JWT tokens
- MAIL_USER / MAIL_PASS — SMTP credentials for sending contact emails
- CORS_ORIGIN — allowed origin for browser requests (defaults to http://localhost:3000)
- admin.username (optional) — admin username (defaults to `admin`)
- admin.password-hash (recommended) — bcrypt hash of the admin password

To generate a bcrypt password hash, you can use Python + bcrypt:

```bash
python3 -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASSWORD', bcrypt.gensalt()).decode())"
```

Set the resulting string as `admin.password-hash` in your .env.

---

## Important HTTP API endpoints

- GET /api/profile — returns profile metadata (name, bio, socials, skills)
- GET /api/projects — list projects (supports `?featured=true`)
- GET /api/projects/{id} — get project details
- GET /api/experience — list experience entries
- POST /api/contact — submit contact message (body: name, email, subject, body)

Admin (requires JWT from /api/admin/auth/login):
- POST /api/admin/auth/login — { username, password } → { token }
- GET /api/admin/messages — list received contact messages
- PATCH /api/admin/messages/{id}/read — toggle read flag

Example: login and read messages (curl)

```bash
# Login (replace values)
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}' \
  http://localhost:8080/api/admin/auth/login

# Use the returned token for admin requests
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8080/api/admin/messages
```

---

## Seed data

When running with the `dev` profile the application contains a `SeedRunner` which populates a sample profile, several example projects, and experience entries if the database is empty.

---

## Tests & build

- Backend: `./mvnw test` runs unit tests (there are sample tests under `src/test`).
- Frontend: `npm run build` then `npm start` to run production build.

---

## Deployment notes

- Frontend: deploy to Vercel or any static/Node host
- Backend: build a jar with `./mvnw package` and run, or build a container image using Spring Boot Maven plugin `build-image`.
- Ensure production `application.yml`/secrets are set and DB credentials are secure.

---

## Security & privacy

- Do not commit `.env` with secrets. `.env` is gitignored — keep it that way.
- The repo's application-dev.yml contains a Supabase host URL; make sure to rotate credentials if you reuse that DB.

---

## Known TODOs / remaining work

See REMAINING_WORK.md for planned improvements and tasks. The project already supports a complete public profile and contact flow; admin configuration and production hardening (rate limiting, stronger auth, email verification) are next steps.

---

If anything in this README is out of date, open an issue or update the file with corrected instructions. Happy hacking!
