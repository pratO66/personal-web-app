import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ContactForm from '@/components/sections/ContactForm'

/**
 * Edge-case tests for ContactForm — submit-time validation paths.
 *
 * Architecture note:
 *   - validate-email is called on BLUR only (not on submit)
 *   - api.sendContact POSTs to /api/contact (one fetch per submit)
 *   - So submit tests need ONE mock, not two
 */
describe('ContactForm — edge cases', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  async function fillAndSubmit(emailValue = 'user@company.com') {
    const inputs = document.querySelectorAll<HTMLElement>('input, textarea')
    await userEvent.type(inputs[0], 'Alice Test')
    await userEvent.type(inputs[1], emailValue)
    await userEvent.type(inputs[2], 'Test Subject')
    await userEvent.type(inputs[3], 'Body content here')
    await userEvent.click(screen.getByRole('button', { name: /send burst/i }))
  }

  // ── 422 — disposable / bad domain caught at submit ────────────────────────

  it('shows 422 error message from backend on submit', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: 'Disposable email not accepted.' })
    } as never)
    render(<ContactForm />)
    await fillAndSubmit('user@mailinator.com')
    await waitFor(() => { expect(screen.queryByText(/disposable email not accepted/i)).toBeTruthy() })
  })

  // ── 429 — rate-limited ────────────────────────────────────────────────────

  it('shows rate-limit error on 429 from backend', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: 'Too many submissions from your connection. Please try again later.' })
    } as never)
    render(<ContactForm />)
    await fillAndSubmit()
    await waitFor(() => { expect(screen.queryByText(/too many submissions/i)).toBeTruthy() })
  })

  // ── Network failure during submit ─────────────────────────────────────────

  it('shows connection terminated on network throw during submit', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Failed to fetch'))
    render(<ContactForm />)
    await fillAndSubmit()
    await waitFor(() => { expect(screen.queryByText(/connection terminated/i)).toBeTruthy() })
  })

  // ── Success path ──────────────────────────────────────────────────────────

  it('shows success message and clears fields on successful submit', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: 'Message received.' })
    } as never)
    render(<ContactForm />)
    await fillAndSubmit()
    await waitFor(() => { expect(screen.queryByText(/message received/i)).toBeTruthy() })
    // All text inputs should be cleared
    document.querySelectorAll<HTMLInputElement>('input').forEach(i => expect(i.value).toBe(''))
  })

  // ── Transmitting state ────────────────────────────────────────────────────

  it('shows Transmitting label while POST is in flight', async () => {
    let resolve!: (v: unknown) => void
    vi.mocked(fetch).mockReturnValue(new Promise(r => { resolve = r }) as never)
    render(<ContactForm />)
    await fillAndSubmit()
    expect(screen.getByRole('button', { name: /transmitting/i })).toBeInTheDocument()
    // Resolve to avoid hanging promises
    resolve({ json: () => Promise.resolve({ success: true, message: '' }) })
  })

  // ── HTML5 required prevents empty submit ─────────────────────────────────

  it('does not call fetch when form is submitted empty (HTML5 required)', async () => {
    render(<ContactForm />)
    await userEvent.click(screen.getByRole('button', { name: /send burst/i }))
    expect(vi.mocked(fetch)).not.toHaveBeenCalled()
  })

  // ── Submit is disabled mid-flight ─────────────────────────────────────────

  it('button is disabled while sending', async () => {
    let resolve!: (v: unknown) => void
    vi.mocked(fetch).mockReturnValue(new Promise(r => { resolve = r }) as never)
    render(<ContactForm />)
    await fillAndSubmit()
    expect(screen.getByRole('button', { name: /transmitting/i })).toBeDisabled()
    resolve({ json: () => Promise.resolve({ success: true, message: '' }) })
  })
})
