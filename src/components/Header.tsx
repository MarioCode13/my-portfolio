import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header-anim.css'
import { FaLaptop } from 'react-icons/fa'

interface HeaderProps {
  onOpenArticle: (article: string) => void
  timeout?: boolean
  loading?: boolean
}

const Header: React.FC<HeaderProps> = ({ onOpenArticle, timeout, loading }) => {
  const navigate = useNavigate()
  let animClass = 'header-anim transition-all duration-500 ease-in-out'
  if (loading) animClass += ' header-loading'

  return (
    <header id='header'>
      <div className={animClass + (timeout ? ' hidden' : '')}>
        <Link
          to='/work'
          className='logo flex items-center justify-center mx-auto'
        >
          <span className='w-20 h-20   rounded-full flex items-center justify-center '>
            <FaLaptop
              size={42}
              color='white'
            />
          </span>
        </Link>
        <div className={'header-connector header-connector-animate'}></div>
        <div className='content border-t border-b border-gray-300 max-w-full'>
          <div
            className={
              'inner px-8 max-h-[40rem] overflow-hidden inner-expanded'
            }
          >
            <h1 className='text-3xl font-bold'>
              Hi, <br />
              I'm Mario
            </h1>
            <p className='text-lg text-gray-300 uppercase tracking-widest font-bold'>
              Software Developer
            </p>
          </div>
        </div>
        <nav className='mt-8 use-middle relative'>
          <div className='absolute left-1/2 -top-6 -translate-x-1/2 w-px h-6 bg-gray-300'></div>
          <ul className='flex justify-center max-w-[645px] mx-auto border border-gray-300 rounded'>
            <li className='flex-1'>
              <button
                className='block min-w-[7.5rem] h-11 leading-[2.75rem] text-center uppercase font-semibold px-4 py-2 transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                onClick={() => onOpenArticle('about')}
              >
                About
              </button>
            </li>
            <li className='flex-1'>
              <button
                className='block min-w-[7.5rem] h-11 leading-[2.75rem] text-center uppercase font-semibold px-4 py-2 transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                onClick={() => onOpenArticle('work')}
              >
                Work
              </button>
            </li>
            <li className='flex-1'>
              <button
                className='block min-w-[7.5rem] h-11 leading-[2.75rem] text-center uppercase font-semibold px-4 py-2 transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                onClick={() => navigate('/blog')}
              >
                Blog
              </button>
            </li>
            <li className='flex-1'>
              <button
                className='block min-w-[7.5rem] h-11 leading-[2.75rem] text-center uppercase font-semibold px-4 py-2 transition-colors duration-200 hover:bg-blue-800 hover:text-white'
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
