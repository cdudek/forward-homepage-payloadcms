import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'

// Blocks
import { ActionTilesBlock } from '../../blocks/ActionTilesBlock/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { AudienceTabBlock } from '@/blocks/AudienceTabBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CaseStudyBlock } from '@/blocks/CaseStudyBlock/config'
import { ColoredTextBlock } from '@/blocks/ColoredTextBlock/config'
import { Content } from '../../blocks/Content/config'
import { EngagementModelBlock } from '@/blocks/EngagementModelBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { FeatureGridBlock } from '../../blocks/FeatureGridBlock/config'
import { FooterFormBlock } from '@/blocks/FormFooter/config'
import { FormBlock } from '../../blocks/Form/config'
import { LogoGridBlock } from '../../blocks/LogoGridBlock/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { NumberGridBlock } from '../../blocks/NumberGridBlock/config'
import { PhaseStepperVertical } from '@/blocks/PhaseStepperVertical/config'
import { ProductFeatureBlock } from '@/blocks/ProductFeatureBlock/config'
import { ServicesAccordionBlock } from '@/blocks/ServicesAccordionBlock/config'
import { ServicesTabBlock } from '@/blocks/ServicesTabBlock/config'
import { SingleCaseStudyBlock } from '@/blocks/SingleCaseStudyBlock/config'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pageTheme',
      type: 'select',
      label: 'Page Theme',
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
      defaultValue: 'light',
    },
    {
      name: 'headerColor',
      type: 'select',
      label: 'Header Theme',
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
      defaultValue: 'light',
    },
    {
      name: 'mobileMenuTheme',
      type: 'select',
      label: 'Mobile Menu Theme',
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
      defaultValue: 'light',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                ActionTilesBlock,
                Archive,
                AudienceTabBlock,
                CallToAction,
                CaseStudyBlock,
                ColoredTextBlock,
                Content,
                EngagementModelBlock,
                FAQBlock,
                FeatureGridBlock,
                FooterFormBlock,
                FormBlock,
                LogoGridBlock,
                MediaBlock,
                NumberGridBlock,
                PhaseStepperVertical,
                ProductFeatureBlock,
                ServicesAccordionBlock,
                ServicesTabBlock,
                SingleCaseStudyBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
