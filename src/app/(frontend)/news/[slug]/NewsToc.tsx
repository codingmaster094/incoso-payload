'use client'

import Link from 'next/link'
import React from 'react'
import { useLenis } from '@/providers/Lenis'

type Heading = {
  id: string
  text: string
  level: 'h2' | 'h3'
}

export default function NewsToc({ headings }: { headings: Heading[] }) {
  const lenis = useLenis()

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()

    if (lenis) {
      lenis.scrollTo(`#${targetId}`, {
        offset: -120,
        duration: 1.5,
      })
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        const yOffset = -120
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        })
      }
    }
  }

  // 👉 GROUP H3 UNDER PREVIOUS H2
  const groupedHeadings = headings.reduce<
    { h2: Heading; h3: Heading[] }[]
  >((acc, current) => {
    if (current.level === 'h2') {
      acc.push({ h2: current, h3: [] })
    } else if (current.level === 'h3' && acc.length > 0) {
      acc[acc.length - 1].h3.push(current)
    }
    return acc
  }, [])

  return (
    <div className="bg-light p-24 space-y-20">
      <h2 className="text-22 font-extrabold mb-12 xl:mb-24">
        Inhaltsverzeichnis
      </h2>

      {groupedHeadings.map((group) => (
        <div key={group.h2.id}>
          {/* H2 */}
          <Link
            href={`#${group.h2.id}`}
            onClick={(e) => handleScroll(e, group.h2.id)}
            className="block font-bold text-base mt-4 mb-2"
          >
            {group.h2.text}
          </Link>

          {/* H3 children */}
          {group.h3.length > 0 && (
            <ul className="list_arrow space-y-12 ">
              {group.h3.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`#${sub.id}`}
                    onClick={(e) => handleScroll(e, sub.id)}
                    className="flex items-start gap-2 pl-4 text-sm"
                  >
                    <span>{sub.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
