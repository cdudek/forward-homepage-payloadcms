'use client'

import React, { createContext, useContext, useState } from 'react'

type HeaderColorContextType = {
  color: 'light' | 'dark'
  setColor: (color: 'light' | 'dark') => void
  mobileMenuTheme: 'light' | 'dark'
  setMobileMenuTheme: (theme: 'light' | 'dark') => void
}

const HeaderColorContext = createContext<HeaderColorContextType | undefined>(undefined)

export function HeaderColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<'light' | 'dark'>('light')
  const [mobileMenuTheme, setMobileMenuTheme] = useState<'light' | 'dark'>('light')

  return (
    <HeaderColorContext.Provider value={{ color, setColor, mobileMenuTheme, setMobileMenuTheme }}>
      {children}
    </HeaderColorContext.Provider>
  )
}

export function useHeaderColor() {
  const context = useContext(HeaderColorContext)
  if (context === undefined) {
    throw new Error('useHeaderColor must be used within a HeaderColorProvider')
  }
  return context
}
