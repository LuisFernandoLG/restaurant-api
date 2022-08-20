import { Router } from 'express'
import { createOrder, getOrders, updateDishStatus } from '../controllers/orderController.js'

const router = Router()

router.get('/', getOrders)
router.post('/', createOrder)
router.put("/:orderId", updateDishStatus)


export default router
