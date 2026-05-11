import { render, container } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScanlineOverlay from '@/components/layout/ScanlineOverlay'

describe('ScanlineOverlay', () => {
  it('renders a div with pointer-events-none', () => {
    const { container: c } = render(<ScanlineOverlay />)
    const div = c.firstElementChild as HTMLElement
    expect(div).toBeTruthy()
    expect(div.className).toContain('pointer-events-none')
  })
})
