'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import type { SingleCaseStudyBlock as SingleCaseStudyBlockType, CaseStudy } from '@/payload-types'
import { renderedTitle } from '@/utilities/gradientTitle'
import { htmlDecode } from '@/utilities/htmlDecode'
import { FadeInView } from '@/utilities/animations/FadeInView'

export const SingleCaseStudyBlock: React.FC<SingleCaseStudyBlockType> = ({
  caseStudies = [],
  title = '',
  gradientText = '',
  description = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const rotateStudy = useCallback(() => {
    const safeCaseStudies = Array.isArray(caseStudies) ? caseStudies : []
    if (safeCaseStudies.length > 1) {
      setActiveIndex((current) => (current + 1) % safeCaseStudies.length)
    }
  }, [caseStudies])

  // Set up rotation timer
  useEffect(() => {
    const timer = setInterval(rotateStudy, 1000000) // Rotate every 10 seconds
    return () => clearInterval(timer)
  }, [rotateStudy])

  // Set isFirstRender to false after component mounts
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const safeCaseStudies = Array.isArray(caseStudies) ? caseStudies : []
  if (!safeCaseStudies.length) return null

  // Get the current case study
  const currentStudy = safeCaseStudies[activeIndex] as CaseStudy

  if (!currentStudy) return null

  // Animation variants for the hero card
  const heroCardVariants = {
    initial: isFirstRender ? { opacity: 1 } : { opacity: 0, scale: 1.03 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.6, ease: 'easeInOut' } },
  }

  const header = renderedTitle(title || '', gradientText || '')

  return (
    <FadeInView animationStep={1}>
      <div className="container my-16 py-16">
        <div className="grid grid-cols-1 gap-8">
          {/* Header Section */}
          {title ||
            (description && (
              <div className="w-full text-left">
                <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">{header}</h2>
                {description && <p className="mt-4 text-xl md:text-2xl">{description}</p>}
              </div>
            ))}

          {/* Case Study Card */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-${activeIndex}`}
                variants={heroCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative mx-auto w-full will-change-transform md:aspect-[16/5]"
              >
                {/* Hero Case Study Card */}
                <div className="relative overflow-hidden rounded-3xl md:absolute md:inset-0">
                  {currentStudy.testimonial?.background && (
                    <div className="absolute inset-0 z-0 h-[110%] overflow-hidden">
                      <div className="relative h-full w-full -translate-y-[10%]">
                        <Media
                          resource={currentStudy.testimonial.background}
                          className="h-full w-full object-cover"
                          fill
                          imgClassName="h-full w-full object-cover"
                          loading="lazy"
                          hasParallax
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 md:bg-none" />
                    </div>
                  )}

                  {/* Inner blurry content area */}
                  <div className="relative z-10 rounded-3xl bg-white/20 p-4 backdrop-blur-md md:absolute md:inset-8 md:p-8">
                    <div className="flex min-h-[300px] flex-col justify-center gap-8 md:h-full md:min-h-0 md:justify-between">
                      {/* Company logo */}
                      {currentStudy.logo && (
                        <div className="flex justify-start">
                          <div className="relative h-8 w-24 md:h-10 md:w-32">
                            <Media
                              resource={currentStudy.logo}
                              className="h-full w-auto object-contain brightness-0 invert"
                              imgClassName="h-full w-auto"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}

                      {/* Quote */}
                      <div className="flex flex-1 items-center">
                        {currentStudy.testimonial?.quoteText && (
                          <div>
                            <div className="text-xl font-extralight text-white md:line-clamp-3 md:text-3xl">
                              {htmlDecode(currentStudy.testimonial?.quoteText || '')}
                            </div>
                            <div className="mt-6 text-right text-lg text-white/70 md:mt-8 md:text-2xl">
                              <div className="font-semibold">
                                {htmlDecode(currentStudy.testimonial?.author || '')}
                              </div>
                              <div className="font-light">
                                {htmlDecode(currentStudy.testimonial?.position || '')}
                                {currentStudy?.companyName &&
                                  `, ${htmlDecode(currentStudy?.companyName)}`}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Read story link */}
                      {currentStudy.url && (
                        <a
                          href={currentStudy.url}
                          className="group flex items-center justify-end text-white"
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
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </FadeInView>
  )
}

export default SingleCaseStudyBlock
