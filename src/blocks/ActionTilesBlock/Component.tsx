'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
                className="group block w-full"
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
                  }}
                  className={cn(
                    'relative overflow-hidden rounded-2xl p-12',
                    'shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
                    'after:absolute after:inset-[1px] after:rounded-2xl after:border after:border-white/0 after:transition-all after:duration-500',
                    'group-hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)]',
                    isTwoTiles && 'aspect-[1.618/1]',
                  )}
                >
                  {/* Background Image with subtle zoom and parallax */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                    style={{
                      backgroundImage: `url(${backgroundImage.url})`,
                    }}
                    initial={false}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    }}
                  />

                  {/* Gradient overlay for depth and text readability */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent"
                    initial={false}
                    whileHover={{
                      opacity: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }}
                  />

                  {/* Content */}
                  <motion.div
                    className="relative z-10 flex h-full flex-col"
                    initial={false}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }}
                  >
                    <div className="flex-1">
                      <motion.h2
                        className="mb-4 text-4xl font-bold text-white"
                        initial={false}
                        whileHover={{
                          opacity: 0.95,
                          transition: { duration: 0.4 },
                        }}
                      >
                        {title}
                      </motion.h2>
                      <motion.p
                        className="hidden text-lg text-white/80 lg:block"
                        initial={false}
                        whileHover={{
                          opacity: 0.9,
                          transition: { duration: 0.4 },
                        }}
                      >
                        {description}
                      </motion.p>
                    </div>

                    {/* Link indicator with enhanced animation */}
                    <motion.div
                      className="mt-6 flex items-center justify-end"
                      initial={false}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      }}
                    >
                      <motion.span
                        className="text-base font-medium tracking-wide text-white/70"
                        initial={false}
                        whileHover={{
                          opacity: 1,
                          x: -4,
                          transition: { duration: 0.6 },
                        }}
                      >
                        {link.label || 'Learn more'}
                      </motion.span>
                      <motion.svg
                        className="ml-2 h-5 w-5 text-white/70"
                        initial={false}
                        whileHover={{
                          x: 4,
                          opacity: 1,
                          transition: { duration: 0.6 },
                        }}
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
                      </motion.svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
