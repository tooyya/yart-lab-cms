import React from 'react'

export interface IconBoxProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  text?: string
}

export function IconBoxRenderer({ type = 'info', text = '' }: IconBoxProps) {
  return (
    <div data-type={type} style={{ display: 'flex', gap: '8px' }}>
      <span style={{ flex: 'none' }}>[{type}]</span>
      <div style={{ flex: 1, minWidth: 0 }}>{text}</div>
    </div>
  )
}
