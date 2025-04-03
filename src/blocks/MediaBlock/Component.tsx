import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

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
  const disableGutter = !fullWidth

  return (
    <div style={styles}>
      <div
        className={cn(
          '',
          {
            container: disableGutter,
          },
          className,
        )}
      >
        {(media || staticImage) && (
          <Media
            imgClassName={cn(!fullWidth && !slope && 'rounded-3xl', imgClassName)}
            resource={media}
            src={staticImage}
          />
        )}
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
    </div>
  )
}
