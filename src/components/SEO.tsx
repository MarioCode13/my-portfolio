import React, { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedAt?: string
  author?: string
  categories?: string[]
  keywords?: string[]
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedAt,
  author,
  categories = [],
  keywords = []
}) => {
  const siteTitle = 'Mario\'s Portfolio'
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

  useEffect(() => {
    document.title = fullTitle

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '')
    } else if (description) {
      const newMetaDescription = document.createElement('meta')
      newMetaDescription.name = 'description'
      newMetaDescription.content = description
      document.head.appendChild(newMetaDescription)
    }

    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`)
      if (metaTag) {
        metaTag.setAttribute('content', content)
      } else {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', property)
        metaTag.setAttribute('content', content)
        document.head.appendChild(metaTag)
      }
    }

    if (description) updateMetaTag('og:description', description)
    if (image) updateMetaTag('og:image', image)
    updateMetaTag('og:title', fullTitle)
    updateMetaTag('og:type', type)
    updateMetaTag('og:site_name', siteTitle)

    updateMetaTag('twitter:title', fullTitle)
    if (description) updateMetaTag('twitter:description', description)
    if (image) updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:card', 'summary_large_image')

    if (type === 'article') {
      if (publishedAt) updateMetaTag('article:published_time', publishedAt)
      if (author) updateMetaTag('article:author', author)
      categories.forEach((category, index) => {
        updateMetaTag(`article:section`, category)
      })
    }

    if (type === 'article') {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image,
        "author": {
          "@type": "Person",
          "name": author || "Mario"
        },
        "publisher": {
          "@type": "Organization",
          "name": siteTitle
        },
        "datePublished": publishedAt,
        "dateModified": publishedAt,
        "keywords": [...categories, ...keywords].join(', ')
      }

      const existingScript = document.querySelector('script[type="application/ld+json"]')
      if (existingScript) {
        existingScript.remove()
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    return () => {
      document.title = siteTitle
    }
  }, [title, description, image, type, publishedAt, author, categories, keywords, fullTitle, siteTitle])

  return null
}

export default SEO 