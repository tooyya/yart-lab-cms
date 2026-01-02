import './globals.css'
import { GlassNav } from '@/components/ui/GlassNav'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: {
    default: 'YART Lab',
    template: '%s | YART Lab',
  },
  description: 'YART Lab - Tech blog',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <GlassNav />
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
