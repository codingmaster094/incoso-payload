import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { Schema } from '@/components/Schema'
import { generateOrganizationSchema } from '@/utilities/generateSchema'
import Link from 'next/link'
import BackToTop from '@/components/TopButton'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="de" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <Schema schema={generateOrganizationSchema()} />
      </head>
      <body>
        <Link href="#main-content" className="skip_link">
          Skip to main content
        </Link>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            {children}
            <BackToTop />
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  )
}
export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: {
    default: 'Incoso',
    template: '%s',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}


