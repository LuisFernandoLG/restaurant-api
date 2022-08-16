import mongoose from 'mongoose'

const { Schema, model } = mongoose

const TagScheme = Schema({
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

export const Tag = model("Tag", TagScheme)