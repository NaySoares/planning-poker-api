import { RoomWithRelations } from '@types'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { Room } from 'generated/prisma'

interface IRoomsRepository {
  create(data: ICreateRoomDTO): Promise<Room>
  findByMasterId(masterId: string): Promise<Room | null>
  deleteByMasterId(masterId: string): Promise<void>
  deleteById(id: string): Promise<void>
  deleteByRoomCode(code: string): Promise<void>
  getRoomByCode(code: string): Promise<RoomWithRelations | null>
  getRooms(): Promise<Room[]>
  findRoomByPlayerSocketId(socketId: string): Promise<RoomWithRelations | null>
  updateMasterId(data: { roomId: string; masterId: string }): Promise<void>
}

export { IRoomsRepository }
