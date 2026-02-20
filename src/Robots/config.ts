import type { GlobalConfig } from 'payload'
import { getServerSideURL } from '../utilities/getURL'
import { isAdmin, isAuthor, isEditor } from '../access/roleBased'
export const Robots: GlobalConfig = {
    slug: 'robots',
    label: {
        en: "Robots.txt",
        de: "Robots.txt"
    },
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
            label: {
                en: 'Robots Rules',
                de: 'Roboter-Regeln'
            },
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
                    label: {
                        en: 'User Agent',
                        de: 'Benutzer-Agent'
                    },
                    required: true,
                    defaultValue: '*',
                },
                {
                    name: 'allow',
                    type: 'text',
                    label: {
                        en: 'Allow',
                        de: 'Erlauben'
                    },
                },
                {
                    name: 'disallow',
                    type: 'text',
                    label: {
                        en: 'Disallow',
                        de: 'Nicht erlauben'
                    },
                },
            ],
        },
        {
            name: 'sitemaps',
            type: 'array',
            label: {
                en: 'Sitemaps',
                de: 'Sitemaps'
            },
            defaultValue: [
                { url: `${getServerSideURL()}/sitemap.xml` },
            ],
            fields: [
                {
                    name: 'url',
                    type: 'text',
                    label: {
                        en: 'Sitemap URL',
                        de: 'Sitemap URL'
                    },
                    required: true,
                },
            ],
        },
    ],
}
