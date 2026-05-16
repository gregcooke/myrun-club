import type { Metadata } from 'next'
import { Bebas_Neue, Space_Mono, Roboto_Mono, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
  display: 'swap',
})
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-space',
  subsets: ['latin'],
  display: 'swap',
})
const robotoMono = Roboto_Mono({
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
})
const inter = Inter({
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'myrun.club — Find your people. Find your route.',
  description:
    'Multi-city run club aggregator. Discover run clubs in London, Cape Town, Amsterdam and beyond.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable} ${robotoMono.variable} ${inter.variable}`}
    >
      <body className="flex flex-col min-h-screen" style={{ background: '#0C0C0C', color: '#F0EFE9' }}>
        <Nav />
        <div style={{ paddingTop: '86px' }}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
