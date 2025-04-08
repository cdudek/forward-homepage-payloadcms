'use client'

import React, { useState } from 'react'
import { FAQBlock as FAQBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { renderedTitle } from '@/utilities/gradientTitle'
import { motion, AnimatePresence } from 'framer-motion'
import htmlDecode from '@/utilities/htmlDecode'
import { FadeInView } from '@/utilities/animations/FadeInView'
import { ParallaxContainer } from '@/utilities/animations/ParallaxContainer'

export const FAQBlock: React.FC<FAQBlockProps> = ({
  theme,
  faqItems,
  title,
  gradientText,
  description,
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const textColor = theme === 'dark' ? 'text-white' : 'text-fwd-black'
  const borderColor = theme === 'dark' ? 'border-fwd-grey-50' : 'border-fwd-grey-200'
  const bgColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(107, 114, 128, 0.02)' // fwd-grey-500 with 5% opacity
  // const hoverBgColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(107, 114, 128, 0.02)'
  const hoverBgColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(107, 114, 128, 0.03)'

  const shadowColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(107, 114, 128, 0.01)'
  const hoverShadowColor = theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(107, 114, 128, 0.03)'

  const formattedTitle = renderedTitle(title || '', gradientText || '')

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  const faqStepStart = description ? 3 : 2

  return (
    <div className={cn('container mx-auto py-16 md:py-24', textColor)}>
      <div className="prose prose-sm col-span-12 max-w-none text-center md:prose-base lg:prose-lg">
        <ParallaxContainer size="title">
          <FadeInView animationStep={1}>
            <h2 className="pb-4">{formattedTitle}</h2>
          </FadeInView>
          {description && (
            <FadeInView animationStep={2}>
              <p>{htmlDecode(description)}</p>
            </FadeInView>
          )}
        </ParallaxContainer>
      </div>
      <div className="col-span-12 mx-auto mt-16 w-full max-w-3xl">
        <div className="flex flex-col space-y-4">
          {faqItems &&
            faqItems.map((item, index) => (
              <FadeInView animationStep={faqStepStart + index} key={'item-fade-' + index}>
                <motion.div
                  key={'item-' + index}
                  className={cn(
                    'border-1 cursor-pointer overflow-hidden rounded-3xl border',
                    borderColor,
                  )}
                  // initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    backgroundColor: openItem === item.id ? bgColor : 'rgba(255, 255, 255, 0.00)',
                    filter:
                      openItem === item.id
                        ? `drop-shadow(0 0 2px ${shadowColor})`
                        : 'drop-shadow(0 0 2px rgba(255,255,255,0.0))',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: hoverBgColor,
                    filter: `drop-shadow(0 0 2px ${hoverShadowColor})`,
                  }}
                  onClick={() => item.id && toggleItem(item.id)}
                >
                  <motion.div className="flex w-full items-center justify-between p-6 text-left text-lg font-medium">
                    <span>{item.question}</span>
                    <motion.span
                      className="ml-6 flex h-7 w-7 flex-shrink-0 items-center justify-center"
                      animate={{ rotate: openItem === item.id ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
                    {openItem === item.id && (
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
                          <p className="faq-answer">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeInView>
            ))}
        </div>
      </div>
    </div>
  )
}
