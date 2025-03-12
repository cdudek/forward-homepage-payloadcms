'use client'

import React from 'react'
// import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { CaseStudyBlock as CaseStudyBlockType, CaseStudy } from '@/payload-types'
// type CompanyName = NonNullable<Props['companyName']>
// type Logo = NonNullable<Props['logo']>
// type Testimonial = NonNullable<Props['testimonials']>[number]
// type Metrics = NonNullable<Props['metrics']>[number]

type Props = CaseStudyBlockType

export const CaseStudyBlock: React.FC<CaseStudyBlockType> = ({ caseStudies, limit }) => {
  if (!caseStudies?.length) return null

  // const heroCaseStudy = caseStudies[0] as CaseStudy

  // const displayCaseStudies = caseStudies.slice(0, displayLimit)

  // const heroQuote = displayCaseStudies[0]
  // const heroImage = heroQuote?.background?.url

  return (
    <div className="grid grid-cols-5 py-10">
      <div className="relative col-span-3"></div>
      <div className="col-span-2"></div>
    </div>
  )
}

export default CaseStudyBlock

// {
//   displayCaseStudies.map((study: unknown, index: number) => {
//     // Handle potential non-populated relationships
//     const caseStudy = typeof study === 'number' ? null : (study as CaseStudy)
//     if (!caseStudy) return null

//     const { testimonial, metrics, companyName, logo, url } = caseStudy
//     if (!testimonial) return null

//     return (
//       <div key={index} className="mb-10">
//         <h2 className="mb-4 text-2xl font-bold">{companyName}</h2>
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           <div>
//             {testimonial.background && <Media resource={testimonial.background} size="100%" />}
//             {logo && <Media resource={logo} size="200px" className="mt-4" />}
//           </div>
//           <div>
//             {testimonial.quote && (
//               <div className="mb-4">
//                 <RichText data={testimonial.quote} />
//               </div>
//             )}
//             <div className="mt-4">
//               <p className="font-bold">{testimonial.author}</p>
//               <p className="text-gray-600">{testimonial.position}</p>
//             </div>
//             {metrics && metrics.length > 0 && (
//               <div className="mt-6 grid grid-cols-2 gap-4">
//                 {metrics.map((metric, i: number) => (
//                   <div key={i} className="text-center">
//                     <p className="text-xl font-bold">
//                       {metric.prefix}
//                       {metric.value}
//                       {metric.suffix}
//                     </p>
//                     <p className="text-sm text-gray-600">{metric.label}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         {url && (
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-4 inline-block text-blue-600 hover:underline"
//           >
//             Learn more
//           </a>
//         )}
//       </div>
//     )
//   })
// }
