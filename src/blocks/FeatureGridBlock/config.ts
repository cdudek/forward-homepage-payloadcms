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
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'Your value creation partner for growth&nbsp;&nbsp;innovation',
            },
            {
              name: 'gradientText',
              type: 'text',
              label: 'Gradient Text',
              required: false,
              defaultValue: 'growth&nbsp;&nbsp;innovation',
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              required: false,
              defaultValue: '',
            },
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
                      defaultValue: 'gradient',
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
                      defaultValue: 'greyLight',
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
                  ],
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                  defaultValue: '',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  required: true,
                  defaultValue: '',
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
              defaultValue: 'light',
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
          ],
        },
      ],
    },
  ],
}
