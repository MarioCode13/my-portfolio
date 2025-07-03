import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface FooterProps {
  timeout?: boolean
}

const Footer: React.FC<FooterProps> = ({ timeout }) => (
  <footer
    id='footer'
    className={(timeout ? 'hidden ' : '') + 'w-full'}
  >
    <div
      className='flex justify-center items-center !gap-8 py-4 w-full'
      style={{ gap: '10px' }}
    >
      <a
        // className='logo'
        href='https://github.com/MarioCode13'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaGithub
          size={32}
          color='#fff'
        />
      </a>
      <a
        // className='logo'
        href='https://www.linkedin.com/in/mario-liebenberg/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaLinkedin
          size={32}
          color='#fff'
        />
      </a>
    </div>
  </footer>
)

export default Footer
