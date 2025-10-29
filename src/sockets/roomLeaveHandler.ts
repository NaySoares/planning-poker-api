import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'
import { LeaveRoomByPlayerIdUseCase } from 'use-cases/rooms/LeaveRoomByPlayerIdUseCase'

export const roomLeaveHandler = (socket: Socket, io: Server) => {
  socket.on('room:leave', async ({ roomCode, playerId }) => {
    try {
      const leaveRoomByPlayerIdUseCase = container.resolve(
        LeaveRoomByPlayerIdUseCase,
      )
      const getRoomUseCase = container.resolve(GetRoomUseCase)

      await leaveRoomByPlayerIdUseCase.execute({
        roomCode,
        playerId,
      })

      const roomUpdated = await getRoomUseCase.execute({
        masterId: undefined,
        code: roomCode,
      })

      io.to(roomCode).emit('room:update', roomUpdated)

      console.log(`🚪 Jogador ${playerId} saiu da sala ${roomCode}`)
    } catch (error) {
      console.error('Erro ao sair da sala:', error)
      socket.emit('error', 'Sala não encontrada')
    }
  })
}
