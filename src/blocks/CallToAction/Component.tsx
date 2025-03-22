import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

// import RichText from '@/components/RichText'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  title,
  subtitle,
  backgroundImage,
  ctaStyle,
}) => {
  const clipPath = 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)'

  return (
    <div className="relative">
      {/* Colored background with clip path */}
      <div
        className={cn('absolute inset-0', ctaStyle === 'dark' ? 'bg-fwd-black-950' : 'bg-fwd-grey')}
        style={{ clipPath }}
      />

      {/* Background image with clip path */}
      {backgroundImage && typeof backgroundImage === 'object' && (
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
          <Media
            fill
            imgClassName="object-contain w-full h-full"
            priority
            resource={backgroundImage}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative px-0 py-8">
        <div className="container pt-[calc(5vw+2rem)]">
          <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8 border-b border-gray-800 pb-8">
            <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
              <h2 className={cn(ctaStyle === 'dark' ? 'text-fwd-grey' : 'text-fwd-black')}>
                {title}
              </h2>
              {subtitle && (
                <p className={cn(ctaStyle === 'dark' ? 'text-fwd-grey-300' : 'text-fwd-black')}>
                  {subtitle}
                </p>
              )}
              <ul className="flex flex-col items-center gap-4">
                {(links || []).map(({ link }, i) => {
                  return (
                    <li key={i}>
                      {/* @ts-expect-error Async Server Component */}
                      <CMSLink size="lg" {...link} appearance={link.appearance || 'default'} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
