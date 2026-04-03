import { Manrope, Sora } from 'next/font/google'

import { site } from '@/lib/content'
import WhatsappWidget from '@/components/ui/WhatsappWidget'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  applicationName: site.name,
  manifest: '/manifest.webmanifest',
  title: 'GoSites — Done-for-you websites for UK businesses',
  description:
    'GoSites builds striking, high-converting websites for UK businesses with fast delivery, clear pricing, and a fully done-for-you process.',
  openGraph: {
    title: 'GoSites — Done-for-you websites for UK businesses',
    description:
      'GoSites builds striking, high-converting websites for UK businesses with fast delivery, clear pricing, and a fully done-for-you process.',
    locale: 'en_GB',
    siteName: 'GoSites',
    type: 'website',
    url: `https://${site.domain}`,
    images: [
      {
        url: '/brand/gosites-logo-long.png',
        width: 1948,
        height: 431,
        alt: `${site.name} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoSites — Done-for-you websites for UK businesses',
    description:
      'GoSites builds striking, high-converting websites for UK businesses with fast delivery, clear pricing, and a fully done-for-you process.',
    images: ['/brand/gosites-logo-long.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        {children}
        <WhatsappWidget />
      </body>
    </html>
  )
}
