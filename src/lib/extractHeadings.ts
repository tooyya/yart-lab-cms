import type { Post } from '@/payload-types'

export interface Heading {
  id: string
  text: string
  level: number
}

export function extractHeadingsFromLexical(content: Post['content']): Heading[] {
  const headings: Heading[] = []

  function extractTextFromChildren(children: unknown[]): string {
    return children
      .map((child: unknown) => {
        const c = child as { text?: string; children?: unknown[] }
        if (c.text) return c.text
        if (c.children) return extractTextFromChildren(c.children)
        return ''
      })
      .join('')
  }

  function generateSlug(text: string): string {
    return encodeURIComponent(
      text
        .trim()
        .replace(/\s+/g, '-')
    )
  }

  function traverse(node: unknown) {
    const n = node as { type?: string; tag?: string; children?: unknown[] }
    if (n.type === 'heading' && n.tag) {
      const level = parseInt(n.tag.replace('h', ''), 10)
      const text = extractTextFromChildren(n.children || [])
      const id = generateSlug(text)

      if (text && level >= 2 && level <= 4) {
        headings.push({ id, text, level })
      }
    }

    if (n.children) {
      n.children.forEach(traverse)
    }
  }

  const c = content as { root?: { children?: unknown[] } }
  if (c?.root?.children) {
    c.root.children.forEach(traverse)
  }

  return headings
}
