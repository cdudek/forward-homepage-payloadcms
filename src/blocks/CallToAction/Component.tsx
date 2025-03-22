import React from 'react'
import { cn } from '@/utilities/ui'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

// import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  title,
  subtitle,
  backgroundImage,
  ctaStyle,
}) => {
  const clipPath = 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)'

  return (
    <div
      className={cn('px-0 py-8', ctaStyle === 'dark' ? 'bg-fwd-black-950' : 'bg-fwd-grey')}
      style={{ clipPath }}
    >
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
  )
}
