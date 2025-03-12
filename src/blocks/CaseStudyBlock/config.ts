import type { Block } from 'payload'

export const CaseStudyBlock: Block = {
  slug: 'caseStudyBlock',
  interfaceName: 'CaseStudyBlock',
  fields: [
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
      defaultValue: 10,
      label: 'Limit',
    },
  ],
}
