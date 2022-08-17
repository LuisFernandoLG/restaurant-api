import mongoose from 'mongoose'

const { Schema, model } = mongoose

const TableSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Status',
  },
})

const Table = model('Table', TableSchema)
export { Table }
