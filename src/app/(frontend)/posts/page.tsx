import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostCard } from '@/components/posts/PostCard'

export const metadata = {
  title: 'すべての記事',
}

export default async function PostsPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 100,
  })

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <header>
        <h1>すべての記事</h1>
        <p>{posts.length}件の記事があります</p>
      </header>

      {posts.length > 0 ? (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>まだ記事がありません。</p>
      )}
    </div>
  )
}
