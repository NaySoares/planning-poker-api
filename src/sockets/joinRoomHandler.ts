import { env } from 'process'
import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { CreatePlayerUseCase } from 'use-cases/players/CreatePlayerUseCase'
import { GetAllPlayersByRoomIdUseCase } from 'use-cases/players/GetAllPlayersByRoomIdUseCase'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'

export const joinRoomHandler = (socket: Socket, io: Server) => {
  socket.on(
    'join_room',
    async ({ roomCode, playerId, name, avatar, masterId }) => {
      const getRoomUseCase = container.resolve(GetRoomUseCase)
      const createPlayerUseCase = container.resolve(CreatePlayerUseCase)
      const getAllPlayersByRoomIdUseCase = container.resolve(
        GetAllPlayersByRoomIdUseCase,
      )

      if (!playerId) return socket.emit('error', 'Erro ao identificar jogador')

      const room = await getRoomUseCase.execute({
        masterId: undefined,
        code: roomCode,
      })

      if (!room) {
        socket.emit('error', 'Sala não encontrada')
        return
      }

      // verifica se é uma reconexão de um jogador existente
      const existingPlayer = room.players.find(
        (player) => player.id === playerId,
      )

      const avatarDefault = env.BASE_URL_SERVER + '/avatar/'

      if (existingPlayer) {
        existingPlayer.socketId = socket.id
        existingPlayer.avatar = existingPlayer.avatar || avatarDefault
        console.log('🔄 Jogador reconectado:', existingPlayer)
        socket.join(roomCode)

        // atualiza quem estiver na sala com uma nova lista de players e tasks
        io.to(roomCode).emit('room:update', {
          players: room.players,
          tasks: room.tasks,
        })

        // Quebra o fluxo para não criar um novo jogador
        return
      }

      // Verifica se já existe um jogador com o mesmo nome na sala para evitar duplicidade
      const sameName = room.players.find((player) => player.name === name)

      if (sameName) {
        socket.emit('error', 'Já existe um jogador com esse nome na sala')
        return
      }

      // TODO: ajustar para limitar o número de jogadores com base na configuração da sala
      if (room.players.length >= 10) {
        socket.emit('error', 'A sala já possui o número máximo de jogadores')
        return
      }

      // Apenas o master enviará seu masterId para se identificar
      const isMaster = room.masterId === masterId

      const player = await createPlayerUseCase.execute({
        name,
        avatar,
        isMaster,
        roomId: room.id,
        socketId: socket.id,
      })

      console.log('🆕 New player:', player)
      socket.join(roomCode)

      // atualiza quem estiver na sala com uma nova lista de players e tasks
      io.to(roomCode).emit('room:update', {
        players: await getAllPlayersByRoomIdUseCase.execute({
          roomId: room.id,
        }),
        tasks: room.tasks,
      })

      console.log(`👤 ${name} entrou na sala ${roomCode}`)
    },
  )
}
