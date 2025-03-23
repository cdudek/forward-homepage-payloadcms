'use client'
import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { ServicesTabBlock as ServicesTabBlockProps, Service } from '@/payload-types'
import renderedTitle from '@/utilities/gradientTitle'
import { getColorBlends } from '@/utilities/getColorBlends'

// import RichText from '@/components/RichText'

export const ServicesTabBlock: React.FC<ServicesTabBlockProps> = ({
  title,
  subtitle,
  gradientText,
  services,
}) => {
  const formattedTitle = renderedTitle(title || '', gradientText || '')
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  const colors = getColorBlends(services?.length || 0, true)

  const servicesData =
    services?.filter((service): service is Service => typeof service === 'object') || []
  const activeService = servicesData[activeServiceIndex]

  return (
    <div className="container">
      <div className="grid w-full grid-cols-12 gap-x-8 gap-y-8">
        <div className="prose-sm col-span-12 mx-auto max-w-none text-center md:prose-md xl:prose-lg">
          <h2>{formattedTitle}</h2>
          {subtitle && <p className="text-gray-800">{subtitle}</p>}
        </div>

        {/* Tabs */}
        <div className="prose-sm col-span-12 flex flex-wrap justify-center gap-4 md:prose-md xl:prose-lg">
          {servicesData.map((service, index) => (
            <button
              key={service.id}
              className={cn(
                'rounded-full px-6 py-3 text-base font-medium transition-colors',
                activeServiceIndex === index
                  ? `bg-${colors[index]} text-white`
                  : 'bg-fwd-grey-100 hover:bg-gray-200',
              )}
              onClick={() => setActiveServiceIndex(index)}
            >
              {service.titleShort}
            </button>
          ))}
        </div>

        {/* Content Box */}
        {activeService && (
          <div className="col-span-12 mt-8 grid grid-cols-5 gap-8 rounded-3xl bg-fwd-grey-50 p-8">
            <div className="prose-sm col-span-5 flex flex-col justify-center md:prose-md xl:prose-lg md:col-span-3">
              <h3 className="mb-4 text-2xl font-bold">
                {activeService.header || activeService.title}
              </h3>
              <p className="text-gray-700">{activeService.descriptionShort}</p>

              {/* Features/USPs list */}
              {activeService.usps && activeService.usps.length > 0 && (
                <ul className="space-y-4">
                  {activeService.usps.map((usp, i) => (
                    <li key={i} className="flex">
                      <span className="mr-3 mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-gray-800">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.823 3.827L18 8.754l-1.057-1.057-6.12 6.442z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="flex-1">{usp.usp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Service image */}
            <div className="col-span-5 flex items-center justify-center md:col-span-2">
              {activeService.image && (
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
                  <Media
                    resource={activeService.image}
                    fill={true}
                    imgClassName="object-cover"
                    alt={activeService.title}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesTabBlock
