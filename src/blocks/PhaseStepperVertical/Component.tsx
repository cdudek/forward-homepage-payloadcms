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

const PHASE_SHADOW_CLASSES = [
  'shadow-[0_0_4px] shadow-fwd-purple/50',
  'shadow-[0_0_4px] shadow-fwd-lipstick/50',
  'shadow-[0_0_4px] shadow-fwd-red/50',
  'shadow-[0_0_4px] shadow-fwd-coral-red/50',
  'shadow-[0_0_4px] shadow-fwd-orange/50',
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

  // Create opacity transformations for each possible phase
  const opacity1 = useTransform(scrollYProgress, fadeRanges[0] || [0, 0.5, 1], [0, 1, 1])
  const opacity2 = useTransform(scrollYProgress, fadeRanges[1] || [0.2, 0.7, 1], [0, 1, 1])
  const opacity3 = useTransform(scrollYProgress, fadeRanges[2] || [0.4, 0.9, 1], [0, 1, 1])
  const opacity4 = useTransform(scrollYProgress, fadeRanges[3] || [0.6, 1, 1], [0, 1, 1])
  const opacity5 = useTransform(scrollYProgress, fadeRanges[4] || [0.8, 1, 1], [0, 1, 1])

  const phaseOpacities = [opacity1, opacity2, opacity3, opacity4, opacity5]

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
      <div className="relative bg-fwd-black py-32" ref={containerRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
            <div className="prose-sm prose-invert col-span-12 mx-auto max-w-none text-center text-white md:prose-md xl:prose-lg">
              <h2>{title}</h2>
              {description && <p>{description}</p>}
            </div>

            <div className="relative col-span-12 mt-16">
              {/* Vertical line with glow */}
              <div className="absolute -top-8 left-4 h-[calc(100%+2rem)] w-[1px] md:left-1/2 md:-translate-x-1/2">
                {/* Gray background line */}
                <div className="absolute h-full w-full bg-gray-800" />
                {/* Colored gradient progress line */}
                <motion.div
                  className="relative h-full w-full bg-gradient-to-b from-fwd-purple via-fwd-red to-fwd-orange"
                  style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                />
              </div>

              <div className="flex flex-col gap-16 md:gap-32">
                {limitedPhases.map((phase, index) => {
                  const isEven = index % 2 === 0
                  const opacity = phaseOpacities[index]
                  const colorClass = PHASE_COLOR_CLASSES[index] || PHASE_COLOR_CLASSES[0]
                  const shadowClass = PHASE_SHADOW_CLASSES[index] || PHASE_SHADOW_CLASSES[0]

                  return (
                    <div key={index} className={cn('mx-auto w-full md:max-w-none')}>
                      {/* Mobile layout */}
                      <div className="w-full md:hidden">
                        <div className="flex items-center">
                          {/* Circle dot for mobile that sits on the line */}
                          <motion.div
                            className="relative z-10 -ml-1.5 flex h-5 w-5 items-center justify-center bg-fwd-black"
                            style={{ opacity, borderRadius: '50%' }}
                          >
                            {/* Solid colored dot with subtle glow */}
                            <div className={cn('h-3 w-3 rounded-full', colorClass, shadowClass)} />
                          </motion.div>

                          {/* Phase label with gradient border */}
                          <motion.div className="relative ml-5" style={{ opacity }}>
                            <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                              <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                <span className="text-sm text-white">Phase {index + 1}</span>
                              </span>
                            </span>
                          </motion.div>
                        </div>

                        <motion.div
                          className="prose-sm prose-invert mt-3 w-full pl-11"
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

                        {/* Center colored dot that sits directly on the vertical line */}
                        <motion.div
                          className="relative z-20 mx-auto flex h-5 w-5 items-center justify-center self-center bg-fwd-black"
                          style={{ opacity, borderRadius: '50%' }}
                        >
                          {/* Glowing dot that cuts the line */}
                          <div className={cn('h-3 w-3 rounded-full', colorClass, shadowClass)} />
                        </motion.div>

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
