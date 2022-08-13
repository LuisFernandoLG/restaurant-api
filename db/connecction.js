import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongoose connected 🍃🍃🍃'))
  .catch(() => console.log('Hubo un error en la BD'))
