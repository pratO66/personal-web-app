'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/',           label: 'HOME'       },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/projects',   label: 'PROJECTS'   },
  { href: '/skills',     label: 'SKILLS'     },
  { href: '/contact',    label: 'CONTACT'    },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-cp-dark/80 border-b border-cp-border">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-[var(--font-display)] text-cp-yellow text-sm tracking-[0.3em]"
        >
          ◆ V//SYS
        </Link>

        {/* Hamburger — min 44 × 44 px touch target */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] text-cp-red text-xs uppercase tracking-widest"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '≡ MENU'}
        </button>

        <ul className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.25em] font-[var(--font-mono)]">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-1 py-1 transition-colors ${
                    active ? 'text-cp-red' : 'text-cp-text hover:text-cp-red'
                  }`}
                >
                  {active && <span className="mr-1 text-cp-red">▮</span>}
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile drawer — 44 px min touch targets per link */}
      {open && (
        <ul className="md:hidden border-t border-cp-red bg-cp-panel">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center min-h-[52px] px-4 text-xs uppercase tracking-widest border-b border-cp-border transition-colors ${
                  pathname === l.href ? 'text-cp-red' : 'text-cp-text active:text-cp-red'
                }`}
              >
                {pathname === l.href && <span className="mr-2 text-cp-red">▮</span>}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
