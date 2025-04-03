import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

type ColumnSize = 'full' | 'half' | 'oneThird' | 'twoThirds' | 'centeredThree'
// type BackgroundThemeType = 'default' | 'light' | 'dark' | null

export const ContentBlock: React.FC<Partial<ContentBlockProps>> = (props) => {
  // Use optional chaining to safely access properties
  const { columns = [], padding } = props || {}

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

  // const heightClasses = {
  //   none: 'min-h-[10vh]',
  //   full: 'min-h-screen',
  //   '75': 'min-h-[75vh]',
  //   '50': 'min-h-[50vh]',
  // }

  // Function to map payload link appearance to button variant
  const mapAppearance = (appearance: string | null | undefined) => {
    switch (appearance) {
      case 'default':
        return 'primary'
      case 'primary':
        return 'primary'
      case 'secondary':
        return 'secondary'
      case 'outline':
        return 'outline'
      case 'primaryIcon':
        return 'primaryIcon'
      case 'secondaryIcon':
        return 'secondaryIcon'
      case 'outlineIcon':
        return 'outlineIcon'
      default:
        return 'primary' // Default to primary if not specified
    }
  }

  return (
    <div
      className={cn(
        'container w-full',
        paddingX[padding?.x || 'medium'],
        paddingY[padding?.y || 'medium'],
      )}
    >
      <div className="w-full grid-cols-12 gap-x-8 gap-y-8">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink = false, link, richText, size, className = '' } = col || {}

            return (
              <div
                className={cn('col-span-12', {
                  [colsSpanClasses[size as ColumnSize]]: size,
                })}
                key={index}
              >
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className={className || undefined}
                  />
                )}
                {enableLink && link && (
                  <CMSLink {...link} appearance={mapAppearance(link.appearance)} />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
