import type { Metadata } from 'next'
import { Rajdhani, Orbitron, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import ScanlineOverlay from '@/components/layout/ScanlineOverlay'
import Navbar from '@/components/layout/Navbar'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
})

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://personal-web-app.vercel.app'
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'V // Night City Dev'

export const metadata: Metadata = {
  title: { default: siteName, template: `%s | ${siteName}` },
  description: 'Full-stack engineer — Java, Spring Boot, React, Next.js. Night City protocols.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description: 'Full-stack engineer — Java, Spring Boot, React, Next.js.',
    url: siteUrl,
    siteName,
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'Full-stack engineer — Java, Spring Boot, React, Next.js.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable} ${shareTechMono.variable} h-full antialiased`}>
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
