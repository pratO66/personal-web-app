import type { Profile, Project, Experience, ContactPayload, ApiResponse } from './types'

// ── Base URL strategy ────────────────────────────────────────────────────────
//
//  Server (RSC / build-time)
//    → process.env.BACKEND_URL  (runtime env var, never baked into bundle)
//    → Next.js rewrites handle local-dev: /api/* → localhost:8080
//
//  Client (browser, ContactForm)
//    → '' (empty) — uses relative path /api/*
//    → Vercel rewrites /api/* → Railway in production
//    → next.config.ts rewrites /api/* → localhost:8080 in local dev
//
//  This means CORS headers on Railway are needed only for non-browser callers,
//  and the browser never exposes the Railway URL directly.
// ────────────────────────────────────────────────────────────────────────────
const BASE =
  typeof window === 'undefined'
    ? (process.env.BACKEND_URL ?? '')   // Server: direct to Railway (or empty = use rewrites)
    : ''                                 // Client: relative → Vercel/Next.js rewrite proxy

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  getProfile:    ()               => get<Profile>('/api/profile'),
  getProjects:   (featured?: boolean) =>
    get<Project[]>(`/api/projects${featured ? '?featured=true' : ''}`),
  getExperience: ()               => get<Experience[]>('/api/experience'),

  sendContact: (body: ContactPayload): Promise<ApiResponse> =>
    fetch(`${BASE}/api/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    }).then((r) => r.json()),
}
