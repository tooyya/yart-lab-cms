import React from 'react'
import Link from 'next/link'
import { GlassCard } from '../ui/GlassCard'
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
    <Link href={`/posts/${post.slug}`}>
      <GlassCard hover className="h-full">
        {featuredImage?.filename && (
          <div className="aspect-video overflow-hidden rounded-t-2xl">
            <img
              src={`/api/media/file/${featuredImage.filename}`}
              alt={featuredImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-5">
          <time className="text-sm text-white/50">{publishedDate}</time>
          <h2 className="mt-2 text-lg font-semibold text-white/95 line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 text-sm text-white/60 line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </GlassCard>
    </Link>
  )
}
