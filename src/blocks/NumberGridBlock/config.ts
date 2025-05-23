import { Block } from 'payload'

import {
  lexicalEditor,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  AlignFeature,
  ItalicFeature,
  BoldFeature,
  LinkFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

export const NumberGridBlock: Block = {
  slug: 'numberGridBlock',
  interfaceName: 'NumberGridBlock',
  labels: {
    singular: 'Number Grid',
    plural: 'Number Grids',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'columns',
              type: 'select',
              required: true,
              defaultValue: 'oneThird',
              options: [
                { label: 'Three Columns', value: 'oneThird' },
                { label: 'Four Columns', value: 'oneQuarter' },
              ],
            },

            {
              label: 'Subheader',
              name: 'subheader',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HeadingFeature({
                      enabledHeadingSizes: ['h4', 'h5', 'h6'],
                    }),
                    AlignFeature(),
                    ItalicFeature(),
                    BoldFeature(),
                    ParagraphFeature(),
                    LinkFeature(),
                  ]
                },
              }),
            },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              maxRows: 8,
              fields: [
                {
                  name: 'number',
                  type: 'group',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      defaultValue: '100',
                    },
                    {
                      name: 'prefix',
                      type: 'text',
                      defaultValue: '',
                    },
                    {
                      name: 'suffix',
                      type: 'text',
                      defaultValue: '',
                    },
                    {
                      name: 'size',
                      type: 'select',
                      defaultValue: 'medium',
                      options: [
                        { label: 'Small', value: 'small' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Large', value: 'large' },
                      ],
                    },
                    {
                      name: 'colorType',
                      type: 'select',
                      defaultValue: 'gradient',
                      options: [
                        {
                          label: 'Default',
                          value: 'default',
                        },
                        {
                          label: 'Brand Gradient',
                          value: 'gradient',
                        },
                        {
                          label: 'Purple',
                          value: 'purple',
                        },
                        {
                          label: 'Red',
                          value: 'red',
                        },
                        {
                          label: 'Orange',
                          value: 'orange',
                        },
                        {
                          label: 'Black',
                          value: 'black',
                        },
                        {
                          label: 'White',
                          value: 'white',
                        },
                        {
                          label: 'Grey light',
                          value: 'grey-400',
                        },
                        {
                          label: 'Grey',
                          value: 'grey-600',
                        },
                        {
                          label: 'Grey Dark',
                          value: 'grey-800',
                        },
                      ],
                    },
                    {
                      name: 'alignment',
                      type: 'select',
                      defaultValue: 'center',
                      options: [
                        { label: 'Left', value: 'left' },
                        { label: 'Center', value: 'center' },
                        { label: 'Right', value: 'right' },
                      ],
                    },
                  ],
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HeadingFeature({
                          enabledHeadingSizes: ['h4', 'h5', 'h6'],
                        }),
                        AlignFeature(),
                        ItalicFeature(),
                        BoldFeature(),
                        ParagraphFeature(),
                        LinkFeature(),
                      ]
                    },
                  }),
                  label: 'Content',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
