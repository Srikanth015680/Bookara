import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import Item from './Item';

const PopularBooks = () => {
  const { books } = useContext(ShopContext);
  const [popularBooks, setPopularBooks] = useState([])

  useEffect(() => {
    const data = books.filter(item => item.popular)
    setPopularBooks(data.slice(0, 5))
  }, [books])

  return (
    <section className='mx-auto max-w-[1440px] py-16 bg-gradient-to-b from-white to-gray-50 px-6 lg:px-12' >

      <Title  
        title1={"Popular"}  
        title2={'Books'} 
        titleStyles={'pb-12 text-center'} 
        paraStyles={"block!"}
      />

      {/* Container */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8' >

        {popularBooks.map(book => (
          <div 
            key={book._id}
            className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
          >
            
            {/* badge */}
            <span className="absolute mt-2 ml-2 text-xs bg-black text-white px-2 py-1 rounded-md opacity-90">
              Popular
            </span>

            <Item book={book} />

          </div>
        ))}

      </div>

    </section>
  )
}

export default PopularBooks