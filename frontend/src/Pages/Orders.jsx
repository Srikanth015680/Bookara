import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from "../components/Title"
import Footer from "../components/Footer"
const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        let allOrders = []
        const orders = response.data.orders || []

        orders.map((order) => {
          if (!order || !order.items) return
          order.items.map((item) => {
            const newItem = {
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            }
            allOrders.push(newItem)
          })
        })

        setOrderData(allOrders.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <section className='min-h-screen bg-[#f8fafc] py-16 px-6'>
      <div className='max-w-6xl mx-auto'>

        {/* Header */}
        <div className='flex items-center justify-between mb-12 border-b border-slate-200 pb-6'>
          <Title
            title1={'MY'}
            title2={'ORDERS'}
            title1Styles={'text-4xl font-black tracking-tight text-slate-900'}
          />
          <button 
            onClick={loadOrderData}
            className='text-sm font-semibold hover:cursor-pointer text-indigo-600'
          >
            Refresh History
          </button>
        </div>

        {/* Empty State */}
        {orderData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-slate-300">
            <span className="text-5xl mb-4">📦</span>
            <p className="text-slate-500 font-medium text-xl">Your order history is empty.</p>
          </div>
        )}

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-8">
          {orderData.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row items-center gap-8"
            >

              {/* Image */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <div className="absolute inset-0 bg-indigo-500 rounded-2xl rotate-3 opacity-10"></div>
                <img
                  src={item.image}
                  alt="product"
                  className="relative z-10 w-full h-full object-cover rounded-2xl border border-white shadow-sm"
                />
              </div>

              {/* Details */}
              <div className="flex-1 w-full space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {item.name}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium mt-1">
                      Ordered on: {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900">
                      {currency}{item.price}
                    </p>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Unit Price
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Quantity</p>
                    <p className="font-semibold text-slate-700">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Method</p>
                    <p className="font-semibold text-slate-700">{item.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="md:w-64 w-full flex md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Order placed' ? 'bg-orange-400' : 'bg-green-500'}`}></span>
                  <p className="text-sm font-bold text-slate-700">{item.status}</p>
                </div>

                <button 
                  className={`w-full md:w-32 py-2.5 rounded-xl text-xs font-black uppercase
                  ${item.payment 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-slate-900 text-white"
                  }`}
                >
                  {item.payment ? "Receipt" : "Track Order"}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Orders