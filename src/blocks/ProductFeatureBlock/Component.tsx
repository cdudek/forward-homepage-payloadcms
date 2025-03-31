'use client'

import React from 'react'
import { ProductFeatureBlock as ProductFeatureBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

export const ProductFeatureBlock: React.FC<ProductFeatureBlockProps> = ({
  theme,
  media,
  mediaPosition = 'right',
  productName,
  title,
  description,
  featureList,
}) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'
  const bgColor = theme === 'dark' ? 'bg-fwd-black' : 'bg-white'

  if (!featureList?.length) return null
  return (
    <div
      className={cn('container mx-auto flex min-h-screen items-center py-16', textColor, bgColor)}
    >
      <div className="grid w-full grid-cols-12 gap-8 md:gap-12">
        <div
          className={cn(
            'prose prose-sm col-span-12 flex max-w-none flex-col justify-center text-center md:prose-base lg:prose-lg md:col-span-6 md:text-left',
            mediaPosition === 'right' ? 'md:order-1' : 'md:order-2',
          )}
        >
          {productName && (
            <div className="mb-4 inline-block">
              <span className="inline-block rounded-full bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange p-[1px]">
                <span className="flex items-center justify-center rounded-full bg-fwd-black px-6 py-2">
                  <span className="text-sm text-white">{productName}</span>
                </span>
              </span>
            </div>

            // <h5 className="text-lg font-medium uppercase tracking-wider">{productName}</h5>
          )}
          {title && <h2 className="mt-2">{title}</h2>}
          {description && <p className="mt-4">{description}</p>}

          {/* Feature list outside of prose context */}
          <div className="mt-6">
            {featureList.length > 0 && (
              <ul className="list-none space-y-4 p-0">
                {featureList.map((feature) => (
                  <li key={feature.usp} className="flex items-center gap-4">
                    <div className="not-prose relative h-10 w-10 flex-shrink-0">
                      {/* White circle with 5% opacity background */}
                      <div className="not-prose absolute inset-0 rounded-full bg-white bg-opacity-5"></div>

                      {/* Icon with gradient using mask technique */}
                      {feature.featureIcon &&
                        typeof feature.featureIcon === 'object' &&
                        'url' in feature.featureIcon &&
                        feature.featureIcon.url && (
                          <div className="no-prose not-prose absolute inset-0 flex items-center justify-center">
                            <div className="not-prose h-5 w-5">
                              <div
                                className="not-prose h-full w-full"
                                style={{
                                  WebkitMaskImage: `url(${feature.featureIcon.url})`,
                                  maskImage: `url(${feature.featureIcon.url})`,
                                  WebkitMaskSize: 'contain',
                                  maskSize: 'contain',
                                  WebkitMaskRepeat: 'no-repeat',
                                  maskRepeat: 'no-repeat',
                                  WebkitMaskPosition: 'center',
                                  maskPosition: 'center',
                                  background:
                                    'linear-gradient(90deg, var(--color-fwd-purple), var(--color-fwd-red), var(--color-fwd-orange))',
                                }}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                    <span className="flex-1 text-left">{feature.usp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div
          className={cn(
            'col-span-12 md:col-span-6',
            mediaPosition === 'right' ? 'md:order-2' : 'md:order-1',
          )}
        >
          {media && (
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
              <Media
                imgClassName="absolute inset-0 h-full w-full object-cover"
                priority
                resource={media}
                className="absolute inset-0 h-full w-full"
                fill
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
