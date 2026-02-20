import type { GlobalConfig } from 'payload'
import { getServerSideURL } from '../utilities/getURL'
import { isAdmin, isAuthor, isEditor } from '../access/roleBased'
export const Robots: GlobalConfig = {
    slug: 'robots',
    access: {
        read: () => true,
        update: (args) => isAdmin(args) || isEditor(args) || isAuthor(args),
    },
    admin: {
        group: 'SEO',
    },
    fields: [
        {
            name: 'rules',
            type: 'array',
            label: 'Robots Rules',
            defaultValue: [
                {
                    userAgent: '*',
                    allow: '/',
                    disallow: '/admin/*',
                },
            ],
            fields: [
                {
                    name: 'userAgent',
                    type: 'text',
                    label: 'User Agent',
                    required: true,
                    defaultValue: '*',
                },
                {
                    name: 'allow',
                    type: 'text',
                    label: 'Allow',
                },
                {
                    name: 'disallow',
                    type: 'text',
                    label: 'Disallow',
                },
            ],
        },
        {
            name: 'sitemaps',
            type: 'array',
            label: 'Sitemaps',
            defaultValue: [
                { url: `${getServerSideURL()}/sitemap.xml` },
            ],
            fields: [
                {
                    name: 'url',
                    type: 'text',
                    label: 'Sitemap URL',
                    required: true,
                },
            ],
        },
    ],
}
