import React from 'react'
import { BsApple, BsGooglePlay, BsGithub, BsGlobe } from 'react-icons/bs'
import ProjectImageGallery from './ProjectImageGallery'

interface MobileAppProject {
  _id: string
  title: string
  description: string
  gallery?: string[]
  stack?: { title: string; logo?: string }[]
  appStoreUrl?: string
  playStoreUrl?: string
  githubUrl?: string
  url?: string
  features?: string[]
  platforms?: string[]
}

interface MobileAppCardProps {
  project: MobileAppProject
}

const MobileAppCard: React.FC<MobileAppCardProps> = ({ project }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'ios':
        return <BsApple className="w-4 h-4" />
      case 'android':
        return <BsGooglePlay className="w-4 h-4" />
      case 'web':
        return <BsGlobe className="w-4 h-4" />
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'ios':
        return 'bg-gray-800 text-white'
      case 'android':
        return 'bg-green-600 text-white'
      case 'web':
        return 'bg-blue-600 text-white'
      case 'cross-platform':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {/* Mobile App Screenshots - Portrait Layout */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="relative">
          <ProjectImageGallery 
            images={project.gallery} 
            projectType="mobile" 
            title={project.title} 
          />
          
          {/* Platform badges overlay */}
          {project.platforms && project.platforms.length > 0 && (
            <div className="absolute top-2 left-2 flex gap-1 z-10">
              {project.platforms.map((platform) => (
                <span
                  key={platform}
                  className={`${getPlatformColor(platform)} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
                >
                  {getPlatformIcon(platform)}
                  {platform}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-1">
              {project.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30"
                >
                  {feature}
                </span>
              ))}
              {project.features.length > 3 && (
                <span className="text-xs text-gray-400 self-center">
                  +{project.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.stack && project.stack.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech.title}
                  className="flex items-center gap-1 bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700"
                >
                  {tech.logo && (
                    <img
                      src={tech.logo}
                      alt={tech.title}
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  {tech.title}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-xs text-gray-400 self-center">
                  +{project.stack.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.appStoreUrl && (
            <button
              onClick={() => window.open(project.appStoreUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              <BsApple className="w-4 h-4" />
              App Store
            </button>
          )}
          
          {project.playStoreUrl && (
            <button
              onClick={() => window.open(project.playStoreUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <BsGooglePlay className="w-4 h-4" />
              Play Store
            </button>
          )}
          
          {project.githubUrl && (
            <button
              onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <BsGithub className="w-4 h-4" />
              GitHub
            </button>
          )}
          
          {project.url && !project.appStoreUrl && !project.playStoreUrl && (
            <button
              onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <BsGlobe className="w-4 h-4" />
              View Demo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileAppCard 