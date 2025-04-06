import { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'

const GTM_ID = 'GTM-PM8JR2WL'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GoogleTagManager gtmId={GTM_ID} />
      <Analytics mode="production" />
    </>
  )
}
