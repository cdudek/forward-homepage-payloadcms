'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import renderedTitle from '@/utilities/gradientTitle'
import { cn } from '@/utilities/ui'

type BigTextHeroProps = Page['hero'] & {
  theme: 'light' | 'dark'
}

export const BigTextHero: React.FC<BigTextHeroProps> = ({
  title = '',
  subtitle,
  gradientText,
  impact,
  theme = 'light',
}) => {
  const formattedTitle = renderedTitle(title || '', gradientText || '')
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'
  const subtitleColor = theme === 'dark' ? 'text-fwd-grey-300' : 'text-fwd-grey-500'

  let impactClasses = ''
  switch (impact) {
    case 'highImpact':
      impactClasses = 'min-h-[100vh] md:min-h-[100vh]'
      break
    case 'mediumImpact':
      impactClasses = 'min-h-[50vh] md:min-h-[50vh]'
      break
    case 'lowImpact':
      impactClasses = 'min-h-[30vh] md:min-h-[25vh]'
      break
    default:
      impactClasses = 'min-h-[90vh] md:min-h-[75vh]'
  }

  return (
    <div className={cn('relative mt-20 flex w-full items-center md:mt-28', impactClasses)}>
      <div className="container mx-auto w-full">
        <div className="w-full">
          <div className="grid w-full grid-cols-12">
            <div className="col-span-12 text-center">
              <div className="prose-sm mx-auto max-w-none md:prose-md xl:prose-lg">
                <p className={subtitleColor}>{subtitle}</p>
                <h1 className={cn('mt-0', textColor)}>{formattedTitle}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigTextHero
