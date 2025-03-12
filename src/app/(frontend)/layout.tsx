import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { clsx } from 'clsx'
import { HeaderColorProvider } from '@/Header/HeaderColorContext'

const fustat = localFont({
  src: './Fustat.ttf',
  display: 'swap',
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
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <div
              className={clsx(
                'relative min-h-screen',
                isEnabled && 'pt-10', // Add padding when AdminBar is present
              )}
            >
              <Header />
              {children}
              <Footer />
            </div>
          </HeaderColorProvider>
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
