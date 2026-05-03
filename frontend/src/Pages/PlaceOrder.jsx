import React, { useState, useContext } from 'react'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import Footer from "../components/Footer"
import { ShopContext } from '../context/ShopContext'
import axios from "axios"
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const { books, currency, navigate, token, cartItem, setCartItem, getCartAmount, backendUrl, delivery_charges } = useContext(ShopContext)

  const [method, setMethod] = useState('Cod')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const inputStyle =
    "w-full rounded-xl bg-white/60 backdrop-blur-md border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 transition"

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (getCartAmount() === 0) {
      alert("Your cart is empty")
      return
    }

    for (let key in formData) {
      if (!formData[key]) {
        alert("Please fill all fields")
        return
      }
    }

    try {

      let orderItems = []

      for (const itemId in cartItem) {
        if (cartItem[itemId] > 0) {

          const itemInfo = books.find(
            (book) => book._id.toString() === itemId
          )

          if (itemInfo) {
            orderItems.push({
              itemId: itemInfo._id,
              name: itemInfo.name,
              price: itemInfo.price,
              quantity: cartItem[itemId],
              image: itemInfo.image
            })
          }
        }
      }

      let response

      
      if (method === "Cod") {
        response = await axios.post(
          backendUrl + "/api/order/place",
          {
            items: orderItems,
            amount: getCartAmount() + delivery_charges,
            address: formData
          },
          {
            headers: { token }
          }
        )

        if (response.data.success) {
          setCartItem({})
          navigate("/orders")
          toast.success("Order placed successfully")
        } else {
          toast.error(response.data.message)
        }
      }

   
      else if (method === "stripe") {

        response = await axios.post(
          backendUrl + "/api/order/stripe",
          {
            items: orderItems,
            amount: getCartAmount() + delivery_charges,
            address: formData
          },
          {
            headers: { token }
          }
        )

        if (response.data.success && response.data.session_url) {
          window.location.replace(response.data.session_url)
        } else {
          toast.error("Stripe session failed")
        }
      }

    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <section className='mx-auto max-w-[1440px] px-6 lg:px-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50 min-h-screen'>

      <form className='pt-28' onSubmit={onSubmitHandler}>
        <div className='flex flex-col xl:flex-row gap-16'>

          {/* LEFT FORM */}
          <div className='flex flex-1 flex-col gap-4 text-[95%]'>
            <Title title1={'Delivery'} title2={'Information'} />

            <div className='flex gap-3'>
              <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' className={`${inputStyle} w-1/2`} />
              <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' className={`${inputStyle} w-1/2`} />
            </div>

            <input required name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder='Email' className={inputStyle} />
            <input required name="phone" value={formData.phone} onChange={onChangeHandler} type="text" placeholder='Phone No' className={inputStyle} />
            <input required name="street" value={formData.street} onChange={onChangeHandler} type="text" placeholder='Street' className={inputStyle} />

            <div className='flex gap-3'>
              <input required name="city" value={formData.city} onChange={onChangeHandler} type="text" placeholder='City' className={`${inputStyle} w-1/2`} />
              <input required name="state" value={formData.state} onChange={onChangeHandler} type="text" placeholder='State' className={`${inputStyle} w-1/2`} />
            </div>

            <div className='flex gap-3'>
              <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} type="text" placeholder='Pin Code' className={`${inputStyle} w-1/2`} />
              <input required name="country" value={formData.country} onChange={onChangeHandler} type="text" placeholder='Country' className={`${inputStyle} w-1/2`} />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className='flex flex-1 flex-col bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md'>

            <CartTotal />

            <div className='my-6'>
              <h3 className='text-lg font-semibold mb-4'>
                Payment <span className='text-indigo-600'>Method</span>
              </h3>

              <div className='flex gap-3'>

                <div
                  onClick={() => setMethod('stripe')}
                  className={`cursor-pointer px-6 py-2 rounded-full border transition 
                  ${method === 'stripe'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-indigo-50'
                    }`}
                >
                  Stripe
                </div>

                <div
                  onClick={() => setMethod('Cod')}
                  className={`cursor-pointer px-6 py-2 rounded-full border transition 
                  ${method === 'Cod'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-indigo-50'
                    }`}
                >
                  Cash on Delivery
                </div>

              </div>
            </div>

            <button
              type='submit'
              className='mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md transition'
            >
              Place Order
            </button>

          </div>
        </div>
      </form>

      <Footer />
    </section>
  )
}

export default PlaceOrder