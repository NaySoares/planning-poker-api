import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { DeletePlayerUseCase } from 'use-cases/players/DeletePlayerUseCase'
import { JoinRoomUseCase } from 'use-cases/rooms/JoinRoomUseCase'

export const playerKickHandler = (socket: Socket, io: Server) => {
  socket.on('player:kick', async ({ roomCode, playerId }) => {
    const deletePlayerUseCase = container.resolve(DeletePlayerUseCase)
    const joinRoomUseCase = container.resolve(JoinRoomUseCase)

    await deletePlayerUseCase.execute({ id: playerId })

    const room = await joinRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) return

    io.to(roomCode).emit('room:update', {
      players: room.players,
      tasks: room.tasks,
    })
  })
}
