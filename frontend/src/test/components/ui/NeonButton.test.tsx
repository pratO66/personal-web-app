import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import NeonButton from '@/components/ui/NeonButton'

describe('NeonButton', () => {
  it('renders as <a> when href is given', () => {
    render(<NeonButton href="https://example.com">Click me</NeonButton>)
    const el = screen.getByRole('link', { name: /click me/i })
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', 'https://example.com')
  })

  it('renders as <button> when no href given', () => {
    render(<NeonButton>Click me</NeonButton>)
    const el = screen.getByRole('button', { name: /click me/i })
    expect(el.tagName).toBe('BUTTON')
  })

  it('applies accent color via inline style', () => {
    render(<NeonButton accent="teal">Teal button</NeonButton>)
    const el = screen.getByRole('button', { name: /teal button/i })
    expect(el).toHaveStyle({ color: '#55EAD4' })
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<NeonButton onClick={onClick}>Clickable</NeonButton>)
    await userEvent.click(screen.getByRole('button', { name: /clickable/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders children text', () => {
    render(<NeonButton>My Label</NeonButton>)
    // The button prepends a ▶ prefix as a sibling text node, so use role query
    expect(screen.getByRole('button', { name: /my label/i })).toBeInTheDocument()
  })

  it('is disabled when disabled prop passed', () => {
    render(<NeonButton disabled>Disabled</NeonButton>)
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled()
  })

  it('passes className through', () => {
    render(<NeonButton className="w-full">Full width</NeonButton>)
    const el = screen.getByRole('button', { name: /full width/i })
    expect(el.className).toContain('w-full')
  })
})
