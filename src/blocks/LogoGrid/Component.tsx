import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Props = {
  title?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  size?: number // Now a number instead of string
  logos?: Media[]
}

export const LogoGridBlock: React.FC<Props> = ({ title, size = 5, logos }) => {
  const gridCols = Math.min(Math.max(size, 1), 12) // Ensure grid size stays within 1-12

  return (
    <div className="container relative z-10 my-32">
      <div className="flex flex-col gap-y-8">
        {title && <RichText data={title} enableGutter={false} />}
      </div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }} // Use `size` to define column count
      >
        {logos &&
          logos.length > 0 &&
          logos.map((logo, index) => (
            <div
              key={index}
              className="flex aspect-square w-full items-center justify-center border border-gray-300 bg-gray-100"
            >
              <div className="flex h-3/4 w-3/4 items-center justify-center">
                <Media className="max-h-full max-w-full object-contain" resource={logo.image} />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
