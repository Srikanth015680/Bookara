import React, { useContext } from 'react'
import { TbShoppingBagPlus } from "react-icons/tb";
import { ShopContext } from '../context/ShopContext';
const Item = ({book}) => {
    const {currency,addToCart}=useContext(ShopContext)
  return (
    <div>
        <div className='flex items-center justify-center overflow-hidden relative group rounded-3xl bg-[#f8f6fb]'>
            <img src={book.image} alt="Books" className='shadow-xl shadow-slate-900/30 rounded-lg ' />
            
           
        </div>
        <div className='p-3'>
            <div className='flex items-center justify-between'>
                    <h4 className='line-clamp-1 my-0! text-[16px] md:text-[17px] mb-2 font-bold'>{book.name}</h4>
                    <span onClick={()=>addToCart(book._id)} className='flex items-center justify-center h-8 w-8 rounded cursor-pointer hover:bg-amber-100'><TbShoppingBagPlus className='text-lg'/></span>
            </div>
            <div className='flex justify-between items-center pt-1'>
                <p className='font-bold capitalize leading-[1.3] text-[14px] text-gray-700'>{book.category}</p>
                <h5 className='text-[14px] md:text-[15px] mb-1 font-bold text-[#ffbcb1] pr-2'>{currency}{book.price}.00</h5>

            </div>
            <p className='line-clamp-2 py-1 leading-[1.3] text-[14px] text-gray-700'>{book.description}</p>
        </div>
    </div>
  )
}

export default Item