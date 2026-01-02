import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'
import type { HTMLConvertersFunctionAsync } from '@payloadcms/richtext-lexical/html-async'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { codeToHtml } from 'shiki'
import type { Post } from '@/payload-types'

interface PostContentProps {
  content: Post['content']
}

interface BlockFields {
  [key: string]: unknown
}

function generateHeadingId(text: string): string {
  return encodeURIComponent(text.trim().replace(/\s+/g, '-'))
}

function extractTextFromNode(node: unknown): string {
  const n = node as { text?: string; children?: unknown[] }
  if (n.text) return n.text
  if (n.children) return n.children.map(extractTextFromNode).join('')
  return ''
}

const htmlConverters: HTMLConvertersFunctionAsync = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node }: { node: { tag?: string; children?: unknown[] } }) => {
    const tag = node.tag || 'h2'
    const text = extractTextFromNode(node)
    const id = generateHeadingId(text)
    const childrenHtml = (node.children || []).map(extractTextFromNode).join('')
    return `<${tag} id="${id}">${childrenHtml}</${tag}>`
  },
  blocks: {
    Code: async ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const code = (node.fields.code as string) || ''
      const language = (node.fields.language as string) || 'plaintext'
      const html = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      })
      return `<div><span>${language}</span>${html}</div>`
    },
    embed: ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const url = (node.fields.url as string) || ''
      const provider = (node.fields.provider as string) || ''
      if (!url) return ''
      return `<div><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>${provider ? `<span>${provider}</span>` : ''}</div>`
    },
    balloon: ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const name = (node.fields.name as string) || ''
      const iconUrl = (node.fields.iconUrl as string) || ''
      const text = (node.fields.text as string) || ''
      return `<div>${iconUrl ? `<img src="${iconUrl}" alt="${name}" />` : ''}${name ? `<span>${name}</span>` : ''}<p>${text}</p></div>`
    },
    iconBox: ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const type = (node.fields.type as string) || 'info'
      const text = (node.fields.text as string) || ''
      return `<div data-type="${type}"><p>${text}</p></div>`
    },
  },
})

export async function PostContent({ content }: PostContentProps) {
  const html = await convertLexicalToHTMLAsync({
    data: content,
    converters: htmlConverters,
  })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
