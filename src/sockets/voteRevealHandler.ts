import { calculateConsensus } from '@utils/calculateConsensus'
import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'

export const voteRevealHandler = (socket: Socket, io: Server) => {
  socket.on('vote:reveal', async ({ roomCode }) => {
    const getRoomUseCase = container.resolve(GetRoomUseCase)

    const room = await getRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) return

    const { average, outliers } = calculateConsensus(room.players)
    io.to(roomCode).emit('round:result', { average, outliers })
  })
}
