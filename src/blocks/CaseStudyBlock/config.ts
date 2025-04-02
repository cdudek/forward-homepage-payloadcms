import type { Block } from 'payload'

export const CaseStudyBlock: Block = {
  slug: 'caseStudyBlock',
  interfaceName: 'CaseStudyBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Case Studies',
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
      type: 'textarea',
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
    // {},
    {
      name: 'limit',
      type: 'number',
      defaultValue: 5,
      label: 'Limit',
    },
  ],
}
