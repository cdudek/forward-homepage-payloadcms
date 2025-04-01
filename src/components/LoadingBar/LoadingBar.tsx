'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGE_LOADING_EVENT, IMAGE_LOADED_EVENT } from '@/components/Media/ImageMedia'

type LoadingState = {
  isLoading: boolean
  pendingImages: number
  isNavigating: boolean
}

const INITIAL_STATE: LoadingState = {
  isLoading: false,
  pendingImages: 0,
  isNavigating: false,
}

export const LoadingBar = () => {
  const [state, setState] = useState<LoadingState>(INITIAL_STATE)
  const pathname = usePathname()
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const startLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true }))
  }, [])

  const finishLoading = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, isLoading: false }))
    }, 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleImageLoading = useCallback(() => {
    setState((prev) => ({
      ...prev,
      pendingImages: prev.pendingImages + 1,
      isLoading: true,
    }))
  }, [])

  const handleImageLoaded = useCallback(() => {
    setState((prev) => {
      const newCount = prev.pendingImages - 1
      if (newCount <= 0) {
        finishLoading()
        return { ...prev, pendingImages: 0 }
      }
      return { ...prev, pendingImages: newCount }
    })
  }, [finishLoading])

  const handleRouteStart = useCallback(() => {
    setState((prev) => ({ ...prev, isNavigating: true, isLoading: true }))
  }, [])

  const handleRouteEnd = useCallback(() => {
    setState((prev) => ({ ...prev, isNavigating: false }))
    finishLoading()
  }, [finishLoading])

  const handleRouteError = useCallback(() => {
    setState((prev) => ({ ...prev, isNavigating: false }))
    finishLoading()
  }, [finishLoading])

  const handleLinkClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      // Only handle internal links (not external links or links with target="_blank")
      if (link && !link.target && !link.href.startsWith('http')) {
        startLoading()
      }
    },
    [startLoading],
  )

  // Intercept navigation
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeUnload = () => {
      startLoading()
    }

    const handlePopState = () => {
      startLoading()
    }

    const handlePushState = () => {
      startLoading()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('pushstate', handlePushState)

    // Override history methods to catch programmatic navigation
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function (...args) {
      startLoading()
      return originalPushState.apply(this, args)
    }

    window.history.replaceState = function (...args) {
      startLoading()
      return originalReplaceState.apply(this, args)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('pushstate', handlePushState)

      // Restore original history methods
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
    }
  }, [startLoading])

  // Set up event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return

    const cleanup = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    window.addEventListener(IMAGE_LOADING_EVENT, handleImageLoading)
    window.addEventListener(IMAGE_LOADED_EVENT, handleImageLoaded)
    window.addEventListener('nextjs:route-start', handleRouteStart)
    window.addEventListener('nextjs:route-end', handleRouteEnd)
    window.addEventListener('nextjs:route-error', handleRouteError)
    document.addEventListener('click', handleLinkClick)

    // Handle initial load
    finishLoading()

    return () => {
      window.removeEventListener(IMAGE_LOADING_EVENT, handleImageLoading)
      window.removeEventListener(IMAGE_LOADED_EVENT, handleImageLoaded)
      window.removeEventListener('nextjs:route-start', handleRouteStart)
      window.removeEventListener('nextjs:route-end', handleRouteEnd)
      window.removeEventListener('nextjs:route-error', handleRouteError)
      document.removeEventListener('click', handleLinkClick)
      cleanup()
    }
  }, [
    handleImageLoading,
    handleImageLoaded,
    handleRouteStart,
    handleRouteEnd,
    handleRouteError,
    handleLinkClick,
    finishLoading,
  ])

  // Handle route changes
  useEffect(() => {
    startLoading()
    return finishLoading
  }, [pathname, startLoading, finishLoading])

  return (
    <AnimatePresence>
      {state.isLoading && (
        <motion.div
          initial={{ y: -4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -4, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed left-0 right-0 top-0 z-[9999] h-1"
        >
          <div className="relative h-full w-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
              }}
              style={{ backgroundSize: '200% 100%' }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{
                x: '100%',
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.5, 1],
              }}
              style={{ backgroundSize: '200% 100%', filter: 'blur(1px)' }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingBar
