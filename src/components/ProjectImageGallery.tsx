import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

interface ProjectImageGalleryProps {
  images: string[]
  projectType?: string
  title: string
}

const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
  images,
  projectType = 'web',
  title,
}) => {
  if (projectType === 'mobile') {
    return (
      <div className='relative bg-[#07001e81] p-3'>
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className='h-80 w-full'
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className='flex justify-center'>
                <div className='relative w-44 h-80 bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-700'>
                  <img
                    src={img}
                    alt={`${title} screenshot ${i + 1}`}
                    className='w-full h-full object-cover'
                  />
                  {/* Phone frame details */}
                  <div className='absolute top-2 left-1/2 transform -translate-x-1/2 w-18 h-1 bg-gray-600 rounded-full'></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }

  return (
    <div className='relative'>
      <Swiper
        spaceBetween={8}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className='h-56 w-full'
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`${title} screenshot ${i + 1}`}
              className='h-56 w-full object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProjectImageGallery
