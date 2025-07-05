import React from 'react'
import CategoryChip from './CategoryChip'

interface CardProps {
  image?: string
  title: string
  excerpt?: string
  date?: string
  categories?: Array<{
    _id: string
    title: string
    description?: string
  }>
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ image, title, excerpt, date, categories, children }) => (
  <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl">
    {image && (
      <img src={image} alt={title} className="h-48 w-full object-cover" />
    )}
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      {excerpt && <p className="mb-2 text-gray-300 flex-1">{excerpt}</p>}
      
      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.slice(0, 3).map((category) => (
            <CategoryChip
              key={category._id}
              category={category}
              size="sm"
              variant="default"
            />
          ))}
          {categories.length > 3 && (
            <span className="text-xs text-gray-400 self-center">
              +{categories.length - 3} more
            </span>
          )}
        </div>
      )}
      
      {date && <div className="mt-auto text-sm text-gray-400">{date}</div>}
      {children}
    </div>
  </div>
)

export default Card 