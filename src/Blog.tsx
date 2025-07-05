import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanity } from './sanityClient'
import SectionHeader from './components/SectionHeader'
import SEO from './components/SEO'
import Card from './components/Card'
import SkeletonCard from './components/SkeletonCard'

interface BlogPost {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  mainImage?: { asset?: { url?: string } }
  excerpt?: string
  body?: any
  categories?: Array<{
    _id: string
    title: string
    description?: string
  }>
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
      body,
      categories[]->{
        _id,
        title,
        description
      }
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
      <SEO
        title="Blog"
        description="Thoughts, tutorials, and updates. Read the latest posts below."
        type="website"
      />
      <SectionHeader
        title='Blog'
        subtitle='Thoughts, tutorials, and updates. Read the latest posts below.'
        sideNav
      />
      <div className='max-w-5xl mx-auto p-8'>
        {loading ? (
          <div className='grid gap-8 md:grid-cols-2'>
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center text-gray-400 py-16'>
            No blog posts found.
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2'>
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug?.current || post._id}`}
                className="block transition-transform duration-200 hover:scale-[1.025]"
              >
                <Card
                  image={post.mainImage?.asset?.url}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={
                    post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString()
                  }
                  categories={post.categories}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
