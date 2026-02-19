'use client'

import { useState, useRef } from 'react'

type FAQItem = {
  question: string
  answer: string
  link: string
}

const items: FAQItem[] = [
  {
    link: 'link12',
    question:
      'Kann man einen geraden Lift an einer Treppe mit Podest nutzen?',
    answer:
      'Nur wenn das Podest sehr kurz ist und keine Richtungsänderung stattfindet. Ansonsten benötigen Sie zwei gerade Lifte oder einen Kurvenlift.',
  },
  {
    link: 'link13',
    question: 'Ist die Montage eines Kurvenlifts aufwändiger?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis natus laboriosam ut pariatur quas excepturi voluptatibus tempore minima cum!',
  },
]

export default function FAQAccordion() {
  const [selected, setSelected] = useState<number | null>(null)

  const toggle = (index: number) => {
    setSelected((prev) => (prev === index ? null : index))
  }

  return (
    <ul>
      {items.map((item, index) => (
        <AccordionItem
          key={item.link}
          item={item}
          index={index}
          isOpen={selected === index}
          toggle={toggle}
        />
      ))}
    </ul>
  )
}

type AccordionItemProps = {
  item: FAQItem
  index: number
  isOpen: boolean
  toggle: (index: number) => void
}

function AccordionItem({
  item,
  index,
  isOpen,
  toggle,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <li id={item.link} className="py-6 border-b border-gray-200">
      <button
        type="button"
        onClick={() => toggle(index)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between text-xl font-extrabold">
          <span>{item.question}</span>

          <svg
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M9.3335 11.6667L14.0002 16.3334L18.6668 11.6667"
              stroke="#000001"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight ?? 0}px`
            : '0px',
        }}
      >
        <div className="pt-4">
          <p>{item.answer}</p>
        </div>
      </div>
    </li>
  )
}
