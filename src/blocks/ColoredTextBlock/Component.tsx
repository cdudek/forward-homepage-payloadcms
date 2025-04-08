'use client'

import React from 'react'
import { ColoredTextBlock as ColoredTextBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ScrollRevealText } from '@/utilities/ScrollRevealText'
import { FadeInView } from '@/utilities/animations/FadeInView'
import { ParallaxContainer } from '@/utilities/animations/ParallaxContainer'

export const ColoredTextBlock: React.FC<ColoredTextBlockProps> = ({ textElements, theme }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'
  const textFgColor = theme === 'dark' ? '#ffffff' : '#0A0E15'

  if (!textElements?.length) return null

  return (
    <div className={cn('container mx-auto flex min-h-screen items-center', textColor)}>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="prose prose-sm col-span-12 max-w-none text-center md:prose-base lg:prose-lg">
          <ParallaxContainer offset={50}>
            <FadeInView>
              <ScrollRevealText
                text={textElements.map((element) => element.text).join('')}
                fgColor={textFgColor}
                className="sm:prose-xs m-0 !leading-[1.3] md:prose-md lg:prose-lg md:!leading-[1.3] 2xl:!leading-[1.6]"
                as="h3"
                initialOpacity={0.2}
              />
            </FadeInView>
          </ParallaxContainer>
        </div>
      </div>
    </div>
  )
}
