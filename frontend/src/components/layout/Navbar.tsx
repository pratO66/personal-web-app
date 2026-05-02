'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'HOME' },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/skills', label: 'SKILLS' },
  { href: '/contact', label: 'CONTACT' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-cp-dark/80 border-b border-cp-border">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-[var(--font-display)] text-cp-yellow text-sm tracking-[0.3em]">
          ◆ V//SYS
        </Link>
        <button
          aria-label="menu"
          className="md:hidden text-cp-cyan text-xs uppercase tracking-widest"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕ CLOSE' : '≡ MENU'}
        </button>
        <ul className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.25em] font-[var(--font-mono)]">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-1 py-1 transition-colors ${
                    active ? 'text-cp-cyan' : 'text-cp-text hover:text-cp-cyan'
                  }`}
                >
                  {active && <span className="mr-1 text-cp-magenta">▮</span>}
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {open && (
        <ul className="md:hidden border-t border-cp-border bg-cp-panel">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-xs uppercase tracking-widest border-b border-cp-border ${
                  pathname === l.href ? 'text-cp-cyan' : 'text-cp-text'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
