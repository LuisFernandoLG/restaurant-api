import { Tag } from '../models/Tag.js'

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().lean()
    return res.json({ tags })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export const createTag = async (req, res) => {
  const {name, description, image, isActive} = req.body
  try {
    const tag = new Tag({name, description, image, isActive})
    await tag.save()
    return res.status(201).json({success:true, tag})
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}