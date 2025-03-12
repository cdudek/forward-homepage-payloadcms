/* eslint-disable */
// @ts-nocheck
'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import RichText from '@/components/RichText'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

import { LogoGridBlock as LogoGridBlockProps } from '@/payload-types'

const FADE_DURATION = 1000
const MIN_INTERVAL = 3000
const MAX_INTERVAL = 5000
const GRID_SIZE = 6

export type Logo = {
  image: {
    id: string
  } & MediaType
}

export const LogoGridBlock: React.FC<LogoGridBlockProps> = ({ header, logos = [] }) => {
  const [currentLogos, setCurrentLogos] = useState<Logo[]>(logos.slice(0, GRID_SIZE))
  const queue = useRef<Logo[]>(logos.slice(GRID_SIZE))
  const [fadingIndex, setFadingIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getRandomInterval = () =>
    Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL

  const rotateLogo = useCallback(() => {
    if (logos.length <= GRID_SIZE || queue.current.length === 0) return

    const replaceIndex = Math.floor(Math.random() * currentLogos.length)

    if (!currentLogos[replaceIndex] || !currentLogos[replaceIndex]?.image) {
      return
    }

    setFadingIndex(replaceIndex)

    setTimeout(() => {
      setCurrentLogos((prevLogos) => {
        if (queue.current.length === 0) {
          return prevLogos
        }

        const exitingLogo = prevLogos[replaceIndex]

        // Find a logo from the queue that isn't already displayed
        const currentIds = prevLogos.map((logo) => logo?.image?.id)
        let candidateIndex = 0
        let foundUnique = false

        // Find the first logo in the queue that's not already displayed
        while (candidateIndex < queue.current.length && !foundUnique) {
          const candidate = queue.current[candidateIndex]
          if (!candidate || !candidate.image) {
            candidateIndex++
            continue
          }

          // Check if this logo is already displayed
          if (!currentIds.includes(candidate.image.id)) {
            foundUnique = true
            break
          }
          candidateIndex++
        }

        // If we couldn't find a unique logo, use the first one as fallback
        if (!foundUnique) {
          candidateIndex = 0
        }

        // Get the new logo and remove it from the queue
        const newLogo = queue.current.splice(candidateIndex, 1)[0]

        // Add the exiting logo to the queue
        if (exitingLogo) {
          queue.current.push(exitingLogo)
        }

        if (!newLogo || !newLogo.image) {
          return prevLogos
        }

        const updatedLogos = [...prevLogos]
        updatedLogos[replaceIndex] = newLogo

        // Verify no duplicates in the updated logos
        const updatedIds = updatedLogos.map((logo) => logo?.image?.id)
        const hasDuplicates = updatedIds.some((id, idx) => updatedIds.indexOf(id) !== idx)

        if (hasDuplicates) {
          return prevLogos
        }

        return updatedLogos
      })

      requestAnimationFrame(() => {
        setFadingIndex(null)
      })

      timeoutRef.current = setTimeout(rotateLogo, FADE_DURATION + getRandomInterval())
    }, FADE_DURATION)
  }, [logos])

  useEffect(() => {
    if (!logos || logos.length <= GRID_SIZE) return
    // if (logos.length <= GRID_SIZE) return

    // Ensure initial logos are unique
    const uniqueLogos: Logo[] = []
    const seenIds = new Set<string>()

    // First pass: try to fill with unique logos
    for (const logo of logos) {
      if (uniqueLogos.length >= GRID_SIZE) break

      if (logo?.image?.id && !seenIds.has(logo.image.id)) {
        uniqueLogos.push(logo)
        seenIds.add(logo.image.id)
      }
    }

    // If we don't have enough unique logos, fill with whatever is available
    if (uniqueLogos.length < GRID_SIZE) {
      for (const logo of logos) {
        if (uniqueLogos.length >= GRID_SIZE) break
        uniqueLogos.push(logo)
      }
    }

    setCurrentLogos(uniqueLogos)

    // Set up the queue with remaining logos
    const remainingLogos = logos.filter(
      (logo) => !uniqueLogos.some((uLogo) => uLogo?.image?.id === logo?.image?.id),
    )

    queue.current = remainingLogos.length > 0 ? remainingLogos : logos.slice(0, GRID_SIZE)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(rotateLogo, getRandomInterval())

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [logos, rotateLogo])

  return (
    <div className="container relative z-10 my-4 md:my-4 lg:my-4">
      <div className="col-span-4 lg:col-span-12">
        {header && <RichText data={header} enableGutter={false} />}
      </div>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-6 md:gap-8">
        {currentLogos.map((logo, index) => (
          <div
            key={`logo-${index}-${logo?.image?.id || Math.random().toString(36).substring(7)}`}
            className="relative aspect-square w-full overflow-hidden rounded bg-white"
            style={{
              opacity: fadingIndex === index ? 0 : 1,
              transform: fadingIndex === index ? 'scale(0.95)' : 'scale(1)',
              transition: `opacity ${FADE_DURATION}ms ease-in-out, transform ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            {logo && logo.image && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Media
                  className="max-h-[50%] max-w-[50%] object-contain grayscale sm:max-h-[100%] sm:max-w-[100%] md:max-h-[50%] md:max-w-[50%] 2xl:max-h-[70%] 2xl:max-w-[70%]"
                  resource={logo.image}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
