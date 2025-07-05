import React from 'react'

const SkeletonProjectCard: React.FC = () => {
  return (
    <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
      {/* Image gallery skeleton */}
      <div className="relative">
        <div className="h-56 bg-gray-700/50"></div>
        {/* Swiper dots skeleton */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-700/50 rounded mb-2 w-3/4"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-3 flex-1">
          <div className="h-4 bg-gray-700/50 rounded w-full"></div>
          <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700/50 rounded w-4/6"></div>
        </div>
        
        {/* Tech stack skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="w-7 h-7 bg-gray-700/50 rounded"></div>
          <div className="w-7 h-7 bg-gray-700/50 rounded"></div>
          <div className="w-7 h-7 bg-gray-700/50 rounded"></div>
          <div className="w-7 h-7 bg-gray-700/50 rounded"></div>
          <div className="w-7 h-7 bg-gray-700/50 rounded"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-700/50 rounded w-32"></div>
      </div>
    </div>
  )
}

export default SkeletonProjectCard 