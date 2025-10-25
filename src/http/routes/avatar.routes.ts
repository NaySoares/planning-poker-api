import { Router } from 'express'
import { GetAvatarController } from 'http/controllers/avatars/GetAvatarController'

const avatarRoutes = Router()
const getAvatarController = new GetAvatarController()

avatarRoutes.get('/', getAvatarController.handle)

export { avatarRoutes }
