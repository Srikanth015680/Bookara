import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { FaShieldAlt, FaHeadset, FaStar } from "react-icons/fa";

const Features = () => {
  return (
    <section className='mx-auto max-w-[1440px] px-6 lg:px-12 py-16 bg-gradient-to-b from-white to-gray-50'>
      
      {/* Heading */}
      <div className='text-center mb-12'>
        <h2 className='text-2xl md:text-3xl font-bold mb-3'>
          Why Choose Our Store?
        </h2>
        <p className='text-gray-600 text-sm max-w-xl mx-auto'>
          We provide the best experience with quality books, secure payments, and excellent customer support.
        </p>
      </div>

      {/* Features Grid */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

        {/* Feature 1 */}
        <div className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center'>
          <div className='w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-orange-100 rounded-xl'>
            <TbTruckDelivery className='text-2xl text-orange-500'/>
          </div>
          <h4 className='font-semibold mb-1'>Fast Delivery</h4>
          <p className='text-sm text-gray-600'>
            Get your favorite books delivered quickly to your doorstep.
          </p>
        </div>

        {/* Feature 2 */}
        <div className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center'>
          <div className='w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-xl'>
            <FaShieldAlt className='text-2xl text-green-600'/>
          </div>
          <h4 className='font-semibold mb-1'>Secure Payments</h4>
          <p className='text-sm text-gray-600'>
            Your transactions are safe with advanced encryption.
          </p>
        </div>

        {/* Feature 3 */}
        <div className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center'>
          <div className='w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-xl'>
            <FaHeadset className='text-2xl text-blue-600'/>
          </div>
          <h4 className='font-semibold mb-1'>24/7 Support</h4>
          <p className='text-sm text-gray-600'>
            Our team is always here to help you anytime.
          </p>
        </div>

        {/* Feature 4 */}
        <div className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center'>
          <div className='w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-yellow-100 rounded-xl'>
            <FaStar className='text-2xl text-yellow-500'/>
          </div>
          <h4 className='font-semibold mb-1'>Top Quality</h4>
          <p className='text-sm text-gray-600'>
            Carefully curated books with the best quality and ratings.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Features