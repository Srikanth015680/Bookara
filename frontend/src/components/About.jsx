import React from 'react'
import Title from './Title'
import { TbTruckReturn } from 'react-icons/tb'
import { FaShieldAlt, FaComments } from "react-icons/fa";
import about from "../assets/book_1.png"

const About = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-12 xl:py-24 bg-gradient-to-b from-white to-gray-50">

      {/* container */}
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        
        {/* left side */}
        <div className="flex-1">
          <Title 
            title1={"Unveiling Our "} 
            title2={"Store's Key Features!"} 
            titleStyles={'pb-12 text-center lg:text-left'} 
            paraStyles={"block!"} 
          />

          {/* features */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Item 1 */}
            <div className='flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
              <div className='h-14 w-14 rounded-xl bg-red-100 flex items-center justify-center'>
                <TbTruckReturn className='text-2xl text-red-500'/>
              </div>
              <div>
                <h4 className='text-[17px] font-semibold mb-1'>Easy Returns Process</h4>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Enjoy a stress-free return experience with easy steps, fast approvals, and quick refunds.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className='flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
              <div className='h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center'>
                <FaShieldAlt className='text-2xl text-green-600'/>
              </div>
              <div>
                <h4 className='text-[17px] font-semibold mb-1'>Secure Payments</h4>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Your transactions are protected with advanced encryption and secure payment gateways.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className='flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2'>
              <div className='h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center'>
                <FaComments className='text-2xl text-blue-600'/>
              </div>
              <div>
                <h4 className='text-[17px] font-semibold mb-1'>24/7 Live Support</h4>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Get instant help anytime with our friendly customer support team available 24/7.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-center">
          <img 
            src={about} 
            alt="aboutImage" 
            className='w-[260px] md:w-[320px] lg:w-[380px] rounded-2xl shadow-xl hover:scale-105 transition duration-300'
          />
        </div>

      </div>
    </section>
  )
}

export default About