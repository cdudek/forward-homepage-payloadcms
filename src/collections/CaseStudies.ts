import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// import { slugField } from '@/fields/slug'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'companyName',
    group: 'Content',
    description: 'Customer case studies and testimonials',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    // ...slugField(),
    { name: 'companyName', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'url',
      type: 'text',
      // required: true,
    },
    {
      name: 'testimonial',
      type: 'group',
      fields: [
        // { name: 'quote', type: 'textarea', required: true },
        {
          name: 'quote',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
        { name: 'author', type: 'text', required: true },
        { name: 'position', type: 'text', required: true },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Background image for Case Studies or Testimonials',
          },
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'prefix', type: 'text' },
        { name: 'suffix', type: 'text' },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

export default CaseStudies
