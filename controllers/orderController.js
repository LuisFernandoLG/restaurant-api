import { saveOrder, updateTablePending } from '../db/orderQueries.js'
import { dishStates, tableStates } from '../helpers/states.js'
import { Order } from '../models/Order.js'

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean()
    return res.json({ orders })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ error })
  }
}

const addStateToDishes = (courseMealsOriginal) => {
  let courseMeals = {}

  Object.entries(courseMealsOriginal).forEach(([courseMealKey, courseMeal]) => {
    Object.entries(courseMeal.clients).forEach(([clientKey, client]) => {
      Object.entries(client.dishes).forEach(([dishKey, dish]) => {
        courseMeals[courseMealKey] = {
          ...courseMeal,
          clients: {
            ...courseMeals[courseMealKey]?.clients,
            [clientKey]: {
              ...client,
              dishes: {
                ...courseMeals[courseMealKey]?.clients[clientKey]?.dishes,
                [dishKey]: { ...dish, status: dishStates[1] },
              },
            },
          },
        }
      })
    })
  })
  return courseMeals
}

export const createOrder = async (req, res) => {
  // */ IdCustomer shoud be interset when users is logged
  const { tableId, courseMeals } = req.body
  const takenBy = '62fd0d6d71ae00cba4d87407'
  const courseMealsWithOutStates = courseMeals
  try {
    const order = await saveOrder({
      tableId,
      courseMeals: courseMealsWithOutStates,
      takenBy,
    })
    await updateTablePending({ order })
    return res.json({ order, success: true })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ success: true, error: error.message })
  }
}

//  OLD
export const updateDishStatus = async (req, res) => {
  const { courseMealId, clientId, dishId, newStatusId } = req.body
  const { orderId } = req.params

  updateTableAndOrderStatus({ orderId, newStatusId: tableStates[2] })

  try {
    const order = await updateDishStatus2({
      orderId,
      courseMealId,
      clientId,
      dishId,
      newStatusId,
    })
    return res.json({ order, success: true })
  } catch (error) {
    console.log({ error })
    return res.status(404).json({ success: true, error: error.message })
  }
}
