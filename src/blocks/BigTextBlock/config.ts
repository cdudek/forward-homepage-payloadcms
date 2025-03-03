import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const LogoGridBlock: Block = {
  slug: 'bigText',
  interfaceName: 'BigTextBlock',
  labels: {
    singular: 'Big Text Block',
    plural: 'Big Text Blocks',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures, defaultFeatures }) => {
          return [
            ...rootFeatures,
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
  ],
}
