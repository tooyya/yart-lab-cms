import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { GlassCard } from '@/components/ui/GlassCard'
import { PostContent } from '@/components/posts/PostContent'
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

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <time className="text-sm text-white/50">{publishedDate}</time>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white/95">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage?.filename && (
        <GlassCard className="mb-8 overflow-hidden">
          <img
            src={`/api/media/file/${featuredImage.filename}`}
            alt={featuredImage.alt || post.title}
            className="w-full h-auto rounded-2xl"
          />
        </GlassCard>
      )}

      {/* Content */}
      <GlassCard className="p-6 md:p-8">
        <PostContent content={post.content} />
      </GlassCard>
    </article>
  )
}
