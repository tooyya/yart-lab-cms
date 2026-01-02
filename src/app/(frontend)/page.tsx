import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostCard } from '@/components/posts/PostCard'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 6,
  })

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white/95 mb-4">
          YART Lab
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">
          Tech blog about programming, game development, and more.
        </p>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white/90">Recent Posts</h2>
          <Link
            href="/posts"
            className="text-white/60 hover:text-white/90 transition-colors"
          >
            View all
          </Link>
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
      </section>
    </div>
  )
}
