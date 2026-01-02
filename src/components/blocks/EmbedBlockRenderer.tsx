import React from 'react'

export interface EmbedBlockProps {
  url?: string
  provider?: string
}

export function EmbedBlockRenderer({ url = '', provider = '' }: EmbedBlockProps) {
  if (!url) return null

  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      {provider && <span>{provider}</span>}
    </div>
  )
}
