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
  const renderTitle = () => {
    if (!gradientText) return title

    const parts = title?.split(gradientText)
    if (parts?.length === 1) return title

    return (
      <>
        {parts?.[0]}
        <span className="bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-clip-text text-transparent">
          {gradientText}
        </span>
        {parts?.[1]}
      </>
    )
  }

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
      impactClasses = 'min-h-[25vh] md:min-h-[25vh]'
      break
    default:
      impactClasses = 'min-h-[90vh] md:min-h-[75vh]'
  }

  return (
    <div className={cn('relative flex w-full items-center md:mt-28', impactClasses)}>
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
