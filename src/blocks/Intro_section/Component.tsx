'use client'
import React from 'react'
import Link from 'next/link'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { usePathname } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface IntroProps {
  main_title: string
  subtitle: string
  description1?: DefaultTypedEditorState
  description2?: DefaultTypedEditorState
}

/* -------------------- Breadcrumb helpers -------------------- */

const formatSlug = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const Chevron = () => (
  <svg
    className="group-last:hidden"
    width="7"
    height="14"
    viewBox="0 0 7 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.19811 0.0239856C0.947105 -0.0260145 0.677905 -0.00401448 0.448105 0.148986C-0.0113959 0.455987 -0.139496 1.09599 0.166805 1.555C2.36196 4.84803 2.36196 9.13796 0.166805 12.431C-0.139496 12.89 -0.0113959 13.53 0.448105 13.837C0.907605 14.143 1.54801 14.015 1.85441 13.555L5.85441 7.55501C6.07831 7.22001 6.07831 6.76599 5.85441 6.43098L1.85441 0.430969C1.70121 0.200968 1.44901 0.0739857 1.19811 0.0239856Z"
      fill="black"
    />
  </svg>
)

export const Intro_section: React.FC<IntroProps> = ({
  main_title,
  subtitle,
  description1,
  description2,
}) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((segment, index) => ({
    label: formatSlug(segment),
    href: '/' + segments.slice(0, index + 1).join('/'),
    isLast: index === segments.length - 1,
  }))

  return (
    <section className="pb-spc">
      <div className="container">
        <ul className="breadcrumb flex mb-17 xl:mb-34">
          <li className="group pr-14 flex items-center gap-14">
            <Link href="/" className="group-last:bg-gray py-2 group-last:px-11 rounded">
              Incoso
            </Link>
            {crumbs.length > 0 && <Chevron />}
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb.href} className="group pr-14 flex items-center gap-14">
              <Link
                href={crumb.href}
                className={`py-2 px-11 rounded ${
                  crumb.isLast ? 'bg-gray pointer-events-none' : ''
                }`}
              >
                {crumb.label}
              </Link>
              {!crumb.isLast && <Chevron />}
            </li>
          ))}
        </ul>
        <h1 className="text-22 font-inter font-extrabold mb-17 xl:mb-34">{main_title}</h1>
        <h2 className="text-38 font-semibold mb-17 xl:mb-34">{subtitle}</h2>
        {description1 && (
          <div className="text max-w-950 mb-14 xl:mb-28 font-inter text-22">
            <RichText data={description1} />
          </div>
        )}
        {description2 && <RichText data={description2} />}
        <div className="text max-w-950"></div>
      </div>
    </section>
  )
}
