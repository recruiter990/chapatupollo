import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chapa tu Pollo | Ristorante Peruviano — Ancona',
  description: 'Il Primo Ristorante Peruviano di Ancona. Autentica cucina peruviana con un tocco Nikkei. Prenotazioni, menu, eventi privati.',
  keywords: ['ristorante peruviano', 'Ancona', 'cucina peruviana', 'Chapa tu Pollo', 'pollo a la brasa', 'ceviche', 'pisco sour'],
  authors: [{ name: 'Chapa tu Pollo' }],
  openGraph: {
    title: 'Chapa tu Pollo | Ristorante Peruviano — Ancona',
    description: 'Il Primo Ristorante Peruviano di Ancona. Autentica cucina peruviana con un tocco Nikkei.',
    url: 'https://chapatupollo.it',
    siteName: 'Chapa tu Pollo',
    locale: 'it_IT',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#C8102E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
