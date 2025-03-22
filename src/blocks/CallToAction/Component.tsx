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
  const isDark = ctaStyle === 'dark'
  const clipPath = 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)'
  const textColor = isDark ? 'text-white' : 'text-fwd-black'
  const subtitleColor = isDark ? 'text-gray-300' : 'text-fwd-black'

  if (isDark) {
    // Dark version - slant at top
    return (
      <div className="relative bg-fwd-black-950" style={{ clipPath }}>
        {backgroundImage && typeof backgroundImage === 'object' && (
          <div className="absolute inset-0 overflow-hidden">
            <Media
              fill
              imgClassName="object-contain w-full h-full"
              priority
              resource={backgroundImage}
            />
          </div>
        )}

        <div className="relative px-0 py-8">
          <div className="container pt-[calc(5vw+2rem)]">
            <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8 border-b border-gray-800 pb-8">
              <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
                <h2 className={textColor}>{title}</h2>
                {subtitle && <p className={subtitleColor}>{subtitle}</p>}
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
  } else {
    // Light version - slant at bottom
    return (
      <div className="relative">
        <div className="bg-white">
          {backgroundImage && typeof backgroundImage === 'object' && (
            <div className="absolute inset-0 overflow-hidden">
              <Media
                fill
                imgClassName="object-contain w-full h-full"
                priority
                resource={backgroundImage}
              />
            </div>
          )}

          <div className="relative px-0 pt-8">
            <div className={cn('container', ctaStyle === 'dark' ? 'pb-[calc(5vw+2rem)]' : '')}>
              <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8 border-b border-transparent pb-8">
                <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
                  <h2 className={textColor}>{title}</h2>
                  {subtitle && <p className={subtitleColor}>{subtitle}</p>}
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

        <div
          className="w-full bg-fwd-black-950"
          style={{
            height: '5vw',
            clipPath,
          }}
        />
        <div className="bg-fwd-black-950 pb-8 pt-16">
          <div className="container border-b border-gray-800"></div>
        </div>
      </div>
    )
  }
}
