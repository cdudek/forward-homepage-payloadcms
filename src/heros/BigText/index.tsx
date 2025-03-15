'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'

export const BigTextHero: React.FC<Page['hero']> = ({
  links,
  richText,
  title = '',
  subtitle,
  gradientText,
}) => {
  const renderTitle = () => {
    if (!gradientText) return title

    const parts = title?.split(gradientText)
    if (parts?.length === 1) return title

    return (
      <>
        {parts?.[0]}
        <span className="bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-clip-text text-transparent">
          {gradientText}
        </span>
        {parts?.[1]}
      </>
    )
  }

  const gradientTitle = renderTitle()

  return (
    <div className="relative flex min-h-[90vh] w-full items-center md:mt-28 md:min-h-[75vh]">
      <div className="container mx-auto w-full">
        <div className="w-full">
          <div className="grid w-full grid-cols-12">
            <div className="col-span-12 text-center">
              <div className="prose-sm mx-auto max-w-none md:prose-md xl:prose-lg">
                <p className="text-fwd-grey-400">{subtitle}</p>
                <h1 className="mt-0">{gradientTitle}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigTextHero
