'use client'
import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { motion, AnimatePresence } from 'framer-motion'
import type { ServicesTabBlock as ServicesTabBlockProps, Service } from '@/payload-types'
import renderedTitle from '@/utilities/gradientTitle'
import { getColorBlends } from '@/utilities/getColorBlends'

// import RichText from '@/components/RichText'

export const ServicesTabBlock: React.FC<ServicesTabBlockProps> = ({
  title,
  subtitle,
  gradientText,
  services,
}) => {
  // Get color blends before component state initialization
  const colors = getColorBlends(services?.length || 0, true)

  const formattedTitle = renderedTitle(title || '', gradientText || '')
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const progressDuration = 4000 // Same for both timers

  const servicesData =
    services?.filter((service): service is Service => typeof service === 'object') || []

  // Single unified timer to handle both progress and rotation
  const runTimer = () => {
    const startTime = performance.now()
    lastUpdateTimeRef.current = startTime

    const animate = (currentTime: number) => {
      if (isHovering) {
        // Store the current time so we can calculate where to resume
        lastUpdateTimeRef.current = currentTime
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const elapsedTime = currentTime - lastUpdateTimeRef.current
      const progress = Math.min((elapsedTime / progressDuration) * 100, 100)
      setProgressWidth(progress)

      if (progress >= 100) {
        // Time to rotate to the next tab
        setActiveServiceIndex((prevIndex) => (prevIndex + 1) % servicesData.length)
        lastUpdateTimeRef.current = currentTime // Reset timer
        setProgressWidth(0)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    // Only setup the timer if we have multiple services
    if (servicesData.length > 1) {
      // Clear any existing animation frame before starting new one
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Reset progress
      setProgressWidth(0)
      lastUpdateTimeRef.current = performance.now()

      // Start the animation loop
      runTimer()
    }

    return () => {
      // Clean up
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current)
        rotationTimeoutRef.current = null
      }
    }
  }, [servicesData.length, activeServiceIndex])

  // Reset progress when manually changing tabs
  useEffect(() => {
    setProgressWidth(0)
    lastUpdateTimeRef.current = performance.now()
  }, [activeServiceIndex])

  const activeService = servicesData[activeServiceIndex]

  // Animation variants
  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        easeInOut: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        easeInOut: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <div className="container">
      <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8">
        <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
          <h2>{formattedTitle}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {/* Tabs */}
        <div className="prose-sm col-span-12 flex flex-wrap justify-center gap-4 md:prose-md xl:prose-lg">
          {servicesData.map((service, index) => {
            const isActive = activeServiceIndex === index

            return (
              <motion.button
                key={service.id}
                className="relative rounded-full px-6 py-3 text-base font-medium"
                style={{
                  backgroundColor: isActive
                    ? `var(--color-${colors[index]})`
                    : 'var(--color-fwd-grey-100)',
                  color: isActive ? 'white' : 'var(--color-fwd-black)',
                  transition: 'background-color 0.3s ease-out, color 0.15s ease-out',
                }}
                onClick={() => setActiveServiceIndex(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{
                  backgroundColor: isActive
                    ? `var(--color-${colors[index]})`
                    : 'var(--color-fwd-grey-200)',
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {service.titleShort}
              </motion.button>
            )
          })}
        </div>

        {/* Content Box */}
        <div className="col-span-12 mt-6 grid grid-cols-5 gap-8 rounded-3xl bg-fwd-grey-50 p-8">
          <AnimatePresence mode="wait">
            {activeService && (
              <motion.div
                key={activeService.id}
                className="prose-sm col-span-5 flex flex-col justify-center md:prose-md xl:prose-lg md:col-span-3"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h3 className="mb-4">{activeService.header || activeService.title}</h3>
                <p className="text-gray-800">{activeService.descriptionShort}</p>

                {/* Features/USPs list */}
                {activeService.usps && activeService.usps.length > 0 && (
                  <ul className="space-y-4">
                    {activeService.usps.map((usp, i) => (
                      <motion.li
                        key={`usp-${i}`}
                        className="flex"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            delay: i * 0.1,
                            easeInOut: [0.4, 0, 0.2, 1],
                          },
                        }}
                      >
                        <span className="mr-3 mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-gray-800">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.823 3.827L18 8.754l-1.057-1.057-6.12 6.442z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="flex-1">{usp.usp}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Service image */}
          <div className="col-span-5 md:col-span-2">
            <div className="relative aspect-square w-full">
              <AnimatePresence mode="sync">
                {activeService && activeService.image && (
                  <motion.div
                    key={activeService.id}
                    className="absolute inset-0 h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-3xl">
                      <Media
                        resource={activeService.image}
                        fill={true}
                        priority={true}
                        imgClassName="object-cover"
                        alt={activeService.title}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress Indicators - Moved below content */}
        <div className="col-span-12 flex justify-center space-x-2">
          {servicesData.map((_, index) => (
            <div
              key={`progress-${index}`}
              className="relative h-1.5 w-16 overflow-hidden rounded-full bg-fwd-grey-100"
              onClick={() => setActiveServiceIndex(index)}
              style={{ cursor: 'pointer' }}
            >
              {/* Active indicator */}
              {index === activeServiceIndex && (
                <motion.div
                  key={`progress-${index}-active`}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    backgroundColor: `var(--color-${colors[index]})`,
                    width: `${progressWidth}%`,
                  }}
                />
              )}

              {/* Completed indicators */}
              {index < activeServiceIndex && (
                <motion.div
                  key={`progress-${index}-completed`}
                  className="absolute left-0 top-0 h-full w-full rounded-full"
                  style={{
                    backgroundColor: `var(--color-${colors[index]})`,
                    opacity: 0.3,
                  }}
                />
              )}

              {/* Previous active indicator (for transition) */}
              {index === (activeServiceIndex - 1 + servicesData.length) % servicesData.length &&
                progressWidth === 0 && (
                  <motion.div
                    key={`progress-${index}-previous`}
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      backgroundColor: `var(--color-${colors[index]})`,
                    }}
                    initial={{ width: '100%', opacity: 1 }}
                    animate={{
                      width: '100%',
                      opacity: 0.5,
                      backgroundColor: [
                        `var(--color-${colors[index]})`,
                        'var(--color-fwd-grey-400)',
                      ],
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesTabBlock
