
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import bg from "../assets/bg.png"
import pencil from "../assets/pencil.png"

const Hero = () => {
  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-36 bg-white'>
      <div className='flex flex-col items-center justify-center gap-12 xl:flex-row'>

        {/* left side */}
        <motion.div 
          className='flex flex-1 flex-col pt-12 xl:pt-32'
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='max-w-xl text-[42px] md:text-[60px] leading-tight font-extrabold mb-6 text-gray-900'>
            Discover Stories
            <span>
              <motion.img 
                src={pencil} 
                alt=""
                className='inline-block ml-2 w-10 relative bottom-1'
                initial={{ rotate: -25, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </span>
            {" "}That Shape{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your World
            </span>
          </h1>

          <motion.p
            className='text-gray-600 text-lg leading-relaxed max-w-lg'
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore a world of stories, knowledge, and inspiration. Discover books that ignite your imagination,
            broaden your perspective, and enrich your journey.
          </motion.p>

          <motion.div 
            className='mt-8'
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to={"/shop"} 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Explore Now →
            </Link>
          </motion.div>
        </motion.div>

        {/* right side */}
        <motion.div 
          className='flex flex-1 justify-center'
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className='relative'>
            <img 
              src={bg} 
              alt="bg" 
              className='w-[400px] md:w-[520px] rounded-xl shadow-lg'
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero