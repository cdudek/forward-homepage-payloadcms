'use client'

import React from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { NumberGridBlock as NumberGridBlockProps } from '@/payload-types'
import Image from 'next/image'

// Define types for internal use
type NumberSize = 'small' | 'medium' | 'large'
type Alignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'middle' | 'bottom'
type ColorType = 'default' | 'gradient' | 'color'
type GradientAngle = '0deg' | '90deg' | '180deg' | '270deg' | '135deg' | '315deg'

type GradientValues = {
  start?: string | null
  mid?: string | null
  end?: string | null
  angle?: GradientAngle | null
  midPos?: number | null
}

type NumberStyle = {
  value: string
  prefix?: string | null
  suffix?: string | null
  size?: NumberSize | null
  colorType?: ColorType | null
  colorValue?: string | null
  gradientValues?: GradientValues
  alignment?: Alignment | null
}

type Header = {
  content: SerializedEditorState<SerializedLexicalNode>
  horizontalAlignment?: Alignment | null
  verticalAlignment?: VerticalAlignment | null
  equalHeight?: boolean | null
}

type NumberGridItem = {
  number: NumberStyle
  header: Header
  content: SerializedEditorState<SerializedLexicalNode>
}

type NumberGridBlockType = {
  blockType: 'numberGridBlock'
  blockName?: string
  columns: 'oneThird' | 'oneQuarter'
  items: NumberGridItem[]
}

export const NumberGridBlock: React.FC<NumberGridBlockType> = (props) => {
  const { columns, items } = props

  // Check if items exist and have the expected structure
  if (!items || items.length === 0) {
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

  const getNumberSizeClasses = (size?: NumberSize | null) => {
    switch (size) {
      case 'small':
        return 'text-4xl md:text-5xl'
      case 'medium':
        return 'text-5xl md:text-6xl'
      case 'large':
        return 'text-6xl md:text-7xl'
      default:
        return 'text-5xl md:text-6xl'
    }
  }

  const getAlignmentClasses = (alignment?: Alignment | null) => {
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

  const getVerticalAlignmentClasses = (alignment?: VerticalAlignment | null) => {
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

  // Number with color or gradient
  const StyledNumber: React.FC<{ numberStyle: NumberStyle }> = ({ numberStyle }) => {
    const { value, prefix, suffix, colorType, colorValue, gradientValues } = numberStyle

    // For solid color
    if (colorType === 'color' && colorValue) {
      return (
        <div className="flex items-center">
          <span style={{ color: colorValue }}>
            {prefix && <span className="mr-1">{prefix}</span>}
            <span>{value}</span>
            {suffix && <span className="ml-1">{suffix}</span>}
          </span>
        </div>
      )
    }

    // For gradient
    if (colorType === 'gradient' && gradientValues) {
      const { start, mid, end, angle, midPos } = gradientValues

      // Only proceed if all required values are present
      if (start && mid && end && angle && midPos !== undefined) {
        const gradientStyle = {
          background: `linear-gradient(${angle}, ${start} 0%, ${mid} ${midPos}%, ${end} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }

        return (
          <div className="flex items-center">
            <span style={gradientStyle}>
              {prefix && <span className="mr-1">{prefix}</span>}
              <span>{value}</span>
              {suffix && <span className="ml-1">{suffix}</span>}
            </span>
          </div>
        )
      }
    }

    // Default - just show the number as is
    return (
      <div className="flex items-center">
        <span>
          {prefix && <span className="mr-1">{prefix}</span>}
          <span>{value}</span>
          {suffix && <span className="ml-1">{suffix}</span>}
        </span>
      </div>
    )
  }

  return (
    <div className="container px-0 py-8">
      <div className={cn('grid w-full gap-x-8 gap-y-12', getGridColsClasses())}>
        {items.map((item, index) => {
          const { number, header, content } = item

          const numberContainerClasses = [
            'font-bold mb-4',
            getNumberSizeClasses(number?.size),
          ].join(' ')

          const headerContainerClasses = [
            'w-full mb-2',
            getAlignmentClasses(header?.horizontalAlignment),
            getVerticalAlignmentClasses(header?.verticalAlignment),
            header?.equalHeight ? 'flex flex-col h-full' : '',
          ].join(' ')

          const itemClasses = [
            'flex flex-col',
            getAlignmentClasses(number?.alignment),
            getColSpanClasses(),
          ].join(' ')

          return (
            <div key={index} className={itemClasses}>
              <div className={numberContainerClasses}>
                <StyledNumber numberStyle={number} />
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

export default NumberGridBlock
