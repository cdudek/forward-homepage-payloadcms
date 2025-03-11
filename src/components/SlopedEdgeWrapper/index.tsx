import { cn } from '@/utilities/ui'
import React from 'react'

type SlopedEdgeWrapperProps = {
  children: React.ReactNode
  enabled?: boolean
  position?: 'top' | 'bottom' | 'both'
  backgroundTheme?: 'default' | 'light' | 'dark' | undefined | null
  className?: string
  flex?: boolean
  minHeight?: string
}

export const SlopedEdgeWrapper: React.FC<SlopedEdgeWrapperProps> = ({
  children,
  enabled,
  position = 'bottom',
  backgroundTheme,
  className,
  flex,
  minHeight = '10vh',
}) => {
  const getStyles = () => {
    const styles: Record<string, string> = {}

    if (enabled) {
      switch (position) {
        case 'top':
          styles.clipPath = 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)'
          break
        case 'bottom':
          styles.clipPath = 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)'
          break
        case 'both':
          styles.clipPath = 'polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)'
          break
      }
    }

    return styles
  }

  const backgroundThemeMap = {
    default: undefined,
    light: 'bg-white',
    dark: 'bg-black',
  }

  const backgroundColor = backgroundTheme
    ? backgroundThemeMap[backgroundTheme as keyof typeof backgroundThemeMap]
    : undefined

  return (
    <div
      className={cn(
        'relative w-full',
        {
          'flex items-center': flex,
          [`min-h-[${minHeight}]`]: flex && minHeight,
        },
        className,
      )}
      style={getStyles()}
    >
      <div className="container mx-auto">
        <div
          className={cn('w-full', backgroundColor, {
            'pt-[calc(5vw+2rem)]': enabled && (position === 'top' || position === 'both'),
            'pb-[calc(5vw+2rem)]': enabled && (position === 'bottom' || position === 'both'),
            'pb-16': enabled && position === 'top',
            'pt-16': enabled && position === 'bottom',
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
