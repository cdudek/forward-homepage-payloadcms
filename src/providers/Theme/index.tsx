'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useState<Theme>('light')

  // Simplified setTheme that always sets light mode
  const setTheme = useCallback(() => {
    if (canUseDOM) {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  // Initial setup - always set light mode
  useEffect(() => {
    if (canUseDOM) {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
