import React from 'react'
import Hero from "../components/Hero"
import NewArrivals from '../components/NewArrivals'
import About from "../components/About"
import Features from '../components/Features'
import Footer from '../components/Footer'
import PopularBooks from '../components/PopularBooks'
const Home = () => {
  return (
  
    <>
    <Hero/>
    <NewArrivals/>
    <About/>
    <PopularBooks/>
    <Features/>
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Footer/>

    </div>
    
    
    </>
  
  
    
  )
}

export default Home