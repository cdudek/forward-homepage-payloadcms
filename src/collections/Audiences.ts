import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Audiences: CollectionConfig = {
  slug: 'audiences',
  admin: {
    useAsTitle: 'audienceName',
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'audienceName', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
    { name: 'contentHeader', type: 'text', required: false, defaultValue: '' },
    { name: 'contentDescription', type: 'text', required: true, defaultValue: '' },
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

export default Audiences
