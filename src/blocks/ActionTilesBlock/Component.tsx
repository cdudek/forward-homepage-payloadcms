import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Media } from '@/payload-types'

type ActionTilesBlockProps = {
  tiles: {
    title: string
    description: string
    backgroundImage: Media
    link: {
      type: 'reference' | 'custom'
      label?: string
      reference?: {
        relationTo: string
        value: string
      }
      url?: string
      newTab?: boolean
    }
  }[]
}

export const ActionTilesBlock: React.FC<ActionTilesBlockProps> = ({ tiles }) => {
  const isTwoTiles = tiles.length === 2

  return (
    <div className="container py-8">
      <div
        className={cn(
          'grid w-full gap-8',
          isTwoTiles
            ? 'mx-auto max-w-7xl grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-3',
        )}
      >
        {tiles.map((tile, i) => {
          const { title, description, backgroundImage, link } = tile
          const href =
            link.type === 'custom'
              ? link.url
              : `/${link.reference?.relationTo}/${link.reference?.value}`

          return (
            <div className="flex items-center justify-center text-white" key={i}>
              <Link
                href={href || '#'}
                target={link.newTab ? '_blank' : undefined}
                className="group block transform-gpu"
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl p-12',
                    'transform transition-all duration-500 ease-out group-hover:-translate-y-2',
                    'shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
                    'after:absolute after:inset-[1px] after:rounded-2xl after:border after:border-white/0 after:transition-all after:duration-500',
                    'group-hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)]',
                    isTwoTiles && 'aspect-[1.618/1]',
                  )}
                >
                  {/* Background Image with subtle zoom and parallax */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.02]"
                    style={{
                      backgroundImage: `url(${backgroundImage.url})`,
                    }}
                  />

                  {/* Gradient overlay for depth and text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-0" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex-1 transform transition-transform duration-500 ease-out group-hover:translate-y-[-4px]">
                      <h2 className="mb-4 text-4xl font-bold text-white transition-colors duration-500 ease-out group-hover:text-white/95">
                        {title}
                      </h2>
                      <p className="hidden text-lg text-white/80 transition-colors duration-500 ease-out group-hover:text-white/90 lg:block">
                        {description}
                      </p>
                    </div>

                    {/* Link indicator with enhanced animation */}
                    <div className="mt-6 flex items-center justify-end">
                      {/* <div className="mt-6 flex items-center justify-end overflow-hidden"> */}
                      <span className="transform text-base font-medium tracking-wide text-white/70 transition-all duration-500 ease-out group-hover:translate-x-[-4px] group-hover:text-white">
                        {link.label || 'Learn more'}
                      </span>
                      <svg
                        className="ml-2 h-5 w-5 transform text-white/70 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
