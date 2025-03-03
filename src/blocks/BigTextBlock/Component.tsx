// import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

export type BigTextBlockProps = {
  richText?: {
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
}

export const BigTextBlock: React.FC<BigTextBlockProps> = (props) => {
  const { richText } = props

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {richText && <RichText data={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
