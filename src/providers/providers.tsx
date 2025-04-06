'use client'

import { AppProgressProvider } from '@bprogress/next'
import { Toaster } from 'sonner'
import { CookieConsent } from './CookieConsent'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgressProvider
      height="4px"
      color="var(--color-fwd-purple)"
      options={{
        showSpinner: false,
        trickleSpeed: 200,
        minimum: 0.3,
        easing: 'ease',
        speed: 500,
      }}
      shallowRouting
    >
      <CookieConsent />
      {children}

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
    </AppProgressProvider>
  )
}
