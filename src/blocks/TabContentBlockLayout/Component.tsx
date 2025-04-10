'use client'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import type { Media as MediaType } from '@/payload-types'
import renderedTitle from '@/utilities/gradientTitle'
import { getColorBlends } from '@/utilities/getColorBlends'
import { htmlDecode } from '@/utilities/htmlDecode'
import { FadeInView } from '@/utilities/animations/FadeInView'
import { ParallaxContainer } from '@/utilities/animations/ParallaxContainer'

export interface TabBlockItem {
  id: number | string
  itemTabName: string
  itemTitle: string
  itemDescription: string
  itemImage?: MediaType | string | number | null
  itemBullets?: Array<{ id?: string | null; text: string }>
}

export interface TabContentBlockLayoutProps {
  title?: string
  subtitle?: string | null
  gradientText?: string | null
  tabBlockItems: TabBlockItem[]
  useColorBlends?: boolean
  darkMode?: boolean
  // Always use the service version (with carousel on mobile)
}

export const TabContentBlockLayout: React.FC<TabContentBlockLayoutProps> = ({
  title,
  subtitle,
  gradientText,
  tabBlockItems,
  useColorBlends = true,
  darkMode = false,
}) => {
  // Get color blends before component state initialization
  const colors = useColorBlends ? getColorBlends(tabBlockItems?.length || 0, true) : []

  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const formattedTitle = renderedTitle(title || '', gradientText || '')
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [previousItemIndex, setPreviousItemIndex] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isAutoProgressing, setIsAutoProgressing] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [tabsScrollContainer, setTabsScrollContainer] = useState<HTMLDivElement | null>(null)

  const progressDuration = 8000
  const transitionDuration = 400

  const tabItems = useMemo(
    () => tabBlockItems?.filter((item): item is TabBlockItem => typeof item === 'object') || [],
    [tabBlockItems],
  )

  // Check if we have data but no active item
  useEffect(() => {
    if (tabItems.length > 0 && !tabItems[activeItemIndex]) {
      setActiveItemIndex(0)
    }
  }, [tabItems, activeItemIndex])

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Update visible state based on inView
  useEffect(() => {
    setIsVisible(isInView)
  }, [isInView])

  // Auto-scroll to active tab only on mobile and when visible
  useEffect(() => {
    if (isMobile && isVisible) {
      if (tabsScrollContainer) {
        // Account for the extra tab item at the beginning (the last tab)
        // by finding the actual index of the active tab in the DOM
        const actualTabIndex = activeItemIndex + 1 // +1 because first element is the last tab in carousel
        const activeTabElement = tabsScrollContainer.children[actualTabIndex] as HTMLElement

        if (activeTabElement) {
          const scrollLeft =
            activeTabElement.offsetLeft -
            tabsScrollContainer.offsetWidth / 2 +
            activeTabElement.offsetWidth / 2
          tabsScrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [activeItemIndex, isMobile, isVisible, tabsScrollContainer])

  // Track previous index for animations
  useEffect(() => {
    if (activeItemIndex !== previousItemIndex) {
      setPreviousItemIndex(activeItemIndex)
    }
  }, [activeItemIndex, previousItemIndex])

  // Animation timer using setInterval for progress
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (
      !tabItems.length ||
      tabItems.length <= 1 ||
      !isVisible ||
      !isAutoProgressing ||
      isHovering
    ) {
      return
    }

    const startTime = Date.now()
    let lastProgress = 0

    intervalRef.current = setInterval(() => {
      if (!isAutoProgressing || isHovering || !isVisible || isTransitioning) return

      const elapsedTime = Date.now() - startTime
      const newProgress = Math.min((elapsedTime / progressDuration) * 100, 100)

      // Only update if progress changed significantly to avoid too many re-renders
      if (Math.abs(newProgress - lastProgress) > 0.5) {
        setProgressWidth(newProgress)
        lastProgress = newProgress
      }

      if (newProgress >= 100) {
        // Reset timer and progress
        clearInterval(intervalRef.current!)
        intervalRef.current = null

        // Prepare for transition
        setIsTransitioning(true)
        setProgressWidth(100)

        // Schedule the next tab after transition duration
        setTimeout(() => {
          setActiveItemIndex((prevIndex) => (prevIndex + 1) % tabItems.length)
          setProgressWidth(0)
          setIsTransitioning(false)

          // Restart the timer with a slight delay
          setTimeout(() => {
            setIsAutoProgressing(true)
          }, 100)
        }, transitionDuration)
      }
    }, 50) // Update progress every 50ms for smooth animation

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [
    isAutoProgressing,
    isHovering,
    isVisible,
    isTransitioning,
    progressDuration,
    tabItems.length,
    transitionDuration,
  ])

  // Handle tab click
  const handleTabClick = useCallback(
    (index: number) => {
      if (index === activeItemIndex) return

      // If clicking a new tab, reset progress and animate to that tab
      setPreviousItemIndex(activeItemIndex)
      setActiveItemIndex(index)
      setProgressWidth(0)

      // Clear existing interval and reset
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      // Reset the auto progress
      setIsTransitioning(false)
      setIsAutoProgressing(true)
    },
    [activeItemIndex],
  )

  // Mouse enter/leave handlers to pause/resume progression
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  // Add these swipe handlers for tabs and content using react-swipeable instead of motion.drag
  const tabsSwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isMobile) return
      const nextIndex = (activeItemIndex + 1) % tabItems.length
      handleTabClick(nextIndex)
    },
    onSwipedRight: () => {
      if (!isMobile) return
      const prevIndex = (activeItemIndex - 1 + tabItems.length) % tabItems.length
      handleTabClick(prevIndex)
    },
    trackMouse: false,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    delta: 50,
  })

  const contentSwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isMobile) return
      const nextIndex = (activeItemIndex + 1) % tabItems.length
      handleTabClick(nextIndex)
    },
    onSwipedRight: () => {
      if (!isMobile) return
      const prevIndex = (activeItemIndex - 1 + tabItems.length) % tabItems.length
      handleTabClick(prevIndex)
    },
    trackMouse: false,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    delta: 50,
  })

  const activeItem = tabItems[activeItemIndex]

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

  const tabStepStart = subtitle ? 2 : 1

  // Determine the tab color based on darkMode and useColorBlends
  const getTabColor = (index: number, isActive: boolean) => {
    if (useColorBlends) {
      return {
        backgroundColor: isActive ? `var(--color-${colors[index]})` : undefined,
        borderColor: isActive ? `var(--color-${colors[index]})` : undefined,
      }
    } else if (darkMode) {
      return {
        backgroundColor: isActive ? 'var(--color-fwd-black)' : undefined,
        borderColor: isActive ? 'var(--color-fwd-black)' : undefined,
      }
    } else {
      return {
        backgroundColor: isActive ? 'var(--color-fwd-accent)' : undefined,
        borderColor: isActive ? 'var(--color-fwd-accent)' : undefined,
      }
    }
  }

  // Determine progress indicator color
  const getProgressColor = (index: number) => {
    if (useColorBlends) {
      return { backgroundColor: `var(--color-${colors[index]})` }
    } else if (darkMode) {
      return { backgroundColor: 'var(--color-fwd-black)' }
    } else {
      return { backgroundColor: 'var(--color-fwd-accent)' }
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={containerRef} className="mx-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
        {/* Header */}
        <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
          <ParallaxContainer size="title">
            <FadeInView animationStep={1}>
              <h2>{formattedTitle}</h2>
            </FadeInView>
            {subtitle && (
              <FadeInView animationStep={2}>
                <p>{htmlDecode(subtitle)}</p>
              </FadeInView>
            )}
          </ParallaxContainer>
        </div>

        {/* Tabs */}
        <FadeInView animationStep={tabStepStart + 1} className="col-span-12 mx-auto max-w-none">
          <div className="max-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
            <div className="relative col-span-12 mt-4">
              {/* Services style tabs with carousel for mobile */}
              <motion.div className="relative overflow-hidden px-4 sm:px-0" {...tabsSwipeHandlers}>
                {/* Fade effect for edges on mobile */}
                {isMobile && (
                  <>
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[10%] bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[10%] bg-gradient-to-l from-white to-transparent" />
                  </>
                )}
                <div
                  ref={setTabsScrollContainer}
                  className="no-scrollbar flex w-full scroll-px-8 overflow-x-auto md:scroll-px-0 md:justify-center"
                  style={{
                    scrollSnapType: isMobile ? 'x mandatory' : 'none',
                    paddingLeft: isMobile ? '10%' : 0,
                    paddingRight: isMobile ? '10%' : 0,
                  }}
                >
                  {/* Show the last tab first (only on mobile) - for endless scrolling */}
                  {isMobile && tabItems.length > 0 && (
                    <div
                      className="relative flex shrink-0 items-center px-1 md:px-2"
                      style={{
                        scrollSnapAlign: 'center',
                        width: isMobile ? '90%' : 'auto',
                        minWidth: isMobile ? '90%' : '',
                      }}
                    >
                      <motion.button
                        className={cn(
                          'group relative z-0 flex h-10 w-full flex-1 items-center justify-center whitespace-nowrap rounded-3xl px-4 py-2 text-sm font-medium sm:h-12 sm:px-6 sm:py-3 sm:text-base',
                          'border-2 border-fwd-grey-100 bg-fwd-white text-fwd-grey-800 hover:bg-fwd-grey-100',
                        )}
                        onClick={() => handleTabClick(tabItems.length - 1)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        whileHover={{
                          scale: 1.02,
                          opacity: 0.95,
                        }}
                        whileTap={{ scale: 1.01, opacity: 0.9 }}
                        transition={springTransition}
                      >
                        {tabItems[tabItems.length - 1]?.itemTabName || ''}
                      </motion.button>
                    </div>
                  )}

                  {/* Normal tabs */}
                  {tabItems.map((item, index) => {
                    const isActive = activeItemIndex === index
                    const tabColor = getTabColor(index, isActive)

                    return (
                      <div
                        key={item.id}
                        className="relative flex shrink-0 items-center px-1 md:px-2"
                        style={{
                          scrollSnapAlign: 'center',
                          width: isMobile ? '90%' : 'auto',
                        }}
                      >
                        <motion.button
                          ref={(el) => {
                            if (el) buttonRefs.current[index] = el
                          }}
                          className={cn(
                            'group relative z-0 flex h-10 w-full flex-1 items-center justify-center whitespace-nowrap rounded-3xl px-4 py-2 text-sm font-medium sm:h-12 sm:px-6 sm:py-3 sm:text-base',
                            isActive
                              ? 'text-white'
                              : 'border-2 border-fwd-grey-100 bg-fwd-white text-fwd-grey-800 hover:bg-fwd-grey-100',
                          )}
                          style={tabColor}
                          onClick={() => handleTabClick(index)}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          whileHover={{
                            scale: 1.02,
                            opacity: 0.95,
                          }}
                          whileTap={{ scale: 1.01, opacity: 0.9 }}
                          transition={springTransition}
                        >
                          {item.itemTabName}
                        </motion.button>
                      </div>
                    )
                  })}

                  {/* Show the first tab at the end (only on mobile) - for endless scrolling */}
                  {isMobile && tabItems.length > 0 && (
                    <div
                      className="relative flex shrink-0 items-center px-1 md:px-2"
                      style={{
                        scrollSnapAlign: 'center',
                        width: isMobile ? '90%' : 'auto',
                      }}
                    >
                      <motion.button
                        className={cn(
                          'group relative z-0 flex h-10 w-full flex-1 items-center justify-center whitespace-nowrap rounded-3xl px-4 py-2 text-sm font-medium sm:h-12 sm:px-6 sm:py-3 sm:text-base',
                          'border-2 border-fwd-grey-100 bg-fwd-white text-fwd-grey-800 hover:bg-fwd-grey-100',
                        )}
                        onClick={() => handleTabClick(0)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        whileHover={{
                          scale: 1.02,
                          opacity: 0.95,
                        }}
                        whileTap={{ scale: 1.01, opacity: 0.9 }}
                        transition={springTransition}
                      >
                        {tabItems[0]?.itemTabName || ''}
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Content Box - Swipeable on mobile */}
            <motion.div
              className="col-span-12 grid grid-cols-1 gap-4 rounded-3xl border-2 border-fwd-grey-100 p-4 sm:gap-8 sm:p-8 md:grid-cols-5"
              {...contentSwipeHandlers}
            >
              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.div
                    key={activeItem.id}
                    className={`col-span-1 flex flex-col justify-center md:col-span-3`}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="prose prose-sm md:prose-base lg:prose-lg">
                      <h3 className="mb-2 text-center sm:mb-4 md:text-left">
                        {activeItem.itemTitle}
                      </h3>
                      <p className="text-center text-gray-800 md:text-left">
                        {activeItem.itemDescription}
                      </p>

                      {/* Features/USPs list */}
                      {activeItem.itemBullets && activeItem.itemBullets.length > 0 && (
                        <ul className="mt-4 space-y-2 sm:space-y-4">
                          {activeItem.itemBullets.map((bullet, i) => (
                            <motion.li
                              key={`bullet-${i}`}
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
                              <span className="my-auto mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center text-gray-800 sm:mr-3 sm:h-5 sm:w-5">
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
                              <span className="flex-1 text-sm sm:text-base">{bullet.text}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image section */}
              <div className="col-span-1 mt-6 md:col-span-2 md:mt-0">
                <div className="relative aspect-square w-full">
                  <AnimatePresence mode="sync">
                    {activeItem && activeItem.itemImage && (
                      <motion.div
                        key={activeItem.id}
                        className="absolute inset-0 h-full w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                          <Media
                            resource={activeItem.itemImage}
                            fill={true}
                            priority={true}
                            imgClassName="absolute inset-0 h-full w-full object-cover"
                            className="absolute inset-0 h-full w-full"
                            alt={activeItem ? activeItem.itemTitle : ''}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Progress Indicators */}
            <div className="col-span-12 flex justify-center space-x-3">
              {tabItems.map((_, index) => {
                const isActive = activeItemIndex === index
                const isPrevious = previousItemIndex === index && isTransitioning
                const progressColor = getProgressColor(index)

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
                        style={progressColor}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressWidth}%` }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                      />
                    )}

                    {/* Transition animation for previous tab */}
                    {isPrevious && (
                      <motion.div
                        className="absolute inset-0 h-full w-full rounded-full"
                        style={progressColor}
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
        </FadeInView>
      </div>
    </div>
  )
}

export default TabContentBlockLayout
