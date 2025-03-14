'use client'

import { useEffect } from 'react'
import { useHeaderColor } from './HeaderColorContext'

export const useSetHeaderColor = (color: 'light' | 'dark') => {
  const { setColor } = useHeaderColor()

  useEffect(() => {
    setColor(color)
  }, [color, setColor])
}
