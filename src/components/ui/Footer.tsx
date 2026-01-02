import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ flex: 'none' }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href="/">YART Lab</Link>
          <p>プログラミング、ゲーム開発、技術について書いているブログです。</p>
        </div>
        <div style={{ flex: 'none' }}>
          <h4>コンテンツ</h4>
          <ul>
            <li><Link href="/posts">すべての記事</Link></li>
          </ul>
        </div>
        <div style={{ flex: 'none' }}>
          <h4>リンク</h4>
          <ul>
            <li><a href="https://github.com/tooyya" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
      <p>© {new Date().getFullYear()} YART Lab. All rights reserved.</p>
    </footer>
  )
}
