import React from 'react'

export interface BalloonProps {
  name?: string
  iconUrl?: string
  position?: 'left' | 'right'
  style?: 'standard' | 'line' | 'think'
  text?: string
}

export function BalloonRenderer({
  name = '',
  iconUrl = '',
  position = 'left',
  style = 'standard',
  text = '',
}: BalloonProps) {
  const isRight = position === 'right'

  const bubbleStyles = {
    standard: 'bg-white/10 border-white/20',
    line: 'bg-transparent border-white/30 border-2',
    think: 'bg-white/5 border-white/15 border-dashed',
  }

  return (
    <div className={`my-6 flex gap-4 ${isRight ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border border-white/20"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60">
            {name ? name[0].toUpperCase() : '?'}
          </div>
        )}
        {name && (
          <p className="mt-1 text-xs text-center text-white/50 truncate max-w-[3rem]">
            {name}
          </p>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`
          relative max-w-[80%] px-4 py-3 rounded-2xl border
          ${bubbleStyles[style]}
          ${isRight ? 'rounded-tr-sm' : 'rounded-tl-sm'}
        `}
      >
        <p className="text-white/80 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  )
}
