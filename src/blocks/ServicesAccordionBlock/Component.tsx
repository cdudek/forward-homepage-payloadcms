'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import type { Service, Page, Post } from '@/payload-types'
import { SlopedEdgeWrapper } from '@/components/SlopedEdgeWrapper'
import { getColorBlends } from '@/utilities/getColorBlends'

type Props = {
  services: Service[]
  title: string
  gradient?: string
  link?: {
    type?: 'reference' | 'custom' | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | number | Page | Post
    } | null
    url?: string | null
    label: string
  } | null
  limit?: number
}

// const MotionHeader = motion.h2
const ROTATION_INTERVAL = 3000

export const ServicesAccordionBlock: React.FC<Props> = ({
  services,
  title = '',
  gradient = '',
  link,
  limit = 5,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout>()

  // Sort services by position and limit the number
  const sortedServices = [...services]
    .sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
    .slice(0, limit)

  // Generate colors for each service
  const colors = getColorBlends(sortedServices.length, true)

  // Handle hover with smooth transition to active state
  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index)
    setIsHovered(true) // Ensure timer is stopped when hovering individual elements
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    // Short delay before making it active, but long enough for smooth transition
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index)
    }, 100)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null)
    setIsHovered(false) // Allow timer to restart when not hovering
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  // Auto-rotate every 5 seconds, pause on hover
  useEffect(() => {
    if (isHovered || hoveredIndex !== null) return // Don't set up timer if hovered or hovering an element

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % sortedServices.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(timer)
  }, [sortedServices.length, isHovered, hoveredIndex])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Split title to wrap gradient part if it exists in the title
  const renderTitle = () => {
    if (!gradient) return title

    const parts = title.split(gradient)
    if (parts.length === 1) return title

    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-clip-text text-transparent">
          {gradient}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <div className="py-32">
      <SlopedEdgeWrapper enabled={true} position="both" backgroundTheme="light">
        <div
          ref={containerRef}
          className="container grid min-h-[60vh] grid-cols-1 gap-12 py-24 lg:grid-cols-2"
        >
          {/* Left side - Main display */}
          <div className="sticky top-24 flex items-center">
            <div className="flex flex-col gap-6">
              <div className="prose prose-sm md:prose-base lg:prose-lg">
                <h2 className="m-0 bg-none p-0 text-5xl font-bold leading-tight">
                  {renderTitle()}
                </h2>
              </div>
              <div className="inline-flex">
                {link && <CMSLink {...link} appearance="outline" />}
              </div>
            </div>
          </div>

          {/* Right side - Accordion */}
          <div
            className="flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {sortedServices.map((service, index) => {
                const isActive = index === activeIndex
                const isHovered = hoveredIndex === index
                const colorClass = colors[index]

                return (
                  <motion.div
                    key={service.id}
                    initial={false}
                    animate={
                      isInView
                        ? {
                            backgroundColor:
                              isActive || isHovered
                                ? `var(--color-${colorClass}-50)`
                                : 'transparent',
                            color:
                              isActive || isHovered
                                ? `var(--color-${colorClass})`
                                : 'var(--color-fwd-black)',
                            '--indicator-scale': isActive ? '1' : isHovered ? '0.6' : '0',
                            '--indicator-color':
                              isActive || isHovered ? `var(--color-${colorClass})` : 'transparent',
                          }
                        : {}
                    }
                    onHoverStart={() => handleHoverStart(index)}
                    onHoverEnd={handleHoverEnd}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="group relative cursor-pointer border-b border-gray-200 will-change-transform"
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="relative z-10 flex w-full flex-col gap-2 py-6 pl-6 text-left">
                      <h2 className="text-3xl font-medium transition-colors duration-200 ease-out will-change-transform">
                        {service.title}
                      </h2>
                    </div>

                    {/* Expandable content with smooth animation */}
                    <motion.div
                      initial={false}
                      animate={
                        isInView
                          ? {
                              height: isActive ? 'auto' : 0,
                              opacity: isActive ? 1 : 0,
                              marginBottom: isActive ? '1.5rem' : 0,
                            }
                          : { height: 0, opacity: 0, marginBottom: 0 }
                      }
                      transition={{
                        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        marginBottom: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      }}
                      className="overflow-hidden px-6 will-change-transform"
                    >
                      {service.descriptionShort && (
                        <div className="line-clamp-2 text-sm text-fwd-grey-600">
                          {service.descriptionShort}
                        </div>
                      )}
                    </motion.div>

                    {/* Progress indicator */}
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 transition-all duration-200 ease-out will-change-transform"
                      initial={false}
                      animate={{
                        backgroundColor: isInView ? 'var(--indicator-color)' : 'transparent',
                        scaleY: isActive ? 1 : isHovered ? 0.6 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </SlopedEdgeWrapper>
    </div>
  )
}

export default ServicesAccordionBlock
