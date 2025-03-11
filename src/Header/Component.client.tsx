'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { clsx } from 'clsx'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useHeaderColor } from './HeaderColorContext'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasAdminBar, setHasAdminBar] = useState(false)
  const { color } = useHeaderColor()

  useEffect(() => {
    // Check if AdminBar is present
    const adminBar = document.querySelector('[data-payload-admin-bar]')
    setHasAdminBar(!!adminBar)
  }, [])

  // Tailwind classes for each color variant
  const headerColor = {
    light: 'text-gray-900',
    dark: 'text-white backdrop-blur-sm',
    // light: 'bg-white/10 text-gray-900 shadow-sm backdrop-blur-md',
    // dark: 'bg-black/30 text-white backdrop-blur-sm',
  }

  // Handler for burger menu click
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // implement the actual mobile menu later
  }

  // Common header positioning classes
  const headerPositioning = clsx('left-0 right-0 z-50 w-full', hasAdminBar ? 'top-10' : 'top-0')

  // MOBILE HEADER — absolute so it doesn't push content
  // We do NOT apply scroll logic here; mobile uses the prop directly.
  const mobileHeader = (
    <header
      className={clsx(
        headerPositioning,
        'absolute py-2 md:hidden',
        color === 'dark' ? headerColor.dark : headerColor.light,
      )}
    >
      <div className="container mx-auto flex items-center justify-between rounded-xl p-2 px-4">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <button onClick={toggleMobileMenu} className="p-2" aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  )

  // DESKTOP HEADER — fixed at the top, color changes when scrolled
  const desktopHeader = (
    <header className={clsx(headerPositioning, 'absolute hidden py-6 md:block')}>
      <div className="container mx-auto md:px-2 lg:px-2 xl:px-0 2xl:px-0">
        <div
          className={clsx(
            'grid grid-cols-3 items-center rounded-full p-4 transition-all duration-300',
            color === 'dark' ? headerColor.dark : headerColor.light,
          )}
        >
          <div className="justify-self-start px-4">
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          </div>
          <div className="justify-self-center">
            <HeaderNav data={data} />
          </div>
          <div className="justify-self-end" />
        </div>
      </div>
    </header>
  )

  return (
    <>
      {mobileHeader}
      {desktopHeader}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">{/* Mobile menu content */}</div>
      )}
    </>
  )
}
