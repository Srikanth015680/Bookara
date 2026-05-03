import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const{currency,getCartAmount,updateQuantity,delivery_charges}=useContext(ShopContext)
  return (
    <div className='w-full'>
  <Title title1={"Cart"} title2={"Total"} title1Styles={'text-[24px] leading-tight md:text-[28px] md:leading-[1.3] mb-4 font-bold'} />
    <div className='flex items-center justify-between pt-3'>
        <h5 className='text-[14px] md:text-[15px] mb-1 font-bold'>Subtotal:</h5>
        <p className='leading-[1.3] text-[14px] text-gray-400 font-bold'>
          {currency}{getCartAmount()}.00
        </p>
    </div>
    <hr  className='mx-auto h-[1px] w-full bg-gray-950/5'/>


     <div className='flex items-center justify-between pt-3'>
        <h5 className='text-[14px] md:text-[15px] mb-1 font-bold'>Shipping fee:</h5>
        <p className='leading-[1.3] text-[14px] text-gray-400 font-bold'>


          {getCartAmount()===0?"0.00":`${currency}${delivery_charges}.00`}
        </p>
    </div>
    <hr  className='mx-auto h-[1px] w-full bg-gray-950/5'/>




     <div className='flex items-center justify-between pt-3'>
        <h5 className='text-[14px] md:text-[15px] mb-1 font-bold'>Total:</h5>
        <p className='leading-[1.3] text-[14px] text-gray-400 font-bold'>{currency}{getCartAmount()===0?".00":getCartAmount()+delivery_charges}.00</p>
    </div>
    <hr  className='mx-auto h-[1px] w-full bg-gray-950/5'/>
    


    
    </div>
  )
}

export default CartTotal