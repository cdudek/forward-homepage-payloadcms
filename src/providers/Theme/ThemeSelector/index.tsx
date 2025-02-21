'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

import { useTheme } from '../index'

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Select onValueChange={() => setTheme('light')} value={theme}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
      </SelectContent>
    </Select>
  )
}
