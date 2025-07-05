import React from 'react'

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-700/50"></div>
      
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-700/50 rounded mb-2 w-3/4"></div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-700/50 rounded w-full"></div>
          <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700/50 rounded w-4/6"></div>
        </div>
        
        {/* Meta info skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-700/50 rounded-full"></div>
            <div className="h-4 bg-gray-700/50 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-700/50 rounded w-16"></div>
        </div>
        
        {/* Categories skeleton */}
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-700/50 rounded-full w-16"></div>
          <div className="h-6 bg-gray-700/50 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard 