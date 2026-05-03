import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backend_url, currency } from '../App'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem("token")

  const fetchAllOrders = async () => {
    try {
      if (!token) return
      const response = await axios.post(
        backend_url + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch orders")
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backend_url + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Status Updated")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      {/* Header & Stats Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Management</h1>
            <p className="text-slate-500 font-medium">Manage and track all incoming store shipments</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">📦</div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Total Orders</p>
                <p className="text-xl font-black text-slate-800">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg font-medium">No orders available to fulfill.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                  
                  {/* Column 1: Order Icon & Items */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-slate-200">
                        🛒
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Customer ID</p>
                        <p className="font-mono text-sm text-slate-600 bg-slate-50 px-2 py-0.5 rounded leading-none mt-1">{order.userId}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-4 group">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="" />
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-800 font-bold leading-tight">{item.name}</p>
                            <p className="text-sm text-slate-500">
                              {currency}{item.price} <span className="mx-2 text-slate-300">|</span> Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Shipping Details */}
                  <div className="flex-1 border-t lg:border-t-0 lg:border-l lg:border-r border-slate-100 pt-6 lg:pt-0 lg:px-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Shipping Address</h3>
                    <div className="text-slate-700 space-y-1">
                      <p className="font-bold text-lg text-slate-900">{order.address.firstName + " " + order.address.lastName}</p>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {order.address.street},<br />
                        {order.address.city}, {order.address.state},<br />
                        {order.address.country}, {order.address.zipcode}
                      </p>
                      <p className="pt-2 text-sm font-semibold text-slate-800">{order.address.phone}</p>
                    </div>
                  </div>

                  {/* Column 3: Payment & Fulfillment */}
                  <div className="lg:w-64 space-y-6 pt-6 lg:pt-0 text-right lg:text-left flex flex-col justify-between">
                    <div>
                      <div className="mb-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Payment</p>
                        <p className="text-3xl font-black text-slate-900">{currency}{order.amount}</p>
                        <div className="flex items-center gap-2 mt-1 justify-end lg:justify-start">
                          <span className={`w-2 h-2 rounded-full ${order.payment ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          <span className="text-xs font-bold text-slate-500">{order.paymentMethod} • {order.payment ? 'Paid' : 'Pending'}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Order Status</p>
                        <select 
                          onChange={(e) => statusHandler(e, order._id)} 
                          value={order.status}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer appearance-none shadow-sm"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-slate-300 font-medium">Order ID: {order._id}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders