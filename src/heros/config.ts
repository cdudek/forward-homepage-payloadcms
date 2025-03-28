import type { Field } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Big Text',
          value: 'bigText',
        },
      ],
      required: true,
    },
    {
      name: 'impact',
      type: 'select',
      label: 'Impact',
      options: [
        { label: 'High', value: 'highImpact' },
        { label: 'Medium', value: 'mediumImpact' },
        { label: 'Low', value: 'lowImpact' },
      ],
      defaultValue: 'highImpact',
      admin: {
        condition: (_, { type } = {}) => ['bigText'].includes(type),
      },
    },
    {
      name: 'hasAngledCorner',
      type: 'checkbox',
      label: 'Enable angled corner',
      defaultValue: false,
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures, defaultFeatures }) => {
          return [
            ...rootFeatures,
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            ParagraphFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature(),
          ]
        },
      }),
      label: false,
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
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        condition: (_, { type } = {}) => ['bigText'].includes(type),
      },
      required: true,
    },
    {
      name: 'gradientText',
      type: 'text',
      label: 'Gradient Text Part',
      admin: {
        condition: (_, { type } = {}) => ['bigText'].includes(type),
      },
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        condition: (_, { type } = {}) => ['bigText'].includes(type),
      },
      required: true,
    },
  ],
  label: false,
}
