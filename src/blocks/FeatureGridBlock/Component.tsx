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
  | 'grey-50'
  | 'grey-100'
  | 'grey-500'
  | 'grey-900'
type Alignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'middle' | 'bottom'
type ColumnSize = 'oneThird' | 'oneQuarter'

type Icon = {
  media: Media | null
  style: IconStyle
  size: IconSize
  colorType: ColorType
  background: ColorType
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
    position?: 'top' | 'bottom'
  }
  enableBackground?: boolean
  backgroundColor?: string
}

export const FeatureGridBlock: React.FC<FeatureGridBlockType> = (props) => {
  const { columns, features, slope, enableBackground, backgroundColor } = props

  // Check if features exist and have the expected structure
  if (!features || features.length === 0) {
    return null
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

  // Simple component to render icon with color or gradient
  const IconWithColor: React.FC<{ feature: Feature }> = ({ feature }) => {
    const { icon } = feature

    if (!icon.media?.url) return null
    const iconUrl = icon.media.url

    const getColor = (type: ColorType) => {
      const colorMap = {
        purple: 'text-purple',
        red: 'text-red',
        orange: 'text-orange',
        lightGrey: 'text-grey-300',
        darkGrey: 'text-grey-700',
        black: 'text-black',
        white: 'text-white',

        gradient:
          'linear-gradient(90deg, hsl(var(--brand-gradient-start)), hsl(var(--brand-gradient-middle)), hsl(var(--brand-gradient-end)))',
      }

      return type === 'default' ? undefined : colorMap[type as keyof typeof colorMap]
    }

    const getIconStyle = () => {
      if (icon.colorType === 'default') return {}

      const color = getColor(icon.colorType)
      if (!color) return {}

      const isGradient = icon.colorType === 'gradient'
      return {
        WebkitMaskImage: `url(${iconUrl})`,
        maskImage: `url(${iconUrl})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...(isGradient ? { background: color } : { backgroundColor: color }),
      }
    }

    const getBackgroundStyle = () => {
      if (icon.background === 'default') return {}

      const color = getColor(icon.background)
      if (!color) return {}

      return icon.background === 'gradient' ? { background: color } : { backgroundColor: color }
    }

    return (
      <div className={getIconImageSizeClasses(icon.size)}>
        <div
          className={cn(getIconStyleClasses(icon.style), 'flex items-center justify-center')}
          style={getBackgroundStyle()}
        >
          {icon.colorType === 'default' ? (
            <Image
              src={iconUrl}
              alt={icon.media.alt || ''}
              width={100}
              height={100}
              className="h-full w-full"
            />
          ) : (
            <div className="relative h-full w-full">
              <div className="h-full w-full" style={getIconStyle()} />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <SlopedEdgeWrapper
      enabled={slope?.enabled}
      position={slope?.position}
      backgroundColor={enableBackground ? backgroundColor : undefined}
      className="w-full"
    >
      <div className="container px-0 py-8">
        <div className={cn('grid w-full gap-x-8 gap-y-8', getGridColsClasses())}>
          {features.map((feature, index) => {
            const { icon, header, content } = feature

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
                <div
                  className={iconContainerClasses}
                  style={{ backgroundColor: icon.background || 'transparent' }}
                >
                  <IconWithColor feature={feature} />
                </div>

                <div className={headerContainerClasses}>
                  <RichText data={header.content} />
                </div>

                <div className="prose prose-sm w-full max-w-none">
                  <RichText data={content} />
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
