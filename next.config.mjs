const replitOrigins = [
  process.env.REPLIT_DEV_DOMAIN,
  ...(process.env.REPLIT_DOMAINS ?? '')
    .split(',')
    .map((domain) => domain.trim())
    .filter(Boolean),
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '*.worf.replit.dev',
]

const nextConfig = {
  allowedDevOrigins: Array.from(new Set(replitOrigins.filter(Boolean))),
}

export default nextConfig
