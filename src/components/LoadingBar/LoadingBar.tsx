'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGE_LOADING_EVENT, IMAGE_LOADED_EVENT } from '@/components/Media/ImageMedia'

export const LoadingBar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pendingImages, setPendingImages] = useState(0)
  const pathname = usePathname()

  // Handle loading state with callbacks to avoid React scheduling issues
  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const finishLoading = useCallback(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Watch for navigation changes using Next.js router events
  useEffect(() => {
    // Create navigation event listeners
    const handleStart = () => {
      startLoading()
    }

    const handleComplete = () => {
      finishLoading()
    }

    const handleError = () => {
      finishLoading()
    }

    // Setup navigation listeners
    if (typeof window !== 'undefined') {
      // Listen for Next.js router events
      window.addEventListener('nextjs:route-start', handleStart)
      window.addEventListener('nextjs:route-end', handleComplete)
      window.addEventListener('nextjs:route-error', handleError)

      // Listen for image loading events
      const handleImageLoading = () => {
        setPendingImages((prev) => prev + 1)
        startLoading()
      }

      const handleImageLoaded = () => {
        setPendingImages((prev) => {
          const newCount = prev - 1
          if (newCount <= 0) {
            finishLoading()
            return 0
          }
          return newCount
        })
      }

      window.addEventListener(IMAGE_LOADING_EVENT, handleImageLoading)
      window.addEventListener(IMAGE_LOADED_EVENT, handleImageLoaded)

      // Handle initial load
      finishLoading()

      return () => {
        window.removeEventListener('nextjs:route-start', handleStart)
        window.removeEventListener('nextjs:route-end', handleComplete)
        window.removeEventListener('nextjs:route-error', handleError)
        window.removeEventListener(IMAGE_LOADING_EVENT, handleImageLoading)
        window.removeEventListener(IMAGE_LOADED_EVENT, handleImageLoaded)
      }
    }
  }, [startLoading, finishLoading])

  // Watch for route changes
  useEffect(() => {
    startLoading()
    const cleanup = finishLoading()
    return () => {
      cleanup()
    }
  }, [pathname, startLoading, finishLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: -4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -4, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth easing
          }}
          className="fixed left-0 right-0 top-0 z-[9999] h-1"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            {/* Background gradient with subtle movement */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: [1, 1.02, 1], // Subtle scale animation
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.5, 1], // Control timing of scale animation
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />

            {/* Animated progress bar with multiple effects */}
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
                ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth easing
                times: [0, 0.5, 1], // Control timing of opacity animation
              }}
              style={{
                backgroundSize: '200% 100%',
                filter: 'blur(1px)', // Subtle blur effect
              }}
            />

            {/* Shimmer effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
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
