import { Customer } from '../models/Customer.js'
import { generateRefreshToken, generateToken } from '../utils/jswManager.js'

export const registerCustomer = async (req, res) => {
  const { name, userName, password, image } = req.body
  const isActive = true
  try {
    let customer = await Customer.findOne({ userName })
    if (!customer) throw new Error('userName already exists')

    customer = await new Customer({
      name,
      userName,
      password,
      image,
      isActive,
    })
    const { token, expireIn } = generateToken({ userId: customer.id })
    generateRefreshToken(token, res)
    return res.status(201).json({ success: true, customer, token, expireIn })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ success: true, error: error.message })
  }
}

export const customerLogin = (req, res) => {
  const { userName, password } = req.body
  return res.json({ userName, password })
}
