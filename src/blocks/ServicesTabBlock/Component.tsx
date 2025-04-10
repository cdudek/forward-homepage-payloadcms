'use client'
import React, { useMemo } from 'react'
import { TabContentBlock } from '../TabContentBlock/Component'
import type { Service, ServicesTabBlock as ServicesTabBlockProps } from '@/payload-types'
import { htmlDecode } from '@/utilities/htmlDecode'

export const ServicesTabBlock: React.FC<ServicesTabBlockProps> = (props) => {
  const { services, ...rest } = props

  // Filter to only include Service objects, not IDs
  const serviceItems =
    services?.filter((item): item is Service => typeof item === 'object' && item !== null) || []

  // Map the service data to the standardized TabBlockItem format
  const tabBlockItems = useMemo(() => {
    return serviceItems.map((service) => ({
      id: service.id,
      itemTabName: service.titleShort || '',
      itemTitle: htmlDecode(service.header || service.title || ''),
      itemDescription: htmlDecode(service.descriptionText || ''),
      itemImage: service.image,
      itemBullets:
        service.usps?.map((usp) => ({
          id: usp.id,
          text: usp.usp || '',
        })) || [],
    }))
  }, [serviceItems])

  return (
    <TabContentBlock
      tabBlockItems={tabBlockItems}
      useColorBlends={true}
      darkMode={false}
      {...rest}
    />
  )
}

export default ServicesTabBlock
