'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { renderedTitle } from '@/utilities/gradientTitle'
import { htmlDecode } from '@/utilities/htmlDecode'
import { FeatureGridBlock as FeatureGridBlockType } from '@/payload-types'

type Feature = NonNullable<FeatureGridBlockType['features']>[number]
type IconSize = Feature['icon']['size']
type IconStyle = Feature['icon']['style']
type ColorType = Feature['icon']['iconForeground']

export const FeatureGridBlock: React.FC<FeatureGridBlockType> = (props) => {
  const {
    title,
    gradientText,
    description,
    columns,
    features,
    enableBackground = true,
    backgroundTheme = 'default',
  } = props

  if (!features || features.length === 0) {
    return null
  }

  const getStyles = () => {
    const styles: Record<string, string> = {}

    styles.clipPath = 'polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)'

    return styles
  }

  const backgroundThemeMap = {
    default: undefined,
    light: 'bg-fwd-grey-50',
    dark: 'bg-fwd-black',
  }

  const backgroundColor = enableBackground
    ? backgroundThemeMap[backgroundTheme as keyof typeof backgroundThemeMap]
    : undefined

  const getGridColsClasses = () => {
    switch (columns) {
      case 'oneThird':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 'oneQuarter':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  const getColSpanClasses = () => {
    switch (columns) {
      case 'oneThird':
        return 'col-span-1'
      case 'oneQuarter':
        return 'col-span-1'
      default:
        return 'col-span-1'
    }
  }

  const getIconSizeClasses = (size: IconSize | undefined | null = 'medium') => {
    switch (size) {
      case 'small':
        return 'w-14 h-14'
      case 'medium':
        return 'w-20 h-20'
      case 'large':
        return 'w-24 h-24'
      default:
        return 'w-20 h-20'
    }
  }

  const getIconImageSizeClasses = (size: IconSize | undefined | null = 'medium') => {
    switch (size) {
      case 'small':
        return 'w-7 h-7'
      case 'medium':
        return 'w-10 h-10'
      case 'large':
        return 'w-12 h-12'
      default:
        return 'w-10 h-10'
    }
  }

  const getIconStyleClasses = (style: IconStyle | undefined | null = 'round') => {
    return style === 'round' ? 'rounded-full' : 'rounded-lg'
  }

  const getColor = (
    color: ColorType | undefined | null = 'default',
    type: 'foreground' | 'background' = 'foreground',
  ) => {
    if (color === 'gradient') {
      return 'linear-gradient(90deg, var(--color-fwd-purple), var(--color-fwd-red), var(--color-fwd-orange))'
    }

    const colorMap = {
      default: type === 'background' ? '#808080' : '#ffffff',
      purple: 'var(--color-fwd-purple)',
      red: 'var(--color-fwd-red)',
      orange: 'var(--color-fwd-orange)',
      black: 'var(--color-fwd-black)',
      white: 'var(--color-white)',
      grey: 'var(--color-fwd-grey-600)',
      greyLight: 'var(--color-fwd-grey-100)',
      greyDark: 'var(--color-fwd-grey-800)',
      gradient: '',
    }

    return colorMap[color || 'default']
  }

  const header = renderedTitle(title, gradientText)

  return (
    <div className={cn('relative w-full', backgroundColor)} style={getStyles()}>
      <div className="container mx-auto">
        <div className={cn('w-full', 'py-[calc(5vw+2rem)]')}>
          <div className="container prose-sm px-0 py-8 text-center md:prose-md xl:prose-lg">
            <div className="mx-auto pb-16 pt-8">
              <h2>{header}</h2>
              {description && <p className="pb-8">{description}</p>}
            </div>
            <div className={cn('grid w-full gap-x-8 gap-y-8', getGridColsClasses())}>
              {features.map((feature, index) => {
                const { icon, title, description } = feature

                const iconContainerClasses = [
                  'flex justify-center items-center mb-6',
                  getIconSizeClasses(icon.size),
                  getIconStyleClasses(icon.style),
                ].join(' ')

                const featureClasses = [
                  'flex flex-col',
                  'items-center text-center',
                  getColSpanClasses(),
                ].join(' ')

                return (
                  <div key={index} className={featureClasses}>
                    {/* Outer icon container with background color */}
                    <div
                      className={cn(iconContainerClasses, 'not-prose')}
                      style={{
                        backgroundColor: getColor(icon.iconBackground || 'default', 'background'),
                      }}
                    >
                      {/* Replace IconWithColor with a direct implementation to avoid nested backgrounds */}
                      {typeof icon.media === 'object' && 'url' in icon.media && icon.media.url ? (
                        icon.iconForeground === 'default' ? (
                          <Image
                            src={icon.media.url}
                            alt={icon.media.alt || ''}
                            width={100}
                            height={100}
                            className={getIconImageSizeClasses(icon.size)}
                          />
                        ) : (
                          <div className={getIconImageSizeClasses(icon.size)}>
                            <div
                              className="h-full w-full"
                              style={{
                                WebkitMaskImage: `url(${icon.media.url})`,
                                maskImage: `url(${icon.media.url})`,
                                WebkitMaskSize: 'contain',
                                maskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                maskPosition: 'center',
                                background:
                                  icon.iconForeground === 'gradient'
                                    ? getColor(icon.iconForeground, 'foreground')
                                    : undefined,
                                backgroundColor:
                                  icon.iconForeground !== 'gradient'
                                    ? getColor(icon.iconForeground, 'foreground')
                                    : undefined,
                              }}
                            />
                          </div>
                        )
                      ) : null}
                    </div>

                    <div className="w-full text-center">
                      <h3 className="feature-header mb-2 flex min-h-[3em] items-center justify-center">
                        {htmlDecode(title)}
                      </h3>
                      <p className="text-fwd-black">{htmlDecode(description)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureGridBlock
