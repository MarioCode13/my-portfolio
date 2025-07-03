import React from 'react'

interface CardProps {
  image?: string
  title: string
  excerpt?: string
  date?: string
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ image, title, excerpt, date, children }) => (
  <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl">
    {image && (
      <img src={image} alt={title} className="h-48 w-full object-cover" />
    )}
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      {excerpt && <p className="mb-2 text-gray-300 flex-1">{excerpt}</p>}
      {date && <div className="mt-2 text-sm text-gray-400">{date}</div>}
      {children}
    </div>
  </div>
)

export default Card 