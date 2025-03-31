import type { Block, Field } from 'payload'

const textElementFields: Field[] = [
  {
    name: 'text',
    type: 'text',
    label: 'Content',
    required: true,
  },
  {
    name: 'useColor',
    type: 'checkbox',
    label: 'Apply Color',
    defaultValue: true,
    admin: {
      description: 'When checked, this text element will be rendered with the color effect',
    },
  },
  {
    name: 'addLineBreak',
    type: 'checkbox',
    label: 'Add Line Break',
    defaultValue: false,
    admin: {
      description: 'Add a line break after this text element',
    },
  },
]

export const ColoredTextBlock: Block = {
  slug: 'coloredTextBlock',
  interfaceName: 'ColoredTextBlock',
  labels: {
    singular: 'Colored Text Block',
    plural: 'Colored Text Blocks',
  },
  fields: [
    {
      name: 'textElements',
      type: 'array',
      label: 'Text Elements',
      admin: {
        initCollapsed: true,
      },
      fields: textElementFields,
    },
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
  ],
}
