'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SlopedEdgeWrapper } from '@/components/SlopedEdgeWrapper'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  hasAngledCorner,
}) => {
  return (
    <SlopedEdgeWrapper
      enabled={hasAngledCorner}
      position="bottom"
      className="flex min-h-[75vh] items-center justify-center text-white"
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
    </SlopedEdgeWrapper>
  )
}

export default HighImpactHero
