'use client'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  // const pathname = usePathname()

  return (
    <header className="container relative z-20">
      <div className="grid grid-cols-3 items-center py-8">
        {/* Logo on the left */}
        <div className="justify-self-start">
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
    </header>
  )
}
