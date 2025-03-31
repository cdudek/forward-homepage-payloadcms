import React from 'react'
import { ColoredTextBlock as ColoredTextBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const ColoredTextBlock: React.FC<ColoredTextBlockProps> = ({ textElements, theme }) => {
  const bgColor = theme === 'dark' ? 'bg-fwd-black' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'

  if (!textElements?.length) return null

  return (
    <div className={cn('container mx-auto flex min-h-screen items-center', bgColor, textColor)}>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="prose prose-sm col-span-12 max-w-none text-center md:prose-base lg:prose-lg">
          <h3 className="m-0">
            {textElements.map((element, index) => (
              <span key={'element-' + index}>{element.text}</span>
            ))}
          </h3>
        </div>
      </div>
    </div>
  )
}
