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
    // {
    //   name: 'header',
    //   type: 'richText',
    //   hidden: true,
    //   editor: lexicalEditor({
    //     features: ({ rootFeatures, defaultFeatures }) => {
    //       return [
    //         ...rootFeatures,
    //         ...defaultFeatures,
    //         HeadingFeature({ enabledHeadingSizes: ['h4', 'h5', 'h6'] }),
    //         FixedToolbarFeature(),
    //         InlineToolbarFeature(),
    //       ]
    //     },
    //   }),
    // },
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
