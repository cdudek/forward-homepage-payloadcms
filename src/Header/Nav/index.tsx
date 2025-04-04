'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import cn from 'classnames'
import { CMSLink } from '@/components/Link'

type HeaderNavProps = {
  data: HeaderType
  color: 'light' | 'dark'
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, color = 'dark' }) => {
  const navItems = data?.navItems || []
  const textColor = color === 'light' ? 'text-fwd-black' : 'text-white'
  return (
    <nav className="flex items-center gap-8 pt-1">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink key={i} {...link} appearance="link" className={cn(textColor, 'md:text-lg')} />
        )
      })}
    </nav>
  )
}
