import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { roomRoutes } from './room.routes'
import { avatarRoutes } from './avatar.routes'

const router = Router()

router.use(authRoutes)
router.use('/room', roomRoutes)
router.use('/avatar', avatarRoutes)

router.get('/', (request, response) => {
  const jsonResponse = {
    message: 'Welcome to the Planning Poker API!',
  }
  return response.json(jsonResponse)
})

export { router }
