import { Room } from 'generated/prisma'
import { injectable } from 'tsyringe'
import { prisma } from 'lib/prisma'
import { IRoomsRepository } from '../IRoomsRepository'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { RoomWithRelations } from '@types'

@injectable()
class RoomsRepository implements IRoomsRepository {
  async create({ masterId, code }: ICreateRoomDTO): Promise<Room> {
    const room = await prisma.room.create({
      data: {
        id: crypto.randomUUID(),
        masterId,
        code,
      },
    })

    return room
  }

  async findByMasterId(masterId: string): Promise<Room | null> {
    const room = await prisma.room.findFirst({
      where: { masterId },
    })

    return room || null
  }

  async deleteByMasterId(masterId: string): Promise<void> {
    await prisma.room.deleteMany({ where: { masterId } })
  }

  async getRoomByCode(code: string): Promise<RoomWithRelations | null> {
    const room = await prisma.room.findUnique({
      where: { code },
      include: { players: true, tasks: true },
    })

    return room || null
  }

  async getRooms(): Promise<Room[]> {
    const rooms = await prisma.room.findMany()
    return rooms
  }

  async findRoomByPlayerSocketId(
    socketId: string,
  ): Promise<RoomWithRelations | null> {
    const room = await prisma.room.findFirst({
      where: {
        players: {
          some: {
            socketId,
          },
        },
      },
      include: { players: true, tasks: true },
    })

    return room || null
  }

  async deleteById(id: string): Promise<void> {
    await prisma.room.deleteMany({ where: { id } })
  }

  async updateMasterId(data: {
    roomId: string
    masterId: string
  }): Promise<void> {
    await prisma.room.update({
      where: { id: data.roomId },
      data: { masterId: data.masterId },
    })
  }
}

export { RoomsRepository }
