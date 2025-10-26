import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { DeletePlayerUseCase } from 'use-cases/players/DeletePlayerUseCase'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'

export const playerKickHandler = (socket: Socket, io: Server) => {
  socket.on('player:kick', async ({ roomCode, playerId }) => {
    const deletePlayerUseCase = container.resolve(DeletePlayerUseCase)
    const getRoomUseCase = container.resolve(GetRoomUseCase)

    const room = await getRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) return

    // Descobre o mestre verdadeiro
    const master = room.players.find((p) => p.isMaster)
    if (!master) {
      socket.emit('error', 'Sala sem mestre definido')
      return
    }

    // Se o jogador que fez o request NÃO for o mestre, rejeita
    if (socket.id !== master.socketId) {
      socket.emit('error', 'Apenas o mestre da sala pode expulsar jogadores')

      const kickedPlayer = room.players.find((p) => p.id === playerId)
      const requester = room.players.find((p) => p.socketId === socket.id)

      if (master.socketId) {
        io.to(master.socketId).emit(
          'notification',
          `🚫 Tentativa falha de expulsar ${kickedPlayer?.name || 'jogador desconhecido'} por ${requester?.name || 'usuário não identificado'}`,
        )
      }

      return
    }

    // Mestre confirmado — expulsa o jogador
    await deletePlayerUseCase.execute({ id: playerId })

    const updatedRoom = await getRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    io.to(roomCode).emit('room:update', {
      players: updatedRoom.players,
      tasks: updatedRoom.tasks,
    })
  })
}
