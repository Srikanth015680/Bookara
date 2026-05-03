import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import logo from "../assets/logo.png"
import Navbar from "./Navbar"
import {CgMenuLeft} from "react-icons/cg"
import {TbUserCircle} from "react-icons/tb"
import {RiUserLine,RiShoppingBag4Line} from "react-icons/ri"
import { ShopContext } from '../context/ShopContext';

const Header = () => {
  //const navigate=useNavigate()
  const{token,navigate,setToken,getCartCount,setCartItem}=useContext(ShopContext)
  const [active,setActive]=useState(false)
  const[menuOpened,setMenuOpened]=useState(false)

  const toggleMenu=()=>{
    setMenuOpened((prev)=>!prev)
  }

  useEffect(()=>{
    const handleScrool=()=>{
      if(window.scrollY>0){
        if(menuOpened){
          setMenuOpened(false)
        }
      }
      setActive(window.scrollY>30)
    }
    window.addEventListener("scroll",handleScrool)
    return()=>{
      window.removeEventListener("scroll",handleScrool)
    }
  },[menuOpened])


  const logout=()=>{
    navigate('/login')
    localStorage.removeItem("token")
    setToken('')
    setCartItem({})

  }

  return (
    <motion.header 
      className='fixed top-0 w-full left-0 right-0 z-50'
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className={`${active ?"bg-white py-2.5 ":"bg-[#f8f6fb] py-3"} mx-auto max-w-[1440px] px-6 lg:px-12 flex items-center justify-between border-b border-slate-900 rounded transition-all duration-300`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        
        {/* Logo */}
        <motion.div
          className='flex-1 flex items-center justify-start'
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to={"/"} className='flex items-center'>
          
                       <img src={logo}  alt='logo' className='hidden sm:flex mr-2' width={36} height={36}/>

                      <h4 className=' text-[16px] md:text-[17px] mb-2 font-bold'>Bookara</h4>



          </Link>
        </motion.div>

        {/* Navbar */}
        <motion.div 
          className='flex-1 flex items-center justify-center xl:absolute xl:left-1/2 xl:-translate-x-1/2'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Navbar 
            menuOpened={menuOpened} 
            toggleMenu={toggleMenu} 
            containerStles={`${menuOpened ? "flex flex-col gap-y-16 h-screen w-[222px] left-0 bg-white z-60 py-4 shadow-xl px-10 absolute top-0":"hidden xl:flex justify-center gap-x-8 xl:gap-x-14 font-medium rounded-full px-2 py-1"}`}
          />
        </motion.div>

        {/* Right Side */}
        <motion.div  
          className='gap-x-3 sm:gap-x-10 flex items-center'
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <CgMenuLeft onClick={toggleMenu} className='text-2xl cursor-pointer xl:hidden'/>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to={'/cart'} className='flex relative'>
              <RiShoppingBag4Line className='text-[33px] p-1.5 rounded-full text-[#f8f6fb] bg-[#452372]'/>
              <span className='rounded-full w-5 h-5 shadow-sm bg-[#f8f6fb] ring-1 ring-slate-900/5 font-medium absolute left-5 -top-2.5 flex items-center justify-center'>{getCartCount()}</span>
            </Link>
          </motion.div>

          <div className='relative group'>
            <motion.div 
              // onClick={!token && navigate('/login')}


              // Gpt miya 


              onClick={() => {
        if (!token) {
          navigate('/login');
            } else {
        navigate('/');
          }
        }}




              whileHover={{ scale: 1.05 }}
            >
              {token ? (
                <TbUserCircle className='text-[24px] cursor-pointer'/>
              ) : (
                <button onClick={()=>navigate("/login")} className='flex items-center justify-center text-white medium-14 gap-x-2 bg-black ring-1 ring-white px-7 py-2.5 rounded-full cursor-pointer transition-all duration-300'>
                  Login <RiUserLine/>
                </button>
              )}
            </motion.div>

            {token && (
              <motion.ul 
                className='hidden group-hover:flex bg-white p-1 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-6 flex-col text-[14px] font-[400] shadow-emerald-200'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <li onClick={()=>navigate("/orders")}  className='p-2 cursor-pointer text-[#282626]'>Orders</li>
                <li onClick={logout}  className='p-2 cursor-pointer text-[#282626]'>Logout</li>
              </motion.ul>
            )}
          </div>

        </motion.div>

      </motion.div>
    </motion.header>
  )
}

export default Header