<!--
CP2077 DESIGN SYSTEM APPLIED

# ![CP2077 Logo](https://via.placeholder.com/150x50?text=CP2077+Design) Personal Web App

![Java](https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Postgres](https://img.shields.io/badge/Postgres-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

This repository contains a personal portfolio / resume web application with a Next.js frontend and a Spring Boot backend. The app provides a public profile, project list, experience timeline, and a contact form; there are admin endpoints protected by JWT for reading contact messages.


## Repository Layout

![Layout](https://via.placeholder.com/800x200?text=Repository+Layout+Diagram)

  - **src/** — Java sources (controllers, services, models, repositories)
  - **run-dev.sh** — development helper (reads .env)
  - **.env.example** — example env variables (copy to .env)
  - **HELP.md** — developer notes and references
  - **src/** — React components and pages
  - **public/** — static assets
  - **package.json** — scripts: `dev`, `build`, `start`


## Technologies

![Tech Stack](https://via.placeholder.com/800x150?text=Tech+Stack+Overview)



## Quick Start (Local)

### Prerequisites

![Prerequisites](https://via.placeholder.com/800x100?text=Java+21,+Node+18,+Maven)

1. **Backend**

   - Copy example env: `cp backend/.env.example backend/.env` and fill secrets (SUPABASE_DB_PASSWORD, JWT_SECRET, MAIL_USER, MAIL_PASS, optional admin.username and admin.password-hash)
   - Start backend in dev profile (reads .env):

     ```bash
     cd backend
     ./run-dev.sh

     # Or with Maven wrapper:
     ./mvnw spring-boot:run
     ```

   Backend listens on :8080 by default (see application-dev.yml). CORS_ORIGIN defaults to `http://localhost:3000`.

2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site. The frontend talks to the backend using relative `/api/*` endpoints; when running separately the backend must allow CORS from the frontend origin.


## Quick Start (Docker)

### Prerequisites

- Docker and Docker Compose installed
- Copy `.env.example` to `.env` and fill in your values

### Run with Docker Compose

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your values (database password, JWT secret, etc.)

# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:5432 (PostgreSQL)

### Docker Services

- **supabase-db**: PostgreSQL database with initialized schema
- **backend**: Spring Boot application (Java 21)
- **frontend**: Next.js application (production build)

To stop and clean up:
```bash
docker-compose down
docker-compose down -v  # Also remove volumes
```


## Environment Variables (Backend)

The backend expects the following (see backend/.env.example):


To generate a bcrypt password hash, you can use Python + bcrypt:

```bash
python3 -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASSWORD', bcrypt.gensalt()).decode())"
```

Set the resulting string as `admin.password-hash` in your .env.


## Important HTTP API Endpoints

![API Endpoints](https://via.placeholder.com/800x150?text=API+Endpoints)


**Admin (requires JWT from /api/admin/auth/login):**

Example: login and read messages (curl)

```bash
# Login (replace values)
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}' \
  http://localhost:8080/api/admin/auth/login

# Use the returned token for admin requests
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8080/api/admin/messages
```


## Seed data

When running with the `dev` profile the application contains a `SeedRunner` which populates a sample profile, several example projects, and experience entries if the database is empty.


## Tests & build



## Deployment notes



## Security & privacy



## Known TODOs / remaining work

See REMAINING_WORK.md for planned improvements and tasks. The project already supports a complete public profile and contact flow; admin configuration and production hardening (rate limiting, stronger auth, email verification) are next steps.


Project vision & design reference

This project is inspired by the CP2077 design bible in the repo (CP2077_DESIGN_BIBLE.html). That design document is the creative reference for the visual language, copy tone, and section composition — use it when making UI/UX decisions. Key mappings:


Customization & where to change content


Styling & implementation notes


CI / Badges / Deployment


Contributing

If you want to extend the design or features to match CP2077 bible more closely, open an issue outlining the UI change and link to the sections of CP2077_DESIGN_BIBLE.html you are implementing.

Contact

For repo-level questions, open an issue or reach out by creating a PR with proposed changes. Happy hacking!
