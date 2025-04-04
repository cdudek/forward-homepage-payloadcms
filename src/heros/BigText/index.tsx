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
  const subtitleColor = theme === 'dark' ? 'text-fwd-grey-300' : 'text-fwd-grey-600'

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

  // Get padding class based on impact
  const getPaddingClass = (
    impact: 'highImpact' | 'mediumImpact' | 'lowImpact' | null | undefined,
  ) => {
    switch (impact) {
      case 'highImpact':
        return 'pb-24'
      case 'mediumImpact':
        return 'pb-16'
      default:
        return ''
    }
  }

  return (
    <div className={cn('relative mt-20 flex w-full items-center md:mt-28', impactClasses)}>
      <div className={cn('container mx-auto w-full', getPaddingClass(impact))}>
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
