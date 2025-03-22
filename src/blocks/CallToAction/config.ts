import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'ctaStyle',
      label: 'CTA Style',
      type: 'select',
      options: ['light', 'dark'],
      defaultValue: 'light',
      required: true,
    },
    {
      name: 'noMargin',
      label: 'No Margin',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: false,
    },

    linkGroup({
      appearances: [
        'default',
        'outline',
        'primary',
        'secondary',
        'primaryIcon',
        'secondaryIcon',
        'outlineIcon',
      ],
      overrides: {
        maxRows: 1,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
