import mongoose from 'mongoose'

const { Schema, model } = mongoose

const OrderScheme = Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  dishes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  wasCompleted: {
    type: Boolean,
    required: true,
  },
})

const Order = model('Order', OrderScheme)
export { Order }
