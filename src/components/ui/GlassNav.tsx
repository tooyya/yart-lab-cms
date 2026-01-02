import Link from 'next/link'

export function GlassNav() {
  return (
    <nav style={{ flex: 'none' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="/">YART Lab</Link>
        <div style={{ flex: 1 }} />
        <Link href="/posts">Posts</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  )
}
