import React from 'react'

export interface IconBoxProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  text?: string
}

const icons = {
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const styles = {
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
  success: 'bg-green-500/10 border-green-500/30 text-green-300',
  error: 'bg-red-500/10 border-red-500/30 text-red-300',
}

export function IconBoxRenderer({ type = 'info', text = '' }: IconBoxProps) {
  return (
    <div className={`my-6 flex gap-3 p-4 rounded-xl border ${styles[type]}`}>
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div className="flex-1 text-white/80 whitespace-pre-wrap">
        {text}
      </div>
    </div>
  )
}
