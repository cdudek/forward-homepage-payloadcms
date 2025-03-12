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
    name: 'preserveSpaces',
    type: 'checkbox',
    label: 'Preserve Spaces',
    defaultValue: false,
    admin: {
      description: 'Convert spaces to non-breaking spaces to preserve formatting',
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
  {
    name: 'wrapInContainer',
    type: 'checkbox',
    label: 'Wrap in Container',
    defaultValue: false,
    admin: {
      description: 'Wrap this text element in its own container',
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
      name: 'typographyType',
      type: 'select',
      label: 'Typography',
      defaultValue: 'h1',
      options: [
        {
          label: 'H1',
          value: 'h1',
        },
        {
          label: 'H2',
          value: 'h2',
        },
        {
          label: 'H3',
          value: 'h3',
        },
        {
          label: 'H4',
          value: 'h4',
        },
        {
          label: 'P',
          value: 'p',
        },
      ],
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color Style',
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
          label: 'Grey light',
          value: 'grey-400',
        },
        {
          label: 'Grey',
          value: 'grey-600',
        },
        {
          label: 'Grey dark',
          value: 'grey-800',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Justify',
          value: 'justify',
        },
      ],
    },
    {
      name: 'margins',
      type: 'group',
      label: 'Margins',
      fields: [
        {
          name: 'top',
          type: 'select',
          label: 'Top Margin',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Small',
              value: 'small',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Large',
              value: 'large',
            },
          ],
        },
        {
          name: 'bottom',
          type: 'select',
          label: 'Bottom Margin',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Small',
              value: 'small',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Large',
              value: 'large',
            },
          ],
        },
      ],
    },
  ],
}
