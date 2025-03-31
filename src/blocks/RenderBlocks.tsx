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
import { ServicesTabBlock } from '@/blocks/ServicesTabBlock/Component'
import { AudienceTabBlock } from '@/blocks/AudienceTabBlock/Component'
import { PhaseStepperVertical } from '@/blocks/PhaseStepperVertical/Component'
import { EngagementModelBlock } from '@/blocks/EngagementModelBlock/Component'
import { SingleCaseStudyBlock } from '@/blocks/SingleCaseStudyBlock/Component'
import { FooterFormBlock } from '@/blocks/FormFooter/Component'
import { ColoredTextBlock } from '@/blocks/ColoredTextBlock/Component'
import { ProductFeatureBlock } from '@/blocks/ProductFeatureBlock/Component'

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
  servicesTabBlock: ServicesTabBlock,
  audienceTabBlock: AudienceTabBlock,
  phaseStepperVertical: PhaseStepperVertical,
  engagementModelBlock: EngagementModelBlock,
  singleCaseStudyBlock: SingleCaseStudyBlock,
  footerFormBlock: FooterFormBlock,
  coloredTextBlock: ColoredTextBlock,
  productFeatureBlock: ProductFeatureBlock,
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
                className={cn(
                  {
                    'my-16': !hasBackground && !hasSlope,
                    'py-0': hasBackground || hasSlope,
                    'my-0': ['logoGrid', 'footerFormBlock'].includes(block.blockType) || noMargin,
                  },
                  block.blockType === 'footerFormBlock' && block.isFullHeight
                    ? 'flex flex-1 flex-col'
                    : '',
                )}
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
