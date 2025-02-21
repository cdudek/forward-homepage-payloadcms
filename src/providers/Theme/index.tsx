'use client'
import React, { createContext, useContext } from 'react'

type Theme = 'light'

interface ThemeContextType {
  theme: Theme
}

const initialContext: ThemeContextType = {
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext.Provider value={{ theme: 'light' }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
