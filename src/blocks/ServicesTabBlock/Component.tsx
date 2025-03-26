'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const formattedTitle = renderedTitle(title || '', gradientText || '')
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [previousServiceIndex, setPreviousServiceIndex] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isAutoProgressing, setIsAutoProgressing] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const progressDuration = 4000
  const transitionDuration = 400

  const servicesData =
    services?.filter((service): service is Service => typeof service === 'object') || []

  // Auto-scroll to active tab
  useEffect(() => {
    if (buttonRefs.current[activeServiceIndex]) {
      buttonRefs.current[activeServiceIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeServiceIndex])

  // Track previous index for animations
  useEffect(() => {
    if (activeServiceIndex !== previousServiceIndex) {
      setPreviousServiceIndex(activeServiceIndex)
    }
  }, [activeServiceIndex, previousServiceIndex])

  // Animation timer using requestAnimationFrame for smooth progress
  const runProgressAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const startTime = performance.now()
    lastUpdateTimeRef.current = startTime

    const animate = (currentTime: number) => {
      // Pause progression if hovering or auto-progress is disabled
      if (!isAutoProgressing || isHovering) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const elapsedTime = currentTime - lastUpdateTimeRef.current
      const progress = Math.min((elapsedTime / progressDuration) * 100, 100)
      setProgressWidth(progress)

      if (progress >= 100) {
        // Complete the animation to 100% first
        setProgressWidth(100)

        // Prepare for transition
        setIsTransitioning(true)

        // Schedule the next tab after transition duration
        setTimeout(() => {
          setActiveServiceIndex((prevIndex) => (prevIndex + 1) % servicesData.length)
          setProgressWidth(0)
          setIsTransitioning(false)
          lastUpdateTimeRef.current = performance.now()
        }, transitionDuration)

        // Pause progress during transition
        setIsAutoProgressing(false)
        setTimeout(() => {
          setIsAutoProgressing(true)
        }, transitionDuration + 100)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [isAutoProgressing, isHovering, progressDuration, servicesData.length, transitionDuration])

  // Start/restart animation on component mount and after dependencies change
  useEffect(() => {
    if (servicesData.length > 1) {
      runProgressAnimation()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [runProgressAnimation, servicesData.length])

  // Handle tab click
  const handleTabClick = useCallback(
    (index: number) => {
      if (index === activeServiceIndex) return

      // If clicking a new tab, reset progress and animate to that tab
      setPreviousServiceIndex(activeServiceIndex)
      setActiveServiceIndex(index)
      setProgressWidth(0)
      lastUpdateTimeRef.current = performance.now()

      // Reset the auto progress
      setIsAutoProgressing(true)
      setIsTransitioning(false)
    },
    [activeServiceIndex],
  )

  // Mouse enter/leave handlers to pause/resume progression
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

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

  // Define a consistent spring transition
  const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 15,
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
        <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
          <h2>{formattedTitle}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {/* Tabs */}
        <div className="relative col-span-12">
          <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="mx-auto flex gap-2 sm:gap-4">
              {servicesData.map((service, index) => {
                const isActive = activeServiceIndex === index
                const colorName = colors[index]

                return (
                  <div key={service.id} className="relative shrink-0">
                    {/* Hover background for inactive tabs */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-3xl border-2 border-fwd-grey-50 transition-colors duration-200 group-hover:bg-white" />
                    )}

                    <motion.button
                      ref={(el) => {
                        if (el) buttonRefs.current[index] = el
                      }}
                      className={cn(
                        'group relative z-0 whitespace-nowrap rounded-3xl px-3 py-2 text-sm font-medium sm:px-6 sm:py-3 sm:text-base',
                        isActive
                          ? 'text-white'
                          : 'border-2 border-fwd-grey-100 bg-fwd-white text-fwd-grey-800 hover:bg-fwd-grey-100',
                      )}
                      style={{
                        backgroundColor: isActive ? `var(--color-${colorName})` : undefined,
                        borderColor: isActive ? `var(--color-${colorName})` : undefined,
                      }}
                      onClick={() => handleTabClick(index)}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={springTransition}
                    >
                      {service.titleShort}
                    </motion.button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="col-span-12 mt-4 grid grid-cols-1 gap-4 rounded-3xl border-2 border-fwd-grey-100 p-4 sm:mt-6 sm:gap-8 sm:p-8 md:grid-cols-5">
          <AnimatePresence mode="wait">
            {activeService && (
              <motion.div
                key={activeService.id}
                className="col-span-1 flex flex-col justify-center md:col-span-3"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="prose prose-sm md:prose-base lg:prose-lg">
                  <h3 className="mb-2 sm:mb-4">{activeService.header || activeService.title}</h3>
                  <p className="text-gray-800">{activeService.descriptionShort}</p>

                  {/* Features/USPs list */}
                  {activeService.usps && activeService.usps.length > 0 && (
                    <ul className="mt-4 space-y-2 sm:space-y-4">
                      {activeService.usps.map((usp, i) => (
                        <motion.li
                          key={`usp-${i}`}
                          className="flex items-start"
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
                          <span className="mr-2 mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center text-gray-800 sm:mr-3 sm:h-5 sm:w-5">
                            <svg
                              className="h-4 w-4 sm:h-5 sm:w-5"
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
                          <span className="flex-1 text-sm sm:text-base">{usp.usp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Service image */}
          <div className="col-span-1 mt-6 md:col-span-2 md:mt-0">
            <div className="relative aspect-square w-full">
              <AnimatePresence mode="sync">
                {activeService && activeService.image && (
                  <motion.div
                    key={activeService.id}
                    className="absolute inset-0 h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl">
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

        {/* Progress Indicators */}
        <div className="col-span-12 flex justify-center space-x-3">
          {servicesData.map((_, index) => {
            const isActive = activeServiceIndex === index
            const isPrevious = previousServiceIndex === index && isTransitioning
            const colorName = colors[index]

            return (
              <div
                key={`progress-${index}`}
                className={cn(
                  'relative h-1.5 w-16 cursor-pointer overflow-hidden rounded-full transition-all duration-1000',
                  isActive ? `bg-fwd-grey-300` : `bg-fwd-grey-200`,
                )}
                onClick={() => handleTabClick(index)}
              >
                {/* Active progress bar */}
                {isActive && !isTransitioning && (
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full rounded-full"
                    style={{
                      backgroundColor: `var(--color-${colorName})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                )}

                {/* Transition animation for previous tab */}
                {isPrevious && (
                  <motion.div
                    className="absolute inset-0 h-full w-full rounded-full"
                    style={{
                      backgroundColor: `var(--color-${colorName})`,
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: transitionDuration / 1000, ease: 'easeOut' }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesTabBlock
