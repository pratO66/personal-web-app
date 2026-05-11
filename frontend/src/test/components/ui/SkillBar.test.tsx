import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SkillBar from '@/components/ui/SkillBar'
import type { Skill } from '@/lib/types'

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="motion-bar" style={style} className={className}>{children}</div>
    ),
  },
}))

function makeSkill(name: string, level: number, category: Skill['category'] = 'Backend'): Skill {
  return { name, level, category }
}

describe('SkillBar', () => {
  it('renders skill name', () => {
    render(<SkillBar skill={makeSkill('React', 90)} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders skill level', () => {
    render(<SkillBar skill={makeSkill('React', 90)} />)
    expect(screen.getByText('090%')).toBeInTheDocument()
  })

  it('applies red color for level > 70', () => {
    render(<SkillBar skill={makeSkill('Java', 85)} />)
    expect(screen.getByText('085%')).toHaveStyle({ color: '#C5003C' })
  })

  it('applies yellow color for level between 40 and 70', () => {
    render(<SkillBar skill={makeSkill('Docker', 60)} />)
    expect(screen.getByText('060%')).toHaveStyle({ color: '#F3E600' })
  })

  it('applies teal color for level < 40', () => {
    render(<SkillBar skill={makeSkill('Rust', 30)} />)
    expect(screen.getByText('030%')).toHaveStyle({ color: '#55EAD4' })
  })

  it('renders the animated bar div', () => {
    render(<SkillBar skill={makeSkill('TypeScript', 88)} />)
    expect(screen.getByTestId('motion-bar')).toBeInTheDocument()
  })
})
