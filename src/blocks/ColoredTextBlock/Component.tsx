import React from 'react'
import { ColoredTextBlock as ColoredTextBlockProps } from '@/payload-types'

export const ColoredTextBlock: React.FC<ColoredTextBlockProps> = ({
  textElements,
  typographyType = 'h1',
  colorType,
  colorValue,
  gradientValues,
  alignment = 'left',
  margins = { top: 'none', bottom: 'none' },
}) => {
  const getMarginValue = (margin: string) => {
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

  const getTextStyle = (useColor: boolean = false) => {
    if (!useColor) return {}

    if (colorType === 'color' && colorValue) {
      return { color: colorValue }
    }

    if (colorType === 'gradient' && gradientValues) {
      const { startColor, midColor, endColor, direction, midPosition } = gradientValues
      return {
        backgroundImage: `linear-gradient(${direction}, ${startColor} 0%, ${midColor} ${midPosition}%, ${endColor} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    }

    return {}
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

  const marginClasses = `${getMarginValue(margins.top)} ${getMarginValue(margins.bottom)}`

  const renderTextElement = (element: any, index: number) => {
    let text = element.text

    if (element.preserveSpaces) {
      text = text.replace(/ /g, '\u00A0')
    }

    const content = (
      <span key={index} style={getTextStyle(element.useColor)}>
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
