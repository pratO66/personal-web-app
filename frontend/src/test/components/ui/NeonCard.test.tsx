import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NeonCard from '@/components/ui/NeonCard'
import type { Project } from '@/lib/types'

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 1,
    title: 'Neon Dashboard',
    description: 'Real-time metrics',
    longDescription: 'A full description',
    tags: ['React', 'WebGL'],
    stack: ['Next.js', 'TypeScript'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/repo',
    imageUrl: '',
    featured: false,
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00',
    ...overrides,
  }
}

describe('NeonCard', () => {
  it('renders project title', () => {
    render(<NeonCard project={makeProject()} />)
    expect(screen.getByText('Neon Dashboard')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<NeonCard project={makeProject()} />)
    expect(screen.getByText('Real-time metrics')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<NeonCard project={makeProject()} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('WebGL')).toBeInTheDocument()
  })

  it('shows DEMO link when demoUrl present', () => {
    render(<NeonCard project={makeProject({ demoUrl: 'https://demo.example.com' })} />)
    const demoLink = screen.getByRole('link', { name: /demo/i })
    expect(demoLink).toBeInTheDocument()
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com')
  })

  it('hides DEMO link when demoUrl empty', () => {
    render(<NeonCard project={makeProject({ demoUrl: '' })} />)
    expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument()
  })

  it('shows REPO link', () => {
    render(<NeonCard project={makeProject()} />)
    const repoLink = screen.getByRole('link', { name: /repo/i })
    expect(repoLink).toBeInTheDocument()
    expect(repoLink).toHaveAttribute('href', 'https://github.com/example/repo')
  })

  it('shows Featured · Project title when featured=true', () => {
    render(<NeonCard project={makeProject({ featured: true })} />)
    expect(screen.getByText(/featured/i)).toBeInTheDocument()
  })
})
