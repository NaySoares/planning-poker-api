import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'
import { PromotePlayerToMasterUseCase } from 'use-cases/rooms/PromotePlayerToMasterUseCase'

export const playerMakerMasterHandler = (socket: Socket, io: Server) => {
  socket.on(
    'player:makeMaster',
    async ({ roomCode, newMasterPlayerId, requesterPlayerId }) => {
      const getRoomUseCase = container.resolve(GetRoomUseCase)
      const promotePlayerToMasterUseCase = container.resolve(
        PromotePlayerToMasterUseCase,
      )

      const room = await getRoomUseCase.execute({
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
      if (requesterPlayerId !== master.id) {
        socket.emit(
          'error',
          'Apenas o mestre da sala pode promover outros jogadores a mestre',
        )

        const newMasterPlayer = room.players.find(
          (p) => p.id === newMasterPlayerId,
        )
        const requester = room.players.find((p) => p.id === requesterPlayerId)

        if (master.socketId) {
          io.to(master.socketId).emit(
            'notification',
            `🚫 Tentativa falha de promover ${newMasterPlayer?.name || 'jogador desconhecido'} a mestre por ${requester?.name || 'usuário não identificado'}`,
          )
        }

        return
      }

      // Mestre confirmado — promove o jogador
      await promotePlayerToMasterUseCase.execute({
        oldMasterPlayerId: master.id,
        playerId: newMasterPlayerId,
        roomId: room.id,
      })

      const updatedRoom = await getRoomUseCase.execute({
        code: roomCode,
      })

      io.to(roomCode).emit('room:update', {
        newMaster: true,
        players: updatedRoom.players,
        tasks: updatedRoom.tasks,
      })
    },
  )
}
