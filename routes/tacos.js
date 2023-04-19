import { Router } from 'express'
import * as tacosCtrl from '../controllers/tacos.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', tacosCtrl.index)
router.get('/:tacoId', tacosCtrl.show)

router.post('/', isLoggedIn, tacosCtrl.create)

router.patch('/:tacoId/flip-tasty', isLoggedIn, tacosCtrl.flipTasty)

export {
  router
}