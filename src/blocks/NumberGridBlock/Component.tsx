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
type ColorType =
  | 'default'
  | 'gradient'
  | 'purple'
  | 'red'
  | 'orange'
  | 'black'
  | 'white'
  | 'primary-background'

type NumberStyle = {
  value: string
  prefix?: string | null
  suffix?: string | null
  size?: NumberSize | null
  colorType?: ColorType | null
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
    const { value, prefix, suffix, colorType } = numberStyle

    const getColor = (type: ColorType) => {
      const colorMap = {
        purple: 'hsl(var(--color-purple))',
        red: 'hsl(var(--color-red))',
        orange: 'hsl(var(--color-orange))',
        black: 'hsl(var(--color-black))',
        white: 'hsl(var(--color-white))',
        'primary-background': 'hsl(var(--semantic-background-primary))',
        gradient:
          'linear-gradient(90deg, hsl(var(--brand-gradient-start)), hsl(var(--brand-gradient-middle)), hsl(var(--brand-gradient-end)))',
      }

      return type === 'default' ? undefined : colorMap[type as keyof typeof colorMap]
    }

    const getStyle = () => {
      if (!colorType || colorType === 'default') return {}

      const color = getColor(colorType)
      if (!color) return {}

      if (colorType === 'gradient') {
        return {
          background: color,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }
      }

      return { color }
    }

    return (
      <div className="flex items-center">
        <span style={getStyle()}>
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
