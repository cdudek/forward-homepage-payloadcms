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
              dbName: 'grid_cols',
              required: true,
              defaultValue: 'oneThird',
              options: [
                { label: 'Three Columns', value: 'oneThird' },
                { label: 'Four Columns', value: 'oneQuarter' },
              ],
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
                      dbName: 'number_size',
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
                      dbName: 'number_color_type',
                      defaultValue: 'default',
                      options: [
                        { label: 'Default', value: 'default' },
                        { label: 'Gradient', value: 'gradient' },
                        { label: 'Custom Color', value: 'color' },
                      ],
                    },
                    {
                      name: 'colorValue',
                      type: 'text',
                      dbName: 'number_color_value',
                      admin: {
                        condition: (_, { colorType }) => colorType === 'color',
                      },
                    },
                    {
                      name: 'gradientValues',
                      type: 'group',
                      admin: {
                        condition: (_, { colorType }) => colorType === 'gradient',
                      },
                      fields: [
                        {
                          name: 'start',
                          type: 'text',
                          defaultValue: '#772583',
                        },
                        {
                          name: 'mid',
                          type: 'text',
                          defaultValue: '#DB2845',
                        },
                        {
                          name: 'end',
                          type: 'text',
                          defaultValue: '#FF6A39',
                        },
                        {
                          name: 'angle',
                          type: 'select',
                          dbName: 'gradient_angle',
                          defaultValue: '90deg',
                          options: [
                            { label: 'Left to Right', value: '90deg' },
                            { label: 'Right to Left', value: '270deg' },
                            { label: 'Top to Bottom', value: '180deg' },
                            { label: 'Bottom to Top', value: '0deg' },
                            { label: 'Diagonal (↘)', value: '135deg' },
                            { label: 'Diagonal (↖)', value: '315deg' },
                          ],
                        },
                        {
                          name: 'midPos',
                          type: 'number',
                          dbName: 'gradient_mid_pos',
                          defaultValue: 50,
                          min: 1,
                          max: 99,
                        },
                      ],
                    },
                    {
                      name: 'alignment',
                      type: 'select',
                      dbName: 'number_align',
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
                  name: 'header',
                  type: 'group',
                  fields: [
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
                              enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                            }),
                            AlignFeature(),
                            ItalicFeature(),
                            BoldFeature(),
                            ParagraphFeature(),
                            LinkFeature(),
                          ]
                        },
                      }),
                      label: false,
                    },
                    {
                      name: 'horizontalAlignment',
                      type: 'select',
                      dbName: 'header_h_align',
                      defaultValue: 'center',
                      options: [
                        { label: 'Left', value: 'left' },
                        { label: 'Center', value: 'center' },
                        { label: 'Right', value: 'right' },
                      ],
                    },
                    {
                      name: 'verticalAlignment',
                      type: 'select',
                      dbName: 'header_v_align',
                      defaultValue: 'top',
                      options: [
                        { label: 'Top', value: 'top' },
                        { label: 'Middle', value: 'middle' },
                        { label: 'Bottom', value: 'bottom' },
                      ],
                    },
                    {
                      name: 'equalHeight',
                      type: 'checkbox',
                      defaultValue: false,
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
                  label: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
