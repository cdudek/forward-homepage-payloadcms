'use client'
import React from 'react'
import { Media } from '@/components/Media'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { FadeInView } from '@/utilities/animations/FadeInView'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  title,
  subtitle,
  backgroundImage,
  ctaStyle,
}) => {
  const isDark = ctaStyle === 'dark'
  const clipPathDark = 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)'
  const clipPathLight = 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)'
  const textColor = isDark ? 'text-white' : 'text-fwd-black'
  const subtitleColor = isDark ? 'text-gray-300' : 'text-fwd-black'
  const duration = 0.5
  if (isDark) {
    return (
      <div className="relative bg-fwd-black" style={{ clipPath: clipPathDark }}>
        {backgroundImage && typeof backgroundImage === 'object' && (
          <div className="container absolute inset-0 overflow-hidden">
            <Media
              fill
              imgClassName="absolute inset-0 h-full w-full object-cover opacity-25"
              className="absolute inset-0 h-full w-full"
              resource={backgroundImage}
            />
          </div>
        )}
        <div className="relative px-0 py-8">
          <div className="container pt-[calc(5vw+2rem)]">
            <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8 border-b border-gray-800 pb-24 md:pb-16">
              <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
                <FadeInView duration={duration} animationStep={1}>
                  <h2 className={textColor}>{title}</h2>
                </FadeInView>
                {subtitle && (
                  <FadeInView duration={duration} animationStep={2}>
                    <p className={subtitleColor}>{subtitle}</p>
                  </FadeInView>
                )}
                <ul className="flex flex-col items-center gap-4">
                  {(links || []).map(({ link }, index) => {
                    return (
                      <FadeInView
                        duration={duration}
                        animationStep={3 + index}
                        key={'link-fade-' + index}
                      >
                        {/* @ts-expect-error Async Server Component */}
                        <CMSLink size="lg" {...link} appearance={link.appearance || 'default'} />
                      </FadeInView>
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
      <div className="relative bg-fwd-black">
        <div className="relative bg-white" style={{ clipPath: clipPathLight }}>
          {backgroundImage && typeof backgroundImage === 'object' && (
            <div className="absolute inset-0 overflow-hidden">
              <Media
                fill
                imgClassName="object-contain w-full h-full rotate-180 opacity-25"
                priority
                resource={backgroundImage}
              />
            </div>
          )}

          <div className="relative px-0 py-8">
            <div className="container pt-[calc(5vw+2rem)]">
              <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8 pb-16">
                <div className="prose-sm col-span-12 mx-auto max-w-none pb-16 text-center md:prose-md xl:prose-lg">
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
        <div className="container pb-16 pt-16">
          <div className="border-t border-gray-800"></div>
        </div>
      </div>
    )
  }
}
