import React, { useEffect, useState } from 'react'
import { sanity } from './sanityClient'
import SectionHeader from './components/SectionHeader'
import Card from './components/Card'

interface BlogPost {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  mainImage?: { asset?: { url?: string } }
  excerpt?: string
  body?: any
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "post"]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage{ asset->{url} },
      excerpt,
      body
    }`
      )
      .then((data) => {
        console.log('Sanity blog posts:', data)
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <SectionHeader
        title='Blog'
        subtitle='Thoughts, tutorials, and updates. Read the latest posts below.'
        sideNav
      />
      <div className='max-w-5xl mx-auto p-8'>
        {loading ? (
          <div className='text-center text-gray-400 py-16'>Loading...</div>
        ) : posts.length === 0 ? (
          <div className='text-center text-gray-400 py-16'>
            No blog posts found.
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2'>
            {posts.map((post) => (
              <Card
                key={post._id}
                image={post.mainImage?.asset?.url}
                title={post.title}
                excerpt={post.excerpt}
                date={
                  post.publishedAt &&
                  new Date(post.publishedAt).toLocaleDateString()
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
