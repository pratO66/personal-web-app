import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlitchText from '@/components/ui/GlitchText'

describe('GlitchText', () => {
  it('renders text content', () => {
    render(<GlitchText text="Night City" />)
    expect(screen.getByText('Night City')).toBeInTheDocument()
  })

  it('applies data-text attribute with the given text', () => {
    render(<GlitchText text="Night City" />)
    const el = screen.getByText('Night City')
    expect(el).toHaveAttribute('data-text', 'Night City')
  })

  it('renders as span by default', () => {
    render(<GlitchText text="Default Tag" />)
    const el = screen.getByText('Default Tag')
    expect(el.tagName).toBe('SPAN')
  })

  it('renders as h1 when tag=h1', () => {
    render(<GlitchText text="Heading" as="h1" />)
    const el = screen.getByRole('heading', { level: 1, name: 'Heading' })
    expect(el).toBeInTheDocument()
    expect(el.tagName).toBe('H1')
  })
})
