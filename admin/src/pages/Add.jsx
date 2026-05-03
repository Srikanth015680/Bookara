import React, { useState } from 'react'
import upload_icon from "../assets/upload_icon.png"
import { TbTrash } from "react-icons/tb"
import { FaPlus } from "react-icons/fa6"
import axios from "axios"
import { backend_url } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setdescription] = useState('')
  const [price, setPrice] = useState('')
  const [Category, setCategory] = useState("Ficition")
  const [popular, setPopular] = useState(false);

  const handleChnageImage = (e) => {
    setImage(e.target.files[0])
  }

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      try{
        const formData=new FormData()
        formData.append("name",name);
        formData.append("description",description);
        formData.append("price",price);
        formData.append("category",Category);
        formData.append("popular",popular);
        formData.append("image",image);

        const response=await axios.post(`${backend_url}/api/product/create`,formData,{headers:{token}})
        // console.log(response)
        if(response.data.success){
          toast.success(response.data.message)
          setName("");
          setdescription("");
          setPrice("");
          setCategory('Ficition');
          setPopular(false);
          setImage(null)

        }
        else{
          toast.error(response.data.message)
        }

      }catch(e){
        console.error(e)
        toast.error(e.response?.data?.message || e.message)

      }


  }

  return (
    <div className='w-full px-4 sm:px-8 py-6 mb-30'>

      <form onSubmit={onSubmitHandler} className='max-w-3xl space-y-6 bg-white p-6 rounded-xl shadow-sm border'>

        {/* Product Name */}
        <div className='flex flex-col gap-1'>
          <h5 className='text-sm font-medium text-gray-700'>Product Name</h5>
          <input onChange={(e)=>setName(e.target.value)}
           value={name}   type="text"
          rows={5}   placeholder='Write here...'
            className='px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Description */}
        <div className='flex flex-col gap-1'>
          <h5 className='text-sm font-medium text-gray-700'>Product Description</h5>
          <textarea onChange={(e)=>setdescription(e.target.value)}
           value={description}  placeholder='Description...'
            rows={4}
            className='px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
          />
        </div>

        {/* Category + Image */}
        <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center'>

          {/* Category */}
          <div className='flex flex-col gap-1 w-full sm:w-1/2'>
            <h5 className='text-sm font-medium text-gray-700'>Category</h5>
            <select   onChange={(e)=>setCategory(e.target.value)}
           value={Category}        className='px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500'>
              <option value="Ficition">Ficition</option>
              <option value="Children">Children</option>
              <option value="Health">Health</option>
              <option value="Academic">Academic</option>
              <option value="Business">Business</option>
              <option value="Religious">Religious</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className='flex flex-col gap-1'>
            <h5 className='text-sm font-medium text-gray-700'>Upload Image</h5>
            <label
              htmlFor="image"
              className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-purple-400 transition'
            >
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="upload"
                className='w-24 h-24 object-contain'
              />
              <input
                type="file"
                onChange={handleChnageImage}
                name='image'
                id='image'
                hidden
              />
            </label>
          </div>

        </div>

        {/* Price */}
        <div className='flex flex-col gap-1'>
          <h5 className='text-sm font-medium text-gray-700'>Price</h5>
          <input

          onChange={(e)=>setPrice(e.target.value)}
           value={price} 



            type="number"
            placeholder='Price'
            min={0}
            className='px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Popular */}
        <div className='flex items-center gap-2'>
          <input onChange={()=>setPopular((prev)=>!prev)}
            type="checkbox"
            checked={popular}
            id='popular'
            className='w-4 h-4 accent-purple-600 cursor-pointer'
          />
          <label htmlFor="popular" className='cursor-pointer text-sm text-gray-700'>
            Add to Popular
          </label>
        </div>

        {/* Button */}
        <button
          type='submit'
          className='flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition'
        >
          <FaPlus />
          Add Product
        </button>

      </form>

    </div>
  )
}

export default Add