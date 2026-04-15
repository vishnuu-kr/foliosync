import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700', '800', '900'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'FolioSync - AI Portfolio Generator',
  description: 'Generate a stunning developer portfolio in seconds. AI scrapes your GitHub, LinkedIn, Twitter & blogs to build your professional identity.',
  keywords: ['portfolio', 'developer', 'AI', 'GitHub', 'LinkedIn', 'resume'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark scroll-smooth antialiased ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="relative bg-[#000000] text-zinc-400 font-sans font-normal overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
