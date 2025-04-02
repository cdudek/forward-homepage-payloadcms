import { Block } from 'payload'
import { link } from '@/fields/link'

export const ActionTilesBlock: Block = {
  slug: 'actionTilesBlock',
  interfaceName: 'ActionTilesBlock',
  labels: {
    singular: 'Action Tiles Block',
    plural: 'Action Tiles Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Proposition',
    },
    {
      name: 'gradient',
      type: 'text',
      required: true,
      defaultValue: 'Proposition',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      name: 'tiles',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
