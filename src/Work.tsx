import React, { useEffect, useState } from 'react'
import { sanity } from './sanityClient'
import SectionHeader from './components/SectionHeader'
import SEO from './components/SEO'
import ProjectImageGallery from './components/ProjectImageGallery'
import SkeletonProjectCard from './components/SkeletonProjectCard'
import { BsApple, BsGooglePlay } from 'react-icons/bs'

interface Project {
  _id: string
  title: string
  description: string
  projectType?: string
  order?: number
  url?: string
  appStoreUrl?: string
  playStoreUrl?: string
  gallery?: string[]
  stack?: { title: string; logo?: string }[]
}

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "project"] | order(order asc){
      _id,
      title,
      description,
      projectType,
      order,
      url,
      appStoreUrl,
      playStoreUrl,
      "gallery": gallery[].asset->url,
      stack[]->{ title, "logo": logo.asset->url }
    }`
      )
      .then((data) => {
        console.log('Sanity projects:', data)
        const sortedProjects = data.sort((a: Project, b: Project) => {
          return (a.order || 0) - (b.order || 0)
        })
        setProjects(sortedProjects)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <SEO
        title='Work'
        description='A collection of my projects and work. Explore my portfolio of web applications and development projects.'
        type='website'
      />
      <SectionHeader
        sideNav
        title='Projects'
        subtitle='A selection of my work. Explore the tech stack and screenshots for each project.'
      />
      <div className='max-w-5xl mx-auto p-8'>
        {loading ? (
          <div className='grid gap-8 md:grid-cols-2'>
            {[...Array(6)].map((_, index) => (
              <SkeletonProjectCard key={index} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className='text-center text-gray-400 py-16'>
            No projects found.
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2'>
            {projects.map((proj) => (
              <div
                key={proj._id}
                className='bg-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col'
              >
                {proj.gallery && proj.gallery.length > 0 && (
                  <ProjectImageGallery 
                    images={proj.gallery} 
                    projectType={proj.projectType} 
                    title={proj.title} 
                  />
                )}
                <div className='p-4 flex-1 flex flex-col'>
                  <h3 className='text-xl font-semibold mb-2 text-white'>
                    {proj.title}
                  </h3>
                  <p className='mb-2 text-gray-300 flex-1'>
                    {proj.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {proj.stack?.map((tech) => (
                      <span
                        key={tech.title}
                        className='flex items-center group relative cursor-pointer'
                      >
                        {tech.logo && (
                          <img
                            src={tech.logo}
                            alt={tech.title}
                            className='w-7 h-7 max-w-[28px] max-h-[28px] object-contain hover:scale-110 transition-transform duration-150'
                            style={{ minWidth: 28, minHeight: 28 }}
                          />
                        )}
                        {/* Tooltip */}
                        <span className='absolute left-1/2 top-full -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 mt-2 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10'>
                          {tech.title}
                        </span>
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  {proj.projectType === 'mobile' ? (
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      {proj.appStoreUrl && (
                        <button
                          onClick={() =>
                            window.open(proj.appStoreUrl, '_blank', 'noopener,noreferrer')
                          }
                          className='flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded shadow hover:bg-gray-800 transition-colors text-sm'
                        >
                          <BsApple className='w-4 h-4' />
                          App Store
                        </button>
                      )}
                      {proj.playStoreUrl && (
                        <button
                          onClick={() =>
                            window.open(proj.playStoreUrl, '_blank', 'noopener,noreferrer')
                          }
                          className='flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition-colors text-sm'
                        >
                          <BsGooglePlay className='w-4 h-4' />
                          Play Store
                        </button>
                      )}
                    </div>
                  ) : (
                    proj.url && (
                      <button
                        onClick={() =>
                          window.open(proj.url, '_blank', 'noopener,noreferrer')
                        }
                        className='mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors'
                      >
                        View Project
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Work
