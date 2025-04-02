import { Block } from 'payload'

export const EngagementModelBlock: Block = {
  slug: 'engagementModelBlock',
  interfaceName: 'EngagementModelBlock',
  labels: {
    singular: 'Engagement Model Block',
    plural: 'Engagement Model Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Engagement Model Block',
    },
    {
      name: 'gradientText',
      type: 'text',
      label: 'Gradient Text',
      required: true,
      defaultValue: 'Model Block',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
      defaultValue: 'Engagement Model Block Description',
    },
    {
      name: 'tiers',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'Tier 1',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
          defaultValue: 'Tier 1 Description',
        },
        {
          name: 'headlineLabel',
          type: 'text',
          label: 'Headline Label',
          required: true,
          defaultValue: 'Headline Label',
        },
        {
          name: 'durationLabel',
          type: 'text',
          label: 'Duration Label',
          defaultValue: '4 - 12 weeks',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
