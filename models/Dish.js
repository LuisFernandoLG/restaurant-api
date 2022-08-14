import mongoose from 'mongoose'

const { Schema, model } = mongoose

const DishScheme = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
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

const Dish = model('Dish', DishScheme)
export { Dish }
