'use client'

import React, { useState } from 'react'
import { FAQBlock as FAQBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { renderedTitle } from '@/utilities/gradientTitle'
import { motion, AnimatePresence } from 'framer-motion'

export const FAQBlock: React.FC<FAQBlockProps> = ({
  theme,
  faqItems,
  title,
  gradientText,
  description,
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'
  const formattedTitle = renderedTitle(title || '', gradientText || '')

  const toggleItem = (question: string) => {
    setOpenItem(openItem === question ? null : question)
  }

  return (
    <div className={cn('container mx-auto py-16 md:py-24', textColor)}>
      <div className="prose prose-sm col-span-12 max-w-none text-center md:prose-base lg:prose-lg">
        <h2>{formattedTitle}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="col-span-12 mx-auto mt-16 w-full max-w-3xl">
        <div className="flex flex-col space-y-4">
          {faqItems &&
            faqItems.map((item) => (
              <motion.div
                key={item.question}
                className="border-1 cursor-pointer overflow-hidden rounded-3xl border border-fwd-grey-50"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundColor:
                    openItem === item.question ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  filter:
                    openItem === item.question
                      ? 'drop-shadow(0 0 5px rgba(255,255,255,0.1))'
                      : 'transparent',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))',
                }}
                onClick={() => toggleItem(item.question || '')}
              >
                <motion.div className="flex w-full items-center justify-between p-6 pb-2 text-left text-lg font-medium">
                  <span>{item.question}</span>
                  <motion.span
                    className="ml-6 flex h-7 w-7 flex-shrink-0 items-center justify-center"
                    animate={{ rotate: openItem === item.question ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v12M6 12h12"
                      />
                    </svg>
                  </motion.span>
                </motion.div>
                <AnimatePresence initial={false}>
                  {openItem === item.question && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="p-6 pt-0">
                        <p className="!font-light">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
