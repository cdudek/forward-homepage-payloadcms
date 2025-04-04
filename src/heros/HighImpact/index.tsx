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
  // Style for the sloped edge
  const clipPathStyle = hasAngledCorner
    ? { clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)' }
    : {}

  return (
    <div
      className={cn(
        'relative flex overflow-hidden',
        'min-h-[85vh]',
        // 'sm:min-h-[calc(100vh-294px)]',
        'md:min-h-[calc(100vh-208px)]',
        'md:min-h-[calc(100vh-sm:208px)]',
        'lg:min-h-[calc(100vh-190px)]',
        'xl:min-h-[calc(100vh-240px)]',
        '2xl:min-h-[calc(100vh-260px)]',
      )}
      style={clipPathStyle}
    >
      {/* Background image positioned absolutely */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {media && typeof media === 'object' && (
          <div className="relative h-full w-full">
            <Media
              fill
              imgClassName="object-cover"
              className="!absolute inset-0 h-full w-full"
              priority
              resource={media}
              loading="eager"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'container mx-auto flex flex-1 flex-col items-center justify-center text-white',
        )}
      >
        <div className="w-full">
          <div className="relative z-10 grid w-full grid-cols-12">
            <div className="col-span-12 text-center md:col-span-12 md:text-left">
              {richText && (
                <div className="md:max-w-[80%]">
                  <RichText className="mb-6" data={richText} enableGutter={false} />
                </div>
              )}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
                  {links.map(({ link }, i) => {
                    const { appearance, ...restLink } = link
                    const modifiedAppearance = appearance === 'default' ? undefined : appearance

                    return (
                      <li key={i}>
                        <CMSLink {...restLink} appearance={modifiedAppearance} size="xl" />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighImpactHero
