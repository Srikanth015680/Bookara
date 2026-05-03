import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { Swiper, SwiperSlide } from 'swiper/react';
import Item from './Item';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from "swiper/modules"
import { ShopContext } from '../context/ShopContext';

const NewArrivals = () => {
  const { books } = useContext(ShopContext)
  const [newArrivals, setNewArrivals] = useState([])

  useEffect(() => {
    const data = books.slice(0, 7);
    setNewArrivals(data.reverse())
  }, [books])

  return (
    <section className='mx-auto max-w-[1440px] px-6 lg:px-10 py-14 bg-gradient-to-b from-white to-gray-50 rounded-xl'>

      <Title 
        title1={'New'} 
        title2={'Arrivals'} 
        titleStyles={'pb-12 text-center'}  
        paraStyles={'!block'} 
      />

      {/* Swiper */}
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          400: { slidesPerView: 2, spaceBetween: 20 },
          700: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1200: { slidesPerView: 5, spaceBetween: 30 }
        }}
        modules={[Pagination, Autoplay]}
        className='mb-10 mt-4 h-auto'
      >

        {newArrivals.map((book) => (
          <SwiperSlide key={book._id}>
            <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Item book={book} />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      {/* Custom pagination styling */}
      <style>
        {`
          .swiper-pagination-bullet {
            background: #d1d5db;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: #111827;
            width: 18px;
            border-radius: 6px;
          }
        `}
      </style>

    </section>
  )
}

export default NewArrivals