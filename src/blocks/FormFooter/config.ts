import type { Block } from 'payload'

export const FooterFormBlock: Block = {
  slug: 'footerFormBlock',
  interfaceName: 'FooterFormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Form',
    },
    {
      name: 'isFooterForm',
      type: 'checkbox',
      label: 'Is Footer Form',
      defaultValue: true,
    },
    {
      name: 'isFullHeight',
      type: 'checkbox',
      label: 'Is Full Height',
      defaultValue: false,
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Get in touch',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      defaultValue: 'We would love to hear from you',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    // {
    //   name: 'enableIntro',
    //   type: 'checkbox',
    //   label: 'Enable Intro Content',
    // },
    // {
    //   name: 'introContent',
    //   type: 'richText',
    //   admin: {
    //     condition: (_, { enableIntro }) => Boolean(enableIntro),
    //   },
    //   editor: lexicalEditor({
    //     features: ({ rootFeatures }) => {
    //       return [
    //         ...rootFeatures,
    //         HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    //         FixedToolbarFeature(),
    //         InlineToolbarFeature(),
    //       ]
    //     },
    //   }),
    //   label: 'Intro Content',
    // },
  ],
  graphQL: {
    singularName: 'FooterFormBlock',
  },
  labels: {
    plural: 'Footer Form Blocks',
    singular: 'Footer Form Block',
  },
}
