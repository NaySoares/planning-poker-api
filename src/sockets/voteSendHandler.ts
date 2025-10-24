import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetAllPlayersByRoomCodeUseCase } from 'use-cases/players/GetAllPlayersByRoomCodeUseCase'
import { UpdateVoteUseCase } from 'use-cases/players/UpdateVoteUseCase'

export const voteSendHandler = (socket: Socket, io: Server) => {
  socket.on('vote:send', async ({ roomCode, playerId, value }) => {
    const updateVoteUseCase = container.resolve(UpdateVoteUseCase)
    const getAllPlayersByRoomCodeUseCase = container.resolve(
      GetAllPlayersByRoomCodeUseCase,
    )

    await updateVoteUseCase.execute({
      playerId,
      value,
    })

    const players = await getAllPlayersByRoomCodeUseCase.execute({ roomCode })

    io.to(roomCode).emit('vote:update', players)
  })
}
