import { calculateConsensus } from '@utils/calculateConsensus'
import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { JoinRoomUseCase } from 'use-cases/rooms/JoinRoomUseCase'

export const voteRevealHandler = (socket: Socket, io: Server) => {
  socket.on('vote:reveal', async ({ roomCode }) => {
    const joinRoomUseCase = container.resolve(JoinRoomUseCase)

    const room = await joinRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) return

    const { average, outliers } = calculateConsensus(room.players)
    io.to(roomCode).emit('round:result', { average, outliers })
  })
}
