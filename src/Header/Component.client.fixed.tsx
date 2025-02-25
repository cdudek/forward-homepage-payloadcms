'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Change header style after scrolling past a certain threshold
      const viewportTransition = window.innerHeight * 0.5
      setIsScrolled(window.scrollY > viewportTransition)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="fixed left-0 right-0 top-0 z-50 py-6">
      {/* Wider container for the header */}
      <div className="mx-auto w-[1400px] max-w-[90%]">
        <div
          className={`grid grid-cols-3 items-center rounded-2xl p-2 transition-all duration-300 ${
            isScrolled
              ? 'bg-black/30 text-white backdrop-blur-sm'
              : 'bg-white/10 text-gray-900 shadow-sm backdrop-blur-md'
          }`}
        >
          {/* Logo on the left */}
          <div className="justify-self-start px-2">
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          </div>

          {/* Navigation centered */}
          <div className="hidden justify-self-center md:block">
            <HeaderNav data={data} />
          </div>

          {/* Empty div to balance layout */}
          <div className="justify-self-end" />
        </div>
      </div>
    </header>
  )
}
