import React from 'react'
import './globals.css'
import { GlassNav } from '@/components/ui/GlassNav'

export const metadata = {
  title: {
    default: 'YART Lab',
    template: '%s | YART Lab',
  },
  description: 'YART Lab - Tech blog',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <GlassNav />
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
