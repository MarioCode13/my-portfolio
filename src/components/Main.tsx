import React from 'react'
import './main-article-anim.css'

interface MainProps {
  isArticleVisible: boolean
  timeout: boolean
  articleTimeout: boolean
  article: string
  onCloseArticle: () => void
  setWrapperRef: (node: HTMLDivElement | null) => void
}

const Main: React.FC<MainProps> = ({
  isArticleVisible,
  timeout,
  articleTimeout,
  article,
  onCloseArticle,
  setWrapperRef,
}) => {
  const close = (
    <button
      className='close'
      onClick={onCloseArticle}
      aria-label='Close'
    >
      <svg
        viewBox='0 0 20 20'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <line
          x1='4'
          y1='4'
          x2='16'
          y2='16'
        />
        <line
          x1='16'
          y1='4'
          x2='4'
          y2='16'
        />
      </svg>
    </button>
  )

  // Helper to get animation classes
  const getArticleClass = (id: string) => {
    let base = 'main-article'
    if (article === id && articleTimeout) {
      base += ' main-article-active'
    } else if (article === id) {
      base += ' main-article-preactive'
    } else if (articleTimeout) {
      base += ' main-article-timeout'
    } else {
      base += ' hidden'
    }
    return base
  }

  return (
    <>
      {/* Backdrop for frosted glass effect, closes modal on click */}
      {timeout && (
        <div
          className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-100 pointer-events-auto z-30"
          onClick={onCloseArticle}
          aria-hidden="true"
        >
          <div
            className="relative pointer-events-auto w-auto max-w-2xl mx-auto main-modal-scroll"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Work Article */}
            <article
              id='work'
              className={getArticleClass('work')}
            >
              <h2 className='major text-2xl font-bold mb-4'>Work</h2>
              <span className='image main block mb-4'>
                <img
                  src='/assets/work.jpg'
                  alt='Work'
                  className='rounded w-full'
                />
              </span>
              <p className='mb-2'>
                Throughout my career, I've built a wide range of web and mobile
                solutions — from responsive marketing sites to production-ready
                apps with complex workflows, API integrations, and admin systems.
              </p>
              <p className='mb-2'>
                I'm comfortable across the full stack and enjoy crafting
                experiences that are both seamless for users and maintainable for
                teams. Whether it's building scalable frontend architectures or
                shaping backend systems, I aim to create solutions that last.
              </p>
              <p className='mb-2'>
                I take continuous learning seriously — staying current with
                industry best practices and sharpening my skills through
                experimentation, side projects, and collaborative work.
              </p>

              <p>
                You can find a more detailed overview of the projects I've worked
                on{' '}
                <a
                  href='/work'
                  className='text-blue-500 underline'
                >
                  here
                </a>
                .
              </p>
              {close}
            </article>
            {/* About Article */}
            <article
              id='about'
              className={getArticleClass('about')}
            >
              <h2 className='major text-2xl font-bold mb-4'>About</h2>
              <span className='image main block mb-4'>
                <img
                  src='/assets/about2.jpg'
                  alt='About'
                  className='rounded w-full'
                />
              </span>
              <p className='mb-2'>
                Hi, I'm Mario — a software developer with a background in both
                creative and technical fields. My journey into tech was shaped by
                a love of music and design, eventually evolving into a passion for
                building digital products that are intuitive, functional, and
                thoughtfully designed.
              </p>
              <p className='mb-2'>
                I have a BCom in Information Systems and Business Management from
                the University of South Africa, and I've worked across various
                roles from marketing to web development — experiences that gave me
                a well-rounded perspective on how software fits into broader
                business goals.
              </p>
              <p className='mb-2'>
                Today, I focus on building robust, user-focused applications
                using: React, React Native, TypeScript, GraphQL, Java (Spring
                Boot), PostgreSQL
              </p>
              <p className='mb-2'>
                I'm driven by a desire to bring ideas to life and solve real
                problems — whether it's through frontend experiences, backend
                logic, or the architecture that connects it all.
              </p>
              <p>
                You can explore some of my work{' '}
                <a
                  href='/work'
                  className='text-blue-500 underline'
                >
                  here
                </a>
                .
              </p>
              {close}
            </article>
            {/* Contact Article */}
            <article
              id='contact'
              className={getArticleClass('contact')}
            >
              <h2 className='major text-2xl font-bold mb-4'>Contact</h2>
              <form
                method='POST'
                name='contact'
                data-netlify='true'
                className='mb-4'
              >
                <div className='flex flex-wrap gap-4 mb-2'>
                  <div className='flex-1 min-w-[120px]'>
                    <label
                      htmlFor='name'
                      className='block text-gray-700'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='w-full border rounded px-2 py-1'
                    />
                  </div>
                  <div className='flex-1 min-w-[120px]'>
                    <label
                      htmlFor='email'
                      className='block text-gray-700'
                    >
                      Email
                    </label>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      className='w-full border rounded px-2 py-1'
                    />
                  </div>
                </div>
                <div className='mb-2'>
                  <label
                    htmlFor='message'
                    className='block text-gray-700'
                  >
                    Message
                  </label>
                  <textarea
                    name='message'
                    id='message'
                    rows={4}
                    className='w-full border rounded px-2 py-1'
                  ></textarea>
                </div>
                <div className='mb-2'>
                  <label
                    htmlFor='gotcha'
                    className='hidden'
                  >
                    Gotcha
                  </label>
                  <input
                    id='gotcha'
                    type='text'
                    name='_gotcha'
                    className='hidden'
                  />
                </div>
                <div className='flex gap-2'>
                  <input
                    type='submit'
                    value='Send Message'
                    className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
                  />
                  <input
                    type='reset'
                    value='Reset'
                    className='bg-gray-300 text-black px-4 py-2 rounded cursor-pointer'
                  />
                </div>
              </form>
              <ul className='flex gap-4 justify-center'>
                <li>
                  <a
                    href='https://github.com/MarioCode13'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-700 hover:text-black'
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/mario-liebenberg/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-700 hover:text-blue-900'
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
              {close}
            </article>
          </div>
        </div>
      )}
    </>
  )
}

export default Main
