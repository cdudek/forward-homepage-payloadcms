'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import type { Service } from '@/payload-types'
import { getColorBlends } from '@/utilities/getColorBlends'
import renderedTitle from '@/utilities/gradientTitle'
import { cn } from '@/utilities/ui'
import { FadeInView } from '@/utilities/animations/FadeInView'

import { ServicesAccordionBlock as ServicesAccordionBlockProps } from '@/payload-types'

type BackgroundTheme = 'default' | 'light' | 'dark'

const ROTATION_INTERVAL = 3000

export const ServicesAccordionBlock: React.FC<ServicesAccordionBlockProps> = ({
  services,
  title = '',
  gradient = '',
  link,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const slope = {
    enabled: true,
    backgroundTheme: 'light' as BackgroundTheme,
  }

  // Filter out numbers and ensure we only work with Service objects
  const servicesData = useMemo(
    () => services?.filter((service): service is Service => typeof service === 'object') || [],
    [services],
  )

  // Memoize colors to prevent regeneration on every render
  const colors = useMemo(() => getColorBlends(servicesData.length, true), [servicesData.length])

  // Memoize animation variants
  const itemVariants = useMemo(
    () => ({
      initial: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    [],
  )

  // Handle hover with smooth transition to active state
  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index)
    setIsHovered(true)
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index)
    }, 100)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null)
    setIsHovered(false)
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  // Memoize the rendered title to prevent unnecessary recalculations
  const formattedTitle = renderedTitle(title || '', gradient || '')

  // Get styles for sloped edgecxx
  const getSlopeStyles = useCallback(() => {
    const styles: Record<string, string> = {}

    if (slope.enabled) {
      styles.clipPath = 'polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)'
    }

    return styles
  }, [slope.enabled])

  // Get background theme class
  const getBackgroundTheme = useCallback(() => {
    const backgroundThemeMap = {
      default: undefined,
      light: 'bg-fwd-grey-50',
      dark: 'bg-fwd-black',
    }
    return slope.backgroundTheme ? backgroundThemeMap[slope.backgroundTheme] : undefined
  }, [slope.backgroundTheme])

  // Auto-rotate with RAF instead of setInterval for better performance
  useEffect(() => {
    if (isHovered || hoveredIndex !== null) return

    let lastTime = performance.now()
    let rafId: number

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= ROTATION_INTERVAL) {
        setActiveIndex((current) => (current + 1) % servicesData.length)
        lastTime = currentTime
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [servicesData.length, isHovered, hoveredIndex])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const AccordionItem = useCallback(
    ({
      service,
      index,
      isActive,
      isHovered,
      colorClass,
    }: {
      service: Service
      index: number
      isActive: boolean
      isHovered: boolean
      colorClass: string
    }) => (
      <motion.div
        key={service.id}
        initial={false}
        variants={itemVariants}
        animate={
          isInView
            ? {
                backgroundColor:
                  isActive || isHovered ? `var(--color-${colorClass}-50)` : 'transparent',
                color:
                  isActive || isHovered ? `var(--color-${colorClass})` : 'var(--color-fwd-black)',
                '--indicator-scale': isActive ? '1' : isHovered ? '0.6' : '0',
                '--indicator-color':
                  isActive || isHovered ? `var(--color-${colorClass})` : 'transparent',
              }
            : {}
        }
        onHoverStart={() => handleHoverStart(index)}
        onHoverEnd={handleHoverEnd}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="group relative cursor-pointer border-b border-gray-200 py-4 will-change-transform"
        onClick={() => setActiveIndex(index)}
      >
        <div className="prose prose-sm relative z-10 flex w-full flex-col gap-2 py-4 pl-6 text-left !font-light md:prose-base lg:prose-lg">
          <h4 className="transition-colors duration-200 ease-out will-change-transform">
            {service.title}
          </h4>
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
            <div className="line-clamp-2 text-sm text-fwd-grey-600">{service.descriptionShort}</div>
          )}
        </motion.div>

        {/* Progress indicator */}
        <div
          className="absolute left-0 top-0 h-full w-1 transition-all duration-200 ease-out will-change-transform"
          style={{
            backgroundColor: 'var(--indicator-color)',
            transform: `scaleY(var(--indicator-scale))`,
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    ),
    [isInView, handleHoverStart, handleHoverEnd, itemVariants],
  )

  return (
    <div className="py-4 md:py-16">
      <div className={cn('relative w-full', getBackgroundTheme())} style={getSlopeStyles()}>
        <div className="container mx-auto">
          <div
            className={cn('w-full', {
              'py-32': slope.enabled,
            })}
          >
            <div
              ref={containerRef}
              className="relative grid grid-cols-1 gap-12 py-8 md:py-24 lg:grid-cols-2"
            >
              {/* Left side - Main display */}
              <div className="flex flex-col justify-center">
                <div className="flex w-full flex-col gap-6 text-center lg:text-left">
                  <div className="prose prose-sm md:prose-base lg:prose-lg">
                    <FadeInView animationStep={1}>
                      <h2 className="m-0 bg-none p-0 leading-tight">{formattedTitle}</h2>
                    </FadeInView>
                  </div>

                  {/* Button - Only visible on desktop */}
                  <FadeInView animationStep={2}>
                    <div className="hidden lg:inline-flex">
                      {link && <CMSLink {...link} appearance="outlineDarkIcon" />}
                    </div>
                  </FadeInView>
                </div>
              </div>

              {/* Right side - Accordion */}
              <div
                className="flex flex-col items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative w-full">
                  {servicesData.map((service, index) => (
                    <FadeInView
                      animationStep={index + 3}
                      key={'service-fade-' + service.id}
                      negativeOffset
                    >
                      <AccordionItem
                        service={service}
                        index={index}
                        isActive={index === activeIndex}
                        isHovered={index === hoveredIndex}
                        colorClass={colors[index] || 'fwd-purple'}
                      />
                    </FadeInView>
                  ))}
                </div>
              </div>

              {/* Button - Third grid row on mobile, hidden on desktop */}
              <div className="flex justify-center lg:hidden">
                {link && <CMSLink {...link} appearance="outlineDarkIcon" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesAccordionBlock
