'use client'

import React from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type IconStyle = 'round' | 'square'
type IconSize = 'small' | 'medium' | 'large'
type ColorType = 'default' | 'gradient' | 'color'
type Alignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'middle' | 'bottom'
type GradientAngle = '0deg' | '90deg' | '180deg' | '270deg' | '135deg' | '315deg'
type ColumnSize = 'oneThird' | 'oneQuarter'

type GradientValues = {
  start: string
  mid: string
  end: string
  angle: GradientAngle
  midPos: number
}

type Icon = {
  media: Media | null
  style: IconStyle
  size: IconSize
  colorType: ColorType
  colorValue?: string
  gradientValues?: GradientValues
  background: string
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
}

export const FeatureGridBlock: React.FC<FeatureGridBlockType> = (props) => {
  const { columns, features } = props

  // Check if features exist and have the expected structure
  if (!features || features.length === 0) {
    return null
  }

  const getGridColsClasses = () => {
    switch (columns) {
      case 'oneThird':
        return 'grid-cols-4 lg:grid-cols-12'
      case 'oneQuarter':
        return 'grid-cols-4 lg:grid-cols-12'
      default:
        return 'grid-cols-4 lg:grid-cols-12'
    }
  }

  const getColSpanClasses = () => {
    switch (columns) {
      case 'oneThird':
        return 'col-span-4 md:col-span-2 lg:col-span-4'
      case 'oneQuarter':
        return 'col-span-4 md:col-span-2 lg:col-span-3'
      default:
        return 'col-span-4 md:col-span-2 lg:col-span-4'
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

  // Get gradient style based on angle
  const getGradientDirection = (angle: GradientAngle) => {
    switch (angle) {
      case '0deg':
        return 'bg-gradient-to-t'
      case '90deg':
        return 'bg-gradient-to-r'
      case '180deg':
        return 'bg-gradient-to-b'
      case '270deg':
        return 'bg-gradient-to-l'
      case '135deg':
        return 'bg-gradient-to-br'
      case '315deg':
        return 'bg-gradient-to-tl'
      default:
        return 'bg-gradient-to-r'
    }
  }

  // Simple component to render icon with color or gradient
  const IconWithColor: React.FC<{ feature: Feature }> = ({ feature }) => {
    const { icon } = feature

    if (!icon.media) return null

    // For solid color
    if (icon.colorType === 'color' && icon.colorValue) {
      return (
        <div className={getIconImageSizeClasses(icon.size)}>
          <img
            src={icon.media.url || ''}
            alt={icon.media.alt || ''}
            className="h-full w-full"
            style={{
              filter: 'brightness(0)',
              WebkitFilter: 'brightness(0)',
              color: icon.colorValue,
            }}
          />
        </div>
      )
    }

    // For gradient
    if (icon.colorType === 'gradient' && icon.gradientValues) {
      const { start, mid, end, angle, midPos } = icon.gradientValues

      return (
        <div className={getIconImageSizeClasses(icon.size)}>
          <div className="relative h-full w-full">
            {/* Create a mask using the icon */}
            <img
              src={icon.media.url || ''}
              alt={icon.media.alt || ''}
              className="absolute h-full w-full brightness-0"
              style={{
                WebkitMaskImage: `url(${icon.media.url})`,
                maskImage: `url(${icon.media.url})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />

            {/* Gradient that will be masked by the icon shape */}
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(${angle}, ${start} 0%, ${mid} ${midPos}%, ${end} 100%)`,
                WebkitMaskImage: `url(${icon.media.url})`,
                maskImage: `url(${icon.media.url})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </div>
        </div>
      )
    }

    // Default - just show the icon as is
    return (
      <div className={getIconImageSizeClasses(icon.size)}>
        <img src={icon.media.url || ''} alt={icon.media.alt || ''} className="h-full w-full" />
      </div>
    )
  }

  return (
    <div className="// container px-0 py-8">
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
  )
}

export default FeatureGridBlock
