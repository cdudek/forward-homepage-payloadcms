'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Function to emit route change events
    const emitRouteChangeStart = () => {
      document.dispatchEvent(new Event('nextjs:route-start'))
    }

    const emitRouteChangeEnd = () => {
      document.dispatchEvent(new Event('nextjs:route-end'))
    }

    // Listen for client-side navigations
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if this is a link click that will trigger navigation
      const link = target.closest('a')
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.hasAttribute('target') &&
        !link.hasAttribute('download')
      ) {
        emitRouteChangeStart()
      }
    }

    // Listen for navigation via clicks
    document.addEventListener('click', handleClick)

    // Emit an end event for the initial navigation
    emitRouteChangeEnd()

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Emit route change end event when pathname or search params change
  useEffect(() => {
    document.dispatchEvent(new Event('nextjs:route-end'))
  }, [pathname, searchParams])

  return null
}

export default NavigationEvents
