import type { Profile, Project, Experience, ContactPayload, ApiResponse } from './types'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  getProfile: () => get<Profile>('/api/profile'),
  getProjects: (featured?: boolean) =>
    get<Project[]>(`/api/projects${featured ? '?featured=true' : ''}`),
  getExperience: () => get<Experience[]>('/api/experience'),
  sendContact: (body: ContactPayload): Promise<ApiResponse> =>
    fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
}
