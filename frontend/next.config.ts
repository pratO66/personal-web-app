import type { NextConfig } from 'next'

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080'

const nextConfig: NextConfig = {
  output: 'standalone',

  // Local-dev API proxy: /api/* → Spring Boot backend.
  // In production Vercel the equivalent rewrite lives in vercel.json.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
