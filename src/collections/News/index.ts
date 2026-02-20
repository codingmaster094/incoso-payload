import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTMLField,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { isAdmin, isEditor } from '../../access/roleBased'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { News_Hero_Section } from '../../blocks/News_hero_section/config'
import { News_content_CTA } from '../../blocks/News_content_cta/config'
import { News_content_faq } from '../../blocks/News_content_faq/config'
import { News_content_Kosten } from '../../blocks/News_content_Kosten/config'
import { Kurvige_Lifte } from '../../blocks/News_Content_Kurvige_Lifte/config'
import { Das_Wichtigste } from '../../blocks/Das_Wichtigste/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const News: CollectionConfig<'news'> = {
  slug: 'news',
  access: {
    admin: authenticated,
    create: isAdmin,
    delete: isAdmin,
    read: (args) => isAdmin(args) || isEditor(args),
    update: (args) => isAdmin(args) || isEditor(args),
  },

  defaultPopulate: {
    title: true,
    slug: true,
    heroImage: true,
    in_focus: true,
    content: true,
    publishedAt: true,
    meta: {
      image: true,
      description: true,
    },
  },

  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'news',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'news',
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
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'in_focus',
              type: 'text',
              label: 'In Focus',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
          ],
          label: 'box details',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [News_Hero_Section],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'layout',
        },
        {
          fields: [
            {
              name: 'Guterncontent',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({
                      blocks: [
                        Banner,
                        Code,
                        MediaBlock,
                        News_content_CTA,
                        News_content_faq,
                        News_content_Kosten,
                        Kurvige_Lifte,
                        Das_Wichtigste,
                      ],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            lexicalHTMLField({
              htmlFieldName: 'Gutenberg_html',
              lexicalFieldName: 'Guterncontent',
            }),
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'news',
            },
          ],
          label: 'Meta',
        },
        {
          label: 'User Details',
          fields: [
            {
              name: 'userdetails',
              type: 'array',
              required: false,
              fields: [
                {
                  name: 'icons',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'title',
                  type: 'text',
                },
              ],
            },
          ],
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
            {
              name: 'robots',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'noindex', value: 'noindex' },
                { label: 'nofollow', value: 'nofollow' },
              ],
              admin: {
                description: 'Robots control for this news item. If empty, defaults to index, follow.',
                position: 'sidebar',
              },
            },
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
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
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
