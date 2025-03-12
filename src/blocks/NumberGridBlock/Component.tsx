'use client'

import React from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { NumberGridBlock as NumberGridBlockProps } from '@/payload-types'

// Define types for internal use
type NumberSize = 'small' | 'medium' | 'large'
type Alignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'middle' | 'bottom'
type ColorTypeType =
  | 'default'
  | 'gradient'
  | 'purple'
  | 'red'
  | 'orange'
  | 'black'
  | 'white'
  | 'grey-400'
  | 'grey-600'
  | 'grey-800'

type NumberStyle = {
  value: string
  prefix?: string | null
  suffix?: string | null
  size?: NumberSize | null
  colorType?: ColorType | null
  alignment?: Alignment | null
}

type NumberGridItem = {
  number: NumberStyle
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

  const getColor = (type: ColorTypeType): string | undefined => {
    if (type === 'gradient') {
      return 'bg-gradient-to-r from-fwd-purple from-5% via-fwd-red via-50% to-fwd-orange to-95% inline-block text-transparent bg-clip-text'
    }

    const colorMap = {
      default: undefined,
      purple: 'text-fwd-purple',
      red: 'text-fwd-red',
      orange: 'text-fwd-orange',
      black: 'text-fwd-black',
      white: 'text-fwd-white',
      'grey-400': 'text-fwd-grey-400',
      'grey-600': 'text-fwd-grey-600',
      'grey-800': 'text-fwd-grey-800',
    }

    return colorMap[type]
  }

  // Number with color or gradient
  const StyledNumber: React.FC<{ numberStyle: NumberStyle }> = ({ numberStyle }) => {
    const { value, prefix, suffix, colorType } = numberStyle

    const numberColor = getColor(colorType || 'default')

    return (
      <div className="flex items-center">
        <span className={numberColor}>
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
          const { number, content } = item

          const numberContainerClasses = [
            // 'font-bold mb-4',
            getNumberSizeClasses(number?.size),
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
