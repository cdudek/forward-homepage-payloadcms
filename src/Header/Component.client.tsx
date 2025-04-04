'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { clsx } from 'clsx'
import { useSwipeable } from 'react-swipeable'

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
  const { color, mobileMenuTheme } = useHeaderColor()

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsMobileMenuOpen(false),
    trackMouse: false,
    // Optional: Only registers swipes with higher velocity and longer distance
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    delta: 50,
  })

  useEffect(() => {
    // Check if AdminBar is present
    const adminBar = document.querySelector('[data-payload-admin-bar]')
    setHasAdminBar(!!adminBar)
  }, [])

  const headerColor = {
    dark: 'text-fwd-black',
    light: 'text-white',
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const headerPositioning = clsx('left-0 right-0 z-50 w-full', hasAdminBar ? 'top-10' : 'top-0')

  const logoVariant = color === 'dark' ? 'light' : 'dark'

  const mobileHeader = (
    <>
      <header
        className={clsx(
          headerPositioning,
          'absolute py-2 md:hidden',
          color === 'dark' ? headerColor.light : headerColor.dark,
        )}
      >
        <div className="container mx-auto flex items-center justify-between rounded-xl p-4 px-4">
          <Link href="/">
            <Logo loading="eager" priority="high" variant={logoVariant} />
          </Link>
        </div>
      </header>
      <button
        onClick={toggleMobileMenu}
        className={clsx(
          'flex items-center justify-center rounded-full p-2',
          'fixed right-4 top-4 z-50 md:hidden',
        )}
        aria-label="Toggle menu"
      >
        <div
          className={clsx(
            'absolute inset-0 rounded-full shadow-md',
            mobileMenuTheme === 'dark' ? 'bg-white/20' : 'bg-gray-50/30',
          )}
        />
        <Menu
          size={24}
          className={clsx(
            'relative z-10',
            mobileMenuTheme === 'dark' ? 'text-white' : 'text-fwd-black',
          )}
        />
      </button>
    </>
  )

  // DESKTOP HEADER — fixed at the top, color changes when scrolled
  const desktopHeader = (
    <header className={clsx(headerPositioning, 'absolute hidden py-6 md:block')}>
      <div className="container mx-auto md:px-2 lg:px-2 xl:px-0 2xl:px-0">
        <div
          className={clsx(
            'grid grid-cols-3 items-center rounded-full p-4 transition-all duration-300',
            color === 'dark' ? headerColor.light : headerColor.dark,
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
  const mobileMenuOverlay = (
    <>
      {/* Backdrop for click-out */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-500 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Slide-in menu panel */}
      <div
        {...swipeHandlers}
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex w-4/5 max-w-xs transform flex-col transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          'bg-fwd-black text-white shadow-[5px_0_20px_rgba(0,0,0,0.25)]',
        )}
      >
        <div className="container flex items-center justify-between p-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo loading="eager" priority="high" variant="light" />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="relative flex items-center justify-center rounded-full p-2 text-white"
            aria-label="Close menu"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-150 active:opacity-10" />
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

        <div className="flex flex-1 flex-col space-y-0 p-4 text-xl">
          {data?.navItems?.map((item, i) => {
            const href =
              item.link.type === 'reference' &&
              typeof item.link.reference?.value === 'object' &&
              'slug' in item.link.reference.value
                ? `${item.link.reference?.relationTo !== 'pages' ? `/${item.link.reference?.relationTo}` : ''}/${
                    item.link.reference.value.slug
                  }`
                : item.link.url || '/'

            return (
              <React.Fragment key={i}>
                {i > 0 && <div className="my-2 h-px w-full bg-white opacity-10" />}
                <Link
                  href={href}
                  className="relative block w-full py-8 transition-colors hover:opacity-70"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-150 focus:opacity-20 active:opacity-20" />
                  <span className="relative pl-4 !text-2xl">{item.link.label}</span>
                </Link>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )

  return (
    <>
      {mobileHeader}
      {desktopHeader}
      {mobileMenuOverlay}
    </>
  )
}
