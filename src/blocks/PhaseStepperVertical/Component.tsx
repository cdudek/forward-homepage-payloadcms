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

const PHASE_COLORS = ['fwd-purple', 'fwd-lipstick', 'fwd-red', 'fwd-coral-red', 'fwd-orange']

export const PhaseStepperVertical: React.FC<PhaseStepperVerticalProps> = ({
  title,
  description,
  phases,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Limit to 5 phases
  const limitedPhases = phases.slice(0, 5)

  // Create individual progress variables for each phase with adjusted timing
  const progress1 = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const progress2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const progress3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const progress4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  const progress5 = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  const phaseProgresses = [progress1, progress2, progress3, progress4, progress5]

  return (
    <div className="relative bg-fwd-black py-24" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full grid-cols-12 gap-x-8 gap-y-8">
          <div className="prose-sm prose-invert col-span-12 mx-auto max-w-none text-center text-white md:prose-md xl:prose-lg">
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>

          <div className="relative col-span-12 mt-16">
            {/* Vertical line with glow */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2">
              <div className="absolute h-full w-full bg-gray-800" />
              <motion.div
                className="relative h-full w-full bg-gradient-to-b from-fwd-purple via-fwd-red to-fwd-orange shadow-[0_0_10px_rgba(255,255,255,0.3)] shadow-fwd-purple"
                style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              />
            </div>

            <div className="flex flex-col gap-32">
              {limitedPhases.map((phase, index) => {
                const isEven = index % 2 === 0
                const color = PHASE_COLORS[index]

                return (
                  <motion.div
                    key={index}
                    className={cn(
                      'mx-auto grid max-w-5xl grid-cols-[minmax(0,400px),auto,minmax(0,400px)] items-center gap-8',
                      isEven ? 'text-right' : 'text-left',
                    )}
                    style={{ opacity: phaseProgresses[index] }}
                  >
                    {/* Left content */}
                    {isEven ? (
                      <div className="prose-sm prose-invert pr-8 md:prose-md xl:prose-lg">
                        <div className="ml-auto w-max rounded-3xl border border-fwd-purple px-4 py-2 text-sm text-white">
                          Phase {index + 1}
                        </div>
                        <h3 className="text-white">{phase.title}</h3>
                        <p className="text-gray-300">{phase.description}</p>
                      </div>
                    ) : (
                      <div /> // Empty div for spacing
                    )}

                    {/* Center dot */}
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                      {/* Glow effect */}
                      <div
                        className={cn(
                          'absolute h-full w-full rounded-full opacity-20 blur-sm',
                          index === 0 && 'bg-fwd-purple',
                          index === 1 && 'bg-fwd-lipstick',
                          index === 2 && 'bg-fwd-red',
                          index === 3 && 'bg-fwd-coral-red',
                          index === 4 && 'bg-fwd-orange',
                        )}
                      />
                      {/* Main circle */}
                      <div
                        className={cn(
                          'absolute h-full w-full rounded-full border-[3px] border-fwd-black',
                          index === 0 && 'bg-fwd-purple',
                          index === 1 && 'bg-fwd-lipstick',
                          index === 2 && 'bg-fwd-red',
                          index === 3 && 'bg-fwd-coral-red',
                          index === 4 && 'bg-fwd-orange',
                        )}
                      />
                    </div>

                    {/* Right content */}
                    {!isEven ? (
                      <div className="prose-sm prose-invert pl-8 md:prose-md xl:prose-lg">
                        <div className="mr-auto w-max rounded-3xl border border-fwd-purple px-4 py-2 text-sm text-white">
                          Phase {index + 1}
                        </div>
                        <h3 className="text-white">{phase.title}</h3>
                        <p className="text-gray-300">{phase.description}</p>
                      </div>
                    ) : (
                      <div /> // Empty div for spacing
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhaseStepperVertical
