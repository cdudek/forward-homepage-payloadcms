import React from 'react'

import type { Page } from '@/payload-types'
import { FadeInView } from '@/utilities/animations/FadeInView'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children ||
          (richText && (
            <FadeInView animationStep={1} offset={0}>
              <RichText data={richText} enableGutter={false} />
            </FadeInView>
          ))}
      </div>
    </div>
  )
}
