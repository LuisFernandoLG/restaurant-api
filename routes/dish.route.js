import { Router } from 'express'
import { createDish, getDishes, removeDish, updateDish } from '../controllers/dishController.js'

const router = Router()

router.get('/', getDishes)

router.post('/', createDish)
router.put('/:id', updateDish)
router.delete('/:id', removeDish)

export default router
