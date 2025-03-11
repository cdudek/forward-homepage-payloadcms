import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { SlopedEdgeWrapper } from '@/components/SlopedEdgeWrapper'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, sectionHeight, padding, slope, enableBackground, backgroundColor } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
    centeredThree: 'col-start-2',
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

  return (
    <SlopedEdgeWrapper
      enabled={slope?.enabled ?? false}
      position={slope?.position ?? undefined}
      backgroundColor={enableBackground ? (backgroundColor ?? undefined) : undefined}
      className={cn('flex items-center', heightClasses[sectionHeight || 'none'])}
    >
      <div
        className={cn(
          'container w-full',
          paddingX[padding?.x || 'medium'],
          paddingY[padding?.y || 'medium'],
        )}
      >
        <div className="grid w-full gap-x-8 gap-y-8 lg:grid-cols-5 lg:gap-x-8">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn('col-span-3', {
                    [`lg:${colsSpanClasses[size!]}`]: size === 'centeredThree',
                    [`lg:col-span-${colsSpanClasses[size!]}`]: size !== 'centeredThree',
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
