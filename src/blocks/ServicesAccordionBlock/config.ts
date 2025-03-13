import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ServicesAccordionBlock: Block = {
  slug: 'servicesAccordionBlock',
  labels: {
    singular: 'Services Accordion Block',
    plural: 'Services Accordion Blocks',
  },
  fields: [
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'gradient',
      label: 'Gradient Text',
      type: 'text',
      defaultValue: '',
    },
    link({
      appearances: false,
    }),
    {
      name: 'limit',
      type: 'number',
      defaultValue: 5,
      required: true,
    },
  ],
}
