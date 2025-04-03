'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import cn from 'classnames'
import { CMSLink } from '@/components/Link'

type HeaderNavProps = {
  data: HeaderType
  color: 'light' | 'dark'
}

// import Link from 'next/link'
// import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, color }) => {
  const navItems = data?.navItems || []
  const textColor = color === 'light' ? 'text-white' : 'text-fwd-black'
  return (
    <nav className="flex items-center gap-8 pt-1">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn(
              textColor,
              'md:text-lg',
              // 'transition-colors duration-100'
            )}
          />
        )
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className={cn('w-5 text-primary', textColor)} />
      </Link> */}
    </nav>
  )
}
