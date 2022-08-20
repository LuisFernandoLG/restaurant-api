import { Router } from 'express'
import { createDish, getDish, getDishes, getDishesByTag, removeDish, updateDish } from '../controllers/dishController.js'

const router = Router()

router.get('/', getDishes)
router.get('/:id', getDish)
router.get('/tag/:tagId', getDishesByTag)
router.post('/', createDish)
router.put('/:id', updateDish)
router.delete('/:id', removeDish)

export default router
