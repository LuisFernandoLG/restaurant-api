import { tableStates } from '../helpers/states.js'
import { Order } from '../models/Order.js'
import { Table } from '../models/Table.js'

// orders --------------------------------------------------------------
const updateOrderStatus = async ({ orderId, newStatusId }) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        status: newStatusId,
      },
    },
    { returnDocument: 'after' }
  )
  return order
}

export const setOrderInProcess = async ({ orderId }) => {
  const order = await updateOrderStatus({
    orderId,
    newStatusId: tableStates[2],
  })
  await updateTableInProcess({ order })
}

export const setOrderCompleted = async ({ orderId }) => {
  const order = await updateOrderStatus({
    orderId,
    newStatusId: tableStates[2],
  })
  await updateTableCompleted({ order })
}

export const setOrderPaid = async ({ orderId }) => {
  const order = await updateOrderStatus({
    orderId,
    newStatusId: tableStates[5],
  })
  return order
}

// Table --------------------------------------------------------

export const updateTableStatus = async ({ order, newStatusId }) => {
  await Table.findByIdAndUpdate(order.tableId, {
    $set: { status: newStatusId },
  })
}

export const updateTableStatusFree = async ({ order }) => {
  await updateTableStatus({ order, newStatusId: tableStates[1] })
}

export const updateTablePending = async ({ order }) => {
  await updateTableStatus({ order, newStatusId: tableStates[2] })
}

export const updateTableInProcess = async ({ order }) => {
  await updateTableStatus({ order, newStatusId: tableStates[3] })
}

export const updateTableCompleted = async ({ order }) => {
  await updateTableStatus({ order, newStatusId: tableStates[4] })
}

export const isOrderCompleted = ({ order }) => {
  const courseMealsOriginal = order.courseMeals
  let courseMeals = {}

  try {
    Object.entries(courseMealsOriginal).forEach(
      ([courseMealKey, courseMeal]) => {
        Object.entries(courseMeal.clients).forEach(([clientKey, client]) => {
          Object.entries(client.dishes).forEach(([dishKey, dish]) => {
            if (
              courseMeals[courseMealKey]?.clients[clientKey]?.dishes[dishKey]
                .status === dishStates[4]
            )
              throw false
          })
        })
      }
    )
    return true
  } catch (error) {
    return false
  }
}

export const saveOrder = async ({ tableId, courseMeals, takenBy }) => {
  const pendingState = tableStates[2]
  const orderDate = new Date()
  const dishesWithStates = addStateToDishes(courseMeals)
  
  const order = new Order({
    orderDate,
    tableId,
    courseMeals: dishesWithStates,
    status: pendingState,
    takenBy,
  })

  await order.save()
  return order
}
