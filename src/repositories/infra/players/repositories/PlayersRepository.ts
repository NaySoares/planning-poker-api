import { ICreatePlayerDTO } from 'dtos/ICreatePlayerDTO'
import { Player } from 'generated/prisma'
import { prisma } from 'lib/prisma'
import { injectable } from 'tsyringe'
import { IPlayersRepository } from '../IPlayersRepository'

@injectable()
class PlayersRepository implements IPlayersRepository {
  async create({
    name,
    avatar,
    isMaster,
    roomId,
    socketId,
  }: ICreatePlayerDTO): Promise<Player> {
    const player = await prisma.player.create({
      data: {
        id: crypto.randomUUID(),
        name,
        avatar,
        isMaster,
        roomId,
        socketId,
      },
    })

    return player
  }

  async delete(id: string): Promise<void> {
    await prisma.player.deleteMany({ where: { id } })
  }

  async findPlayerById(id: string): Promise<Player | null> {
    const player = await prisma.player.findUnique({
      where: { id },
    })

    return player || null
  }

  async findPlayersByRoomId(roomId: string): Promise<Player[]> {
    const players = await prisma.player.findMany({
      where: { roomId },
    })

    return players
  }

  async findPlayersByRoomCode(roomCode: string): Promise<Player[]> {
    const players = await prisma.player.findMany({
      where: {
        room: {
          code: roomCode,
        },
      },
    })

    return players
  }

  async updateVote(playerId: string, value: number): Promise<void> {
    if (Number.isNaN(value)) {
      await prisma.player.update({
        where: { id: playerId },
        data: { currentVote: null },
      })
      return
    }

    await prisma.player.update({
      where: { id: playerId },
      data: { currentVote: value },
    })
  }

  async markAsOffline(socketId: string): Promise<void> {
    await prisma.player.updateMany({
      where: { socketId },
      data: { isOnline: false },
    })
  }

  async updateByPlayerId(
    playerId: string,
    data: Partial<ICreatePlayerDTO>,
  ): Promise<Player> {
    const player = await prisma.player.update({
      where: { id: playerId },
      data,
    })

    return player
  }
}

export { PlayersRepository }
