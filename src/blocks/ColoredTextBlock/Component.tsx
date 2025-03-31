'use client'

import React from 'react'
import { ColoredTextBlock as ColoredTextBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ScrollRevealText } from '@/utilities/ScrollRevealText'

export const ColoredTextBlock: React.FC<ColoredTextBlockProps> = ({ textElements, theme }) => {
  const bgColor = theme === 'dark' ? 'bg-fwd-black' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'

  // Color values for text (not classes)
  const textFgColor = theme === 'dark' ? '#ffffff' : '#0A0E15'

  if (!textElements?.length) return null

  return (
    <div className={cn('container mx-auto flex min-h-screen items-center', bgColor, textColor)}>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="prose prose-sm col-span-12 max-w-none text-center md:prose-base lg:prose-lg">
          {/* Standard text display without animation
          <h3 className="m-0">
            {textElements.map((element, index) => (
              <span key={'element-' + index}>{element.text}</span>
            ))}
          </h3> */}
          <ScrollRevealText
            text={textElements.map((element) => element.text).join('')}
            fgColor={textFgColor}
            className="m-0 !leading-[1.75]"
            as="h3"
            initialOpacity={0.3} // Start with 0.3 opacity and animate to 1 on scroll
          />
        </div>
      </div>
    </div>
  )
}
