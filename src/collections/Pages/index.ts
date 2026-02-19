import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { canCreate, canUpdate, canDelete } from '../../access/roleBased'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { buildFullSlug } from './hooks/beforeChange'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Hero_Image } from '@/blocks/Hero_Image/config'
import { Unser_ansatz } from '@/blocks/Unser_Ansatz/config'
import { Unsere_Boxes } from '@/blocks/Unsere_Boxes/config'
import { Unsere_Kultur } from '@/blocks/Unsere_Kultur/config'
import { Zwei_geschaftsbereiche } from '@/blocks/Zwei_geschaftsbereiche/config'
import { Fuhrung_Governance } from '@/blocks/Fuhrung_Governance/config'
import { Intro_section } from '@/blocks/Intro_section/config'
import { Was_Wir_Tun } from '@/blocks/Was_wir_tun/config'
import { Latest_news } from '@/blocks/Latest_news/config'
import { Latest_news_without_img } from '@/blocks/Latest_news_without_img/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: canCreate,
    delete: canDelete,
    read: authenticatedOrPublished,
    update: canUpdate,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],

    livePreview: {
      url: ({ data, req }) =>
        data?.fullSlug || data?.slug
          ? generatePreviewPath({
            slug: (data.fullSlug ?? data.slug) as string,
            collection: 'pages',
            req,
          })
          : null,
    },

    preview: (data, { req }) =>
      data?.fullSlug || data?.slug
        ? generatePreviewPath({
          slug: (data.fullSlug ?? data.slug) as string,
          collection: 'pages',
          req,
        })
        : null,

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
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Hero_Image,
                Unser_ansatz,
                Unsere_Boxes,
                Unsere_Kultur,
                Zwei_geschaftsbereiche,
                Fuhrung_Governance,
                Intro_section,
                Was_Wir_Tun,
                Latest_news,
                Latest_news_without_img
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
            {
              name: 'robots',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'noindex', value: 'noindex' },
                { label: 'nofollow', value: 'nofollow' },
              ],
              admin: {
                description: 'Robots control for this page. If empty, defaults to index, follow.',
                position: 'sidebar',
              },
            },

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
    slugField(),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fullSlug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt, buildFullSlug],
    afterChange: [revalidatePage],
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
