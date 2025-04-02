import type { Block } from 'payload'

// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/richtext-lexical'

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
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Working with Leaders Across Industries',
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
