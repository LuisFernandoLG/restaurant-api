import { Customer } from '../models/Customer.js'

export const createCustomer = async (req, res) => {
  const { name, userName, password, image, isActive } = req.body
  try {
    const customer = await new Customer({
      name,
      userName,
      password,
      image,
      isActive,
    })
    await customer.save()

    return res.status(201).json({ success: true, customer })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ success: true, error: error.message })
  }
}
