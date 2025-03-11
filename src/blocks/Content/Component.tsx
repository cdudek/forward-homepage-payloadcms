import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { SlopedEdgeWrapper } from '@/components/SlopedEdgeWrapper'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

type backgroundColorType =
  | 'default'
  | 'black'
  | 'white'
  | 'grey-50'
  | 'grey-100'
  | 'grey-500'
  | 'grey-900'
  | undefined
  | null

type ColumnSize = 'full' | 'half' | 'oneThird' | 'twoThirds' | 'centeredThree'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, sectionHeight, padding, slope, enableBackground, backgroundColor } = props

  const colsSpanClasses: Record<ColumnSize, string> = {
    full: 'col-span-12',
    half: 'col-span-6',
    oneThird: 'col-span-4',
    twoThirds: 'col-span-8',
    centeredThree: 'col-span-12',
  }

  const paddingX = {
    none: 'px-0',
    small: 'px-4',
    medium: 'px-8',
    large: 'px-16',
  }

  const paddingY = {
    none: 'py-0',
    small: 'py-4',
    medium: 'py-8',
    large: 'py-16',
  }

  const heightClasses = {
    none: 'min-h-[10vh]',
    full: 'min-h-screen',
    '75': 'min-h-[75vh]',
    '50': 'min-h-[50vh]',
  }

  const color = backgroundColor === 'default' ? undefined : backgroundColor

  return (
    <SlopedEdgeWrapper
      enabled={slope?.enabled ?? false}
      position={slope?.position ?? undefined}
      backgroundColor={enableBackground ? color : undefined}
      className={cn('flex items-center', heightClasses[sectionHeight || 'none'])}
    >
      <div
        className={cn(
          'container w-full',
          paddingX[padding?.x || 'medium'],
          paddingY[padding?.y || 'medium'],
        )}
      >
        <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn('col-span-12', {
                    [colsSpanClasses[size as ColumnSize]]: size,
                  })}
                  key={index}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}
                  {enableLink && <CMSLink {...link} />}
                </div>
              )
            })}
        </div>
      </div>
    </SlopedEdgeWrapper>
  )
}
