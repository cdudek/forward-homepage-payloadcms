import React from 'react'
import { ColoredTextBlock as ColoredTextBlockProps } from '@/payload-types'

type ColorType = 'default' | 'gradient' | 'purple' | 'red' | 'orange' | 'black' | 'white'

export const ColoredTextBlock: React.FC<ColoredTextBlockProps> = ({
  textElements,
  typographyType = 'h1',
  colorType,
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

  const getColor = (type: ColorType) => {
    const colorMap = {
      purple: 'text-purple',
      red: 'text-red',
      orange: 'text-orange',
      lightGrey: 'text-grey-300',
      darkGrey: 'text-grey-700',
      black: 'text-black',
      white: 'text-white',

      gradient:
        'linear-gradient(90deg, hsl(var(--brand-gradient-start)), hsl(var(--brand-gradient-middle)), hsl(var(--brand-gradient-end)))',
    }

    return type === 'default' ? undefined : colorMap[type as keyof typeof colorMap]
  }

  const getTextStyle = (useColor: boolean = false) => {
    if (!useColor) return { style: {}, className: undefined }

    const color = getColor(colorType)

    if (colorType === 'gradient') {
      return {
        style: {
          backgroundImage: color,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        className: undefined,
      }
    }

    return {
      style: {},
      className: color,
    }
  }

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

    const textStyle = getTextStyle(element.useColor)
    const content = (
      <span key={index} style={textStyle.style} className={textStyle.className}>
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
