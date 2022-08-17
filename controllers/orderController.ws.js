import { Order } from '../models/Order.js'

export const addOrder = async (socket, order) => {
  const orderDate = new Date()
  const wasCompleted = false
  const newOrder = new Order({
    orderDate,
    dishes: order.dishes,
    customerId: order.customerId,
    wasCompleted,
  })

  await newOrder.save()
  const orders = await Order.find()
  socket.broadcast.emit('orders', orders)
}

export const removeOrder = async (socket, orderId) => {
  console.log({ orderId })
  let newOrder = await Order.findById(orderId)
  newOrder.remove()

  const orders = await Order.find()
  socket.broadcast.emit('orders', orders)
}
export const setAsCompletedOrder = async (socket, orderId) => {
  let order = await Order.findById(orderId)
  console.log({ order })
  order.wasCompleted = true
  await order.save()

  const orders = await Order.find()
  console.log({ orders })
  socket.broadcast.emit('orders', orders)
}

export const getOrders = async (socket) => {
  const orders = await Order.find()
  socket.emit('orderList', orders)
}

export const getAllOrders = async (socket) => {
  const orders = await Order.find().lean()
  // const clientsConnected = socket.clients();
  // console.log({clientsConnected})
  socket.emit('getAllOrders', orders)
  return orders
}
