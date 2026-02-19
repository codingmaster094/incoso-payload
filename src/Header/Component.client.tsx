'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
type SubmenuItem = {
  id?: string | null
  label: string
  link?: string | null
  children?: SubmenuItem[] | null
}

interface HeaderClientProps {
  data: Header
}

export function resolveLink(link: any): string {
  if (link?.url) return link.url
  if (link?.reference?.value?.slug) return `/${link.reference.value.slug}`
  return '#'
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [stack, setStack] = useState<{ items: SubmenuItem[]; backLabel: string }[]>([])
  const [theme, setTheme] = useState<string | null>(null)
  const [currentMenu, setCurrentMenu] = useState<SubmenuItem[]>(data.submenus ?? [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  /* Escape key — same as @keydown.escape.window */
  useEffect(() => {
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query) {
        setResults([])
        return
      }

      setLoading(true)

      const res = await fetch(`/api/search?q=${query}`)
      const data = await res.json()

      setResults(data.results)
      setLoading(false)
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [query])





  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* ================= MENU HANDLERS ================= */
  const openSubMenu = (children?: SubmenuItem[] | null, backLabel?: string) => {
    if (!children || children.length === 0) return
    setStack((prev) => [
      ...prev,
      { items: currentMenu, backLabel: currentMenu[0]?.label || 'Menu' },
    ])
    setCurrentMenu(children)
  }

  const goBack = () => {
    setStack((prev) => {
      const copy = [...prev]
      const last = copy.pop()
      if (last) {
        setCurrentMenu(last.items)
      }
      return copy
    })
  }

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.focus();
    }
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false)
    setCurrentMenu(data?.submenus ?? [])
    setStack([])
  }

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  const isActive = (href: string) => {
    if (!href) return false

    // exact match
    if (pathname === href) return true

    // nested match (example: /about matches /about/team)
    if (pathname.startsWith(href) && href !== '/') return true

    return false
  }

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 bg-white z-50 h-(--header-size) ${scrolled ? 'border-b' : ''}`}
    >
      <div className="flex">
        {/* ================= MENU BUTTON ================= */}
        <button
          aria-label="Menü-Umschalter"
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-green p-20 lg:p-35 relative"
        >
          <Image
            src="/image/menu-icon.svg"
            alt=""
            className={`trans_slow ${menuOpen ? 'opacity-0 rotate-45' : ''}`}
            width={30}
            height={30}
          />
          <Image
            src="/image/cross-icon.svg"
            alt=""
            width={30}
            height={30}
            className={`trans_slow absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${menuOpen ? '' : 'opacity-0 -rotate-45'
              }`}
          />
        </button>

        {/* ================= OFFCANVAS MENU ================= */}

        <div
          ref={menuRef}
          aria-hidden={!menuOpen}
          aria-label="Hauptmenü"
          role="dialog"
          className={`
                fixed left-0 top-(--header-size)
                w-full max-w-370 h-[calc(100%-var(--header-size))]
                bg-white shadow-lg z-50 p-35
                transform transition-all duration-300 ease-in-out
                ${menuOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}
              `}
          tabIndex={-1}
        >
          <ul className="flex flex-col">
            {/* ================= BACK BUTTON ================= */}
            {stack.length > 0 && (
              <li>
                <button
                  className="flex items-center gap-16 mb-20 xl:mb-30 py-6"
                  onClick={goBack}
                  aria-label={`Zurück zu ${stack[stack.length - 1].backLabel}`}
                >
                  <Image
                    src="/image/right-icon-2.svg"
                    className="p-6 rotate-180"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span>{stack[stack.length - 1].backLabel}</span>
                </button>
              </li>
            )}

            {/* ================= MENU ITEMS ================= */}
            {currentMenu.map((item) => (
              <li key={item.id}>
                <div
                  className="flex justify-between items-center cursor-pointer py-6 group"
                  onClick={() => openSubMenu(item.children, item.label)}
                >
                  <Link
                    href={item.link || '#'}
                    className="hover:text-green group-hover:text-green"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <button
                      aria-label={`${item.label} Untermenü öffnen`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openSubMenu(item.children, item.label);
                      }}
                    >
                      <Image
                        src="/image/right-icon-2.svg"
                        className="p-6"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/20 z-40"></div>}

        {/* ================= CENTER ================= */}
        <div className="grow flex justify-center lg:justify-between items-center py-20 px-24 xl:px-48 uppercase">
          <Link href="/" className="font-inter text-24 font-extrabold">
            {data?.logo_title || 'INCOSO'}
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex gap-40 xl:gap-80">
              {data?.navItems?.map((item, i) => {
                const href = resolveLink(item.link)

                return (
                  <li key={item.id || i}>
                    <Link
                      href={href}
                      className={`
                      uppercase
                      hover:text-green
                      transition-colors duration-300
                      ${isActive(href) ? 'text-green active font-semibold' : ''}
                    `}
                    >
                      {item.link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* ================= SEARCH ================= */}
        <button
          aria-label="Suchleiste"
          className="bg-black p-20 lg:p-35"
          onClick={() => setSearchOpen(true)}
        >
          <Image src="/image/search-icon.svg" alt="" width={30} height={30} />
        </button>

        {searchOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            onClick={() => setSearchOpen(false)}
          >
            <div className="bg-white p-24 w-full max-w-xsm" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold mb-2">Search</h2>
              <input
                type="search"
                placeholder="Search news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-8 border border-gray-300 mb-4"
              />

              {loading && <p>Searching...</p>}

              <ul>
                {results.map((item, i) => (
                  <li key={item.id} className="mt-8">
                    <Link
                      href={`/news/${item.slug}`}
                      className="hover:text-green"
                    >
                      {i + 1}. {item.title}
                    </Link>
                  </li>
                ))}

                {!loading && query && results.length === 0 && <p>No results found</p>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
