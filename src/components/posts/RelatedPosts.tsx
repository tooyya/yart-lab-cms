import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostCard } from './PostCard'

interface RelatedPostsProps {
  currentPostId: string
  currentPublishedAt: string
  limit?: number
}

export async function RelatedPosts({
  currentPostId,
  currentPublishedAt,
  limit = 3,
}: RelatedPostsProps) {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { id: { not_equals: currentPostId } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
    limit: limit + 3,
  })

  const currentDate = new Date(currentPublishedAt).getTime()
  const sortedByProximity = posts
    .map((post) => ({
      post,
      distance: Math.abs(new Date(post.publishedAt).getTime() - currentDate),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ post }) => post)

  if (sortedByProximity.length === 0) return null

  return (
    <section style={{ flex: 'none' }}>
      <h2>関連記事</h2>
      <div style={{ display: 'flex', gap: '16px' }}>
        {sortedByProximity.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
