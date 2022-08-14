import 'dotenv/config'
import express from 'express'
import './db/connecction.js'

import dishRouter from './routes/dish.route.js'
import orderRouter from './routes/order.route.js'
import authRouter from './routes/auth.route.js'

const app = express()


app.use(express.json())

// Socket io


// API REST
// app.use('/', (req, res) => res.json({ ok: true }))
app.use('/api/v1/dishes', dishRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.clear()
  console.log('server Running 🚀🚀🚀 http://localhost:5000')
})
