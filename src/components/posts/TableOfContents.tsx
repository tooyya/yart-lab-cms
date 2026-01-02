'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/extractHeadings'

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside style={{ flex: 'none' }}>
      <h2>目次</h2>
      <nav>
        <ul>
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 2) * 12}px` }}>
              <a href={`#${id}`}>{text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
