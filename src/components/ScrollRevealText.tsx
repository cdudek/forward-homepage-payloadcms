import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealTextProps {
  text: string
  bgColor?: string
  fgColor?: string
  className?: string
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  bgColor = '#cccccc',
  fgColor = '#000000',
  className = '',
}) => {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Initialize SplitType
    const splitText = new SplitType(textRef.current, { types: 'chars' })

    // Create the animation
    gsap.fromTo(
      splitText.chars,
      {
        color: bgColor,
        opacity: 0,
      },
      {
        color: fgColor,
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
        },
      },
    )

    // Cleanup
    return () => {
      splitText.revert()
    }
  }, [text, bgColor, fgColor])

  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  )
}
