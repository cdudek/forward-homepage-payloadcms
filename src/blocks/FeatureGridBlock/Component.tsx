'use client'

import React from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { SlopedEdgeWrapper } from '@/components/SlopedEdgeWrapper'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

type IconStyle = 'round' | 'square'
type IconSize = 'small' | 'medium' | 'large'
type ColorType =
  | 'default'
  | 'gradient'
  | 'purple'
  | 'red'
  | 'orange'
  | 'black'
  | 'white'
  | 'grey'
  | 'greyLight'
  | 'greyDark'

type Alignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'middle' | 'bottom'
type ColumnSize = 'oneThird' | 'oneQuarter'
type BackgroundTheme = 'default' | 'light' | 'dark'

type Icon = {
  media: Media | null
  style: IconStyle
  size: IconSize
  iconForeground: ColorType
  iconBackground: ColorType
  alignment: Alignment
}

type Header = {
  content: SerializedEditorState<SerializedLexicalNode>
  horizontalAlignment: Alignment
  verticalAlignment: VerticalAlignment
  equalHeight: boolean
}

type Feature = {
  icon: Icon
  header: Header
  content: SerializedEditorState<SerializedLexicalNode>
}

export type FeatureGridBlockType = {
  blockType: 'featureGridBlock'
  blockName?: string
  columns: ColumnSize
  features: Feature[]
  slope?: {
    enabled?: boolean
    position?: 'top' | 'bottom' | 'both'
  }
  enableBackground?: boolean
  backgroundTheme?: BackgroundTheme
}

export const FeatureGridBlock: React.FC<FeatureGridBlockType> = (props) => {
  const { columns, features, slope, enableBackground, backgroundTheme = 'default' } = props

  // Check if features exist and have the expected structure
  if (!features || features.length === 0) {
    return null
  }

  if (enableBackground) {
  }

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

  const getIconSizeClasses = (size: IconSize) => {
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

  const getIconImageSizeClasses = (size: IconSize) => {
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

  const getIconStyleClasses = (style: IconStyle) => {
    return style === 'round' ? 'rounded-full' : 'rounded-lg'
  }

  const getAlignmentClasses = (alignment: Alignment) => {
    switch (alignment) {
      case 'left':
        return 'items-start text-left'
      case 'center':
        return 'items-center text-center'
      case 'right':
        return 'items-end text-right'
      default:
        return 'items-center text-center'
    }
  }

  const getVerticalAlignmentClasses = (alignment: VerticalAlignment) => {
    switch (alignment) {
      case 'top':
        return 'justify-start'
      case 'middle':
        return 'justify-center'
      case 'bottom':
        return 'justify-end'
      default:
        return 'justify-start'
    }
  }

  const getColor = (color: ColorType, type: 'foreground' | 'background' = 'foreground') => {
    if (color === 'gradient') {
      return 'linear-gradient(90deg, var(--color-fwd-purple), var(--color-fwd-red), var(--color-fwd-orange))'
    }

    // Map to project's HSL colors for both foreground and background
    const colorMap: Record<ColorType, string> = {
      default: type === 'background' ? '#808080' : '#ffffff',
      purple: 'var(--color-fwd-purple)',
      red: 'var(--color-fwd-red)',
      orange: 'var(--color-fwd-orange)',
      black: 'var(--color-fwd-black)',
      white: 'var(--color-fwd-white)',
      grey: 'var(--color-fwd-grey-600)',
      greyLight: 'var(--color-fwd-grey-200)',
      greyDark: 'var(--color-fwd-grey-800)',
      gradient: '',
    }

    return colorMap[color]
  }

  return (
    <SlopedEdgeWrapper
      enabled={slope?.enabled}
      position={slope?.position}
      backgroundTheme={enableBackground ? backgroundTheme : undefined}
      className="w-full"
    >
      <div className="container px-0 py-8">
        <div className={cn('grid w-full gap-x-8 gap-y-8', getGridColsClasses())}>
          {features.map((feature, index) => {
            const { icon, header, content } = feature

            // Create icon container classes, removing background from inner elements
            const iconContainerClasses = [
              'flex justify-center items-center mb-6',
              getIconSizeClasses(icon.size),
              getIconStyleClasses(icon.style),
            ].join(' ')

            const headerContainerClasses = [
              'w-full',
              getAlignmentClasses(header.horizontalAlignment),
              getVerticalAlignmentClasses(header.verticalAlignment),
              header.equalHeight ? 'flex flex-col h-full' : '',
            ].join(' ')

            const featureClasses = [
              'flex flex-col',
              getAlignmentClasses(icon.alignment),
              getColSpanClasses(),
            ].join(' ')

            return (
              <div key={index} className={featureClasses}>
                {/* Outer icon container with background color */}
                <div
                  className={iconContainerClasses}
                  style={{
                    backgroundColor: getColor(icon.iconBackground || 'default', 'background'),
                  }}
                >
                  {/* Replace IconWithColor with a direct implementation to avoid nested backgrounds */}
                  {icon.media?.url ? (
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

                <div className={headerContainerClasses}>
                  <RichText data={header.content} enableGutter={false} />
                </div>

                <div className="prose prose-sm w-full max-w-none">
                  <RichText data={content} enableGutter={false} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlopedEdgeWrapper>
  )
}

export default FeatureGridBlock
