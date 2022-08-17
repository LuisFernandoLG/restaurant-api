import mongoose from 'mongoose'

const { Schema, model } = mongoose

const UserSchema = Schema({
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
  userType: {
    type: Schema.Types.ObjectId,
    ref: 'UserType',
    required: true,
  },
})

const User = model('User', UserSchema)
export { User }
