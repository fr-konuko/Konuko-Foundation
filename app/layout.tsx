import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Konuko Foundation', template: '%s | Konuko Foundation' },
  description: 'Educational empowerment through school support, internet access and technology access.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={lora.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
