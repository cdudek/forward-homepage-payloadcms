'use client'

import React, { useEffect, useState, useRef } from 'react'
import RichText from '@/components/RichText'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

const FADE_DURATION = 1000
const MIN_INTERVAL = 3000
const MAX_INTERVAL = 5000
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
  const queue = useRef<Logo[]>(logos.slice(GRID_SIZE))
  const [fadingIndex, setFadingIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getRandomInterval = () =>
    Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL

  const rotateLogo = () => {
    if (logos.length <= GRID_SIZE || queue.current.length === 0) return

    const replaceIndex = Math.floor(Math.random() * currentLogos.length)

    console.log('🔄 Rotation Started')
    console.log(
      '📌 Current Logos Before Rotation:',
      currentLogos.map((l) => l?.image?.id || 'null'),
    )
    console.log(
      '📋 Queue Before Rotation:',
      queue.current.map((l) => l?.image?.id || 'null'),
    )

    if (!currentLogos[replaceIndex] || !currentLogos[replaceIndex]?.image) {
      console.error(`❌ Skipping rotation: Invalid logo at index ${replaceIndex}`)
      return
    }

    console.log(
      `🎯 Replacing logo at index: ${replaceIndex} (ID: ${currentLogos[replaceIndex].image.id})`,
    )

    setFadingIndex(replaceIndex)

    setTimeout(() => {
      setCurrentLogos((prevLogos) => {
        if (queue.current.length === 0) {
          console.warn('🚨 Queue is empty, skipping rotation')
          return prevLogos
        }

        const exitingLogo = prevLogos[replaceIndex]
        queue.current.push(exitingLogo)

        const newLogo = queue.current.shift() || null

        if (!newLogo || !newLogo.image) {
          console.error('❌ New logo is null or has no image, skipping update')
          return prevLogos
        }

        console.log('⬆️ New Logo Added:', newLogo.image.id)
        console.log('🔽 Old Logo Moved to Queue:', exitingLogo?.image?.id || 'null')
        console.log(
          '📌 Current Logos After Rotation:',
          [...prevLogos.slice(0, replaceIndex), newLogo, ...prevLogos.slice(replaceIndex + 1)].map(
            (l) => l?.image?.id || 'null',
          ),
        )
        console.log(
          '📋 Queue After Rotation:',
          queue.current.map((l) => l?.image?.id || 'null'),
        )

        const updatedLogos = [...prevLogos]
        updatedLogos[replaceIndex] = newLogo

        return updatedLogos
      })

      requestAnimationFrame(() => {
        setFadingIndex(null)
      })

      timeoutRef.current = setTimeout(rotateLogo, FADE_DURATION + getRandomInterval())
    }, FADE_DURATION)
  }

  useEffect(() => {
    if (logos.length <= GRID_SIZE) return

    queue.current = logos.slice(GRID_SIZE)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(rotateLogo, getRandomInterval())

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
            key={`logo-${index}-${logo.image?.id || 'unknown'}`}
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
                  className="max-h-[70%] max-w-[70%] object-contain grayscale"
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
