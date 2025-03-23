import React from 'react'
import { parseGradientTitle } from '../utilities/gradientTitle'

interface GradientTitleProps {
  title: string
  gradientText: string
  className?: string
}

/**
 * Renders a title with a gradient text portion
 */
export const GradientTitle: React.FC<GradientTitleProps> = ({
  title,
  gradientText,
  className = '',
}) => {
  const { before, gradient, after, hasGradient } = parseGradientTitle(title, gradientText)

  if (!hasGradient) {
    return <span className={className}>{title}</span>
  }

  return (
    <span className={className}>
      {before}
      <span className="bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-clip-text text-transparent">
        {gradient}
      </span>
      {after}
    </span>
  )
}

export default GradientTitle
