import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { roomRoutes } from './room.routes'

const router = Router()

router.use(authRoutes)
router.use('/room', roomRoutes)

router.get('/', (request, response) => {
  const jsonResponse = {
    message: 'Welcome to the Planning Poker API!',
  }
  return response.json(jsonResponse)
})

export { router }
