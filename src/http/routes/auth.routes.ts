import { Router } from 'express'
import { CreateUserController } from 'http/controllers/users/CreateUserController'
import { AuthenticateUserController } from 'http/controllers/users/AuthenticateUserController'
import { RefreshTokenController } from 'http/controllers/users/RefreshTokenController'

const authRoutes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/signup', createUserController.handle)
authRoutes.post('/session', authenticateUserController.handle)
authRoutes.post('/refresh', refreshTokenController.handle)

export { authRoutes }
