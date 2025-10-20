import { Router } from 'express'
import { CreateRoomController } from 'http/controllers/rooms/CreateRoomController'
import { GetRoomController } from 'http/controllers/rooms/GetRoomController'

const routes = Router()
const createRoomController = new CreateRoomController()
const getRoomController = new GetRoomController()

routes.post('/', createRoomController.handle)
routes.get('/:code', getRoomController.handle)

export default routes
