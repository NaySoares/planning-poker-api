import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'
import { CreateTaskUseCase } from 'use-cases/tasks/CreateTaskUseCase'
import { GetAllTasksByRoomIdUseCase } from 'use-cases/tasks/GetAllTasksByRoomIdUseCase'

export const taskAddHandler = (socket: Socket, io: Server) => {
  socket.on('task:add', async ({ roomCode, title, description }) => {
    const getRoomUseCase = container.resolve(GetRoomUseCase)
    const createTaskUseCase = container.resolve(CreateTaskUseCase)
    const getAllTasksByRoomIdUseCase = container.resolve(
      GetAllTasksByRoomIdUseCase,
    )

    const room = await getRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) return

    await createTaskUseCase.execute({
      title,
      description,
      roomId: room.id,
    })

    io.to(roomCode).emit('task:update', {
      tasks: await getAllTasksByRoomIdUseCase.execute({ roomId: room.id }),
    })
  })
}
