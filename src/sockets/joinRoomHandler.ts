import { Server, Socket } from 'socket.io'
import { container } from 'tsyringe'
import { CreatePlayerUseCase } from 'use-cases/players/CreatePlayerUseCase'
import { GetAllPlayersByRoomIdUseCase } from 'use-cases/players/GetAllPlayersByRoomIdUseCase'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'

export const joinRoomHandler = (socket: Socket, io: Server) => {
  socket.on('join_room', async ({ roomCode, name, avatar }) => {
    const getRoomUseCase = container.resolve(GetRoomUseCase)
    const createPlayerUseCase = container.resolve(CreatePlayerUseCase)
    const getAllPlayersByRoomIdUseCase = container.resolve(
      GetAllPlayersByRoomIdUseCase,
    )

    const room = await getRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
    })

    if (!room) {
      socket.emit('error', 'Sala não encontrada')
      return
    }

    if (room.players.length >= 10) {
      socket.emit('error', 'A sala já possui o número máximo de jogadores')
      return
    }

    const player = await createPlayerUseCase.execute({
      name,
      avatar,
      isMaster: false,
      roomId: room.id,
      socketId: socket.id,
    })

    console.log('🆕 New player:', player)
    socket.join(roomCode)

    // atualiza quem estiver na sala com uma nova lista de players e tasks
    io.to(roomCode).emit('room:update', {
      players: await getAllPlayersByRoomIdUseCase.execute({ roomId: room.id }),
      tasks: room.tasks,
    })

    console.log(`👤 ${name} entrou na sala ${roomCode}`)
  })
}
