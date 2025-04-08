import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ParallaxContainerProps {
  children: React.ReactNode
  offset?: number
  className?: string
  negativeOffset?: boolean
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  offset = 50,
  className,
  negativeOffset = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const offsetValue = negativeOffset ? -offset : offset

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

  const y = useSpring(
    useTransform(
      scrollY,
      [elementTop - clientHeight, elementTop + clientHeight],
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
