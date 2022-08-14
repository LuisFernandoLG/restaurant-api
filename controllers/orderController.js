import { Order } from '../models/Order.js'

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean()
    console.log({ orders })
    return res.json({ orders })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ error })
  }
}

export const createOrder = async (req, res) => {
  // IdCustomer
  const { dishes, customerId } = req.body
  // let orderDate = new Date()

  // date would be awesome that the servers creates it
  const orderDate = new Date()
  const wasCompleted = false
  try {
    const order = new Order({ orderDate, dishes, customerId, wasCompleted })
    await order.save()
    return res.json({ order })
  } catch (error) {
    return res.status(404).json({ success: true, error: error.message })
  }
}
