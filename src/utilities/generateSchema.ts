import type { WithContext, WebPage, BlogPosting, Organization, WebSite, Graph, BreadcrumbList, FAQPage, Question } from 'schema-dts'
import { Page, Post, News } from '../payload-types'
import { getServerSideURL } from './getURL'

export const generateOrganizationSchema = (): Graph => {
    const serverUrl = getServerSideURL()
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${serverUrl}/#organization`,
                name: 'Incoso',
                legalName: 'Incoso',
                url: serverUrl,
                logo: {
                    '@type': 'ImageObject',
                    '@id': `${serverUrl}/#logo`,
                    url: `${serverUrl}/image/favicon.png`,
                    contentUrl: `${serverUrl}/image/favicon.png`,
                    width: 512 as any,
                    height: 512 as any,
                    caption: 'Incoso'
                },
                image: {
                    '@id': `${serverUrl}/#logo`,
                },
                sameAs: [
                    'https://www.facebook.com/incoso',
                    'https://twitter.com/incoso',
                    'https://www.linkedin.com/company/incoso',
                ],
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        telephone: '+49-000-000000', // Placeholder - user should update
                        contactType: 'customer service',
                        availableLanguage: ['German', 'English']
                    }
                ],
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Main Street 1', // Placeholder
                    addressLocality: 'Berlin',      // Placeholder
                    postalCode: '10115',           // Placeholder
                    addressCountry: 'DE'
                }
            },
            {
                '@type': 'WebSite',
                '@id': `${serverUrl}/#website`,
                name: 'Incoso',
                url: serverUrl,
                description: 'Incoso - Beratung, Consulting & Services',
                publisher: {
                    '@id': `${serverUrl}/#organization`,
                },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${serverUrl}/search?q={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                } as any,
                inLanguage: 'de-DE'
            },
        ],
    }
}

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]): BreadcrumbList => {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export const generateFAQSchema = (items: { question: string; answer: string }[]): FAQPage => {
    return {
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }
}

export const generatePageSchema = (page: Partial<Page>, faqs?: { question: string; answer: string }[]): Graph => {
    const serverUrl = getServerSideURL()
    const url = `${serverUrl}${page.slug === 'home' ? '' : `/${page.slug}`}`
    const breadcrumbs = [
        { name: 'Home', url: serverUrl },
    ]
    if (page.slug !== 'home') {
        breadcrumbs.push({ name: page.title || 'Page', url })
    }

    const graph: any[] = [
        {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            name: page.title || 'Incoso',
            description: page.meta?.description || '',
            url: url,
            isPartOf: { '@id': `${serverUrl}/#website` },
            breadcrumb: { '@id': `${url}/#breadcrumb` },
            publisher: { '@id': `${serverUrl}/#organization` },
            datePublished: (page as any).createdAt,
            dateModified: (page as any).updatedAt,
            inLanguage: 'de-DE'
        },
        {
            ...generateBreadcrumbSchema(breadcrumbs),
            '@id': `${url}/#breadcrumb`,
        },
    ]

    if (faqs && faqs.length > 0) {
        graph.push({
            ...generateFAQSchema(faqs),
            '@id': `${url}/#faq`,
        })
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    }
}

export const generatePostSchema = (post: Partial<Post>, faqs?: { question: string; answer: string }[]): Graph => {
    const serverUrl = getServerSideURL()
    const url = `${serverUrl}/posts/${post.slug}`
    const breadcrumbs = [
        { name: 'Home', url: serverUrl },
        { name: 'Posts', url: `${serverUrl}/posts` },
        { name: post.title || 'Post', url },
    ]

    const graph: any[] = [
        {
            '@type': 'BlogPosting',
            '@id': `${url}/#post`,
            headline: post.title || '',
            description: post.meta?.description || '',
            image:
                typeof post.meta?.image === 'object' && post.meta.image?.url
                    ? `${serverUrl}${post.meta.image.url}`
                    : undefined,
            datePublished: post.publishedAt || (post as any).createdAt,
            dateModified: (post as any).updatedAt || post.publishedAt,
            author:
                post.authors && post.authors.length > 0 && typeof post.authors[0] === 'object'
                    ? {
                        '@type': 'Person',
                        name: post.authors[0].name || '',
                        url: `${serverUrl}/authors/${(post.authors[0] as any).slug || ''}`
                    }
                    : undefined,
            publisher: { '@id': `${serverUrl}/#organization` },
            url: url,
            mainEntityOfPage: { '@id': `${url}/#webpage` },
            inLanguage: 'de-DE'
        },
        {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            url: url,
            breadcrumb: { '@id': `${url}/#breadcrumb` },
            isPartOf: { '@id': `${serverUrl}/#website` }
        },
        {
            ...generateBreadcrumbSchema(breadcrumbs),
            '@id': `${url}/#breadcrumb`,
        },
    ]

    if (faqs && faqs.length > 0) {
        graph.push({
            ...generateFAQSchema(faqs),
            '@id': `${url}/#faq`,
        })
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    }
}

export const generateNewsSchema = (news: Partial<News>, faqs?: { question: string; answer: string }[]): Graph => {
    const serverUrl = getServerSideURL()
    const url = `${serverUrl}/news/${news.slug}`
    const breadcrumbs = [
        { name: 'Home', url: serverUrl },
        { name: 'News', url: `${serverUrl}/news` },
        { name: news.title || 'News', url },
    ]

    const author =
        news.userdetails && news.userdetails.length > 0
            ? {
                '@type': 'Person',
                name: news.userdetails[0].title || '',
            }
            : news.authors && news.authors.length > 0 && typeof news.authors[0] === 'object'
                ? {
                    '@type': 'Person',
                    name: news.authors[0].name || '',
                }
                : undefined

    const graph: any[] = [
        {
            '@type': 'BlogPosting',
            '@id': `${url}/#news`,
            headline: news.title || '',
            description: news.meta?.description || '',
            image:
                typeof news.meta?.image === 'object' && news.meta.image?.url
                    ? `${serverUrl}${news.meta.image.url}`
                    : undefined,
            datePublished: news.publishedAt || (news as any).createdAt,
            dateModified: (news as any).updatedAt || news.publishedAt,
            author,
            publisher: { '@id': `${serverUrl}/#organization` },
            url: url,
            mainEntityOfPage: { '@id': `${url}/#webpage` },
            inLanguage: 'de-DE'
        },
        {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            url: url,
            breadcrumb: { '@id': `${url}/#breadcrumb` },
            isPartOf: { '@id': `${serverUrl}/#website` }
        },
        {
            ...generateBreadcrumbSchema(breadcrumbs),
            '@id': `${url}/#breadcrumb`,
        },
    ]

    if (faqs && faqs.length > 0) {
        graph.push({
            ...generateFAQSchema(faqs),
            '@id': `${url}/#faq`,
        })
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    }
}
