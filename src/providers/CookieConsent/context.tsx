import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { setCookie, getCookie } from 'cookies-next'

// Define the cookie consent data type
export type CookieConsentData = {
  analytics: boolean
  marketing: boolean
}

// Define the context type
interface CookieConsentContextType {
  preferences: CookieConsentData | null
  setPreferences: (preferences: CookieConsentData | null) => void
  updateCookieConsent: (newPreferences: CookieConsentData, version: string) => void
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  preferences: null,
  setPreferences: () => {},
  updateCookieConsent: () => {},
})

const COOKIE_NAME = 'cookie-consent'

interface CookieConsentProviderProps {
  children: ReactNode
}

export const CookieConsentProvider = ({ children }: CookieConsentProviderProps) => {
  const [preferences, setPreferences] = useState<CookieConsentData | null>(null)

  const updateCookieConsent = (newPreferences: CookieConsentData, version: string) => {
    const consentData = {
      version,
      date: new Date().toISOString(),
      preferences: newPreferences,
    }

    setCookie(COOKIE_NAME, JSON.stringify(consentData), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    setPreferences(newPreferences)
  }

  useEffect(() => {
    const savedConsent = getCookie(COOKIE_NAME)
    if (savedConsent) {
      try {
        const { preferences: savedPreferences } = JSON.parse(String(savedConsent))
        setPreferences(savedPreferences)
      } catch (error) {
        console.error('Error parsing saved cookie consent:', error)
      }
    }
  }, [])

  return (
    <CookieConsentContext.Provider value={{ preferences, setPreferences, updateCookieConsent }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => useContext(CookieConsentContext)
