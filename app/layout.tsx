import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Coaching Hub - Piattaforma per Personal Trainer e Coach Online',
  description: 'Gestisci clienti, schede allenamento e piani alimentari in un\'unica piattaforma. Pensata per personal trainer e coach online.',
  keywords: 'personal trainer software, app per coach, gestione clienti fitness, schede allenamento online, piani alimentari digitali',
  openGraph: {
    title: 'Coaching Hub - Piattaforma per Personal Trainer e Coach Online',
    description: 'Gestisci clienti, schede allenamento e piani alimentari in un\'unica piattaforma. Provalo gratis per 14 giorni.',
    url: 'https://coachinghub.it',
    siteName: 'Coaching Hub',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coaching Hub - La piattaforma tutto-in-uno per personal trainer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Hub - Piattaforma per Personal Trainer e Coach Online',
    description: 'Gestisci clienti, schede allenamento e piani alimentari in un\'unica piattaforma. Provalo gratis per 14 giorni.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
