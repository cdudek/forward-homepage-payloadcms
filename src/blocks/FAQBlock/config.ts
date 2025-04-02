import type { Block, Field } from 'payload'

const faqItemFields: Field[] = [
  {
    name: 'question',
    type: 'text',
    label: 'Question',
    required: true,
    defaultValue: 'Question',
  },
  {
    name: 'answer',
    type: 'text',
    label: 'Answer',
    required: true,
    defaultValue: 'Answer',
  },
]

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
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
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Frequently Asked Questions & Answers',
    },
    {
      name: 'gradientText',
      type: 'text',
      label: 'Gradient Text',
      required: false,
      defaultValue: 'Questions & Answers',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      defaultValue: 'Frequently Asked Questions & Answers Description',
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ Items',
      admin: {
        initCollapsed: true,
      },
      fields: faqItemFields,
    },
  ],
}
