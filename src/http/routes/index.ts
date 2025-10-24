import { Router } from 'express'

import { authRoutes } from './auth.routes'

const router = Router()

router.use('/auth', authRoutes)

router.get('/', (request, response) => {
  const jsonResponse = {
    message: 'Welcome to the Planning Poker API!',
  }
  return response.json(jsonResponse)
})

export { router }
