'use client'

import React, { useEffect, useState, useRef } from 'react'
import RichText from '@/components/RichText'
// import { Media } from '@/components/Media'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

// Global timing variables
const FADE_DURATION = 750 // 0.75s fade effect
const MIN_INTERVAL = 3000 // 3 seconds minimum between changes
const MAX_INTERVAL = 6000 // 6 seconds maximum between changes
const POSITIONS_MEMORY = 2 // Remember last 2 positions

// Fixed grid sizes
const GRID_SIZE = 6 // Default grid size for md and up

export type LogoGridBlockProps = {
  title?: string
  header?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  logos?: Logo[]
}

export type Logo = {
  image: MediaType
}

export const LogoGridBlock: React.FC<LogoGridBlockProps> = ({ header, logos = [] }) => {
  const [currentLogos, setCurrentLogos] = useState<Logo[]>(logos.slice(0, GRID_SIZE))
  const [fadingIndex, setFadingIndex] = useState<number | null>(null)
  const unusedLogos = useRef<Logo[]>([...logos.slice(GRID_SIZE)])
  const recentPositions = useRef<number[]>([]) // Track recent positions
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  console.log(logos)

  // Get random time between MIN_INTERVAL and MAX_INTERVAL
  const getRandomInterval = () => {
    return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL
  }

  // Get a valid position that wasn't used in the last N rotations
  const getValidPosition = (maxPosition: number): number => {
    // If we have fewer positions than our memory, just use any position
    if (maxPosition <= POSITIONS_MEMORY) {
      return Math.floor(Math.random() * maxPosition)
    }

    // Get all valid positions (those not in recent memory)
    const validPositions = Array.from({ length: maxPosition }, (_, i) => i).filter(
      (pos) => !recentPositions.current.includes(pos),
    )

    // Pick a random valid position
    return validPositions[Math.floor(Math.random() * validPositions.length)]
  }

  // Track a position in our recent memory
  const trackPosition = (position: number) => {
    recentPositions.current.push(position)
    // Keep only the most recent N positions
    if (recentPositions.current.length > POSITIONS_MEMORY) {
      recentPositions.current.shift()
    }
  }

  // Rotate a single logo
  const rotateLogo = () => {
    // Ensure we have enough logos total
    if (logos.length <= GRID_SIZE) return

    // Replenish unused logos if needed
    if (unusedLogos.current.length === 0) {
      // Get all logos that are not currently displayed
      const displayed = currentLogos.map((logo) => logo.image.id)
      unusedLogos.current = logos.filter((logo) => !displayed.includes(logo.image.id))
    }

    // Only proceed if we have logos to swap
    if (unusedLogos.current.length > 0) {
      // Get a position that wasn't used recently
      const replaceIndex = getValidPosition(GRID_SIZE)
      trackPosition(replaceIndex)

      // Start fade-out
      setFadingIndex(replaceIndex)

      // After fade completes, swap the logo
      setTimeout(() => {
        // Get a random logo from unused ones
        const randomLogoIndex = Math.floor(Math.random() * unusedLogos.current.length)
        const newLogo = unusedLogos.current[randomLogoIndex]

        // Remove the selected logo from unused
        unusedLogos.current.splice(randomLogoIndex, 1)

        // Add the replaced logo back to unused
        const replacedLogo = currentLogos[replaceIndex]
        unusedLogos.current.push(replacedLogo)

        // Update the current logos
        setCurrentLogos((prevLogos) => {
          const newLogos = [...prevLogos]
          newLogos[replaceIndex] = newLogo
          return newLogos
        })

        // Complete fade-in
        setTimeout(() => {
          setFadingIndex(null)

          // Schedule next rotation
          timeoutRef.current = setTimeout(rotateLogo, getRandomInterval())
        }, FADE_DURATION)
      }, FADE_DURATION)
    }
  }

  useEffect(() => {
    // Don't start rotation if we don't have enough logos
    if (logos.length <= GRID_SIZE) return

    // Initial setup of unused logos
    const initialDisplayed = currentLogos.map((logo) => logo.image.id)
    unusedLogos.current = logos.filter((logo) => !initialDisplayed.includes(logo.image.id))

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Start the rotation immediately
    timeoutRef.current = setTimeout(rotateLogo, 0)

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [logos])

  console.log(JSON.stringify(header, null, 2))

  return (
    <div className="container relative z-10 my-8 md:my-8 lg:my-8">
      <div className="col-span-4 lg:col-span-12">
        {/* <div className="flex flex-col gap-y-4 text-left md:gap-y-8"> */}
        {header && <RichText data={header} enableGutter={false} />}
      </div>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-6 md:gap-8">
        {currentLogos.map((logo, index) => (
          <div
            key={`logo-${logo.image.id || index}`}
            className="flex w-full items-center justify-center rounded bg-white"
            style={{
              opacity: fadingIndex === index ? 0 : 1,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              aspectRatio: '1/1',
            }}
          >
            <div className="flex h-[60%] w-[60%] items-center justify-center">
              <Media
                className="h-auto max-h-full w-auto max-w-full object-contain grayscale"
                resource={logo.image}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
