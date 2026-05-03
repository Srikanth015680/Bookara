
import './App.css'

import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backend_url=import.meta.env.VITE_BACKEND_URL
export const currency="$"
import Login from "./components/Login"

const App = () => {
  const[token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem('token'):"")

useEffect(()=>{
  localStorage.setItem("token",token)
},[token])




  return (
    <main>
      <ToastContainer />
      {token ===""?(<Login setToken={setToken}/>):(
         <div className='bg-[#f8f6fb] text-[#404040]'>
        <div className='mx-auto max-w-[1440px] flex  flex-col sm:flex-row'>
          <Sidebar token={token} setToken={setToken}/>
          <Routes>
            <Route path='/' element={<Add token={token}/>}></Route>
            <Route path='/list' element={<List token={token}/>}></Route>
            <Route path='/orders' element={<Orders token={token}/>}></Route>
          </Routes>

        </div>
      </div>


      )}

     

   
    </main>
    
  )
}

export default App
