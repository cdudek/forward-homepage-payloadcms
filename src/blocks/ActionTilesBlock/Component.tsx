'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import renderedTitle from '@/utilities/gradientTitle'
import { htmlDecode } from '@/utilities/htmlDecode'
import { ActionTilesBlock as ActionTilesBlockProps } from '@/payload-types'
import { FadeInView } from '@/utilities/animations/FadeInView'
import { ParallaxContainer } from '@/utilities/animations/ParallaxContainer'

export const ActionTilesBlock: React.FC<ActionTilesBlockProps> = ({
  tiles = [],
  title,
  description,
  gradient,
}) => {
  const isTwoTiles = tiles?.length === 2

  const formattedTitle = renderedTitle(title, gradient)
  const tilesStepStart = description ? 3 : 2
  return (
    <div className="container py-8">
      <div className="container prose-sm px-0 py-8 text-center md:prose-md xl:prose-lg">
        <div className="mx-auto pb-8">
          <FadeInView animationStep={1}>
            <h2>{formattedTitle}</h2>
          </FadeInView>
          {description && (
            <FadeInView animationStep={2}>
              <p className="pb-8">{htmlDecode(description)}</p>
            </FadeInView>
          )}
        </div>
      </div>
      <ParallaxContainer>
        <FadeInView animationStep={tilesStepStart}>
          <div
            className={cn(
              'grid w-full gap-8',
              isTwoTiles
                ? 'mx-auto max-w-7xl grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-3',
            )}
          >
            {tiles?.map((tile, i) => {
              const { title, description, backgroundImage, link } = tile

              return (
                <div className="flex items-center justify-center text-white" key={'tile-' + i}>
                  <CMSLink
                    type={link.type}
                    url={link.type === 'custom' ? link.url : undefined}
                    reference={link.type === 'reference' ? link.reference : undefined}
                    newTab={link.newTab}
                    className="group block w-full"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.01,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        opacity: 0.95,
                      }}
                      initial={{
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                        borderColor: 'transparent',
                        opacity: 1,
                      }}
                      transition={{
                        type: 'tween',
                        duration: 0.3,
                        ease: [0.32, 0.67, 0.67, 1],
                      }}
                      whileTap={{
                        scale: 0.99,
                        transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                      }}
                      className={cn(
                        'relative overflow-hidden rounded-3xl border-2 border-transparent p-8',
                        'after:absolute after:inset-[1px] after:rounded-3xl after:border after:border-white/0 after:transition-all after:duration-300',
                        'will-change-transform',
                        isTwoTiles && 'aspect-[1.618/1]',
                      )}
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage:
                            typeof backgroundImage === 'object' && 'url' in backgroundImage
                              ? `url(${backgroundImage.url})`
                              : 'none',
                        }}
                      />

                      {/* Gradient overlay for depth and text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />

                      {/* Content */}
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="flex-1">
                          <h2 className="mb-4 text-4xl font-bold text-white">{title}</h2>
                          <p className="hidden text-lg text-white/80 lg:block">{description}</p>
                        </div>

                        {/* Custom button with white outline */}
                        <div className="mt-6 flex items-center justify-end">
                          <div className="rounded-full border border-white/70 px-6 py-2 font-light text-white/70 transition-all duration-300 ease-in-out group-hover:border-white group-hover:text-white">
                            {link.label || 'Learn more'}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CMSLink>
                </div>
              )
            })}
          </div>
        </FadeInView>
      </ParallaxContainer>
    </div>
  )
}
