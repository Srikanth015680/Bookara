import React, { useContext } from 'react'
import { TbTrash } from 'react-icons/tb'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import Title from '../components/Title'
import { ShopContext } from "../context/ShopContext"
import CartTotal from '../components/CartTotal'
import Footer from "../components/Footer"

const Cart = () => {
  const { books, currency, navigate, cartItem, getCartAmount, updateQuantity } = useContext(ShopContext)

  return (
    <section className='mx-auto max-w-[1440px] px-6 lg:px-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50 min-h-screen'>
      <div className='pt-28'>

        <Title title1={'Cart'} title2={"List"} title1Styles={"h-3"} />

        <div className='mt-6'>
          {books.map((item) => {
            if (cartItem[item._id] > 0) {
              return (
                <div
                  key={item._id}
                  className='bg-white/80 backdrop-blur-md border border-slate-200 p-4 mt-4 rounded-xl shadow-sm hover:shadow-md transition'
                >
                  <div className='flex gap-x-4'>

                    <div className='flex items-start gap-6'>
                      <img
                        src={item.image}
                        alt='ItemImage'
                        className='w-16 h-24 object-cover rounded-lg shadow-sm'
                      />
                    </div>

                    <div className='flex flex-col w-full'>
                      <h5 className='text-[15px] md:text-[16px] font-semibold mb-1 line-clamp-1 text-slate-800'>
                        {item.name}
                      </h5>

                      <div className='flex items-start justify-between'>
                        <div>
                          <p className='text-[13px] text-slate-500 mb-2'>
                            {item.category}
                          </p>

                          <div className='flex items-center gap-2 border border-slate-200 rounded-full px-2 py-1 bg-slate-50'>
                            <button
                              onClick={() => updateQuantity(item._id, cartItem[item._id] - 1)}
                              className='p-1.5 bg-white rounded-full shadow hover:bg-red-50 hover:text-red-600 transition text-xs'
                            >
                              <FaMinus />
                            </button>

                            <p className='px-2 text-sm font-medium'>
                              {cartItem[item._id]}
                            </p>

                            <button
                              onClick={() => updateQuantity(item._id, cartItem[item._id] + 1)}
                              className='p-1.5 bg-white rounded-full shadow hover:bg-green-50 hover:text-green-600 transition text-xs'
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>

                        <h4 className='text-[16px] md:text-[18px] font-bold text-indigo-600'>
                          {currency}{item.price}
                        </h4>

                        <TbTrash
                          className='cursor-pointer text-slate-400 hover:text-red-600 transition text-lg'
                          onClick={() => updateQuantity(item._id, 0)}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              )
            }
            return null
          })}
        </div>

        {/* cart summary */}
        <div className='flex mt-20'>
          <div className='w-full sm:w-[450px] bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-xl shadow-sm'>
            <CartTotal />

            <button
              onClick={() => navigate("/place-order")}
              className='mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md transition'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </section>
  )
}

export default Cart