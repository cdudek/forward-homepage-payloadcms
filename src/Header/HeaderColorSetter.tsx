'use client'

import { useEffect } from 'react'
import { useHeaderColor } from './HeaderColorContext'

export function HeaderColorSetter({ color }: { color: 'light' | 'dark' }) {
  const { setColor } = useHeaderColor()

  useEffect(() => {
    setColor(color)
  }, [color, setColor])

  return null
}
