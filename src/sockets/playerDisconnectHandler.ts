import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetAllPlayersByRoomIdUseCase } from 'use-cases/players/GetAllPlayersByRoomIdUseCase'
import { MarkPlayerAsOfflineUseCase } from 'use-cases/players/MarkPlayerAsOfflineUseCase'
import { DeleteRoomByIdUseCase } from 'use-cases/rooms/DeleteRoomByIdUseCase'
import { GetRoomByPlayerSocketIdUseCase } from 'use-cases/rooms/GetRoomByPlayerSocketIdUseCase'

export const playerDisconnectHandler = (socket: Socket, io: Server) => {
  socket.on('disconnect', async () => {
    console.log(`❌ Jogador desconectou: ${socket.id}`)

    const getRoomByPlayerSocketIdUseCase = container.resolve(
      GetRoomByPlayerSocketIdUseCase,
    )
    const markPlayerAsOfflineUseCase = container.resolve(
      MarkPlayerAsOfflineUseCase,
    )
    const getAllPlayersByRoomIdUseCase = container.resolve(
      GetAllPlayersByRoomIdUseCase,
    )
    const deleteRoomByIdUseCase = container.resolve(DeleteRoomByIdUseCase)

    const room = await getRoomByPlayerSocketIdUseCase.execute({
      socketId: socket.id,
    })

    if (!room) return

    // marca como offline para poder reconectar depois
    await markPlayerAsOfflineUseCase.execute({ socketId: socket.id })

    // Atualiza todos os outros jogadores da sala
    const updatedPlayers = await getAllPlayersByRoomIdUseCase.execute({
      roomId: room.id,
    })

    const allPlayersOffline = updatedPlayers.every((p) => !p.isOnline)

    // se todos os players estiverem offline, deleta a sala
    if (allPlayersOffline) {
      await deleteRoomByIdUseCase.execute({ id: room.id })
      return
    }

    io.to(room.code).emit('room:update', {
      players: updatedPlayers,
      tasks: room.tasks,
    })
  })
}
