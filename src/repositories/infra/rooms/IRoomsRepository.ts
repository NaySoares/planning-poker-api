import { RoomWithRelations } from '@types'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { Room } from 'generated/prisma'

interface IRoomsRepository {
  create(data: ICreateRoomDTO): Promise<Room>
  findByMasterId(masterId: string): Promise<Room | null>
  deleteByMasterId(masterId: string): Promise<void>
  getRoomByCode(code: string): Promise<RoomWithRelations | null>
  getRooms(): Promise<Room[]>
}

export { IRoomsRepository }
