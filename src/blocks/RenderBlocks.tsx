import React, { Fragment } from 'react'
import { cn } from '@/utilities/ui'
import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { LogoGridBlock } from '@/blocks/LogoGridBlock/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGridBlock/Component'
import { NumberGridBlock } from '@/blocks/NumberGridBlock/Component'
import { ActionTilesBlock } from '@/blocks/ActionTilesBlock/Component'
import { CaseStudyBlock } from '@/blocks/CaseStudyBlock/Component'
import { ServicesAccordionBlock } from '@/blocks/ServicesAccordionBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  logoGrid: LogoGridBlock,
  featureGridBlock: FeatureGridBlock,
  numberGridBlock: NumberGridBlock,
  actionTilesBlock: ActionTilesBlock,
  caseStudyBlock: CaseStudyBlock,
  servicesAccordionBlock: ServicesAccordionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          const hasBackground = 'enableBackground' in block && block.enableBackground
          const hasSlope = 'slope' in block && block.slope?.enabled
          const noMargin = 'noMargin' in block && block.noMargin

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            return (
              <div
                className={cn({
                  'my-16': !hasBackground && !hasSlope,
                  'py-0': hasBackground || hasSlope,
                  'my-0': block.blockType === 'logoGrid' || noMargin,
                })}
                key={index}
              >
                {/* @ts-expect-error there may be some mismatch between the expected types here */}
                <Block {...block} />
              </div>
            )
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

export default RenderBlocks
