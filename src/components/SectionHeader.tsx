import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaBriefcase } from 'react-icons/fa'
import { BsJournalText } from 'react-icons/bs'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  sideNav?: boolean
}

const navItems = [
  { to: '/', icon: <FaHome size={24} />, label: 'Home' },
  { to: '/work', icon: <FaBriefcase size={24} />, label: 'Work' },
  { to: '/blog', icon: <BsJournalText size={24} />, label: 'Blog' },
]

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  sideNav = false,
}) => {
  const location = useLocation()
  if (sideNav) {
    return (
      <div className='flex flex-col'>
        {/* Side Nav: only on md+ */}
        <nav className='hidden md:flex fixed top-0 left-0 h-full w-16 bg-black/60 backdrop-blur-lg flex-col items-center py-8 z-40'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`mb-8 flex flex-col items-center group relative transition-transform duration-200 ${
                  isActive
                    ? 'text-blue-400 scale-110'
                    : '!text-white !hover:text-blue-300'
                }`}
                title={item.label}
              >
                {item.icon}
                <span className='sr-only'>{item.label}</span>
                {/* Tooltip */}
                <span className='absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 ml-2 pointer-events-none transition-opacity duration-200 whitespace-nowrap'>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
        <nav className='flex md:hidden w-full sticky top-0 z-20 bg-[#00000073] bg-opacity-60 py-2 mb-6'>
          <div className='flex justify-center gap-6 w-full'>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`uppercase font-semibold px-4 py-2 rounded transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-400'
                      : '!text-white !hover:text-blue-300'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
        {/* Main Content shifted right on desktop */}
        <div className='flex-1 md:ml-16 mt-8'>
          <div className='text-center'>
            <h2 className='text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-lg'>
              {title}
            </h2>
            {subtitle && (
              <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='mb-8'>
      <nav className='w-full sticky top-0 z-20 bg-[#00000066] py-2 mb-6'>
        <div className='flex justify-center gap-6 max-w-3xl mx-auto'>
          {navItems.map((item) => {
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`uppercase font-semibold px-4 py-2 rounded transition-colors duration-200
                  ${
                    isActive
                      ? '!text-blue-400'
                      : '!text-white hover:text-blue-300'
                  }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
      <div className='text-center'>
        <h2 className='text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-lg'>
          {title}
        </h2>
        {subtitle && (
          <p className='text-lg text-gray-300 max-w-2xl mx-auto'>{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default SectionHeader
