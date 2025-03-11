import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, sectionHeight, padding, slope, enableBackground, backgroundColor } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
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

  const getStyles = () => {
    const styles: Record<string, string> = {}

    if (enableBackground && backgroundColor) {
      styles.backgroundColor = backgroundColor
    }

    if (slope?.enabled) {
      styles.clipPath =
        slope.position === 'top'
          ? 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)'
    }

    return styles
  }

  return (
    <div
      className={cn('relative flex w-full items-center', heightClasses[sectionHeight || 'none'])}
      style={getStyles()}
    >
      <div
        className={cn(
          'container w-full',
          paddingX[padding?.x || 'medium'],
          paddingY[padding?.y || 'medium'],
          {
            'pt-[calc(5vw+2rem)]': slope?.enabled && slope.position === 'top',
            'pb-[calc(5vw+2rem)]': slope?.enabled && slope.position === 'bottom',
          },
        )}
      >
        <div className="grid w-full grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
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
    </div>
  )
}
