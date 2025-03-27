import type { Block } from 'payload'

export const SingleCaseStudyBlock: Block = {
  slug: 'singleCaseStudyBlock',
  interfaceName: 'SingleCaseStudyBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: false,
      defaultValue: 'Case Study',
    },
    {
      name: 'gradientText',
      type: 'text',
      label: 'Gradient Text',
      required: false,
      defaultValue: 'Studies',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: false,
      defaultValue: 'Our case studies',
    },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      label: 'Case studies to show',
    },
  ],
}

export default SingleCaseStudyBlock
