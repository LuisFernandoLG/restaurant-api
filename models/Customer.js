import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CustomerScheme = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})

const Customer = model('Customer', CustomerScheme)
export { Customer }
