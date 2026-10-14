import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: { default: 'Konuko Foundation', template: '%s | Konuko Foundation' },
  description: 'Konuko Foundation expands access to education, technology and opportunity for children and local communities.',
  keywords: ['education', 'NGO', 'technology', 'community', 'Africa', 'Kenya', 'foundation'],
  openGraph: {
    title: 'Konuko Foundation',
    description: 'Expanding access to education, technology and opportunity.',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
