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
  text = '',
}: BalloonProps) {
  const isRight = position === 'right'

  return (
    <div style={{ display: 'flex', gap: '16px', flexDirection: isRight ? 'row-reverse' : 'row' }}>
      <div style={{ flex: 'none' }}>
        {iconUrl ? (
          <img src={iconUrl} alt={name} />
        ) : (
          <div>{name ? name[0].toUpperCase() : '?'}</div>
        )}
        {name && <p>{name}</p>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p>{text}</p>
      </div>
    </div>
  )
}
