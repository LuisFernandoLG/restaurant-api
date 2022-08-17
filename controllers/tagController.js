import { Tag } from '../models/Tag.js'

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().lean()
    return res.json({ tags })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export const getTag = async (req, res) => {
  const { tagId } = req.params
  try {
    const tag = await Tag.findOne({ _id: tagId }).lean()
    if (!tag) throw new Error("tag doesn't exist")
    return res.json({ tag })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export const createTag = async (req, res) => {
  const { name, description, image, isActive } = req.body
  try {
    const tag = new Tag({ name, description, image, isActive })
    await tag.save()
    return res.status(201).json({ success: true, tag })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export const deleteTag = async (req, res) => {
  const { tagId } = req.params
  try {
    const tag = await Tag.findOne({ _id: tagId })
    if (!tag) throw new Error("tag doesn't exist")
    await tag.remove()
    return res.status(201).json({ success: true })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export const updateTag = async (req, res) => {
  const { name, description, image, isActive } = req.body
  const { tagId } = req.params
  try {
    const tag = await Tag.findOne({ _id: tagId })
    if (!tag) throw new Error("tag doesn't exist")
    tag.name = name
    tag.description = description
    tag.image = image
    tag.isActive = isActive
    await tag.save()
    return res.status(201).json({ success: true, tag })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}
