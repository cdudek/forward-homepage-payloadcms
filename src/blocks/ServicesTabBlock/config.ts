import type { Block } from 'payload'

export const ServicesTabBlock: Block = {
  slug: 'servicesTabBlock',
  interfaceName: 'ServicesTabBlock',
  labels: {
    plural: 'Services Tab Blocks',
    singular: 'Services Tab Block',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'gradientText',
      type: 'text',
      label: 'Gradient Text',
      required: false,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
  ],
}

export default ServicesTabBlock
