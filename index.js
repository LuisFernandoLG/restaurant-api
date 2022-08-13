import 'dotenv/config'
import express from 'express'
import './db/connecction.js'

const app = express()

app.get('/', (req, res) => {
  return res.json({ ok: true })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('server Running 🚀🚀🚀 http://localhost:5000')
})
