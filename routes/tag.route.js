import { Router } from 'express'
import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from '../controllers/tagController.js'

const router = Router()

router.get('/', getTags)
router.get('/:tagId', getTag)
router.post('/', createTag)
router.delete('/:tagId', deleteTag)
router.put('/:tagId', updateTag)

export default router
