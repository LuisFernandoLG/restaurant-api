import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userTypeSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

const userType = model('UserType', userTypeSchema)
export { userType }