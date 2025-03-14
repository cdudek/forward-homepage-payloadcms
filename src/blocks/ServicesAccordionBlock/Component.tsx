'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import type { Service, Page, Post } from '@/payload-types'
import { SlopedEdgeWrapper } from '@/components/SlopedEdgeWrapper'
import { getColorBlends } from '@/utilities/getColorBlends'

type Props = {
  services: Service[]
  title: string
  gradient?: string
  link?: {
    type?: 'reference' | 'custom' | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | number | Page | Post
    } | null
    url?: string | null
    label: string
  } | null
  limit?: number
}

// const MotionHeader = motion.h2
const ROTATION_INTERVAL = 3000

export const ServicesAccordionBlock: React.FC<Props> = ({
  services,
  title = '',
  gradient = '',
  link,
  limit = 5,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState(false)

  // Sort services by position and limit the number
  const sortedServices = [...services]
    .sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
    .slice(0, limit)

  // Generate colors for each service
  const colors = getColorBlends(sortedServices.length, true)

  // Auto-rotate every 5 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return // Don't set up timer if hovered

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % sortedServices.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(timer)
  }, [sortedServices.length, isHovered])

  // Split title to wrap gradient part if it exists in the title
  const renderTitle = () => {
    if (!gradient) return title

    const parts = title.split(gradient)
    if (parts.length === 1) return title

    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-clip-text text-transparent">
          {gradient}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <div className="py-32">
      <SlopedEdgeWrapper enabled={true} position="both" backgroundTheme="light">
        <div className="container grid min-h-[60vh] grid-cols-1 gap-12 py-24 lg:grid-cols-2">
          {/* Left side - Main display */}
          <div className="sticky top-24 flex items-center">
            <div className="flex flex-col gap-6">
              <div className="prose prose-sm md:prose-base lg:prose-lg">
                <h2 className="m-0 bg-none p-0 text-5xl font-bold leading-tight">
                  {renderTitle()}
                </h2>
              </div>
              <div className="inline-flex">
                {link && <CMSLink {...link} appearance="outline" />}
              </div>
            </div>
          </div>

          {/* Right side - Accordion */}
          <div
            className="flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {sortedServices.map((service, index) => {
                const isActive = index === activeIndex
                const colorClass = colors[index]

                return (
                  <motion.div
                    key={service.id}
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? `var(--color-${colorClass}-50)` : 'transparent',
                      color: isActive ? `var(--color-${colorClass})` : 'var(--color-fwd-black)',
                      '--indicator-scale': isActive ? '1' : '0',
                      '--indicator-color': isActive ? `var(--color-${colorClass})` : 'transparent',
                    }}
                    onHoverStart={() => setActiveIndex(index)}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="group relative cursor-pointer border-b border-gray-200 will-change-transform"
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="relative z-10 flex w-full flex-col gap-2 py-6 pl-6 text-left">
                      <h2 className="text-3xl font-medium transition-colors duration-200 ease-out will-change-transform">
                        {service.title}
                      </h2>
                    </div>

                    {/* Expandable content with smooth animation */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        marginBottom: isActive ? '1.5rem' : 0,
                      }}
                      transition={{
                        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        marginBottom: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      }}
                      className="overflow-hidden px-6 will-change-transform"
                    >
                      {service.descriptionShort && (
                        <div className="line-clamp-2 text-sm text-fwd-grey-600">
                          {service.descriptionShort}
                        </div>
                      )}
                    </motion.div>

                    {/* Progress indicator */}
                    <div
                      className="absolute left-0 top-0 h-full w-1 transition-all duration-200 ease-out will-change-transform"
                      style={{
                        backgroundColor: 'var(--indicator-color)',
                        transform: `scaleY(var(--indicator-scale))`,
                      }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </SlopedEdgeWrapper>
    </div>
  )
}

export default ServicesAccordionBlock
