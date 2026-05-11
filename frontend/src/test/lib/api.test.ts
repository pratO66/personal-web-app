import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api } from '@/lib/api'
import type { Profile, Project, Experience } from '@/lib/types'

function mockFetch(data: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(data),
  })
}

describe('api', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('getProfile resolves to a Profile', async () => {
    const profile: Partial<Profile> = { id: 1, name: 'V', tagline: 'Night City Developer' }
    vi.stubGlobal('fetch', mockFetch(profile))

    const result = await api.getProfile()
    expect(result.name).toBe('V')
  })

  it('getProjects resolves to array of projects', async () => {
    const projects: Partial<Project>[] = [{ id: 1, title: 'Neon Dashboard' }]
    vi.stubGlobal('fetch', mockFetch(projects))

    const result = await api.getProjects()
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Neon Dashboard')
  })

  it('getProjects with featured=true passes correct query param', async () => {
    const fetchMock = mockFetch([])
    vi.stubGlobal('fetch', fetchMock)

    await api.getProjects(true)
    const calledUrl = (fetchMock.mock.calls[0] as [string])[0]
    expect(calledUrl).toContain('?featured=true')
  })

  it('getExperience resolves to array', async () => {
    const exp: Partial<Experience>[] = [{ id: 1, company: 'Arasaka' }]
    vi.stubGlobal('fetch', mockFetch(exp))

    const result = await api.getExperience()
    expect(result).toHaveLength(1)
    expect(result[0].company).toBe('Arasaka')
  })

  it('sendContact calls POST with correct body', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: 'OK' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await api.sendContact({ name: 'Alice', email: 'alice@example.com', subject: 'Hi', body: 'Hello' })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/contact'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Alice'),
      })
    )
  })

  it('throws on non-ok response from GET', async () => {
    vi.stubGlobal('fetch', mockFetch({ error: 'not found' }, false))

    await expect(api.getProfile()).rejects.toThrow()
  })
})
