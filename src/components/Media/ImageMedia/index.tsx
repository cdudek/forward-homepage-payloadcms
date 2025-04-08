'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getClientSideURL } from '@/utilities/getURL'
import { ParallaxContainer } from '@/utilities/animations/ParallaxContainer'
const { breakpoints } = cssVariables

// Create a custom event for image loading
export const IMAGE_LOADING_EVENT = 'next-image-loading'
export const IMAGE_LOADED_EVENT = 'next-image-loaded'

// A base64 encoded image to use as a placeholder while the image is loading

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    hasParallax = false,
    parallaxSpeed = 1,
    parallaxOffset,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let blurhash: string | null | undefined

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
      blurhash: blurhashFromResource,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''
    blurhash = blurhashFromResource

    const cacheTag = resource.updatedAt

    src = `${getClientSideURL()}${url}?${cacheTag}`
  }

  const loading = loadingFromProps || (blurhash ? 'eager' : !priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // Dispatch loading events
  const handleLoad = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(IMAGE_LOADED_EVENT))
    }
  }

  // Dispatch loading start event when the image starts loading
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(IMAGE_LOADING_EVENT))
    }
  }, [src])

  return (
    <>
      {hasParallax ? (
        <ParallaxContainer
          className={fill ? 'relative block h-full w-full' : undefined}
          parallaxSpeed={parallaxSpeed}
          offset={parallaxOffset}
        >
          <picture className={fill ? 'relative block h-full w-full' : undefined}>
            <NextImage
              alt={alt || ''}
              className={cn(imgClassName, fill ? 'object-cover' : undefined)}
              fill={fill}
              height={!fill ? height : undefined}
              placeholder={blurhash ? 'blur' : 'empty'}
              blurDataURL={blurhash || undefined}
              priority={priority}
              quality={80}
              loading={loading}
              sizes={sizes}
              src={src}
              width={!fill ? width : undefined}
              onLoad={handleLoad}
            />
          </picture>
        </ParallaxContainer>
      ) : (
        <picture className={fill ? 'relative block h-full w-full' : undefined}>
          <NextImage
            alt={alt || ''}
            className={cn(imgClassName, fill ? 'object-cover' : undefined)}
            fill={fill}
            height={!fill ? height : undefined}
            placeholder={blurhash ? 'blur' : 'empty'}
            blurDataURL={blurhash || undefined}
            priority={priority}
            quality={80}
            loading={loading}
            sizes={sizes}
            src={src}
            width={!fill ? width : undefined}
            onLoad={handleLoad}
          />
        </picture>
      )}
    </>
  )
}
