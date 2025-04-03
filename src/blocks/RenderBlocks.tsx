import React, { Fragment } from 'react'
import { cn } from '@/utilities/ui'
import type { Page } from '@/payload-types'

import { ActionTilesBlock } from '@/blocks/ActionTilesBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AudienceTabBlock } from '@/blocks/AudienceTabBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CaseStudyBlock } from '@/blocks/CaseStudyBlock/Component'
import { ColoredTextBlock } from '@/blocks/ColoredTextBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { EngagementModelBlock } from '@/blocks/EngagementModelBlock/Component'
import { FAQBlock } from '@/blocks/FAQBlock/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGridBlock/Component'
import { FooterFormBlock } from '@/blocks/FormFooter/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LogoGridBlock } from '@/blocks/LogoGridBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NumberGridBlock } from '@/blocks/NumberGridBlock/Component'
import { PhaseStepperVertical } from '@/blocks/PhaseStepperVertical/Component'
import { ProductFeatureBlock } from '@/blocks/ProductFeatureBlock/Component'
import { ServicesAccordionBlock } from '@/blocks/ServicesAccordionBlock/Component'
import { ServicesTabBlock } from '@/blocks/ServicesTabBlock/Component'
import { SingleCaseStudyBlock } from '@/blocks/SingleCaseStudyBlock/Component'

const blockComponents = {
  actionTilesBlock: ActionTilesBlock,
  archive: ArchiveBlock,
  audienceTabBlock: AudienceTabBlock,
  cta: CallToActionBlock,
  caseStudyBlock: CaseStudyBlock,
  coloredTextBlock: ColoredTextBlock,
  content: ContentBlock,
  engagementModelBlock: EngagementModelBlock,
  faqBlock: FAQBlock,
  featureGridBlock: FeatureGridBlock,
  footerFormBlock: FooterFormBlock,
  formBlock: FormBlock,
  logoGrid: LogoGridBlock,
  mediaBlock: MediaBlock,
  numberGridBlock: NumberGridBlock,
  phaseStepperVertical: PhaseStepperVertical,
  productFeatureBlock: ProductFeatureBlock,
  servicesAccordionBlock: ServicesAccordionBlock,
  servicesTabBlock: ServicesTabBlock,
  singleCaseStudyBlock: SingleCaseStudyBlock,
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
          const noMargin = 'noMargin' in block && block.noMargin

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            return (
              <div
                className={cn(
                  {
                    'my-8 md:my-16':
                      !['logoGrid', 'footerFormBlock'].includes(block.blockType) && !noMargin,
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
