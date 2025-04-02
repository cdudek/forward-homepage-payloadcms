'use client'
import { cn } from '@/utilities/ui'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { htmlDecode } from '@/utilities/htmlDecode'

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

  // Pre-calculate the ranges for each phase
  const fadeRanges = limitedPhases.map((_, index) => {
    const sectionCount = limitedPhases.length
    const sectionSize = 1 / sectionCount
    const start = index * sectionSize
    const end = start + sectionSize * 0.7
    return [start, end, 1]
  })

  // Create opacity transformations for each phase
  const opacity1 = useTransform(scrollYProgress, fadeRanges[0] || [0, 0.5, 1], [0.05, 1, 1])
  const opacity2 = useTransform(scrollYProgress, fadeRanges[1] || [0.2, 0.7, 1], [0.05, 1, 1])
  const opacity3 = useTransform(scrollYProgress, fadeRanges[2] || [0.4, 0.9, 1], [0.05, 1, 1])
  const opacity4 = useTransform(scrollYProgress, fadeRanges[3] || [0.6, 1, 1], [0.05, 1, 1])
  const opacity5 = useTransform(scrollYProgress, fadeRanges[4] || [0.8, 1, 1], [0.05, 1, 1])

  // Create inverse opacity transformations for gray dots
  const inverseOpacity1 = useTransform(opacity1, [0.01, 0.5, 1], [0.1, 0.05, 0])
  const inverseOpacity2 = useTransform(opacity2, [0.01, 0.5, 1], [0.1, 0.05, 0])
  const inverseOpacity3 = useTransform(opacity3, [0.01, 0.5, 1], [0.1, 0.05, 0])
  const inverseOpacity4 = useTransform(opacity4, [0.01, 0.5, 1], [0.1, 0.05, 0])
  const inverseOpacity5 = useTransform(opacity5, [0.01, 0.5, 1], [0.1, 0.05, 0])

  const phaseOpacities = [opacity1, opacity2, opacity3, opacity4, opacity5]
  const inversePhaseOpacities = [
    inverseOpacity1,
    inverseOpacity2,
    inverseOpacity3,
    inverseOpacity4,
    inverseOpacity5,
  ]

  // Very subtle glow only for active colored elements
  const subtleGlowStyle = '[filter:drop-shadow(0_0_5px_rgba(255,0,130,0.5))]'

  return (
    <>
      {/* Top shape */}
      <div className="relative h-[5vw] w-full bg-white">
        <div
          className="absolute inset-x-0 bottom-0 h-[calc(100%+1px)] bg-fwd-black"
          style={{ clipPath: 'polygon(0 5vw, 100% 0, 100% 101%, 0 101%)' }}
        />
      </div>

      {/* Main content */}
      <div className="relative bg-fwd-black py-32" ref={containerRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
            <div className="prose-sm prose-invert col-span-12 mx-auto max-w-none text-center text-white md:prose-md xl:prose-lg">
              <h2>{htmlDecode(title)}</h2>
              {description && <p>{htmlDecode(description)}</p>}
            </div>

            <div className="relative col-span-12 mt-16">
              <div className="relative">
                {/* Mobile layout */}
                <div className="relative pl-4 md:hidden">
                  {/* Line on the left */}
                  <div className="absolute left-[15px] top-0 z-0 h-full w-[4px]">
                    {/* Gray background line with low opacity */}
                    <div className="absolute h-full w-full bg-fwd-grey-400 opacity-10" />

                    {/* Colored gradient progress line */}
                    <motion.div
                      className={cn(
                        'absolute h-full w-full bg-gradient-to-b from-fwd-purple via-fwd-red to-fwd-orange',
                        subtleGlowStyle,
                      )}
                      style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                    />
                  </div>

                  <div className="flex flex-col gap-24">
                    {limitedPhases.map((phase, index) => {
                      const opacity = phaseOpacities[index] || opacity1
                      const colorClass = PHASE_COLOR_CLASSES[index] || PHASE_COLOR_CLASSES[0]

                      return (
                        <div key={index} className="relative">
                          {/* Phase label with gradient border */}
                          <div className="mb-4 flex">
                            {/* Dot container with clip-path for line gap */}
                            <div className="absolute left-[1px] z-10 -translate-x-1/2">
                              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-fwd-black bg-clip-padding p-[4px]">
                                {/* Gray dot (visible only when colored dot is not) */}
                                <motion.div
                                  className="absolute z-10 h-4 w-4 rounded-full bg-fwd-grey-400"
                                  style={{
                                    opacity: inversePhaseOpacities[index] || inverseOpacity1,
                                  }}
                                />

                                {/* Colored dot with subtle glow */}
                                <motion.div className="absolute z-20" style={{ opacity }}>
                                  <div
                                    className={cn(
                                      'h-4 w-4 rounded-full',
                                      colorClass,
                                      subtleGlowStyle,
                                    )}
                                  />
                                </motion.div>
                              </div>
                            </div>

                            <div className="ml-8">
                              <motion.div style={{ opacity }}>
                                <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                                  <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                    <span className="text-sm text-white">Phase {index + 1}</span>
                                  </span>
                                </span>
                              </motion.div>
                            </div>
                          </div>

                          <motion.div
                            className="prose-sm prose-invert ml-8 mt-4"
                            style={{ opacity }}
                          >
                            <h3 className="text-white">{phase.title}</h3>
                            <p className="text-gray-300">{phase.description}</p>
                          </motion.div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block">
                  {/* Line in the center */}
                  <div className="absolute left-1/2 top-0 z-0 h-full w-[4px] -translate-x-1/2">
                    {/* Gray background line with low opacity */}
                    <div className="absolute h-full w-full bg-fwd-grey-400 opacity-10" />

                    {/* Colored gradient progress line */}
                    <motion.div
                      className={cn(
                        'absolute h-full w-full bg-gradient-to-b from-fwd-purple via-fwd-red to-fwd-orange',
                        subtleGlowStyle,
                      )}
                      style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                    />
                  </div>

                  <div className="flex flex-col gap-32">
                    {limitedPhases.map((phase, index) => {
                      const isEven = index % 2 === 0
                      const opacity = phaseOpacities[index] || opacity1
                      const colorClass = PHASE_COLOR_CLASSES[index] || PHASE_COLOR_CLASSES[0]

                      return (
                        <div key={index} className="relative">
                          {/* Content */}
                          <div className="grid grid-cols-[1fr,auto,1fr] items-center">
                            {/* Left content */}
                            <div className={isEven ? 'pr-8 text-right' : 'opacity-0'}>
                              {isEven && (
                                <motion.div style={{ opacity }}>
                                  {/* Phase label with gradient border */}
                                  <div className="mb-4 inline-block">
                                    <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                                      <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                        <span className="text-sm text-white">
                                          Phase {index + 1}
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                  <div className="prose-invert prose-md xl:prose-lg">
                                    <h3 className="text-white">{htmlDecode(phase.title)}</h3>
                                    <p className="text-gray-300">{htmlDecode(phase.description)}</p>
                                  </div>
                                </motion.div>
                              )}
                            </div>

                            {/* Center dot with clip-path for line gap */}
                            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-fwd-black bg-clip-padding p-[4px]">
                              {/* Gray dot (always visible when colored dot is not) */}
                              <motion.div
                                className="absolute z-10 h-4 w-4 rounded-full bg-fwd-grey-400"
                                style={{ opacity: inversePhaseOpacities[index] || inverseOpacity1 }}
                              />

                              {/* Colored dot with subtle glow */}
                              <motion.div className="absolute z-20" style={{ opacity }}>
                                <div
                                  className={cn(
                                    'h-4 w-4 rounded-full',
                                    colorClass,
                                    subtleGlowStyle,
                                  )}
                                />
                              </motion.div>
                            </div>

                            {/* Right content */}
                            <div className={!isEven ? 'pl-8' : 'opacity-0'}>
                              {!isEven && (
                                <motion.div style={{ opacity }}>
                                  {/* Phase label with gradient border */}
                                  <div className="mb-4 inline-block">
                                    <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                                      <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                                        <span className="text-sm text-white">
                                          Phase {index + 1}
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                  <div className="prose-invert prose-md xl:prose-lg">
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
      </div>

      {/* Bottom shape with slight negative margin to fix gap */}
      <div className="relative -mt-[2px] h-[5vw] w-full bg-white">
        <div
          className="absolute inset-x-0 top-0 h-[calc(100%+1px)] bg-fwd-black"
          style={{ clipPath: 'polygon(0 -1px, 100% -1px, 100% calc(100% - 5vw), 0 100%)' }}
        />
      </div>
    </>
  )
}

export default PhaseStepperVertical
