'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  hasAngledCorner,
}) => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center text-white"
      style={
        hasAngledCorner
          ? { clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)' }
          : undefined
      }
    >
      <div className="container relative z-10 mb-8 flex flex-col items-center text-center sm:items-center sm:text-center md:items-start md:text-left">
        <div className="w-full sm:items-center sm:text-center md:max-w-[80%] md:text-left">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 sm:justify-center md:justify-start">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} size="xl" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}

export default HighImpactHero
