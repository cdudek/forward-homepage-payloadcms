'use client'
import React, { useMemo } from 'react'
import { TabContentBlock } from '../TabContentBlock/Component'
import type { Audience, AudienceTabBlock as AudienceTabBlockProps } from '@/payload-types'
import { htmlDecode } from '@/utilities/htmlDecode'

export const AudienceTabBlock: React.FC<AudienceTabBlockProps> = (props) => {
  const { audiences, ...rest } = props

  // Filter to only include Audience objects, not IDs
  const audienceItems =
    audiences?.filter((item): item is Audience => typeof item === 'object' && item !== null) || []

  // Map the audience data to the standardized TabBlockItem format
  const tabBlockItems = useMemo(() => {
    return audienceItems.map((audience) => ({
      id: audience.id,
      itemTabName: audience.title || '',
      itemTitle: audience.contentHeader || audience.title || '',
      itemDescription: audience.contentDescription || '',
      itemImage: audience.image,
      itemBullets:
        audience.usps?.map((usp) => ({
          id: usp.id,
          text: usp.usp || '',
        })) || [],
    }))
  }, [audienceItems])

  return (
    <TabContentBlock
      tabBlockItems={tabBlockItems}
      useColorBlends={false}
      darkMode={true}
      {...rest}
    />
  )
}

export default AudienceTabBlock
