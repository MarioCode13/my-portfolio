import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { sanity } from '../sanityClient'
import SectionHeader from './SectionHeader'
import SEO from './SEO'
import CategoryChip from './CategoryChip'
import { BsArrowLeft } from 'react-icons/bs'

interface BlogPost {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  mainImage?: { asset?: { url?: string } }
  excerpt?: string
  body?: any
  author?: {
    name?: string
    image?: { asset?: { url?: string } }
  }
  categories?: Array<{
    _id: string
    title: string
    description?: string
  }>
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setError('No slug provided')
      setLoading(false)
      return
    }

    sanity
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          publishedAt,
          mainImage{ asset->{url} },
          excerpt,
          body,
          author->{
            name,
            image{ asset->{url} }
          },
          categories[]->{
            _id,
            title,
            description
          }
        }`,
        { slug }
      )
      .then((data) => {
        if (!data) {
          setError('Post not found')
        } else {
          setPost(data)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err)
        setError('Failed to load post')
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div>
        <SectionHeader
          title='Blog'
          subtitle='Loading...'
          sideNav
        />
        <div className='max-w-4xl mx-auto p-8'>
          <div className='text-center text-gray-400 py-16'>Loading...</div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div>
        <SectionHeader
          title='Blog'
          subtitle='Post not found'
          sideNav
        />
        <div className='max-w-4xl mx-auto p-8'>
          <div className='text-center text-gray-400 py-16'>
            <p className='mb-4'>{error || 'Post not found'}</p>
            <Link
              to='/blog'
              className='inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors'
            >
              <BsArrowLeft />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.mainImage?.asset?.url}
        type='article'
        publishedAt={post.publishedAt}
        author={post.author?.name}
        categories={post.categories?.map((cat) => cat.title) || []}
        keywords={post.categories?.map((cat) => cat.title) || []}
      />
      <SectionHeader
        title=''
        sideNav
      />
      <div className='max-w-6xl mx-auto p-8'>
        {/* Back to Blog Link */}
        <Link
          to='/blog'
          className='inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8'
        >
          <BsArrowLeft />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className='bg-white/10 rounded-lg shadow-lg overflow-hidden'>
          {post.mainImage?.asset?.url && (
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              className='w-full h-64 md:h-96 object-cover'
            />
          )}

          <div className='p-8'>
            {/* Title */}
            <h1 className='text-3xl md:text-4xl font-bold mb-4 text-white'>
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className='flex items-center gap-4 mb-6 text-gray-300'>
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
              {post.author?.name && <span>by {post.author.name}</span>}
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-6'>
                {post.categories.map((category) => (
                  <CategoryChip
                    key={category._id}
                    category={category}
                    size='sm'
                    variant='outlined'
                  />
                ))}
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <p className='text-lg text-gray-300 mb-8 leading-relaxed'>
                {post.excerpt}
              </p>
            )}

            {/* Author Info */}
            {post.author && (
              <div className='flex items-center gap-3 mb-8 p-4 bg-white/5 rounded-lg'>
                {post.author.image?.asset?.url && (
                  <img
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    className='w-12 h-12 rounded-full object-cover'
                  />
                )}
                <div>
                  <p className='font-semibold text-white'>{post.author.name}</p>
                  <p className='text-sm text-gray-400'>Author</p>
                </div>
              </div>
            )}

            {/* Article Content */}
            {post.body && (
              <div className='prose prose-invert prose-lg max-w-none'>
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      h1: ({ children }) => (
                        <h1 className='text-2xl font-bold text-white mb-4'>
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className='text-xl font-bold text-white mb-3'>
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className='text-lg font-bold text-white mb-2'>
                          {children}
                        </h3>
                      ),
                      normal: ({ children }) => (
                        <p className='text-gray-300 mb-4 leading-relaxed'>
                          {children}
                        </p>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className='list-disc list-inside text-gray-300 mb-4 space-y-1'>
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className='list-decimal list-inside text-gray-300 mb-4 space-y-1'>
                          {children}
                        </ol>
                      ),
                    },
                    listItem: ({ children }) => (
                      <li className='text-gray-300'>{children}</li>
                    ),
                    marks: {
                      code: ({ children }: { children: React.ReactNode }) => (
                        <code className='bg-gray-800 text-green-400 px-2 py-1 rounded text-sm'>
                          {children}
                        </code>
                      ),
                    },
                    types: {
                      code: ({ value }: { value: any }) => (
                        <pre className='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'>
                          <code className='text-green-400'>{value.code}</code>
                        </pre>
                      ),
                    },
                  }}
                />
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
