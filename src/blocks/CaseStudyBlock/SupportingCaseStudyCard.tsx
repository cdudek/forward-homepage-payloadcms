import React from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { CaseStudy } from '@/payload-types'

interface SupportingCaseStudyCardProps {
  study: CaseStudy
  index: number
  onClick: (index: number) => void
  variants: Variants
}

export const SupportingCaseStudyCard: React.FC<SupportingCaseStudyCardProps> = ({
  study,
  index,
  onClick,
  variants,
}) => {
  if (!study) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`supporting-${index}`}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => onClick(index)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.01 }}
        className={cn(
          'grid cursor-pointer grid-rows-[auto_1fr_auto] overflow-hidden rounded-3xl border',
          'border-gray-400 bg-white p-6 transition-colors hover:border-gray-500 hover:bg-gray-50/50 active:bg-gray-50',
          'shadow-[0_1px_1px_rgba(0,0,0,0.1)]',
          'hover:shadow-[0_2px_2px_rgba(0,0,0,0.1)]',
          'group-hover:shadow-[0_5px_5px_rgba(255,0,130,0.25)]',
          'transition-shadow duration-300',
          'will-change-transform',
          'h-full',
        )}
      >
        {study.logo && (
          <div className="not-prose relative my-4 flex h-8 w-32 items-center justify-start overflow-hidden">
            <Media
              resource={study.logo}
              className="flex max-h-full max-w-full justify-start object-contain opacity-80 grayscale"
              imgClassName="max-h-8 max-w-32 object-left object-contain"
              loading="lazy"
            />
          </div>
        )}

        {study.testimonial?.quoteText && (
          <div className="case-study-quote prose line-clamp-4 flex h-full items-center text-base font-medium text-gray-800 md:text-xl">
            {study.testimonial.quoteText}
          </div>
        )}

        {study.url && (
          <a
            href={study.url}
            className="group mt-auto flex items-center pt-4 text-sm text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Read how</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
