'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { CaseStudyBlock as CaseStudyBlockType, CaseStudy } from '@/payload-types'
import { renderedTitle } from '@/utilities/gradientTitle'

// Supporting case study card component
const SupportingCaseStudyCard: React.FC<{
  study: CaseStudy
  index: number
  onClick: (index: number) => void
  variants: any
}> = ({ study, index, onClick, variants }) => {
  if (!study) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`supporting-${index}`}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => onClick(index)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.01 }}
        className={cn(
          'grid cursor-pointer grid-rows-[auto_1fr_auto] overflow-hidden rounded-3xl border',
          'border-gray-400 bg-white p-6 transition-colors hover:border-gray-500 hover:bg-gray-50/50 active:bg-gray-50',
          'shadow-[0_1px_1px_rgba(0,0,0,0.1)]',
          'hover:shadow-[0_2px_2px_rgba(0,0,0,0.1)]',
          'group-hover:shadow-[0_5px_5px_rgba(255,0,130,0.25)]',
          'transition-shadow duration-300',
          'will-change-transform',
          'h-full',
        )}
      >
        {/* Logo with fixed height/width container */}
        {study.logo && (
          <div className="not-prose relative my-4 flex h-8 w-32 items-center justify-start overflow-hidden">
            <Media
              resource={study.logo}
              className="flex max-h-full max-w-full justify-start object-contain opacity-80 grayscale"
              imgClassName="max-h-8 max-w-32 object-left object-contain"
            />
          </div>
        )}

        {/* Quote only - larger, darker text */}
        {study.testimonial?.quoteText && (
          <div className="case-study-quote prose line-clamp-4 flex h-full items-center text-base font-medium text-gray-800 md:text-xl">
            {study.testimonial.quoteText}
          </div>
        )}

        {/* "Read how" link at the bottom */}
        {study.url && (
          <a
            href={study.url}
            className="group mt-auto flex items-center pt-4 text-sm text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Read how</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Create a separate component for the case study display to handle the logic
export const CaseStudyBlock: React.FC<CaseStudyBlockType> = ({
  caseStudies,
  title = 'Case Studies',
  gradientText = '',
  description,
}) => {
  // State for the current active case study
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // Configurable rotation timing in seconds - increased for smoother transitions
  const rotationTimingSeconds = 10
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [progressPercent, setProgressPercent] = useState(0)
  // Fix for initial render - ensure content is visible immediately
  const [isFirstRender, setIsFirstRender] = useState(true)

  const totalCaseStudies = caseStudies?.length || 0

  // Function to advance to the next case study
  const goToNextCaseStudy = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalCaseStudies)
    setProgressPercent(0)
  }, [totalCaseStudies])

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsInView(entry.isIntersecting)
          // Reset progress when component comes into view
          if (entry.isIntersecting) {
            setProgressPercent(0)
          }
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the component is visible
        rootMargin: '50px', // Start loading slightly before it comes into view
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Set isFirstRender to false after component mounts
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  // Set up rotation timer - only when in view
  useEffect(() => {
    // Reset animation when index changes
    setProgressPercent(0)

    // Clear any existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Only start rotation if not paused, in view, and we have multiple case studies
    if (!isPaused && isInView && totalCaseStudies > 1) {
      const interval = 100 // Update progress every 100ms instead of 50ms for better performance
      const totalSteps = (rotationTimingSeconds * 1000) / interval

      progressIntervalRef.current = setInterval(() => {
        setProgressPercent((prev) => {
          const nextValue = prev + 100 / totalSteps

          // Move to next case study when progress reaches 100%
          if (nextValue >= 100) {
            goToNextCaseStudy()
            return 0
          }

          return nextValue
        })
      }, interval)
    }

    // Cleanup function
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [activeIndex, isPaused, totalCaseStudies, rotationTimingSeconds, isInView, goToNextCaseStudy])

  // Get the current active case study
  const activeCaseStudy = caseStudies?.[activeIndex]

  // Handle potential non-populated relationships
  const currentStudy = typeof activeCaseStudy === 'number' ? null : (activeCaseStudy as CaseStudy)
  if (!currentStudy) return null

  // Get the next two case studies for the supporting cards
  const nextIndex = (activeIndex + 1) % totalCaseStudies
  const secondNextIndex = (activeIndex + 2) % totalCaseStudies

  const nextStudy =
    typeof caseStudies?.[nextIndex] === 'number' ? null : (caseStudies?.[nextIndex] as CaseStudy)

  const secondNextStudy =
    typeof caseStudies?.[secondNextIndex] === 'number'
      ? null
      : (caseStudies?.[secondNextIndex] as CaseStudy)

  // Animation variants for the cards - smoother transitions
  const heroCardVariants = {
    initial: isFirstRender ? { opacity: 1 } : { opacity: 0, scale: 1.03 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.6, ease: 'easeInOut' } },
  }

  const supportingCardVariants = {
    initial: isFirstRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.6, ease: 'easeInOut' } },
  }

  // Function to handle clicking on a supporting card
  const handleCardClick = (index: number) => {
    setActiveIndex(index)
    setProgressPercent(0)
  }

  const header = renderedTitle(title || '', gradientText || '')

  return (
    <div
      ref={containerRef}
      className="container mx-auto py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="prose-sm mx-auto pb-8 pt-8 text-center md:prose-md xl:prose-lg">
        <h2>{header}</h2>
        {description && <p className="pb-8">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="col-span-1 h-full md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-${activeIndex}`}
              variants={heroCardVariants}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              exit="exit"
              className="relative h-full w-full will-change-transform"
            >
              {/* Hero Case Study Card */}
              <div className="relative w-full overflow-hidden rounded-3xl md:aspect-[16/10]">
                {currentStudy.testimonial?.background && (
                  <div className="absolute inset-0 z-0 bg-gray-900">
                    <Media
                      resource={currentStudy.testimonial.background}
                      className="h-full w-full object-cover"
                      imgClassName="h-full w-full object-cover"
                      fill
                    />
                  </div>
                )}

                {/* Inner blurry content area that matches screenshot */}
                {/* <div className="prose-sm relative z-10 rounded-3xl bg-white/20 p-6 backdrop-blur-sm md:prose-md xl:prose-lg md:absolute md:inset-8 md:p-8"> */}
                <div className="relative z-10 rounded-3xl bg-white/20 p-6 backdrop-blur-sm md:absolute md:inset-8 md:p-8">
                  <div className="grid grid-rows-[auto_1fr_auto]">
                    {/* Company logo - white color for hero */}
                    {currentStudy.logo && (
                      <div className="not-prose relative my-3 flex h-12 w-32 items-center justify-start overflow-hidden md:my-4 md:h-16">
                        <Media
                          resource={currentStudy.logo}
                          className="flex max-h-full max-w-full justify-start object-contain opacity-80 brightness-0 invert"
                          imgClassName="max-h-full max-w-full object-left object-contain"
                        />
                      </div>
                    )}

                    {/* Quote - properly centered both vertically and horizontally */}
                    <div className="py-6 md:py-8">
                      {currentStudy.testimonial?.quoteText && (
                        <div className="case-study-quote text-lg leading-relaxed text-white md:text-xl lg:text-2xl xl:text-3xl">
                          {currentStudy.testimonial.quoteText}
                        </div>
                      )}
                    </div>

                    {/* Author information - right aligned */}
                    <div className="flex items-end justify-end">
                      <div className="text-right">
                        <div className="case-study-author text-md text-white md:text-lg lg:text-xl">
                          {currentStudy.testimonial?.author || ''}
                        </div>
                        <div className="case-study-position text-md text-white/90 md:text-lg lg:text-xl">
                          {currentStudy.testimonial?.position || ''}
                        </div>
                      </div>
                    </div>

                    {/* Read story link */}
                    {currentStudy.url && (
                      <div className="mt-8">
                        <a
                          href={currentStudy.url}
                          className="group flex items-center text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Read story</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress indicator */}
                {totalCaseStudies > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
                    <div
                      className="h-full bg-white/40 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden h-full md:col-span-2 md:grid md:grid-rows-2 md:gap-6">
          {nextStudy && (
            <SupportingCaseStudyCard
              study={nextStudy}
              index={nextIndex}
              onClick={handleCardClick}
              variants={supportingCardVariants}
            />
          )}

          {secondNextStudy && totalCaseStudies > 2 && (
            <SupportingCaseStudyCard
              study={secondNextStudy}
              index={secondNextIndex}
              onClick={handleCardClick}
              variants={supportingCardVariants}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CaseStudyBlock
