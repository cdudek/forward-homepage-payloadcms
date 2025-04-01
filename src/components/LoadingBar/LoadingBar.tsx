'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

export const LoadingBar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  // Handle loading state with callbacks to avoid React scheduling issues
  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const finishLoading = useCallback(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Watch for navigation changes
  useEffect(() => {
    // Create navigation event listeners
    const handleBeforeNav = () => {
      startLoading()
    }

    const handleComplete = () => {
      finishLoading()
    }

    // Setup navigation listeners in a way that doesn't conflict with React
    if (typeof window !== 'undefined') {
      // Watch for navigation events using a safer approach
      window.addEventListener('beforeunload', handleBeforeNav)

      // Add custom events for Next.js route changes
      document.addEventListener('nextjs:route-start', handleBeforeNav)
      document.addEventListener('nextjs:route-end', handleComplete)

      // Create a MutationObserver to detect DOM changes that might indicate navigation
      const observer = new MutationObserver((mutations) => {
        // If title changes or significant DOM changes, it's likely a navigation
        if (mutations.some((m) => m.target.nodeName === 'TITLE' || m.addedNodes.length > 5)) {
          handleComplete()
        }
      })

      observer.observe(document, { childList: true, subtree: true })

      // Handle initial load
      finishLoading()

      return () => {
        window.removeEventListener('beforeunload', handleBeforeNav)
        document.removeEventListener('nextjs:route-start', handleBeforeNav)
        document.removeEventListener('nextjs:route-end', handleComplete)
        observer.disconnect()
      }
    }
  }, [startLoading, finishLoading])

  // Also use URL changes as a backup way to detect navigation
  useEffect(() => {
    // Pathname or search params changed
    finishLoading()
  }, [pathname, finishLoading])

  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-[9999] h-1 transition-transform duration-300',
        isLoading ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Loading bar background with gradient */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-[length:200%_100%]" />

        {/* First animation fragment */}
        <div className="animate-indeterminate1 absolute h-full w-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-[length:200%_100%]" />

        {/* Second animation fragment with delay */}
        <div
          className="animate-indeterminate2 absolute h-full w-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-[length:200%_100%]"
          style={{ animationDelay: '0.5s' }}
        />
      </div>
    </div>
  )
}

export default LoadingBar
