'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import type { Service, Page, Post } from '@/payload-types'

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

const MotionHeader = motion.h2

export const ServicesAccordionBlock: React.FC<Props> = ({
  services,
  title = '',
  gradient = '',
  link,
  limit = 5,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // Sort services by position and limit the number
  const sortedServices = [...services]
    .sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
    .slice(0, limit)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % sortedServices.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [sortedServices.length])

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
    <div className="container grid grid-cols-1 gap-12 py-24 lg:grid-cols-2">
      {/* Left side - Main display */}
      <div className="relative flex flex-col items-start justify-center">
        <div className="flex flex-col gap-6">
          <div className="prose prose-sm md:prose-base lg:prose-lg">
            <h2 className="m-0 bg-none p-0 text-5xl font-bold leading-tight">{renderTitle()}</h2>
          </div>
          <div className="inline-flex">{link && <CMSLink {...link} appearance="outline" />}</div>
        </div>
      </div>

      {/* Right side - Accordion */}
      <div className="flex flex-col">
        <div className="relative">
          {sortedServices.map((service, index) => {
            const isActive = index === activeIndex

            return (
              <motion.div
                key={service.id}
                initial={false}
                animate={{
                  backgroundColor: isActive ? 'var(--color-fwd-purple-50)' : 'transparent',
                }}
                className="relative cursor-pointer border-b border-gray-200 last:border-none"
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={cn(
                    'flex w-full flex-col gap-2 py-6 pl-6 text-left transition-colors hover:text-fwd-purple',
                    {
                      'text-fwd-purple': isActive,
                    },
                  )}
                >
                  <MotionHeader
                    className="text-3xl font-medium"
                    initial={false}
                    animate={{
                      color: isActive ? 'var(--color-fwd-purple)' : 'var(--color-fwd-black)',
                    }}
                  >
                    {service.title}
                  </MotionHeader>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        {service.descriptionShort && (
                          <div className="line-clamp-2 text-sm text-fwd-grey-600">
                            {service.descriptionShort}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress indicator */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-fwd-purple"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesAccordionBlock
