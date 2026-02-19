'use client'

import { useEffect, useState } from 'react'
import { useLenis } from '@/providers/Lenis'

export default function BackToTop() {
    const [visible, setVisible] = useState(false)
    const lenis = useLenis()

    useEffect(() => {
        const check = () => {
            setVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', check)
        return () => window.removeEventListener('scroll', check)
    }, [])

    const scrollTop = () => {
        if (lenis) {
            lenis.scrollTo(0)
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }

    if (!visible) return null

    return (
        <button
            onClick={scrollTop}
            className="fixed bottom-10 right-10 bg-black text-white p-8 transition-opacity"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 15l6 -6l6 6" />
            </svg>
            <span className="sr-only">Zurück nach oben</span>
        </button>
    )
}
