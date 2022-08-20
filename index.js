import 'dotenv/config'
import './db/connecction.js'
// import xs from "mongoose-deep-populate"
import express from 'express'
import cors from 'cors'
import { Server as WebSocketServer } from 'socket.io'
import { createServer } from 'http'

import dishRouter from './routes/dish.route.js'
import orderRouter from './routes/order.route.js'
import tableRouter from './routes/table.route.js'
import authRouter from './routes/auth.route.js'
import tagRouter from './routes/tag.route.js'
import { requireAuthWs } from './middlewares/websockets/requireToken.ws.js'
import {
  addOrder,
  getAllOrders,
  removeOrder,
  setAsCompletedOrder,
} from './controllers/orderController.ws.js'
import { initiliazebd } from './controllers/initialize.controller.js'
import { Table } from './models/Table.js'
import { Order } from './models/Order.js'
import {
  setDishDelivered,
  setDishInProcess,
  setDishReady,
} from './db/dishQueries.js'
import {
  setOrderCompleted,
  setOrderPaid,
  updateTableCompleted,
  updateTableInProcess,
  updateTablePending,
} from './db/orderQueries.js'
import { dishStates } from './helpers/states.js'

const app = express()
const server = createServer(app)
// const socketApp =
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())

// -------------------------------------------------------------------
// API REST
app.use('/api/v1/tables', tableRouter)
app.use('/api/v1/dishes', dishRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tags', tagRouter)
app.use('/api/v1/orders', orderRouter)

// This routes creates basic models on mongodb
app.use('/api/v1/initiliazebd', initiliazebd)

const PORT = process.env.PORT || 5000

const httpServer = server.listen(PORT, () => {
  console.log('server Running 🚀🚀🚀 http://localhost:5000')
})

// ---------------------------------------------------------------------
// Web sockets
// I need to pass cors agains mmmsss
const io = new WebSocketServer(httpServer, { cors: { origin: '*' } })

// Puedo registrar más middleswares
// Se ejecutarán consecutivamente
// NECESARIO para validar las peticiones
// io.use(requireAuthWs)

let orders = []

io.on('connect', (socket) => {
  socket.on('client:waiter:createOrder', async (order, cb) => {
    const newOrder = await saveOrder({
      tableId: order.tableId,
      takenBy: order.takenBy,
      courseMeals: order.courseMeals,
    })

    // Room has to be created
    socket.join(newOrder._id)
    socket.to(newOrder._id).emit('server:order', newOrder)

    await updateTablePending({ newOrder })

    const orders = await Order.find()
      .populate('courseMeals.$*.clients.$*.dishes.$*.status')
      .populate('courseMeals.$*.clients.$*.dishes.$*.id')
      .populate('tableId')
      .lean()
    socket.broadcast.emit('server:orders', orders)

    const tables = await Table.find().populate('status').lean()
    // set just once
    socket.broadcast.emit('server:tables', tables)

    cb({
      success: true,
      newOrder,
    })
  })

  //
  socket.on(
    'client:waiter:setDishInProcess',
    async ({ orderId, courseMealId, clientId, dishId }, cb) => {
      const order = await setDishInProcess({
        orderId,
        courseMealId,
        clientId,
        dishId,
      })
      socket.to(newOrder._id).emit('server:order', order)

      const orders = await Order.find()
        .populate('courseMeals.$*.clients.$*.dishes.$*.status')
        .populate('courseMeals.$*.clients.$*.dishes.$*.id')
        .populate('tableId')
        .lean()

      socket.broadcast.emit('server:orders', orders)

      await updateTableInProcess({ order })
      const tables = await Table.find().populate('status').lean()
      //Set just Once
      socket.broadcast.emit('server:tables', tables)

      cb({
        success: true,
        orders,
      })
    }
  )
  socket.on(
    'client:waiter:setDishReady',
    async ({ orderId, courseMealId, clientId, dishId }, cb) => {
      const order = await setDishReady({
        orderId,
        courseMealId,
        clientId,
        dishId,
      })

      socket.to(newOrder._id).emit('server:order', order)

      const orders = await Order.find()
        .populate('courseMeals.$*.clients.$*.dishes.$*.status')
        .populate('courseMeals.$*.clients.$*.dishes.$*.id')
        .populate('tableId')
        .lean()

      // It's sent to cookers and waiters too
      socket.broadcast.emit('server:orders', orders)

      cb({
        success: true,
        orders,
      })
    }
  )

  socket.on(
    'client:waiter:setDishDelivered',
    async ({ orderId, courseMealId, clientId, dishId }, cb) => {
      let table
      let order = await setDishDelivered({
        orderId,
        courseMealId,
        clientId,
        dishId,
      })

      // If is the last Dish completed
      if (isOrderCompleted({ order })) {
        order = await setOrderCompleted({ orderId })
        await updateTableCompleted({ order })
      }

      socket.to(newOrder._id).emit('server:order', order)

      const orders = await Order.find()
        .populate('courseMeals.$*.clients.$*.dishes.$*.status')
        .populate('courseMeals.$*.clients.$*.dishes.$*.id')
        .populate('tableId')
        .lean()

      socket.broadcast.emit('server:orders', orders)

      cb({
        success: true,
        orders,
      })
    }
  )

  socket.on('client:waiter:setOrderPaid', async ({ orderId }, cb) => {
    const order = await setOrderPaid({
      orderId,
    })
    const orders = await Order.find()
      .populate('courseMeals.$*.clients.$*.dishes.$*.status')
      .populate('courseMeals.$*.clients.$*.dishes.$*.id')
      .populate('tableId')
      .lean()

    await updateTableStatusFree({ order })
    socket.leave(orderId)

    const tables = await Table.find().populate('status').lean()
    //Set just Once
    socket.broadcast.emit('server:tables', tables)
    socket.broadcast.emit('server:orders', orders)

    cb({
      success: true,
      order,
    })
  })

  // -----------------------------------------------
  socket.once('client:waiter:getTables', async (cb) => {
    const tables = await Table.find().populate('status').lean()
    cb({
      success: true,
      tables,
    })
  })

  socket.once('client:cooker:getOrders', async (cb) => {
    const orders = await Order.find()
      .populate('courseMeals.$*.clients.$*.dishes.$*.status')
      .populate('courseMeals.$*.clients.$*.dishes.$*.id')
      .populate('tableId')
      .lean()

    cb({
      success: true,
      orders,
    })
  })

  socket.once('client:waiter:getOrders', async (waiterId, cb) => {
    const orders = await Order.find({ takenBy: waiterId })
      .populate('courseMeals.$*.clients.$*.dishes.$*.status')
      .populate('courseMeals.$*.clients.$*.dishes.$*.id')
      .populate('tableId')
      .lean()

    cb({
      success: true,
      orders,
    })
  })

  const isOrderCompleted = ({ order }) => {
    const courseMeals = order.courseMeals
    try {
      Object.values(courseMeals).forEach((courseMeal) => {
        Object.values(courseMeal.clients).forEach((client) => {
          Object.values(client.dishes).forEach((dish) => {
            if (dish.status.valueOf() !== dishStates[4]) throw false
          })
        })
      })

      return true
    } catch (error) {
      return false
    }
  }

  // socket.once('server:testing', async (cb) => {
  //   const orderId = '62ffc26b8ee6b7b24970f8e8'
  //   const order = await Order.findById(orderId).lean()
  //   const orders = await Order.find()
  //     .populate('courseMeals.$*.clients.$*.dishes.$*.status')
  //     .lean()
  //   // console.log({ order })
  //   const isCompleted = isOrderCompleted({ order })
  //   console.log({ isCompleted })

  //   // console.log({ orderCompleted })
  //   cb({
  //     success: true,
  //     orders,
  //   })
  // })
})
