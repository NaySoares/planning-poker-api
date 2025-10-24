import { Server, Socket } from 'socket.io'
import { prisma } from 'lib/prisma'
import { calculateConsensus } from '@utils/calculateConsensus'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'
import { container } from 'tsyringe'

export function gameSocket(io: Server, socket: Socket) {
  console.log('🧩 New connection:', socket.id)

  socket.on('join_room', async ({ roomCode, name, avatar }) => {
    const getRoomUseCase = container.resolve(GetRoomUseCase)

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

    const player = await prisma.player.create({
      data: {
        name,
        avatar,
        isMaster: false,
        roomId: room.id,
        socketId: socket.id,
      },
    })

    console.log('🆕 New player:', player)
    socket.join(roomCode)

    io.to(roomCode).emit('room:update', {
      players: await prisma.player.findMany({ where: { roomId: room.id } }),
      tasks: room.tasks,
    })

    console.log(`👤 ${name} entrou na sala ${roomCode}`)
  })

  socket.on('task:add', async ({ roomCode, title, description }) => {
    const room = await prisma.room.findUnique({ where: { code: roomCode } })
    if (!room) return

    await prisma.task.create({
      data: { title, description, roomId: room.id },
    })

    io.to(roomCode).emit('task:update', {
      tasks: await prisma.task.findMany({ where: { roomId: room.id } }),
    })
  })

  socket.on('vote:send', async ({ roomCode, playerId, value }) => {
    await prisma.player.update({
      where: { id: playerId },
      data: { currentVote: value },
    })

    const players = await prisma.player.findMany({
      where: { room: { code: roomCode } },
    })

    io.to(roomCode).emit('vote:update', players)
  })

  socket.on('vote:reveal', async ({ roomCode }) => {
    const room = await prisma.room.findUnique({
      where: { code: roomCode },
      include: { players: true },
    })

    if (!room) return

    const { average, outliers } = calculateConsensus(room.players) // TODO: ajustar isso aqui
    io.to(roomCode).emit('round:result', { average, outliers })
  })

  socket.on('player:kick', async ({ roomCode, playerId }) => {
    await prisma.player.delete({ where: { id: playerId } })

    const room = await prisma.room.findUnique({
      where: { code: roomCode },
      include: { players: true, tasks: true },
    })

    if (!room) return
    io.to(roomCode).emit('room:update', {
      players: room.players,
      tasks: room.tasks,
    })
  })

  socket.on('disconnect', () => {
    console.log('❌ Disconnected:', socket.id)
  })
}
