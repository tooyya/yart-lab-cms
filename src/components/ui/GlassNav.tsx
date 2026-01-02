import React from 'react'
import Link from 'next/link'

export function GlassNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/[0.08] backdrop-blur-xl border-b border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white/95 hover:text-white transition-colors">
            YART Lab
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/posts"
              className="text-white/70 hover:text-white/95 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-white/[0.08] border border-white/15 text-white/90 hover:bg-white/[0.12] transition-all"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
