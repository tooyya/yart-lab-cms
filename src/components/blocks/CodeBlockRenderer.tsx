import React from 'react'
import { codeToHtml } from 'shiki'

export interface CodeBlockProps {
  language?: string
  code?: string
}

export async function CodeBlockRenderer({ language = 'plaintext', code = '' }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
        <span className="text-xs text-white/50 font-mono">{language}</span>
      </div>
      <div
        className="p-4 bg-black/30 overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
