import { Manrope, Sora } from 'next/font/google'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoSites — Done-for-you websites for UK businesses',
    description:
      'GoSites builds striking, high-converting websites for UK businesses with fast delivery, clear pricing, and a fully done-for-you process.',
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
