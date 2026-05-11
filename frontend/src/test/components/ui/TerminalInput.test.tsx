import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TerminalInput from '@/components/ui/TerminalInput'

describe('TerminalInput', () => {
  it('renders label text', () => {
    render(<TerminalInput label="Handle" value="" onChange={vi.fn()} />)
    expect(screen.getByText(/handle/i)).toBeInTheDocument()
  })

  it('renders input by default', () => {
    render(<TerminalInput label="Handle" value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders textarea when multiline=true', () => {
    render(<TerminalInput label="Payload" multiline value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
  })

  it('accepts value and onChange', async () => {
    const onChange = vi.fn()
    render(<TerminalInput label="Subject" value="Hello" onChange={onChange} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Hello')
    await userEvent.type(input, ' World')
    expect(onChange).toHaveBeenCalled()
  })

  it('passes required attribute through', () => {
    render(<TerminalInput label="Required Field" required value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })
})
