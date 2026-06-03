import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/contexts/language-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Sérgio Nunes | Backend & AI Engineer',
  description: 'Backend Engineer building production AI systems. Specialized in RAG, intelligent agents, and automation pipelines. Python, FastAPI, LangChain.',
  keywords: ['Backend Engineer', 'AI Engineer', 'ML Engineering', 'RAG', 'LangChain', 'FastAPI', 'Python'],
  authors: [{ name: 'Sérgio Luiz Teixeira Nunes Júnior' }],
  creator: 'Sérgio Nunes',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sergionunes.dev',
    title: 'Sérgio Nunes | Backend & AI Engineer',
    description: 'Backend Engineer building production AI systems.',
    siteName: 'Sérgio Nunes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sérgio Nunes | Backend & AI Engineer',
    description: 'Backend Engineer building production AI systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f11' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
