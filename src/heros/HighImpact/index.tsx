'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

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
      className="relative min-h-[70vh] overflow-hidden md:min-h-[72vh] 2xl:min-h-[80vh]"
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
      <div className="container mx-auto flex h-full min-h-[70vh] items-center justify-center text-white md:min-h-[72vh] 2xl:min-h-[80vh]">
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
