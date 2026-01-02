import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section style={{ flex: 'none' }}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Link href="/posts">記事を読む</Link>
    </section>
  )
}
