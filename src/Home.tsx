import React, { useRef, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import './root-anim.css'

const Home: React.FC = () => {
  const [isArticleVisible, setIsArticleVisible] = useState(false)
  const [timeout, setTimeoutState] = useState(false)
  const [articleTimeout, setArticleTimeout] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(true)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const headerAnimatedRef = useRef(false)
  const headerAnimationLocked = useRef(false)
  const [headerShouldAnimate, setHeaderShouldAnimate] = useState(() => {
    return sessionStorage.getItem('headerAnimated') !== 'true';
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (headerShouldAnimate && !loading && !headerAnimationLocked.current) {
      sessionStorage.setItem('headerAnimated', 'true');
      headerAnimationLocked.current = true;
      setTimeout(() => setHeaderShouldAnimate(false), 1600);
    }
  }, [headerShouldAnimate, loading]);

  const handleOpenArticle = (articleName: string) => {
    setIsArticleVisible(true)
    setArticle(articleName)
    setTimeout(() => setTimeoutState(true), 325)
    setTimeout(() => setArticleTimeout(true), 350)
  }

  const handleCloseArticle = () => {
    setArticleTimeout(false)
    setTimeout(() => setTimeoutState(false), 325)
    setTimeout(() => {
      setIsArticleVisible(false)
      setArticle('')
    }, 350)
  }

  // Click outside logic (optional, can be enhanced for accessibility)
  // React's useEffect can be used to add/remove event listeners if needed

  // Compose root-level class for animation states
  const rootClass = [
    'relative',
    'w-full',
    'min-h-screen',
    loading ? 'is-loading' : '',
    isArticleVisible ? 'is-article-visible' : '',
  ].join(' ')

  return (
    <div
      className={rootClass}
      id='root-anim-wrapper'
    >
      <div
        className='fixed inset-0 w-full h-full z-0 bg-cover bg-center'
        id='bg-anim'
        style={{
          backgroundImage: "url('/assets/bg2.jpg')",
          height: '100vh',
          width: '100%',
        }}
      >
        <div
          className='absolute inset-0 w-full h-full z-10 pointer-events-none'
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.7) 100%)',
            height: '100vh',
            width: '100%',
          }}
        ></div>
        <div
          className='absolute inset-0 w-full h-full z-20 bg-black bg-opacity-60 pointer-events-none'
          style={{ height: '100vh', width: '100%' }}
        ></div>
      </div>
      {/* Main content wrapper */}
      <div
        className='relative z-10 flex flex-col items-center min-h-screen w-full p-8 md:p-8 sm:p-4'
        id='wrapper'
        style={{ background: 'transparent' }}
      >
        <Header
          onOpenArticle={handleOpenArticle}
          timeout={timeout}
          isArticleVisible={isArticleVisible}
          loading={loading}
          animateOnLoad={headerShouldAnimate}
        />
        <Main
          isArticleVisible={isArticleVisible}
          timeout={timeout}
          articleTimeout={articleTimeout}
          article={article}
          onCloseArticle={handleCloseArticle}
          setWrapperRef={(node) => (wrapperRef.current = node)}
        />
        <Footer timeout={timeout} />
      </div>
    </div>
  )
}

export default Home
