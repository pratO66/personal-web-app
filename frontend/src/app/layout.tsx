import type { Metadata } from 'next'
import { Orbitron, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import ScanlineOverlay from '@/components/layout/ScanlineOverlay'
import Navbar from '@/components/layout/Navbar'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? 'V // Night City Dev',
  description: 'Personal resume — full-stack engineer, Night City protocols.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${shareTechMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cp-dark text-cp-text">
        <ScanlineOverlay />
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-cp-border py-6 text-center text-xs uppercase tracking-widest text-cp-muted">
          © {new Date().getFullYear()} · Compiled in Night City
        </footer>
      </body>
    </html>
  )
}
