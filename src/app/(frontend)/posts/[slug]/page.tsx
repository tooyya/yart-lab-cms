import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostContent } from '@/components/posts/PostContent'
import { TableOfContents } from '@/components/posts/TableOfContents'
import { RelatedPosts } from '@/components/posts/RelatedPosts'
import { extractHeadingsFromLexical } from '@/lib/extractHeadings'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: decodedSlug } },
    limit: 1,
  })

  const post = docs[0]
  if (!post) return { title: 'Not Found' }

  const featuredImage = post.featuredImage as Media | null

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      images: featuredImage?.filename
        ? [`/api/media/file/${featuredImage.filename}`]
        : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: decodedSlug } },
    limit: 1,
  })

  const post = docs[0]
  if (!post) notFound()

  const featuredImage = post.featuredImage as Media | null
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const headings = extractHeadingsFromLexical(post.content)

  return (
    <article style={{ flex: 1, minWidth: 0 }}>
      <header>
        <time>{publishedDate}</time>
        <h1>{post.title}</h1>
        {post.excerpt && <p>{post.excerpt}</p>}
      </header>

      {featuredImage?.filename && (
        <img
          src={`/api/media/file/${featuredImage.filename}`}
          alt={featuredImage.alt || post.title}
        />
      )}

      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <PostContent content={post.content} />
          <RelatedPosts
            currentPostId={post.id}
            currentPublishedAt={post.publishedAt}
          />
        </div>
        <TableOfContents headings={headings} />
      </div>
    </article>
  )
}
