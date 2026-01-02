import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Hero } from '@/components/sections/Hero'
import { PostCard } from '@/components/posts/PostCard'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 6,
  })

  return (
    <>
      <Hero
        title="YART Lab"
        subtitle="プログラミング、ゲーム開発、技術についてのブログ。日々の学びと発見を共有しています。"
      />

      <section style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <h2>最新の記事</h2>
          <div style={{ flex: 1 }} />
          <Link href="/posts">すべて見る →</Link>
        </div>

        {posts.length > 0 ? (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>まだ記事がありません。</p>
        )}
      </section>
    </>
  )
}
