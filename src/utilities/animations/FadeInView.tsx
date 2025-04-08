import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface FadeInViewProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  offset?: number
  animationStep?: number
  stepDelay?: number
  negativeOffset?: boolean
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  stepDelay = 0.1,
  duration = 0.75,
  offset = 10,
  className,
  animationStep = 1,
  negativeOffset = false,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  const animationDelay = animationStep ? animationStep * stepDelay : delay
  const offsetValue = negativeOffset ? -offset : offset

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: duration,
          delay: animationDelay + delay,
          ease: 'easeOut',
        },
      })
    }
  }, [isInView, controls, delay, duration, animationStep, stepDelay, animationDelay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offsetValue }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  )
}
