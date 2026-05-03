import userModel from "../models/userModel.js"
import orderModel from "../models/ordelModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET)



const currency = 'inr'
const deliveryCharges = 10


const placeOrder = async (req, res) => {
  try {
    console.log("PLACE ORDER API HIT")

    const userId = req.userId
    const { items, amount, address } = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }

    console.log("Saving order...")

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    console.log("ORDER SAVED:", newOrder._id)

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({
      success: true,
      order: newOrder,
      message:"Order placed"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}









const placeOrderStripe = async (req, res) => {
  try {

    const userId = req.userId
    const { items, amount, address } = req.body
    const { origin } = req.headers

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "DeliveryCharges"
        },
        unit_amount: deliveryCharges * 100
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment"
    })

    
    res.json({ success: true, session_url: session.url })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}











const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})

    res.json({
      success: true,
      orders
    })

  } catch (error) {
    console.log(error)

    res.json({
      success: false,
      message: error.message
    })
  }
}



const userOrders = async (req, res) => {
  try {
    const userId = req.userId   

    const orders = await orderModel.find({ userId })

    res.json({
      success: true,
      orders
    })

  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: e.message
    })
  }
}








const verifyStripe = async (req, res) => {
  try {
    const { orderId, success} = req.body

    if (success === "true") {

      const order = await orderModel.findById(orderId)

      if (!order) {
        return res.json({ success: false, message: "Order not found" })
      }

     
      order.payment = true
      await order.save()

      
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} })

    } else {
      
      await orderModel.findByIdAndDelete(orderId)
    }

    res.json({ success: true })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}









const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Missing orderId or status"
      })
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found"
      })
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      order: updatedOrder
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

export { 
  placeOrder, 
  placeOrderStripe, 
  allOrders, 
  userOrders, 
  verifyStripe, 
  updateStatus 
}