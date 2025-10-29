import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { DeleteRoomByRoomCodeUseCase } from 'use-cases/rooms/DeleteRoomByRoomCodeUseCase'

export const roomCloseHandler = (socket: Socket, io: Server) => {
  socket.on('room:close', async ({ roomCode }) => {
    try {
      const deleteRoomByRoomCodeUseCase = container.resolve(
        DeleteRoomByRoomCodeUseCase,
      )

      await deleteRoomByRoomCodeUseCase.execute({ roomCode })

      io.to(roomCode).emit('room:closed')

      console.log(`🚪 Sala ${roomCode} foi fechada pelo mestre`)
    } catch (error) {
      console.error('Erro ao fechar a sala:', error)
      socket.emit('error', 'Sala não encontrada')
    }
  })
}
