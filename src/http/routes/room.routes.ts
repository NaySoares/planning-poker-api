import { Router } from 'express'
import { CreateRoomController } from 'http/controllers/rooms/CreateRoomController'
import { JoinRoomController } from 'http/controllers/rooms/JoinRoomController'

const roomRoutes = Router()
const createRoomController = new CreateRoomController()
const joinRoomController = new JoinRoomController()

roomRoutes.post('/', createRoomController.handle)
roomRoutes.post('/join', joinRoomController.handle)

export { roomRoutes }
