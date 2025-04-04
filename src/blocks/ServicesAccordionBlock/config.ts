import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ServicesAccordionBlock: Block = {
  slug: 'servicesAccordionBlock',
  interfaceName: 'ServicesAccordionBlock',
  labels: {
    singular: 'Services Accordion Block',
    plural: 'Services Accordion Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Value Creation Services',
    },
    {
      name: 'gradient',
      label: 'Gradient Text',
      type: 'text',
      defaultValue: 'Value Creation',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      defaultValue: '',
    },

    link({
      appearances: false,
    }),
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
  ],
}
