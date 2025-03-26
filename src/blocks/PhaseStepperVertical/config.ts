import type { Block } from 'payload'

export const PhaseStepperVertical: Block = {
  slug: 'phaseStepperVertical',
  interfaceName: 'PhaseStepperVertical',
  labels: {
    plural: 'Phase Stepper Vertical',
    singular: 'Phase Stepper Vertical',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: false,
    },
    {
      name: 'phases',
      type: 'array',
      label: 'Phases',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Phase Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Phase Description',
          required: true,
        },
      ],
    },
  ],
}

export default PhaseStepperVertical
