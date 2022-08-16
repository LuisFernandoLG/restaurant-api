import { Dish } from '../models/Dish.js'

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find()
      .populate({ path: 'tag', select: 'name' })
      .lean()
    return res.json({ dishes })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const getDishesByTag = async (req, res) => {
  const { tagId } = req.params
  try {
    const dishesFiltered = await await Dish.find({ tagId })
      .populate({
        path: 'tag',
        select: 'name',
      })
      .lean()
    console.log({ dishesFiltered })
    return res.json({ dishesFiltered })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ error })
  }
}

export const createDish = async (req, res) => {
  const { name, description, price, isActive, image, tag } = req.body
  try {
    const dish = new Dish({ name, description, price, isActive, image, tag })
    await dish.save()

    return res.status(201).json({ success: true, data: dish })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ error })
  }
}

export const updateDish = async (req, res) => {
  const { id } = req.params
  const { name, description, price, image, isActive, tag } = req.body

  try {
    const dish = await Dish.findById(id)
    if (!dish) throw new Error('dish not found')

    dish.name = name
    dish.description = description
    dish.price = price
    dish.image = image
    dish.isActive = isActive
    dish.tag = tag

    await dish.save()

    return res.json({ dish })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(404).json({ error: 'ID inválida' })
    return res.status(404).json({ error: error.message })
  }
}

export const removeDish = async (req, res) => {
  const { id } = req.params

  try {
    const dish = await Dish.findById(id)
    if (!dish) throw new Error('dish not found')

    await dish.remove()

    return res.json({ dish })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(404).json({ error: 'ID inválida' })
    return res.status(404).json({ error: error.message })
  }
}
