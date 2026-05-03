import React from 'react'

import { backend_url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'

const Login = ({setToken}) => {
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('')
  const onSubmithandler = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      backend_url + "/api/user/admin",
      { email, password }
    );

    if (response.data.success) {
      setToken(response.data.token);
      toast.success(response.data.message);

      // optional but recommended
    } else {
      toast.error(response.data.message);
    }

    setEmail("");
    setPassword("");

  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100">
      
      {/* Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-purple-100">
       
        {/* form  */}
        <div>
          <form onSubmit={onSubmithandler} className="flex flex-col gap-6">
            
            <div>
              <h3 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
               Admin Panel
              </h3>
             
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}
                type="email" 
                name="email" 
                id="email" 
                className="px-4 py-2.5 border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-purple-400 focus:border-purple-400 
                transition duration-200 shadow-sm hover:border-purple-300"
                placeholder="Enter your email" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input  onChange={(e)=>setPassword(e.target.value)}
                value={password}

              type="password" 
                name="password" 
                id="password" 
                className="px-4 py-2.5 border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-purple-400 focus:border-purple-400 
                transition duration-200 shadow-sm hover:border-purple-300"
                placeholder="Enter your password" 
              />
            </div>

            <button 
              type='submit'
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2.5 rounded-lg font-semibold 
              shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 
              transition-all duration-200 tracking-wide"
            >
              Login
            </button>

          </form>
        </div>

      </div>

    </section>
  )
}

export default Login