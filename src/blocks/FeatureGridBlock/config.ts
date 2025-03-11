import { Block } from 'payload'

/**
 * IMPORTANT: dbName fields are required to prevent database identifier length issues
 * PostgreSQL has a 63 character limit for identifiers (table/column names)
 * Without dbName, the generated names would exceed this limit, causing errors like:
 * "Exceeded max identifier length for table or enum name of 63 characters"
 * Example problematic name: enum_pages_blocks_feature_grid_block_features_icon_gradient_values_angle
 *
 * DO NOT REMOVE dbName fields even if TypeScript shows errors
 */

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

export const FeatureGridBlock: Block = {
  slug: 'featureGridBlock',
  interfaceName: 'FeatureGridBlock',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'features',
              type: 'array',
              minRows: 1,
              maxRows: 4,
              fields: [
                {
                  name: 'icon',
                  type: 'group',
                  fields: [
                    {
                      name: 'media',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'style',
                      type: 'select',
                      dbName: 'icon_style',
                      defaultValue: 'round',
                      options: [
                        { label: 'Round', value: 'round' },
                        { label: 'Square', value: 'square' },
                      ],
                    },
                    {
                      name: 'size',
                      type: 'select',
                      dbName: 'icon_size',
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
                      dbName: 'icon_color_type',
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
                      dbName: 'icon_color_value',
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
                      name: 'background',
                      type: 'text',
                      dbName: 'icon_bg',
                      defaultValue: '#F5F5F5',
                    },
                    {
                      name: 'alignment',
                      type: 'select',
                      dbName: 'icon_align',
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
                              enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
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
        {
          label: 'Layout',
          fields: [
            {
              name: 'columns',
              type: 'select',
              dbName: 'grid_cols',
              required: true,
              defaultValue: 'oneThird',
              options: [
                { label: 'One Third', value: 'oneThird' },
                { label: 'One Quarter', value: 'oneQuarter' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'enableBackground',
              type: 'checkbox',
              label: 'Enable Background Color',
              defaultValue: false,
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              defaultValue: '#FCFAFA',
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
          ],
        },
      ],
    },
  ],
}
