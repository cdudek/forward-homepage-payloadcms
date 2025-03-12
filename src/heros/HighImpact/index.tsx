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
      enabled={hasAngledCorner ?? false}
      position="bottom"
      className="flex min-h-[70vh] items-center justify-center text-white md:min-h-[70vh]"
      isHero={true}
    >
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
      <div className="absolute inset-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
      </div>
    </SlopedEdgeWrapper>
  )
}

export default HighImpactHero
