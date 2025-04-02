import React, { useEffect, useRef, ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { htmlDecode } from '@/utilities/htmlDecode'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealTextProps {
  text: string
  fgColor?: string
  className?: string
  as?: ElementType
  initialOpacity?: number
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className = '',
  as: Component = 'h3',
  initialOpacity = 0.3,
}) => {
  const textRef = useRef<HTMLElement>(null)
  const splitTextRef = useRef<SplitType | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    gsap.set(element, { autoAlpha: 0 })

    timelineRef.current?.kill()
    if (splitTextRef.current) {
      splitTextRef.current.revert()
    }

    const splitInstance = new SplitType(element, { types: 'words' })
    splitTextRef.current = splitInstance

    if (splitInstance.words && splitInstance.words.length > 0) {
      gsap.set(splitInstance.words, {
        opacity: initialOpacity,
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
        margin: '0',
      })

      gsap.set(element, { autoAlpha: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(splitInstance.words, {
        opacity: 1,
        duration: 1.5,
        stagger: 0.025,
        ease: 'power1.out',
      })

      timelineRef.current = tl
    }

    return () => {
      timelineRef.current?.kill()
      if (splitTextRef.current) {
        splitTextRef.current.revert()
      }
    }
  }, [text, initialOpacity])

  return (
    <Component ref={textRef} className={`${className} relative`}>
      {htmlDecode(text)}
    </Component>
  )
}
