import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeroSection from '@/components/sections/HeroSection'
import type { Profile } from '@/lib/types'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, className }: {
    href: string
    children: React.ReactNode
    className?: string
  }) => <a href={href} className={className}>{children}</a>,
}))

function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: 1,
    name: 'V',
    tagline: 'Night City Developer',
    bio: 'Full-stack engineer',
    email: 'v@nightcity.dev',
    location: 'Night City, NC',
    avatarUrl: '',
    cvUrl: '/cv.pdf',
    techStack: ['Java', 'React'],
    socials: { github: 'https://github.com/v' },
    skills: [],
    updatedAt: '2024-01-01T00:00:00',
    ...overrides,
  }
}

describe('HeroSection', () => {
  it('renders PROFILE NOT FOUND when profile is null', () => {
    render(<HeroSection profile={null} />)
    expect(screen.getByText(/PROFILE NOT FOUND/i)).toBeInTheDocument()
  })

  it('renders profile name when profile is given', () => {
    render(<HeroSection profile={makeProfile()} />)
    expect(screen.getByText('V')).toBeInTheDocument()
  })

  it('renders profile tagline', () => {
    render(<HeroSection profile={makeProfile()} />)
    expect(screen.getByText(/Night City Developer/)).toBeInTheDocument()
  })

  it('renders all 3 action buttons', () => {
    render(<HeroSection profile={makeProfile()} />)
    expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /download cv/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders social links when socials present', () => {
    render(<HeroSection profile={makeProfile({ socials: { github: 'https://github.com/v' } })} />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })
})
