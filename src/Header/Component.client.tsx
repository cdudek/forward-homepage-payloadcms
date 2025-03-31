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
    light: 'text-black',
    dark: 'text-white',
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
  const logoVariant = color === 'dark' ? 'dark' : 'default'

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
          <Logo loading="eager" priority="high" variant={logoVariant} />
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
              <Logo loading="eager" priority="high" variant={logoVariant} />
            </Link>
          </div>
          <div className="justify-self-center">
            <HeaderNav data={data} color={color} />
          </div>
          <div className="justify-self-end" />
        </div>
      </div>
    </header>
  )

  // Mobile menu overlay
  const mobileMenuOverlay = isMobileMenuOpen && (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex flex-col transition-opacity duration-300 md:hidden',
        color === 'dark' ? 'bg-black text-white' : 'bg-white text-black',
      )}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo loading="eager" priority="high" variant={logoVariant} />
        </Link>
        <button onClick={toggleMobileMenu} className="p-2" aria-label="Close menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center space-y-6 p-4 text-xl">
        {data?.navItems?.map((item, i) => {
          const href = item.link.url || '/'

          return (
            <Link
              key={i}
              href={href}
              className="py-2 transition-colors hover:opacity-70"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {mobileHeader}
      {desktopHeader}
      {mobileMenuOverlay}
    </>
  )
}
