const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const redirects = [
    internetExplorerRedirect,
    {
      source: '/pages-sitemap.xml',
      destination: '/sitemap.xml',
      permanent: true,
    },
    {
      source: '/posts-sitemap.xml',
      destination: '/sitemap.xml',
      permanent: true,
    },
    {
      source: '/news-sitemap.xml',
      destination: '/sitemap.xml',
      permanent: true,
    },
  ]

  return redirects
}

export default redirects
