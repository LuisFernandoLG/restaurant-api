import 'dotenv/config'
import './db/connecction.js'
import express from 'express'
import cors from 'cors'
import { Server as WebSocketServer } from 'socket.io'
import { createServer } from 'http'

import dishRouter from './routes/dish.route.js'
import orderRouter from './routes/order.route.js'
import authRouter from './routes/auth.route.js'
import tagRouter from './routes/tag.route.js'
import { requireAuthWs } from './middlewares/websockets/requireToken.ws.js'
import {
  addOrder,
  getAllOrders,
  removeOrder,
  setAsCompletedOrder,
} from './controllers/orderController.ws.js'

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
// app.use('/', (req, res) => res.json({ ok: true }))
app.use('/api/v1/dishes', dishRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tags', tagRouter)

const PORT = process.env.PORT || 5000

const httpServer = server.listen(PORT, () => {
  // console.clear()
  console.log('server Running 🚀🚀🚀 http://localhost:5000')
})

// ---------------------------------------------------------------------
// Web sockets
// I need to pass cors agains mmmsss
const io = new WebSocketServer(httpServer, { cors: { origin: '*' } })

// Puedo registrar más middleswares
// Se ejecutarán consecutivamente
io.use(requireAuthWs)

io.on('connect', (socket) => {
  getAllOrders(socket)
  // socket.on('getOrders', () => getOrders(socket))
  socket.on('addOrder', (order) => addOrder(socket, order))
  socket.on('removeOrder', (orderId) => removeOrder(socket, orderId))
  socket.on('setAsCompletOrder', (orderId) => setAsCompletedOrder(socket, orderId))
})

