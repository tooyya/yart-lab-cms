import React from 'react'
import { GlassCard } from '../ui/GlassCard'

export interface EmbedBlockProps {
  url?: string
  provider?: string
}

export function EmbedBlockRenderer({ url = '', provider = '' }: EmbedBlockProps) {
  if (!url) return null

  return (
    <GlassCard className="my-6 p-4" hover>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/90 truncate">{url}</p>
          {provider && (
            <p className="text-xs text-white/50">{provider}</p>
          )}
        </div>
      </a>
    </GlassCard>
  )
}
