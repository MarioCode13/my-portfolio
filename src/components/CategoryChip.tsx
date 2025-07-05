import React from 'react'
import { Link } from 'react-router-dom'

interface CategoryChipProps {
  category: {
    _id: string
    title: string
    description?: string
  }
  onClick?: () => void
  className?: string
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  onClick,
  className = '',
  variant = 'default',
  size = 'md'
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full font-medium transition-all duration-200 cursor-pointer'
  
  const variantClasses = {
    default: 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50',
    outlined: 'bg-transparent text-blue-300 border border-blue-500/50 hover:bg-blue-500/20',
    filled: 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600'
  }
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  const chipClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <span className="whitespace-nowrap">
      {category.title}
    </span>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={chipClasses} title={category.description}>
        {content}
      </button>
    )
  }

  return (
    <Link 
      to={`/blog?category=${category._id}`} 
      className={chipClasses}
      title={category.description}
    >
      {content}
    </Link>
  )
}

export default CategoryChip 