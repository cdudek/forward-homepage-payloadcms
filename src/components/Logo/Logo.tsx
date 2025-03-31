import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'default' | 'light' | 'color' | 'dark'
  height?: number
  width?: number
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    variant: variantFromProps = 'default',
    height = 34,
    width = 193,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const variant = {
    default: '/forward-logo-white.svg',
    light: '/forward-logo-white.svg',
    dark: '/forward-logo-dark.svg',
    color: '/forward-logo-white-color.svg',
  }

  const logoSrc = variant[variantFromProps]

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="forward Labs Logo"
      width={width}
      height={height}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-[25px] w-full max-w-[9.375rem]', className)}
      // TODO replace with dynamic domain based on environment
      src={logoSrc}
    />
  )
}
