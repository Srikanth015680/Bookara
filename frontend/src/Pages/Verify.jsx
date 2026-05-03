import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

  const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {

      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {

        if (success === "true") {
          setCartItem({})
          toast.success("Payment Successful")
          navigate("/orders")
        } else {
          toast.error("Payment Failed")
          navigate("/cart")
        }

      }

    } catch (error) {
      console.log(error)
      toast.error("Verification failed")
      navigate("/cart")
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Verifying payment...
    </div>
  )
}

export default Verify