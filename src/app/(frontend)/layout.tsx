import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LoadingBar } from '@/components/LoadingBar/LoadingBar'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { clsx } from 'clsx'
import { HeaderColorProvider } from '@/Header/HeaderColorContext'
import { Toaster } from 'sonner'
// import { Toaster } from 'sonner'

const fustat = localFont({
  src: './Fustat.ttf',
  display: 'swap',
  preload: true,
  variable: '--font-fustat',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" className={fustat.className} suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <HeaderColorProvider>
            <LoadingBar />
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <div
              className={clsx(
                'relative flex min-h-screen flex-col',
                // 'relative min-h-screen',
                // isEnabled && 'pt-10', // Add padding when AdminBar is present
              )}
            >
              <Header />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </HeaderColorProvider>
          <Toaster
            position="bottom-center"
            className="text-white"
            theme="dark"
            duration={6000}
            toastOptions={{
              style: {
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
