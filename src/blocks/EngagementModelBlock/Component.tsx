'use client'

import React from 'react'
import { renderedTitle } from '@/utilities/gradientTitle'
import { EngagementModelBlock as EngagementModelBlockType } from '@/payload-types'
import Image from 'next/image'
import { htmlDecode } from '@/utilities/htmlDecode'

export const EngagementModelBlock: React.FC<EngagementModelBlockType> = (props) => {
  const { title, gradientText, description, tiers } = props

  const header = renderedTitle(title, gradientText)

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="grid grid-cols-1 gap-y-16">
        <div className="prose prose-sm mx-auto text-center md:prose-md xl:prose-lg">
          <h2 className="mb-6">{header}</h2>
          {description && <p className="mx-auto">{htmlDecode(description)}</p>}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers?.map((tier, index) => {
            const bgImageUrl =
              typeof tier.backgroundImage === 'object' &&
              tier.backgroundImage !== null &&
              'url' in tier.backgroundImage
                ? tier.backgroundImage.url
                : typeof tier.backgroundImage === 'string'
                  ? tier.backgroundImage
                  : ''

            return (
              <div
                key={index}
                className="relative flex aspect-square w-full flex-col overflow-hidden rounded-3xl p-8 text-white"
              >
                {bgImageUrl && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={bgImageUrl}
                      alt={htmlDecode(tier.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="mix-blend-overlay"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(30,30,30,0.0)] via-[rgba(30,30,30,0.1)] to-[rgba(30,30,30,0.6)]"></div>
                  </div>
                )}

                <div className="relative z-20 flex min-h-full flex-col">
                  {/* Top section with labels and title */}
                  <div className="flex flex-1 flex-col justify-end">
                    <div className="mb-auto flex flex-wrap gap-3">
                      <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                        {tier.headlineLabel}
                      </span>
                      <span className="flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                        <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-13h-2v6l5.2 3.2.8-1.3-4-2.4V7z" />
                        </svg>
                        {tier.durationLabel}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-4xl font-medium leading-tight text-white">
                        {htmlDecode(tier.title)}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom section with description */}
                  <div className="min-h-[4.5rem]">
                    <p className="line-clamp-3 text-base leading-normal text-white/90">
                      {htmlDecode(tier.description)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EngagementModelBlock
