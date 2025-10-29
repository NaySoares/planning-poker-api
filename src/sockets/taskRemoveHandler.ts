import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'
import { DeleteTaskUseCase } from 'use-cases/tasks/DeleteTaskUseCase'
import { GetAllTasksByRoomIdUseCase } from 'use-cases/tasks/GetAllTasksByRoomIdUseCase'

export const taskRemoveHandler = (socket: Socket, io: Server) => {
  socket.on('task:remove', async ({ roomCode, taskId, playerId }) => {
    const getRoomUseCase = container.resolve(GetRoomUseCase)
    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase)
    const getAllTasksByRoomIdUseCase = container.resolve(
      GetAllTasksByRoomIdUseCase,
    )

    const room = await getRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) return

    if (playerId !== room.masterId) {
      socket.emit('error', 'Apenas o mestre da sala pode remover tarefas')
      return
    }

    await deleteTaskUseCase.execute({
      taskId,
    })

    io.to(roomCode).emit('task:update', {
      tasks: await getAllTasksByRoomIdUseCase.execute({ roomId: room.id }),
    })
  })
}
