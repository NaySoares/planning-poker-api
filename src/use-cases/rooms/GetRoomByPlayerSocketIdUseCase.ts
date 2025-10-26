import { RoomWithRelations } from '@types'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetRoomByPlayerSocketIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({
    socketId,
  }: {
    socketId: string
  }): Promise<RoomWithRelations | null> {
    const room = await this.roomsRepository.findRoomByPlayerSocketId(socketId)

    return room
  }
}

export { GetRoomByPlayerSocketIdUseCase }
