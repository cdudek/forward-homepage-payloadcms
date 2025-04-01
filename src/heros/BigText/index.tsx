'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import renderedTitle from '@/utilities/gradientTitle'
import { cn } from '@/utilities/ui'

export const BigTextHero: React.FC<Page['hero']> = ({
  title = '',
  subtitle,
  gradientText,
  impact,
}) => {
  const formattedTitle = renderedTitle(title || '', gradientText || '')

  let impactClasses = ''
  switch (impact) {
    case 'highImpact':
      impactClasses = 'min-h-[90vh] md:min-h-[75vh]'
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
                <p className="text-fwd-grey-400">{subtitle}</p>
                <h1 className="mt-0">{formattedTitle}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigTextHero
