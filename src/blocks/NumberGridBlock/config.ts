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
              dbName: 'ngr_grid_cols',
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
                      dbName: 'ngr_size',
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
                      dbName: 'ngr_color_type',
                      defaultValue: 'default',
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
                          label: 'Grey Light',
                          value: 'grey-100',
                        },
                        {
                          label: 'Grey Lightest',
                          value: 'grey-50',
                        },
                        {
                          label: 'Grey Dark',
                          value: 'grey-500',
                        },
                        {
                          label: 'Grey Darkest',
                          value: 'grey-900',
                        },
                      ],
                    },
                    {
                      name: 'alignment',
                      type: 'select',
                      dbName: 'ngr_align',
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
