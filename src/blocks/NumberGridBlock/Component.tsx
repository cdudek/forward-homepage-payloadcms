'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { NumberGridBlock as NumberGridBlockType } from '@/payload-types'

type Props = NumberGridBlockType
type NumberItem = NonNullable<Props['items']>[number]
type NumberConfig = NonNullable<NumberItem['number']>

const getGridColsClasses = (columns: Props['columns']) => {
  switch (columns) {
    case 'oneThird':
      return 'grid-cols-4 lg:grid-cols-12'
    case 'oneQuarter':
      return 'grid-cols-4 lg:grid-cols-12'
    default:
      return 'grid-cols-4 lg:grid-cols-12'
  }
}

const getColSpanClasses = (columns: Props['columns']) => {
  switch (columns) {
    case 'oneThird':
      return 'col-span-4 md:col-span-2 lg:col-span-4'
    case 'oneQuarter':
      return 'col-span-4 md:col-span-2 lg:col-span-3'
    default:
      return 'col-span-4 md:col-span-2 lg:col-span-4'
  }
}

const getNumberSizeClasses = (size: NumberConfig['size']) => {
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

const getAlignmentClasses = (alignment: NumberConfig['alignment']) => {
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

const getColor = (type: NonNullable<NumberConfig['colorType']>): string | undefined => {
  if (type === 'gradient') {
    return 'bg-gradient-to-r from-fwd-purple from-5% via-fwd-red via-50% to-fwd-orange to-95% inline-block text-transparent bg-clip-text'
  }

  const colorMap = {
    default: undefined,
    gradient: '', // This will never be used due to the if check above
    purple: 'text-fwd-purple',
    red: 'text-fwd-red',
    orange: 'text-fwd-orange',
    black: 'text-fwd-black',
    white: 'text-fwd-white',
    'grey-400': 'text-fwd-grey-400',
    'grey-600': 'text-fwd-grey-600',
    'grey-800': 'text-fwd-grey-800',
  } as const satisfies Record<NonNullable<NumberConfig['colorType']>, string | undefined>

  return colorMap[type]
}

type StyledNumberProps = {
  number: NumberConfig
}

const StyledNumber: React.FC<StyledNumberProps> = ({ number }) => {
  const { value, prefix, suffix, colorType } = number
  const numberColor = getColor(colorType ?? 'default')

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

export const NumberGridBlock: React.FC<Props> = ({ columns, items, subheader }) => {
  if (!items?.length) {
    return null
  }

  return (
    <div className="container px-0 py-8">
      {subheader && (
        <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8 py-12">
          <div className="col-span-12">
            <RichText data={subheader} enableGutter={false} />
          </div>
        </div>
      )}
      <div className={cn('grid w-full gap-x-8 gap-y-6', getGridColsClasses(columns))}>
        {items.map((item: NumberItem, index: number) => {
          const { number, content } = item
          if (!number) return null

          const numberContainerClasses = cn('mb-0 font-medium', getNumberSizeClasses(number.size))

          const itemClasses = cn(
            'flex flex-col',
            getAlignmentClasses(number.alignment),
            getColSpanClasses(columns),
          )

          return (
            <div key={index} className={itemClasses}>
              <div className={numberContainerClasses}>
                <StyledNumber number={number} />
              </div>
              {content && (
                <div className="text-fwd-grey-700 prose prose-sm w-full max-w-none prose-p:mt-0">
                  {content && <RichText data={content} />}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NumberGridBlock
