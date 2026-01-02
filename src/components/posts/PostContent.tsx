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

const htmlConverters: HTMLConvertersFunctionAsync = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    Code: async ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const code = (node.fields.code as string) || ''
      const language = (node.fields.language as string) || 'plaintext'
      const html = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      })
      return `<div class="my-6 rounded-xl overflow-hidden border border-white/10">
        <div class="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
          <span class="text-xs text-white/50 font-mono">${language}</span>
        </div>
        <div class="p-4 bg-black/30 overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0">
          ${html}
        </div>
      </div>`
    },
    embed: ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const url = (node.fields.url as string) || ''
      const provider = (node.fields.provider as string) || ''
      if (!url) return ''
      return `<div class="my-6 p-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-white/90 truncate">${url}</p>
            ${provider ? `<p class="text-xs text-white/50">${provider}</p>` : ''}
          </div>
        </a>
      </div>`
    },
    balloon: ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const name = (node.fields.name as string) || ''
      const iconUrl = (node.fields.iconUrl as string) || ''
      const position = (node.fields.position as string) || 'left'
      const style = (node.fields.style as string) || 'standard'
      const text = (node.fields.text as string) || ''
      const isRight = position === 'right'
      const bubbleStyles: Record<string, string> = {
        standard: 'bg-white/10 border-white/20',
        line: 'bg-transparent border-white/30 border-2',
        think: 'bg-white/5 border-white/15 border-dashed',
      }
      return `<div class="my-6 flex gap-4 ${isRight ? 'flex-row-reverse' : ''}">
        <div class="flex-shrink-0">
          ${
            iconUrl
              ? `<img src="${iconUrl}" alt="${name}" class="w-12 h-12 rounded-full object-cover border border-white/20" />`
              : `<div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60">${name ? name[0].toUpperCase() : '?'}</div>`
          }
          ${name ? `<p class="mt-1 text-xs text-center text-white/50 truncate max-w-[3rem]">${name}</p>` : ''}
        </div>
        <div class="relative max-w-[80%] px-4 py-3 rounded-2xl border ${bubbleStyles[style] || bubbleStyles.standard} ${isRight ? 'rounded-tr-sm' : 'rounded-tl-sm'}">
          <p class="text-white/80 whitespace-pre-wrap">${text}</p>
        </div>
      </div>`
    },
    iconBox: ({ node }: { node: SerializedBlockNode<BlockFields> }) => {
      const type = (node.fields.type as string) || 'info'
      const text = (node.fields.text as string) || ''
      const styles: Record<string, string> = {
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
        warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
        success: 'bg-green-500/10 border-green-500/30 text-green-300',
        error: 'bg-red-500/10 border-red-500/30 text-red-300',
      }
      const icons: Record<string, string> = {
        info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        warning:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />',
        success:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
        error:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />',
      }
      return `<div class="my-6 flex gap-3 p-4 rounded-xl border ${styles[type] || styles.info}">
        <div class="flex-shrink-0 mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${icons[type] || icons.info}
          </svg>
        </div>
        <div class="flex-1 text-white/80 whitespace-pre-wrap">${text}</div>
      </div>`
    },
  },
})

export async function PostContent({ content }: PostContentProps) {
  const html = await convertLexicalToHTMLAsync({
    data: content,
    converters: htmlConverters,
  })

  return (
    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
