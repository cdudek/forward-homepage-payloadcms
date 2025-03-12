'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { CaseStudyBlock as CaseStudyBlockType, CaseStudy } from '@/payload-types'
// type CompanyName = NonNullable<Props['companyName']>
// type Logo = NonNullable<Props['logo']>
// type Testimonial = NonNullable<Props['testimonials']>[number]
// type Metrics = NonNullable<Props['metrics']>[number]

// type Props = CaseStudyBlockType

// Create a separate component for the case study display to handle the logic
const CaseStudyDisplay: React.FC<{
  caseStudies: (number | CaseStudy)[]
  limit?: number
}> = ({ caseStudies, limit = 10 }) => {
  // State for the current active case study
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  // Configurable rotation timing in seconds - increased for smoother transitions
  const rotationTimingSeconds = 10
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [progressPercent, setProgressPercent] = useState(0)
  // Fix for initial render - ensure content is visible immediately
  const [isFirstRender, setIsFirstRender] = useState(true)

  // Ensure we only display up to the limit
  const displayCaseStudies = caseStudies.slice(0, limit)
  const totalCaseStudies = displayCaseStudies.length

  // Function to advance to the next case study
  const goToNextCaseStudy = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalCaseStudies)
    setProgressPercent(0)
  }

  // Set isFirstRender to false after component mounts
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  // Set up rotation timer
  useEffect(() => {
    // Reset animation when index changes
    setProgressPercent(0)

    // Clear any existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Only start rotation if not paused and we have multiple case studies
    if (!isPaused && totalCaseStudies > 1) {
      const interval = 50 // Update progress every 50ms for smooth progress bar
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
  }, [activeIndex, isPaused, totalCaseStudies, rotationTimingSeconds, goToNextCaseStudy])

  // Get the current active case study
  const activeCaseStudy = displayCaseStudies[activeIndex]

  // Handle potential non-populated relationships
  const currentStudy = typeof activeCaseStudy === 'number' ? null : (activeCaseStudy as CaseStudy)
  if (!currentStudy) return null

  // Get the next two case studies for the supporting cards
  const nextIndex = (activeIndex + 1) % totalCaseStudies
  const secondNextIndex = (activeIndex + 2) % totalCaseStudies

  const nextStudy =
    typeof displayCaseStudies[nextIndex] === 'number'
      ? null
      : (displayCaseStudies[nextIndex] as CaseStudy)

  const secondNextStudy =
    typeof displayCaseStudies[secondNextIndex] === 'number'
      ? null
      : (displayCaseStudies[secondNextIndex] as CaseStudy)

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

  return (
    <div
      className="container mx-auto py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-5 gap-6">
        <div className="relative col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-${activeIndex}`}
              variants={heroCardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative aspect-[16/10] w-full" // Modern aspect ratio
            >
              {/* Hero Case Study Card */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {currentStudy.testimonial?.background && (
                  <div className="absolute inset-0 z-0 bg-gray-900">
                    <Media
                      resource={currentStudy.testimonial.background}
                      className="h-full w-full object-cover"
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Inner blurry content area that matches screenshot */}
                <div className="absolute inset-8 z-10 rounded-3xl bg-white/20 backdrop-blur-sm">
                  <div className="flex h-full flex-col p-8">
                    {/* Company logo - white color for hero */}
                    {currentStudy.logo && (
                      <div className="mb-auto flex h-16 w-40 items-center">
                        <Media
                          resource={currentStudy.logo}
                          className="max-h-full max-w-full object-contain brightness-0 invert"
                        />
                      </div>
                    )}

                    {/* Quote - left aligned */}
                    <div className="my-auto">
                      {currentStudy.testimonial?.quote && (
                        <div className="text-xl font-light text-white md:text-2xl lg:text-3xl">
                          <RichText data={currentStudy.testimonial.quote} enableProse={false} />
                        </div>
                      )}
                    </div>

                    {/* Author information - right aligned */}
                    <div className="mt-auto flex items-end justify-end">
                      <div className="text-right text-white">
                        <div className="font-semibold">
                          - {currentStudy.testimonial?.author || ''}
                        </div>
                        <div className="text-sm text-white/80">
                          {currentStudy.testimonial?.position || ''}
                        </div>
                      </div>
                    </div>

                    {/* Read story link inside blur window near the bottom left */}
                    {currentStudy.url && (
                      <a
                        href={currentStudy.url}
                        className="group absolute bottom-8 left-8 flex items-center text-white"
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

        <div className="col-span-2 flex flex-col gap-6">
          {/* First supporting card - ONLY logo and quote */}
          {nextStudy && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`supporting-1-${nextIndex}`}
                variants={supportingCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={() => handleCardClick(nextIndex)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 cursor-pointer overflow-hidden rounded-3xl border border-gray-400 bg-white p-6 transition-colors hover:border-gray-600 active:bg-gray-50"
              >
                {/* Logo with fixed height/width container */}
                {nextStudy.logo && (
                  <div className="mb-6 flex h-8 w-32 items-center">
                    <Media
                      resource={nextStudy.logo}
                      className="max-h-full max-w-full object-contain opacity-80 grayscale"
                    />
                  </div>
                )}

                {/* Quote only - larger, darker text */}
                {nextStudy.testimonial?.quote && (
                  <div className="line-clamp-4 text-base font-medium text-gray-800 md:text-xl">
                    <RichText data={nextStudy.testimonial.quote} enableProse={false} />
                  </div>
                )}

                {/* "Read how" link at the bottom */}
                {nextStudy.url && (
                  <a
                    href={nextStudy.url}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Second supporting card - ONLY logo and quote */}
          {secondNextStudy && totalCaseStudies > 2 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`supporting-2-${secondNextIndex}`}
                variants={supportingCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={() => handleCardClick(secondNextIndex)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 cursor-pointer overflow-hidden rounded-3xl border border-gray-400 bg-white p-6 transition-colors hover:border-gray-600 active:bg-gray-50"
              >
                {/* Logo with fixed height/width container */}
                {secondNextStudy.logo && (
                  <div className="mb-6 flex h-8 w-32 items-center">
                    <Media
                      resource={secondNextStudy.logo}
                      className="max-h-full max-w-full object-contain opacity-80 grayscale"
                    />
                  </div>
                )}

                {/* Quote only - larger, darker text */}
                {secondNextStudy.testimonial?.quote && (
                  <div className="line-clamp-4 text-base font-medium text-gray-800 md:text-xl">
                    <RichText data={secondNextStudy.testimonial.quote} enableProse={false} />
                  </div>
                )}

                {/* "Read how" link at the bottom */}
                {secondNextStudy.url && (
                  <a
                    href={secondNextStudy.url}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}

// Main component that handles the empty case check
export const CaseStudyBlock: React.FC<CaseStudyBlockType> = ({ caseStudies, limit = 10 }) => {
  // Guard clause for empty case studies
  if (!caseStudies?.length) return null

  return <CaseStudyDisplay caseStudies={caseStudies} limit={limit || 10} />
}

export default CaseStudyBlock
