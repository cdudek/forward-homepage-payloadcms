import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'serviceName',
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'serviceName', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'titleShort', type: 'text', required: true },
    { name: 'descriptionShort', type: 'text', required: true, defaultValue: '' },
    { name: 'icon', type: 'upload', relationTo: 'media', required: false },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
    { name: 'header', type: 'text', required: false },
    {
      name: 'descriptionText',
      type: 'textarea',
      required: true,
      label: 'Description',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      name: 'usps',
      labels: {
        plural: 'USPs',
        singular: 'USP',
      },
      type: 'array',
      fields: [{ name: 'usp', type: 'text' }],
    },
  ],
}

export default Services
