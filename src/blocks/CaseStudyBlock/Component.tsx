'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import type { CaseStudyBlock as CaseStudyBlockType, CaseStudy } from '@/payload-types'
import { renderedTitle } from '@/utilities/gradientTitle'
import { SupportingCaseStudyCard } from './SupportingCaseStudyCard'
import { FadeInView } from '@/utilities/animations/FadeInView'
import { ParallaxContainer } from '@/utilities/animations/ParallaxContainer'

export const CaseStudyBlock: React.FC<CaseStudyBlockType> = ({
  caseStudies,
  title = 'Case Studies',
  gradientText = '',
  description,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const rotationTimingSeconds = 10
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [progressPercent, setProgressPercent] = useState(0)

  const [isFirstRender, setIsFirstRender] = useState(true)

  const totalCaseStudies = caseStudies?.length || 0

  const goToNextCaseStudy = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalCaseStudies)
    setProgressPercent(0)
  }, [totalCaseStudies])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsInView(entry.isIntersecting)

          if (entry.isIntersecting) {
            setProgressPercent(0)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      },
    )

    const currentRef = containerRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    setProgressPercent(0)

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    if (!isPaused && isInView && totalCaseStudies > 1) {
      const interval = 100
      const totalSteps = (rotationTimingSeconds * 1000) / interval

      progressIntervalRef.current = setInterval(() => {
        setProgressPercent((prev) => {
          const nextValue = prev + 100 / totalSteps

          if (nextValue >= 100) {
            goToNextCaseStudy()
            return 0
          }

          return nextValue
        })
      }, interval)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [activeIndex, isPaused, totalCaseStudies, rotationTimingSeconds, isInView, goToNextCaseStudy])

  const activeCaseStudy = caseStudies?.[activeIndex]

  const currentStudy = typeof activeCaseStudy === 'number' ? null : (activeCaseStudy as CaseStudy)
  if (!currentStudy) return null

  const nextIndex = (activeIndex + 1) % totalCaseStudies
  const secondNextIndex = (activeIndex + 2) % totalCaseStudies

  const nextStudy =
    typeof caseStudies?.[nextIndex] === 'number' ? null : (caseStudies?.[nextIndex] as CaseStudy)

  const secondNextStudy =
    typeof caseStudies?.[secondNextIndex] === 'number'
      ? null
      : (caseStudies?.[secondNextIndex] as CaseStudy)

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

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
    setProgressPercent(0)
  }

  const header = renderedTitle(title || '', gradientText || '')

  return (
    <div
      ref={containerRef}
      className="container mx-auto pb-16 pt-8 md:pb-32 md:pt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="prose-sm mx-auto pb-8 pt-8 text-center md:prose-md xl:prose-lg md:pb-16">
        <ParallaxContainer size="title">
          <FadeInView animationStep={1}>
            <h2>{header}</h2>
          </FadeInView>
          {description && (
            <FadeInView animationStep={2}>
              <p className="">{description}</p>
            </FadeInView>
          )}
        </ParallaxContainer>
      </div>

      <FadeInView animationStep={3}>
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
                    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
                      <div className="relative h-[calc(100%+50px)] w-full -translate-y-[50px]">
                        <Media
                          resource={currentStudy.testimonial.background}
                          className="h-full w-full object-cover"
                          imgClassName="h-full w-full object-cover"
                          fill
                          loading="lazy"
                          hasParallax
                        />
                      </div>
                    </div>
                  )}

                  {/* Inner blurry content area */}
                  <div className="relative z-10 rounded-3xl bg-white/20 p-6 backdrop-blur-sm md:absolute md:inset-8 md:p-8">
                    <div className="grid grid-rows-[auto_1fr_auto]">
                      {/* Company logo - white color for hero */}
                      {currentStudy.logo && (
                        <div className="not-prose relative my-3 flex h-12 w-32 items-center justify-start overflow-hidden md:my-4 md:h-16">
                          <Media
                            resource={currentStudy.logo}
                            className="flex max-h-full max-w-full justify-start object-contain opacity-80 [filter:brightness(0)_invert(1)]"
                            imgClassName="max-h-full max-w-full object-left object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Quote - properly centered both vertically and horizontally */}
                      <div className="py-6 md:py-8">
                        {currentStudy.testimonial?.quoteText && (
                          <div className="case-study-quote text-xl font-extralight text-white md:line-clamp-3 md:text-3xl">
                            {currentStudy.testimonial.quoteText}
                          </div>
                        )}
                      </div>

                      {/* Author information - right aligned */}
                      <div className="flex items-end justify-end">
                        <div className="text-right text-lg text-white/80 md:mt-4 md:text-2xl">
                          {/* <div className="case-study-author text-md text-white md:text-lg lg:text-xl"> */}
                          <div className="case-study-author">
                            {currentStudy.testimonial?.author || ''}
                          </div>
                          <div className="case-study-position">
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

          {/* <div className="hidden h-full md:col-span-2 md:grid md:grid-rows-2 md:gap-6"> */}
          <FadeInView
            animationStep={3}
            className="hidden h-full md:col-span-2 md:grid md:grid-rows-2 md:gap-6"
          >
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
          </FadeInView>
        </div>
      </FadeInView>
      {/* </div> */}
    </div>
  )
}

export default CaseStudyBlock
