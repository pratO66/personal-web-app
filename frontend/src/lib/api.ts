import type { Profile, Project, Experience, ContactPayload, ApiResponse } from './types'

// Server components (RSC) use BACKEND_URL — a server-only runtime env var that is
// NOT baked into the bundle at build time. This lets Vercel/Railway swap the URL
// without rebuilding the frontend.
// Client components (ContactForm) fall back to NEXT_PUBLIC_API_URL which IS baked
// at build time and embedded in the browser bundle.
const SERVER_BASE =
  typeof window === 'undefined'
    ? (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080')
    : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080')

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${SERVER_BASE}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  getProfile: () => get<Profile>('/api/profile'),
  getProjects: (featured?: boolean) =>
    get<Project[]>(`/api/projects${featured ? '?featured=true' : ''}`),
  getExperience: () => get<Experience[]>('/api/experience'),
  sendContact: (body: ContactPayload): Promise<ApiResponse> =>
    fetch(`${SERVER_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
}
