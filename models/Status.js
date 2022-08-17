import mongoose from 'mongoose'

const { Schema, model } = mongoose

const StatusSchema = Schema({
  belongsTo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserType',
  },
  orderStatus: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

const Status = model('Status', StatusSchema)
export { Status }
