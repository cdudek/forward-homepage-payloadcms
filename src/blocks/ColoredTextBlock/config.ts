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
      name: 'colorType',
      type: 'select',
      label: 'Color Style',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Gradient',
          value: 'gradient',
        },
        {
          label: 'Custom Color',
          value: 'color',
        },
      ],
      required: true,
    },
    {
      name: 'colorValue',
      type: 'text',
      label: 'Color Value',
      defaultValue: '#9FA2A6',
      admin: {
        description: 'Enter a valid hex color code (e.g., #FF5500)',
        condition: (_, { colorType } = {}) => colorType === 'color',
      },
      validate: (value: string | null | undefined) => {
        if (
          value &&
          typeof value === 'string' &&
          !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
        ) {
          return 'Please enter a valid hex color code'
        }
        return true
      },
      required: true,
    },
    {
      name: 'gradientValues',
      type: 'group',
      label: 'Gradient Settings',
      admin: {
        condition: (_, { colorType } = {}) => colorType === 'gradient',
      },
      fields: [
        {
          name: 'startColor',
          type: 'text',
          label: 'Start Color',
          defaultValue: '#772583',
          validate: (value: string | null | undefined) => {
            if (
              value &&
              typeof value === 'string' &&
              !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
            ) {
              return 'Please enter a valid hex color code'
            }
            return true
          },
        },
        {
          name: 'midColor',
          type: 'text',
          label: 'Middle Color',
          defaultValue: '#DB2845',
          validate: (value: string | null | undefined) => {
            if (
              value &&
              typeof value === 'string' &&
              !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
            ) {
              return 'Please enter a valid hex color code'
            }
            return true
          },
        },
        {
          name: 'endColor',
          type: 'text',
          label: 'End Color',
          defaultValue: '#FF6A39',
          validate: (value: string | null | undefined) => {
            if (
              value &&
              typeof value === 'string' &&
              !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
            ) {
              return 'Please enter a valid hex color code'
            }
            return true
          },
        },
        {
          name: 'direction',
          type: 'select',
          label: 'Direction',
          defaultValue: '90deg',
          options: [
            {
              label: 'Left to Right',
              value: '90deg',
            },
            {
              label: 'Right to Left',
              value: '270deg',
            },
            {
              label: 'Top to Bottom',
              value: '180deg',
            },
            {
              label: 'Bottom to Top',
              value: '0deg',
            },
            {
              label: 'Diagonal (Top-Left to Bottom-Right)',
              value: '135deg',
            },
            {
              label: 'Diagonal (Bottom-Right to Top-Left)',
              value: '315deg',
            },
          ],
        },
        {
          name: 'midPosition',
          type: 'number',
          label: 'Middle Color Position (%)',
          defaultValue: 50,
          min: 1,
          max: 99,
          admin: {
            description: 'Position of the middle color in the gradient (as percentage)',
          },
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
