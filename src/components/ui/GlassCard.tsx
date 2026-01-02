import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.08] backdrop-blur-xl
        border border-white/15
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${hover ? 'transition-all duration-200 hover:bg-white/[0.12] hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  )
}
