import type { Block } from 'payload'

export const AudienceTabBlock: Block = {
  slug: 'audienceTabBlock',
  interfaceName: 'AudienceTabBlock',
  labels: {
    plural: 'Audience Tab Blocks',
    singular: 'Audience Tab Block',
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
      name: 'audiences',
      type: 'relationship',
      relationTo: 'audiences',
      hasMany: true,
      required: true,
    },
  ],
}

export default AudienceTabBlock
