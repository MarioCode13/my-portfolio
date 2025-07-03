import React, { useEffect, useState } from 'react'
import { sanity } from './sanityClient'
import SectionHeader from './components/SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface Project {
  _id: string
  title: string
  description: string
  url?: string
  gallery?: string[]
  stack?: { title: string; logo?: string }[]
}

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "project"]{
      _id,
      title,
      description,
      url,
      "gallery": gallery[].asset->url,
      stack[]->{ title, "logo": logo.asset->url }
    }`
      )
      .then((data) => {
        console.log('Sanity projects:', data)
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <SectionHeader
        sideNav
        title='Projects'
        subtitle='A selection of my work. Explore the tech stack and screenshots for each project.'
      />
      <div className='max-w-5xl mx-auto p-8'>
        {loading ? (
          <div className='text-center text-gray-400 py-16'>Loading...</div>
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
                  <Swiper
                    spaceBetween={8}
                    slidesPerView={1}
                    className='h-48 w-full mb-2'
                  >
                    {proj.gallery.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={proj.title}
                          className='h-48 w-full object-cover'
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
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
                        className='flex items-center'
                      >
                        {tech.logo && (
                          <img
                            src={tech.logo}
                            alt={tech.title}
                            title={tech.title}
                            className='w-7 h-7 max-w-[28px] max-h-[28px] object-contain hover:scale-110 transition-transform duration-150'
                            style={{ minWidth: 28, minHeight: 28 }}
                          />
                        )}
                      </span>
                    ))}
                  </div>
                  {proj.url && (
                    <button
                      onClick={() =>
                        window.open(proj.url, '_blank', 'noopener,noreferrer')
                      }
                      className='mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors'
                    >
                      View Project
                    </button>
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
