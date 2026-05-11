import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HUDChrome from '@/components/layout/HUDChrome'

// jsdom normalises hex colours to rgb(), so we match against rgb values
const colours = {
  red:    'rgb(197, 0, 60)',
  teal:   'rgb(85, 234, 212)',
  yellow: 'rgb(243, 230, 0)',
}

describe('HUDChrome', () => {
  it('renders children', () => {
    render(<HUDChrome><span>Child content</span></HUDChrome>)
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('shows title when provided', () => {
    render(<HUDChrome title="System Profile"><span>content</span></HUDChrome>)
    expect(screen.getByText(/System Profile/)).toBeInTheDocument()
  })

  it('hides title bar when title is omitted', () => {
    render(<HUDChrome><span>no title here</span></HUDChrome>)
    expect(screen.queryByText(/▰/)).not.toBeInTheDocument()
  })

  it('applies red accent color by default', () => {
    const { container } = render(<HUDChrome title="Test"><span>test</span></HUDChrome>)
    const outerDiv = container.firstElementChild as HTMLElement
    expect(outerDiv.style.borderColor).toBe(colours.red)
  })

  it('applies teal accent color when specified', () => {
    const { container } = render(<HUDChrome accent="teal" title="Teal"><span>test</span></HUDChrome>)
    const outerDiv = container.firstElementChild as HTMLElement
    expect(outerDiv.style.borderColor).toBe(colours.teal)
  })

  it('applies yellow accent color when specified', () => {
    const { container } = render(<HUDChrome accent="yellow" title="Yellow"><span>test</span></HUDChrome>)
    const outerDiv = container.firstElementChild as HTMLElement
    expect(outerDiv.style.borderColor).toBe(colours.yellow)
  })
})
