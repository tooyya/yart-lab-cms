import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostCard } from '@/components/posts/PostCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'All blog posts',
}

export default async function PostsPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 100,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white/95 mb-2">Posts</h1>
        <p className="text-white/60">{posts.length} articles</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-center py-12">No posts yet.</p>
      )}
    </div>
  )
}
