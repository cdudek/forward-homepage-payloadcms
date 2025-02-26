'use client'

import React, { useEffect, useState, useRef } from 'react'
import RichText from '@/components/RichText'

import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

const FADE_DURATION = 750
const MIN_INTERVAL = 3000
const MAX_INTERVAL = 6000
const POSITIONS_MEMORY = 2

const GRID_SIZE = 6

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
  const recentPositions = useRef<number[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getRandomInterval = () => {
    return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL
  }

  const getValidPosition = (maxPosition: number): number => {
    if (maxPosition <= POSITIONS_MEMORY) {
      return Math.floor(Math.random() * maxPosition)
    }

    const validPositions = Array.from({ length: maxPosition }, (_, i) => i).filter(
      (pos) => !recentPositions.current.includes(pos),
    )

    if (validPositions.length === 0) {
      return Math.floor(Math.random() * maxPosition)
    }

    const randomIndex = Math.floor(Math.random() * validPositions.length)

    return validPositions[randomIndex]!
  }

  const trackPosition = (position: number) => {
    recentPositions.current.push(position)

    if (recentPositions.current.length > POSITIONS_MEMORY) {
      recentPositions.current.shift()
    }
  }

  const rotateLogo = () => {
    if (logos.length <= GRID_SIZE) return

    if (unusedLogos.current.length === 0) {
      const displayed = currentLogos.map((logo) => logo.image.id)
      unusedLogos.current = logos.filter((logo) => !displayed.includes(logo.image.id))
    }

    if (unusedLogos.current.length > 0) {
      const replaceIndex = getValidPosition(GRID_SIZE)

      if (replaceIndex < 0 || replaceIndex >= currentLogos.length) {
        console.error(
          'Invalid replaceIndex:',
          replaceIndex,
          'currentLogos length:',
          currentLogos.length,
        )
        return
      }

      trackPosition(replaceIndex)

      setFadingIndex(replaceIndex)

      setTimeout(() => {
        const randomLogoIndex = Math.floor(Math.random() * unusedLogos.current.length)
        const newLogo = unusedLogos.current[randomLogoIndex]

        unusedLogos.current.splice(randomLogoIndex, 1)

        const replacedLogo = currentLogos[replaceIndex]

        if (replacedLogo) {
          unusedLogos.current.push(replacedLogo)
        }

        setCurrentLogos((prevLogos) => {
          const newLogos = [...prevLogos]
          if (newLogo) {
            newLogos[replaceIndex] = newLogo
          }
          return newLogos
        })

        setTimeout(() => {
          setFadingIndex(null)

          timeoutRef.current = setTimeout(rotateLogo, getRandomInterval())
        }, FADE_DURATION)
      }, FADE_DURATION)
    }
  }

  useEffect(() => {
    if (logos.length <= GRID_SIZE) return

    const initialDisplayed = currentLogos.map((logo) => logo.image.id)
    unusedLogos.current = logos.filter((logo) => !initialDisplayed.includes(logo.image.id))

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(rotateLogo, 0)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [logos])

  return (
    <div className="container relative z-10 my-8 md:my-8 lg:my-8">
      <div className="col-span-4 lg:col-span-12">
        {header && <RichText data={header} enableGutter={false} />}
      </div>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-6 md:gap-8">
        {currentLogos.map((logo, index) => (
          <div
            key={`logo-${index}-${logo.image.id || 'unknown'}`}
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
