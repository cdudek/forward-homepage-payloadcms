import type { Block, FieldHook } from 'payload'

export const LogoGridBlock: Block = {
  slug: 'logoGrid',
  interfaceName: 'LogoGridBlock',
  labels: {
    singular: 'Logo Grid',
    plural: 'Logo Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
    },
    {
      name: 'size',
      type: 'number',
      defaultValue: 5,
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
