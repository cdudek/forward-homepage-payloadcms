import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ParallaxContainerProps {
  children: React.ReactNode
  offset?: number
  className?: string
  negativeOffset?: boolean
  parallaxSpeed?: number
  size?: 'small' | 'medium' | 'large'
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  offset = 50,
  className,
  negativeOffset = false,
  parallaxSpeed = 1,
  size = 'medium',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const offsetValues = {
    small: 25,
    medium: 50,
    large: 100,
  }

  let offsetValue = size ? offsetValues[size] : offset

  if (negativeOffset) {
    offsetValue = -offsetValue
  }

  useEffect(() => {
    const element = ref.current
    const onResize = () => {
      if (element) {
        const rect = element.getBoundingClientRect()
        setElementTop(window.scrollY + rect.top)
        setClientHeight(window.innerHeight)
      }
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Calculate a larger scroll range based on speed
  // Lower speed = longer scrolling distance needed to complete the effect
  const scrollRange = clientHeight / parallaxSpeed

  const y = useSpring(
    useTransform(
      scrollY,
      [elementTop - scrollRange, elementTop + scrollRange],
      [offsetValue, -offsetValue],
    ),
    { mass: 0.1, stiffness: 100, damping: 20 },
  )

  return (
    <motion.div ref={ref} style={{ y }} className={className} initial={{ y: 0 }}>
      {children}
    </motion.div>
  )
}
