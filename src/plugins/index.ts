import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | forward Labs` : 'forward Labs'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      admin: {
        components: {
          // Add custom admin components here
        },
      },
      fields: ({ defaultFields }) => {
        // Get form blocks field which contains the blocks array
        const formBlocksField = defaultFields.find(
          (field) => 'name' in field && field.name === 'fields',
        )

        if (formBlocksField && 'blocks' in formBlocksField) {
          // Update each block to add placeholder if needed
          formBlocksField.blocks = formBlocksField.blocks.map((block) => {
            // For text, textarea, email, number fields add placeholder
            if ('slug' in block && ['text', 'textarea', 'email', 'number'].includes(block.slug)) {
              return {
                ...block,
                fields: [
                  ...(block.fields || []),
                  {
                    name: 'placeholder',
                    type: 'text',
                    label: 'Placeholder',
                    admin: {
                      layout: 'horizontal',
                      width: '50%',
                    },
                    defaultValue: '',
                  },
                  {
                    name: 'gridSpan',
                    type: 'select',
                    label: 'Grid Span',
                    options: [
                      { label: 'half', value: 'half' },
                      { label: 'halfEmpty', value: 'halfEmpty' },
                      { label: 'full', value: 'full' },
                    ],
                    defaultValue: 'full',
                    admin: {
                      layout: 'horizontal',
                      width: '50%',
                    },
                  },
                ],
              }
            }
            return block
          })
        }

        // Then handle confirmationMessage field specifically
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures, defaultFeatures }) => {
                  return [
                    ...rootFeatures,
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  vercelBlobStorage({
    enabled: true,
    // Specify which collections should use Vercel Blob
    collections: {
      media: true,
    },
    token: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
  }),
]
