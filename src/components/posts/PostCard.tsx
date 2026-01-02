import Link from 'next/link'
import type { Post, Media } from '@/payload-types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const featuredImage = post.featuredImage as Media | null
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/posts/${post.slug}`} style={{ flex: 1, minWidth: 0 }}>
      <article>
        {featuredImage?.filename && (
          <img
            src={`/api/media/file/${featuredImage.filename}`}
            alt={featuredImage.alt || post.title}
          />
        )}
        <time>{publishedDate}</time>
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
      </article>
    </Link>
  )
}
