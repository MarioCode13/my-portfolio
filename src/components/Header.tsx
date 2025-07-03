import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './header-anim.css'

interface HeaderProps {
  onOpenArticle: (article: string) => void
  timeout?: boolean
  isArticleVisible?: boolean
  loading?: boolean
  animateOnLoad?: boolean
}

const Header: React.FC<HeaderProps> = ({
  onOpenArticle,
  timeout,
  isArticleVisible,
  loading,
  animateOnLoad,
}) => {
  const [contentExpanded, setContentExpanded] = useState(false)

  // Expand .inner after mount and when closing article
  useEffect(() => {
    if (!isArticleVisible) {
      setTimeout(() => setContentExpanded(true), 50)
    } else {
      setContentExpanded(false)
    }
  }, [isArticleVisible])

  // Compose animation class
  let animClass = 'header-anim transition-all duration-500 ease-in-out'
  if (animateOnLoad) animClass += ' header-opening'
  if (isArticleVisible) animClass += ' header-article-visible'
  if (loading) animClass += ' header-loading'

  return (
    <header id='header'>
      <div className={animClass + (timeout ? ' hidden' : '')}>
        <Link
          to='/work'
          className='logo flex items-center justify-center mx-auto mb-4'
        >
          {/* Placeholder for icon */}
          <span className='inline-block w-20 h-20 bg-gray-700 rounded-full mr-2'></span>
        </Link>
        <div
          className={
            'header-connector' +
            (contentExpanded ? ' header-connector-animate' : '')
          }
        ></div>
        <div className='content border-t border-b border-gray-300 max-w-full'>
          <div
            className={
              'inner px-8 max-h-[40rem] overflow-hidden' +
              (contentExpanded ? ' inner-expanded' : ' inner-collapsed')
            }
          >
            <h1 className='text-3xl font-bold'>
              Hi, <br />
              I'm Mario
            </h1>
            <p className='text-lg text-gray-500 uppercase tracking-widest font-bold'>
              Developer
            </p>
          </div>
        </div>
        <nav className='mt-[2rem] use-middle'>
          <ul className='flex flex-wrap gap-4 justify-center max-w-xl mx-auto border border-gray-300 rounded'>
            <li>
              <button
                className='text-blue-500 hover:underline uppercase px-6 py-2'
                onClick={() => onOpenArticle('intro')}
              >
                Intro
              </button>
            </li>
            <li>
              <button
                className='text-blue-500 hover:underline uppercase px-6 py-2'
                onClick={() => onOpenArticle('work')}
              >
                Work
              </button>
            </li>
            <li>
              <button
                className='text-blue-500 hover:underline uppercase px-6 py-2'
                onClick={() => onOpenArticle('about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                className='text-blue-500 hover:underline uppercase px-6 py-2'
                onClick={() => onOpenArticle('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
