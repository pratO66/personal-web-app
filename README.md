# Personal Web App

A CP2077-inspired personal portfolio / resume web application with a Next.js frontend and a Spring Boot backend.

![Java](https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Postgres](https://img.shields.io/badge/Postgres-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## Overview

This repository contains:

- `backend/` — Spring Boot API, data model, security, and admin endpoints
- `frontend/` — Next.js React website for public profile, projects, experience, and contact form
- `docker-compose.yml` — local Docker stack with PostgreSQL, backend, and frontend
- `supabase/init.sql` — database schema initialization

The app includes a public portfolio experience page and a contact form. Admin APIs are protected by JWT and allow reading submitted messages.

## Repository Structure

- `backend/`
  - `src/main/java/` — controllers, services, models, repositories, security
  - `run-dev.sh` — dev runner that loads backend `.env`
  - `.env.example` — example backend environment variables
- `frontend/`
  - `src/app/` — pages and routes
  - `src/components/` — UI components and sections
  - `package.json` — frontend scripts
- `docker-compose.yml` — local Docker development stack
- `supabase/init.sql` — database initialization SQL
- `REMAINING_WORK.md` — planned improvements and open tasks
- `CP2077_DESIGN_BIBLE.html` — visual design reference

## Local Development

### Prerequisites

- Java 21
- Node 18+ or compatible
- Docker (optional)

### Backend

1. Copy the example env file:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Fill in required values:

   - `SUPABASE_DB_PASSWORD`
   - `JWT_SECRET`
   - `MAIL_USER`
   - `MAIL_PASS`
   - `CORS_ORIGIN` (default: `http://localhost:3000`)

3. Start the backend:

   ```bash
   cd backend
   ./run-dev.sh
   ```

   If the `run-dev.sh` script does not match your local JDK path, run directly with Maven:

   ```bash
   ./mvnw spring-boot:run
   ```

The backend listens on `http://localhost:8080` by default when using the dev profile.

### Frontend

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend:

   ```bash
   npm run dev
   ```

3. Open:

   ```
   http://localhost:3000
   ```

The frontend communicates with the backend at `http://localhost:8080` by default.

## Docker Development

### Prerequisites

- Docker
- Docker Compose
- Copy the root `.env.example` to `.env`

### Start services

```bash
cp .env.example .env
docker-compose up --build
```

Or run in the background:

```bash
docker-compose up -d --build
```

Available services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- Database: `localhost:5432`

### Stop services

```bash
docker-compose down
docker-compose down -v
```

## Environment Variables

### Backend (`backend/.env`)

- `SUPABASE_DB_PASSWORD` — PostgreSQL password
- `JWT_SECRET` — JWT signing secret
- `MAIL_USER` — SMTP username
- `MAIL_PASS` — SMTP password
- `CORS_ORIGIN` — allowed frontend origin

### Docker Compose root `.env`

- `SUPABASE_DB_PASSWORD`
- `JWT_SECRET`
- `ADMIN_PASSWORD_HASH` — optional bcrypt hash for admin login
- `MAIL_HOST` — SMTP host
- `MAIL_PORT` — SMTP port
- `MAIL_USER` — SMTP username
- `MAIL_PASS` — SMTP password
- `CORS_ORIGIN` — frontend origin
- `NEXT_PUBLIC_API_URL` — frontend API base URL
- `NEXT_PUBLIC_SITE_NAME` — frontend site title

### Generate an admin bcrypt password hash

```bash
python3 -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASSWORD', bcrypt.gensalt()).decode())"
```

Use the result as `ADMIN_PASSWORD_HASH`.

## Admin API

Login endpoint:

```bash
curl -X POST -H "Content-Type: application/json"   -d '{"username":"admin","password":"secret"}'   http://localhost:8080/api/admin/auth/login
```

Use the returned JWT token for protected requests:

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8080/api/admin/messages
```

## Seed Data

The backend seed runner inserts sample profile data, example projects, and experience entries when the database is empty in dev mode.

## Notes

- Backend: Spring Boot with Java 21
- Frontend: Next.js 16 + React 19
- Admin endpoints are JWT-protected
- The contact form sends messages that can be viewed through the admin API

For contributions or improvements, open an issue or submit a pull request with your proposed changes.
