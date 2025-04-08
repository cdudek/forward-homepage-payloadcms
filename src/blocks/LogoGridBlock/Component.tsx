/* eslint-disable */
// @ts-nocheck
'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { LogoGridBlock as LogoGridBlockProps } from '@/payload-types'
import { htmlDecode } from '@/utilities/htmlDecode'
import { FadeInView } from '@/utilities/animations/FadeInView'

const GRID_SIZE = 6
const MIN_INTERVAL = 3000
const MAX_INTERVAL = 5000

const SLOT_SEQUENCE = [3, 1, 5, 2, 0, 4]

export type Logo = {
  image: {
    id: string
  } & MediaType
}

export const LogoGridBlock: React.FC<LogoGridBlockProps> = ({ title, logos = [] }) => {
  const [displayedLogos, setDisplayedLogos] = useState<Logo[]>([])
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0)
  const logoQueue = useRef<Logo[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const startStep = 2

  const getRandomInterval = () =>
    Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL

  // Initialize logos
  useEffect(() => {
    if (!logos.length) return
    if (logos.length < GRID_SIZE) {
      console.warn('Not enough unique logos provided. Need at least', GRID_SIZE)
      return
    }

    // Take first GRID_SIZE unique logos for display
    const initialLogos: Logo[] = []
    const usedIds = new Set<string>()
    let index = 0

    while (initialLogos.length < GRID_SIZE && index < logos.length) {
      const logo = logos[index]
      if (!usedIds.has(logo?.image?.id)) {
        initialLogos.push(logo)
        usedIds.add(logo?.image?.id)
      }
      index++
    }

    // Initialize queue with remaining logos
    const remainingLogos = logos.filter((logo) => !usedIds.has(logo?.image?.id))
    logoQueue.current = [...remainingLogos]

    setDisplayedLogos(initialLogos)
  }, [logos])

  // Rotate logos one at a time through the fixed sequence
  useEffect(() => {
    if (!logos.length || displayedLogos.length < GRID_SIZE || !isInView) return

    const rotateNextLogo = () => {
      const nextSlotIndex = (currentSlotIndex + 1) % SLOT_SEQUENCE.length
      const slotToUpdate = SLOT_SEQUENCE[currentSlotIndex]

      setDisplayedLogos((prev) => {
        const newLogos = [...prev]
        const removedLogo = newLogos[slotToUpdate]

        // Get next logo from queue
        let nextLogo: Logo | undefined
        let attempts = 0
        const maxAttempts = logoQueue.current.length + 1 // Prevent infinite loop

        while (attempts < maxAttempts) {
          if (logoQueue.current.length === 0) {
            // If queue is empty, reset it with all logos except currently displayed ones
            const currentIds = new Set(prev.map((logo) => logo?.image?.id))
            logoQueue.current = logos.filter((logo) => !currentIds.has(logo?.image?.id))
          }

          nextLogo = logoQueue.current.shift()
          if (!nextLogo) break

          // Check if this logo is already displayed
          const isAlreadyDisplayed = newLogos.some((l) => l?.image?.id === nextLogo?.image?.id)
          if (!isAlreadyDisplayed) {
            break
          }

          // If already displayed, put it back in queue and try next one
          logoQueue.current.push(nextLogo)
          attempts++
        }

        // If we couldn't find a unique logo after all attempts, keep the current one
        if (attempts >= maxAttempts || !nextLogo) {
          return prev
        }

        // Update the slot with new logo
        newLogos[slotToUpdate] = nextLogo
        if (removedLogo) {
          logoQueue.current.push(removedLogo)
        }

        return newLogos
      })

      setCurrentSlotIndex(nextSlotIndex)

      // Clear existing timeout before setting new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(rotateNextLogo, getRandomInterval())
    }

    timeoutRef.current = setTimeout(rotateNextLogo, getRandomInterval())
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [logos, currentSlotIndex, displayedLogos, isInView])

  return (
    <div className="container relative z-10 my-6" ref={containerRef}>
      <div className="prose-sm col-span-12 text-center md:prose-md xl:prose-lg">
        {title && (
          <FadeInView animationStep={startStep + 1}>
            <h6 className="text-fwd-grey-600">{htmlDecode(title)}</h6>
          </FadeInView>
        )}
      </div>
      <FadeInView animationStep={startStep + 2}>
        <div className="relative grid grid-cols-3 gap-1 md:grid-cols-6 md:gap-5 md:gap-8">
          {Array.from({ length: GRID_SIZE }).map((_, index) => (
            <AnimatePresence mode="wait" key={`container-${index}`}>
              <FadeInView animationStep={startStep + index + 3} key={`logo-fade-${index}`}>
                <motion.div
                  key={`logo-${displayedLogos[index]?.image?.id || index}-${index}`}
                  className="relative aspect-square w-full overflow-hidden rounded bg-white will-change-transform"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    filter: 'blur(10px)',
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          filter: 'blur(0px)',
                        }
                      : {
                          opacity: 0,
                          scale: 0.9,
                          filter: 'blur(10px)',
                        }
                  }
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    filter: 'blur(10px)',
                  }}
                  whileHover={
                    isInView
                      ? {
                          scale: 1.05,
                          transition: {
                            duration: 0.2,
                            ease: 'easeOut',
                          },
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                >
                  {displayedLogos[index]?.image ? (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Media
                        className="max-h-[90%] max-w-[90%] object-contain grayscale transition-all duration-300 hover:grayscale-0 md:max-h-[50%] md:max-w-[50%] 2xl:max-h-[70%] 2xl:max-w-[70%]"
                        resource={displayedLogos[index].image}
                        priority={true}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
                    </div>
                  )}
                </motion.div>
              </FadeInView>
            </AnimatePresence>
          ))}
        </div>
      </FadeInView>
    </div>
  )
}
