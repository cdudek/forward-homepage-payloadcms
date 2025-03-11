import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlockquoteFeature,
  ParagraphFeature,
  AlignFeature,
  IndentFeature,
  ItalicFeature,
  BoldFeature,
  StrikethroughFeature,
  UnderlineFeature,
  LinkFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { ColoredTextBlock } from '@/blocks/ColoredTextBlock/config'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
      {
        label: 'Centered Three Columns',
        value: 'centeredThree',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures, defaultFeatures }) => {
        return [
          ...rootFeatures,
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          BlocksFeature({ blocks: [ColoredTextBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlockquoteFeature(),
          AlignFeature(),
          IndentFeature(),
          ParagraphFeature(),
          ItalicFeature(),
          BoldFeature(),
          StrikethroughFeature(),
          UnderlineFeature(),
          LinkFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'columns',
              type: 'array',
              fields: columnFields,
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'sectionHeight',
              type: 'select',
              defaultValue: 'none',
              dbName: 'content_section_height',
              label: 'Section Height',
              options: [
                {
                  label: 'Auto',
                  value: 'none',
                },
                {
                  label: 'Full Viewport',
                  value: 'full',
                },
                {
                  label: '75% Viewport',
                  value: '75',
                },
                {
                  label: '50% Viewport',
                  value: '50',
                },
              ],
            },
            {
              name: 'enableBackground',
              type: 'checkbox',
              label: 'Enable Background Color',
              defaultValue: false,
            },
            {
              name: 'backgroundColor',
              type: 'select',
              dbName: 'content_bg_color',
              label: 'Background Color',
              defaultValue: 'default',
              options: [
                {
                  label: 'Default',
                  value: 'default',
                },
                {
                  label: 'White',
                  value: 'white',
                },
                {
                  label: 'Black',
                  value: 'black',
                },
                {
                  label: 'Grey 50',
                  value: 'grey-50',
                },
                {
                  label: 'Grey 100',
                  value: 'grey-100',
                },
                {
                  label: 'Grey 500',
                  value: 'grey-500',
                },
                {
                  label: 'Grey 900',
                  value: 'grey-900',
                },
              ],
              admin: {
                condition: (_, { enableBackground }) => Boolean(enableBackground),
              },
            },
            {
              name: 'slope',
              type: 'group',
              label: 'Sloped Edge',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable sloped edge',
                  defaultValue: false,
                },
                {
                  name: 'position',
                  type: 'select',
                  defaultValue: 'bottom',
                  dbName: 'content_slope_position',
                  label: 'Slope Position',
                  admin: {
                    condition: (_, { enabled }) => Boolean(enabled),
                  },
                  options: [
                    {
                      label: 'Top',
                      value: 'top',
                    },
                    {
                      label: 'Bottom',
                      value: 'bottom',
                    },
                    {
                      label: 'Both',
                      value: 'both',
                    },
                  ],
                },
              ],
            },
            {
              name: 'padding',
              type: 'group',
              fields: [
                {
                  name: 'x',
                  type: 'select',
                  dbName: 'content_padding_x',
                  defaultValue: 'none',
                  options: [
                    {
                      label: 'None',
                      value: 'none',
                    },
                    {
                      label: 'Small',
                      value: 'small',
                    },
                    {
                      label: 'Medium',
                      value: 'medium',
                    },
                    {
                      label: 'Large',
                      value: 'large',
                    },
                  ],
                },
                {
                  name: 'y',
                  type: 'select',
                  dbName: 'content_padding_y',
                  defaultValue: 'none',
                  options: [
                    {
                      label: 'None',
                      value: 'none',
                    },
                    {
                      label: 'Small',
                      value: 'small',
                    },
                    {
                      label: 'Medium',
                      value: 'medium',
                    },
                    {
                      label: 'Large',
                      value: 'large',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
