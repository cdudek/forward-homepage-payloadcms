'use client'

import { useEffect } from 'react'
import { useHeaderColor } from './HeaderColorContext'

type HeaderColorSetterProps = {
  color: 'light' | 'dark'
  mobileMenuTheme?: 'light' | 'dark'
}

export function HeaderColorSetter({ color, mobileMenuTheme }: HeaderColorSetterProps) {
  const { setColor, setMobileMenuTheme } = useHeaderColor()

  useEffect(() => {
    setColor(color)
    if (mobileMenuTheme) {
      setMobileMenuTheme(mobileMenuTheme)
    }
  }, [color, mobileMenuTheme, setColor, setMobileMenuTheme])

  return null
}
