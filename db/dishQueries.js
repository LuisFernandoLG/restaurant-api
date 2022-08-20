import { dishStates } from '../helpers/states.js'
import { Order } from '../models/Order.js'

export const updateDishStatus2 = async ({
  orderId,
  courseMealId,
  clientId,
  dishId,
  newStatusId,
}) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        [`courseMeals.${courseMealId}.clients.${clientId}.dishes.${dishId}.status`]:
          newStatusId,
      },
    },
    { returnDocument: 'after' }
  )
  return order
}

export const setDishPending = async ({
  orderId,
  courseMealId,
  clientId,
  dishId,
}) => {
  const newStatusId = dishStates[1]
  const order = await updateDishStatus2({
    orderId,
    courseMealId,
    clientId,
    dishId,
    newStatusId,
  })

  return order
}
export const setDishInProcess = async ({
  orderId,
  courseMealId,
  clientId,
  dishId,
}) => {
  const newStatusId = dishStates[2]
  const order = await updateDishStatus2({
    orderId,
    courseMealId,
    clientId,
    dishId,
    newStatusId,
  })

  return order
}

export const setDishReady = async ({
  orderId,
  courseMealId,
  clientId,
  dishId,
}) => {
  const newStatusId = dishStates[3]
  const order = await updateDishStatus2({
    orderId,
    courseMealId,
    clientId,
    dishId,
    newStatusId,
  })

  return order
}

export const setDishDelivered = async ({
  orderId,
  courseMealId,
  clientId,
  dishId,
}) => {
  const newStatusId = dishStates[4]

  const order = await updateDishStatus2({
    orderId,
    courseMealId,
    clientId,
    dishId,
    newStatusId,
  })
  return order
}
