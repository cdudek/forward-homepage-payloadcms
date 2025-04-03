import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ProductFeatureBlock: Block = {
  slug: 'productFeatureBlock',
  interfaceName: 'ProductFeatureBlock',
  labels: {
    singular: 'Product Feature Block',
    plural: 'Product Feature Blocks',
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      defaultValue: 'light',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
    },
    {
      name: 'productName',
      type: 'text',
      label: 'Product Name',
      required: true,
      defaultValue: 'Product Name',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Product Feature',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'This is a product feature',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaPosition',
      type: 'select',
      label: 'Media Position',
      defaultValue: 'left',
      options: ['left', 'right'],
    },
    {
      name: 'featureList',
      type: 'array',
      label: 'Features',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'usp',
          type: 'textarea',
          label: 'USP',
          required: true,
          defaultValue: 'Feature',
        },
        {
          name: 'featureIcon',
          label: 'Feature Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    link(),
  ],
}
