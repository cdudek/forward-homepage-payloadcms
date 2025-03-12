import { Block } from 'payload'

/**
 * IMPORTANT: dbName fields are required to prevent database identifier length issues
 * PostgreSQL has a 63 character limit for identifiers (table/column names)
 * Without dbName, the generated names would exceed this limit, causing errors like:
 * "Exceeded max identifier length for table or enum name of 63 characters"
 * Example problematic name: fg_block_features_fg_icon_gradient_values_angle
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
                      dbName: 'fg_icon_style',
                      defaultValue: 'round',
                      options: [
                        { label: 'Round', value: 'round' },
                        { label: 'Square', value: 'square' },
                      ],
                    },
                    {
                      name: 'size',
                      type: 'select',
                      dbName: 'fg_icon_size',
                      defaultValue: 'medium',
                      options: [
                        { label: 'Small', value: 'small' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Large', value: 'large' },
                      ],
                    },
                    {
                      label: 'Icon Foreground',
                      name: 'iconForeground',
                      type: 'select',
                      dbName: 'fg_icon_foreground',
                      defaultValue: 'default',
                      options: [
                        { label: 'Default', value: 'default' },
                        { label: 'Brand Gradient', value: 'gradient' },
                        { label: 'Purple', value: 'purple' },
                        { label: 'Red', value: 'red' },
                        { label: 'Orange', value: 'orange' },
                        { label: 'Black', value: 'black' },
                        { label: 'White', value: 'white' },
                        { label: 'Grey', value: 'grey' },
                        { label: 'Grey light', value: 'greyLight' },
                        { label: 'Grey dark', value: 'greyDark' },
                      ],
                    },
                    {
                      label: 'Icon Background',
                      name: 'iconBackground',
                      type: 'select',
                      dbName: 'fg_icon_background',
                      defaultValue: 'default',
                      options: [
                        { label: 'Default', value: 'default' },
                        { label: 'Brand Gradient', value: 'gradient' },
                        { label: 'Purple', value: 'purple' },
                        { label: 'Red', value: 'red' },
                        { label: 'Orange', value: 'orange' },
                        { label: 'Black', value: 'black' },
                        { label: 'White', value: 'white' },
                        { label: 'Grey', value: 'grey' },
                        { label: 'Grey light', value: 'greyLight' },
                        { label: 'Grey dark', value: 'greyDark' },
                      ],
                    },
                    {
                      name: 'alignment',
                      type: 'select',
                      dbName: 'fg_icon_align',
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
                  label: 'Header',
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
                      dbName: 'fg_header_h_align',
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
                      dbName: 'fg_header_v_align',
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
                  label: 'Text Box',
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
              dbName: 'fg_grid_cols',
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
              name: 'backgroundTheme',
              type: 'select',
              dbName: 'fg_bg_color',
              label: 'Background Theme',
              defaultValue: 'default',
              options: [
                {
                  label: 'Default',
                  value: 'default',
                },
                {
                  label: 'Light',
                  value: 'light',
                },
                {
                  label: 'Dark',
                  value: 'dark',
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
