import React, { useState, useEffect } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Add type for window.dataLayer without global interface conflicts
type DataLayerPushEvent = {
  event: string
  consent: {
    analytics: boolean
    marketing: boolean
  }
}

const COOKIE_VERSION = '1.0.0'
const COOKIE_NAME = 'cookie-consent'

// Define cookie consent data type
type CookieConsentData = {
  analytics: boolean
  marketing: boolean
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState<CookieConsentData | null>(null)

  useEffect(() => {
    // Wait for client-side execution
    const checkConsent = () => {
      const consent = getCookie(COOKIE_NAME)
      const hasValidConsent = consent && JSON.parse(String(consent))?.version === COOKIE_VERSION
      setIsVisible(!hasValidConsent)

      if (hasValidConsent && consent) {
        try {
          const { preferences: savedPreferences } = JSON.parse(String(consent))
          setPreferences(savedPreferences)
        } catch (error) {
          console.error('Error parsing saved cookie consent:', error)
        }
      }
    }

    // Check immediately and then with a small delay to ensure cookies are loaded
    checkConsent()
    const timer = setTimeout(checkConsent, 500)

    return () => clearTimeout(timer)
  }, [])

  const updateCookieConsent = (newPreferences: CookieConsentData) => {
    const consentData = {
      version: COOKIE_VERSION,
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

  const handleAccept = () => {
    const consentData: CookieConsentData = {
      analytics: true,
      marketing: true,
    }

    updateCookieConsent(consentData)

    // Notify GTM
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'gdprConsentUpdated',
        consent: consentData,
      } as DataLayerPushEvent)
    }

    document.dispatchEvent(new CustomEvent('gdprConsentUpdated'))
    setIsVisible(false)
  }

  const handleDecline = () => {
    const consentData: CookieConsentData = {
      analytics: false,
      marketing: false,
    }

    updateCookieConsent(consentData)

    // Notify GTM
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'gdprConsentUpdated',
        consent: consentData,
      } as DataLayerPushEvent)
    }

    document.dispatchEvent(new CustomEvent('gdprConsentUpdated'))
    setIsVisible(false)
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] border-t border-gray-200 bg-white px-5 py-4 shadow-md transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 md:flex-nowrap">
        <p className="m-0 flex-1 text-sm leading-relaxed text-gray-800">
          We use cookies to enhance your browsing experience, analyze website traffic, and improve
          our services. By clicking &apos;Accept,&apos; you consent to the use of cookies as
          described in our{' '}
          <Link
            href="/data-privacy-policy"
            target="_blank"
            className="text-gray-500 transition-colors hover:text-gray-700 hover:underline sm:text-sm"
          >
            Privacy Policy and Cookie Policy
          </Link>
          .
        </p>
        <div className="flex w-full justify-center gap-3 md:w-auto">
          <Button onClick={handleDecline} variant="outlineDark" size="default">
            Decline
          </Button>
          <Button onClick={handleAccept} variant="primary" size="default">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
