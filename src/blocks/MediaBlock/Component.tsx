'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { FadeInView } from '@/utilities/animations/FadeInView'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  fullWidth?: boolean
  slope?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    fullWidth,
    slope,
  } = props

  let caption

  if (media && typeof media === 'object') caption = media.caption

  const styles: Record<string, string> = {}
  if (slope) {
    styles.clipPath = 'polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)'
  }

  return (
    <div style={styles} className={cn('container w-full', className)}>
      <FadeInView animationStep={1}>
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0 h-[calc(100%+75px)] w-full -translate-y-[50px]">
            {(media || staticImage) && (
              <Media
                fill
                imgClassName={cn(
                  'absolute inset-0 h-full w-full object-cover',
                  !fullWidth && !slope && 'rounded-3xl',
                  imgClassName,
                )}
                className="absolute inset-0 h-full w-full"
                resource={media}
                parallaxOffset={50}
                src={staticImage}
                loading="eager"
                hasParallax={true}
              />
            )}
          </div>
          {caption && (
            <div
              className={cn(
                'mt-6',
                {
                  container: !disableInnerContainer,
                },
                captionClassName,
              )}
            >
              <RichText data={caption} enableGutter={false} />
            </div>
          )}
        </div>
      </FadeInView>
    </div>
  )
}
