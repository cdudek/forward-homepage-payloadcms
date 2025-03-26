'use client'
import { cn } from '@/utilities/ui'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Phase = {
  title: string
  description: string
}

type PhaseStepperVerticalProps = {
  title: string
  description?: string
  phases: Phase[]
}

const PHASE_COLOR_CLASSES = [
  'bg-fwd-purple',
  'bg-fwd-lipstick',
  'bg-fwd-red',
  'bg-fwd-coral-red',
  'bg-fwd-orange',
]

export const PhaseStepperVertical: React.FC<PhaseStepperVerticalProps> = ({
  title,
  description,
  phases,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Limit to 5 phases
  const limitedPhases = phases.slice(0, 5)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Pre-calculate fade ranges for each phase with much larger fading windows
  const fadeRanges = limitedPhases.map((_, index) => {
    const sectionCount = limitedPhases.length
    const sectionSize = 1 / sectionCount

    // Start fading earlier and continue longer - fade over 70% of the section
    const fadeStart = index * sectionSize
    const fadeEnd = fadeStart + sectionSize * 0.7

    return [fadeStart, fadeEnd, 1]
  })

  // Create opacity transformations for each possible phase - starting at 0.01 (1%) instead of 0
  const opacity1 = useTransform(scrollYProgress, fadeRanges[0] || [0, 0.5, 1], [0.01, 1, 1])
  const opacity2 = useTransform(scrollYProgress, fadeRanges[1] || [0.2, 0.7, 1], [0.01, 1, 1])
  const opacity3 = useTransform(scrollYProgress, fadeRanges[2] || [0.4, 0.9, 1], [0.01, 1, 1])
  const opacity4 = useTransform(scrollYProgress, fadeRanges[3] || [0.6, 1, 1], [0.01, 1, 1])
  const opacity5 = useTransform(scrollYProgress, fadeRanges[4] || [0.8, 1, 1], [0.01, 1, 1])

  const phaseOpacities = [opacity1, opacity2, opacity3, opacity4, opacity5]

  // Common glow effect to use for both line and dots
  const glowStyle = '[filter:drop-shadow(0_0_10px_rgba(255,0,130,0.7))]'
  const grayGlowStyle = '[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.4))]'

  return (
    <>
      {/* Top shape */}
      <div className="relative h-[5vw] w-full bg-white">
        <div
          className="absolute inset-x-0 bottom-0 h-full bg-fwd-black"
          style={{ clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)' }}
        />
      </div>

      {/* Main content */}
      <div
        className="relative bg-fwd-black bg-cover bg-center bg-no-repeat py-32"
        ref={containerRef}
        // style={{ backgroundImage: 'url(/bg-phase-stepper.png)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
            <div className="prose-sm prose-invert col-span-12 mx-auto max-w-none text-center text-white md:prose-md xl:prose-lg">
              <h2>{title}</h2>
              {description && <p>{description}</p>}
            </div>

            <div className="relative col-span-12 mt-16">
              <div className="relative">
                {/* Timeline container with the vertical line */}
                <div className="absolute inset-y-0 left-0 flex w-6 -translate-x-1/2 md:left-1/2">
                  {/* Vertical line container for better positioning */}
                  <div className="relative mx-auto w-[2px]">
                    {/* Gray background line */}
                    <div className="absolute -top-8 h-[calc(100%+2rem)] w-full bg-gray-800" />

                    {/* Colored gradient progress line with glow */}
                    <motion.div
                      className={cn(
                        'absolute -top-8 h-[calc(100%+2rem)] w-full bg-gradient-to-b from-fwd-purple via-fwd-red to-fwd-orange',
                        glowStyle,
                      )}
                      style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-16 md:gap-32">
                  {limitedPhases.map((phase, index) => {
                    const isEven = index % 2 === 0
                    const opacity = phaseOpacities[index] || opacity1 // Use opacity1 as fallback
                    const colorClass = PHASE_COLOR_CLASSES[index] || PHASE_COLOR_CLASSES[0]

                    return (
                      <div key={index} className="mx-auto w-full md:max-w-none">
                        {/* Mobile layout */}
                        <div className="relative w-full md:hidden">
                          <div className="flex items-center">
                            {/* Dot container */}
                            <div className="relative flex h-12 w-6 -translate-x-1/2 items-center justify-center">
                              {/* Black cutout circle with inner transparent circle to show line glow */}
                              <div className="absolute h-8 w-8 rounded-full bg-fwd-black">
                                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent" />
                              </div>

                              {/* Gray dot (always visible when colored dot is not) */}
                              <div
                                className={cn(
                                  'absolute z-10 h-3 w-3 rounded-full bg-gray-800',
                                  grayGlowStyle,
                                )}
                                style={{ opacity: 1 - opacity.get() }}
                              />

                              {/* Colored dot with matching glow as the line */}
                              <motion.div className="absolute z-10" style={{ opacity }}>
                                <div
                                  className={cn('h-3 w-3 rounded-full', colorClass, glowStyle)}
                                />
                              </motion.div>
                            </div>

                            {/* Phase label with gradient border */}
                            <motion.div className="ml-4" style={{ opacity }}>
                              <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                                <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                  <span className="text-sm text-white">Phase {index + 1}</span>
                                </span>
                              </span>
                            </motion.div>
                          </div>

                          <motion.div
                            className="prose-sm prose-invert mt-3 pl-10"
                            style={{ opacity }}
                          >
                            <h3 className="text-white">{phase.title}</h3>
                            <p className="text-gray-300">{phase.description}</p>
                          </motion.div>
                        </div>

                        {/* Desktop layout */}
                        <div className="hidden w-full md:grid md:grid-cols-[1fr,auto,1fr] md:items-center md:gap-8">
                          {/* Left content */}
                          <div
                            className={cn(
                              'prose-sm prose-invert w-full md:prose-md xl:prose-lg',
                              isEven ? 'text-right' : 'opacity-0',
                            )}
                          >
                            {isEven && (
                              <motion.div style={{ opacity }} className="w-full">
                                {/* Desktop left phase label */}
                                <div
                                  className={cn('relative mb-4 inline-block', isEven && 'ml-auto')}
                                >
                                  <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                                    <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                      <span className="text-sm text-white">Phase {index + 1}</span>
                                    </span>
                                  </span>
                                </div>
                                <div className="w-full">
                                  <h3 className="text-white">{phase.title}</h3>
                                  <p className="text-gray-300">{phase.description}</p>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Center dot container - proper centered positioning */}
                          <div className="relative flex h-12 items-center justify-center">
                            {/* Black cutout circle with inner transparent circle to show line glow */}
                            <div className="absolute h-8 w-8 rounded-full bg-fwd-black">
                              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent" />
                            </div>

                            {/* Gray dot (always visible when colored dot is not) */}
                            <div
                              className={cn(
                                'absolute z-10 h-3 w-3 rounded-full bg-gray-800',
                                grayGlowStyle,
                              )}
                              style={{ opacity: 1 - opacity.get() }}
                            />

                            {/* Colored dot with matching glow as the line */}
                            <motion.div className="absolute z-10" style={{ opacity }}>
                              <div className={cn('h-3 w-3 rounded-full', colorClass, glowStyle)} />
                            </motion.div>
                          </div>

                          {/* Right content */}
                          <div
                            className={cn(
                              'prose-sm prose-invert w-full md:prose-md xl:prose-lg',
                              !isEven ? '' : 'opacity-0',
                            )}
                          >
                            {!isEven && (
                              <motion.div style={{ opacity }} className="w-full">
                                {/* Desktop right phase label */}
                                <div className="relative mb-4 inline-block">
                                  <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                                    <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                      <span className="text-sm text-white">Phase {index + 1}</span>
                                    </span>
                                  </span>
                                </div>
                                <div className="w-full">
                                  <h3 className="text-white">{phase.title}</h3>
                                  <p className="text-gray-300">{phase.description}</p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom shape */}
      <div className="relative h-[5vw] w-full bg-white">
        <div
          className="absolute inset-x-0 top-0 h-full bg-fwd-black"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)' }}
        />
      </div>
    </>
  )
}

export default PhaseStepperVertical
