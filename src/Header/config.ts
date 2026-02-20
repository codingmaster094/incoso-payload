import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import slugify from 'slugify'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    de: 'Kopfzeile',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: {
        en: 'Title',
        de: 'Titel',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
      label: {
        en: 'Slug',
        de: 'Slug',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (siblingData?.title) {
              return slugify(siblingData.title, { lower: true })
            }
            return value
          },
        ],
      },
    },
    {
      name: 'logo_title',
      type: 'text',
      required: false,
      label: {
        en: 'Logo title',
        de: 'Logo title',
      },
    },
    {
      name: 'Header_Logo',
      type: 'upload',
      label: {
        en: 'Logo',
        de: 'Logo',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Mobile_Header_Logo',
      type: 'upload',
      label: {
        en: 'Mobile logo',
        de: 'Mobile logo',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'submenus',
      label: {
        en: 'Sub Navigation',
        de: 'Sub Navigation',
      },
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: {
            en: "Link",
            de: "Link"
          },
        },
        {
          name: 'children',
          label: {
            en: 'Sub Menu',
            de: 'Sub Menu',
          },
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              },
            {
              name: 'children',
              label: {
                en: 'Sub Menu',
                de: 'Sub Menu',
              },
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  label: {
                    en: "Link",
                    de: "Link"
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
