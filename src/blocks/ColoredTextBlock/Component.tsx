import React from 'react'
import { ColoredTextBlock as ColoredTextBlockProps } from '@/payload-types'

type ColorType =
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

export const ColoredTextBlock: React.FC<ColoredTextBlockProps> = ({
  textElements,
  typographyType = 'h1',
  color = 'default',
  alignment = 'left',
  margins = { top: 'none', bottom: 'none' },
}) => {
  const getMarginValue = (margin: string | null | undefined) => {
    switch (margin) {
      case 'small':
        return 'my-8' // 2rem
      case 'medium':
        return 'my-16' // 4rem
      case 'large':
        return 'my-32' // 8rem
      default:
        return 'my-0'
    }
  }

  const getColor = (type: ColorType): string | undefined => {
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

  const textColor = getColor(color || 'default')

  if (!textElements?.length) return null

  const WrapperTag = typographyType || 'div'

  const alignmentClasses = alignment
    ? {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      }[alignment]
    : 'text-left'

  const marginClasses = `${getMarginValue(margins?.top)} ${getMarginValue(margins?.bottom)}`

  const renderTextElement = (element: any, index: number) => {
    let text = element.text

    if (element.preserveSpaces) {
      text = text.replace(/ /g, '\u00A0')
    }

    const content = (
      <span key={index} className={element.useColor ? textColor : undefined}>
        {text}
      </span>
    )

    if (element.wrapInContainer) {
      return (
        <div key={index} className="text-element-container">
          {content}
        </div>
      )
    }

    return (
      <React.Fragment key={index}>
        {content}
        {element.addLineBreak && <br />}
      </React.Fragment>
    )
  }

  return (
    <div className={`gradient-header-block ${alignmentClasses} ${marginClasses}`}>
      <WrapperTag className="m-0">
        {textElements.map((element, index) => renderTextElement(element, index))}
      </WrapperTag>
    </div>
  )
}
