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
    <div>
      <span>{language}</span>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
