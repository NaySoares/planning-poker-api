import { inject, injectable } from 'tsyringe'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { RoomWithRelations } from '@types'

@injectable()
class GetRoomUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({ code }: ICreateRoomDTO): Promise<RoomWithRelations | null> {
    const room = await this.roomsRepository.getRoomByCode(code!)

    return room
  }
}

export { GetRoomUseCase }
