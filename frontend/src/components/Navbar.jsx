import React from 'react'
import { TbHomeFilled } from 'react-icons/tb'
import {IoLibrary,IoMailOpen} from "react-icons/io5"
import { Link, NavLink } from 'react-router-dom'
import { FaRegWindowClose } from "react-icons/fa";
import { motion } from "framer-motion"

const Navbar = ({containerStles,toggleMenu,menuOpened}) => {
  const navItems=[
    {to:"/",label:"Home",icon:<TbHomeFilled/>},
    {to:"/shop",label:"Shop",icon:<IoLibrary/>},
    {to:"mailto:banothsrikanth015@gmail.com",label:"Contact",icon:<IoMailOpen/>},
  ]

  return (
    <motion.nav 
      className={`${containerStles}`}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* close button  */}
      {menuOpened && (
        <>
        <motion.div whileTap={{ scale: 0.8 }}>
          <FaRegWindowClose 
            onClick={toggleMenu} 
            className="text-xl self-end cursor-pointer relative left-8 " 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to={"/"} className='text-[24px] font-bold leading-[120%] mb-10'>
            <h4 className='text-[16px] md:text-[17px] text-[#452372] mb-2 font-bold'>
              Bookara
            </h4>
          </Link>
        </motion.div>
        </>
      )}

      {navItems.map(({to,label,icon},index)=>(
        <motion.div 
          key={label} 
          className='inline-flex relative top-1'
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >

          {to.startsWith('mailto')?(
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={menuOpened?toggleMenu:undefined} 
              href={to} 
              className='flex items-center justify-center gap-x-2'
            >
              <span className='text-xl'>{icon}</span>
              <span className='font-medium'>{label}</span>
            </motion.a>
          ):(
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink 
                className={({isActive})=>isActive
                  ?"text-secondary relative after:w-2/3 after:h-0.5 after:rounded-full after:bg-secondary after:absolute after:-bottom-2 after:left-0 flex items-center justify-center gap-x-2 "
                  :"flex items-center justify-between gap-x-2"
                } 
                to={to}
              >
                <span className='text-xl'>{icon}</span>
                <span className='font-medium'>{label}</span>
              </NavLink>
            </motion.div>
          )}

        </motion.div>
      ))}

    </motion.nav>
  )
}

export default Navbar