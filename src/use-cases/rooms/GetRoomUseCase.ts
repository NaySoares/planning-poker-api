import { inject, injectable } from 'tsyringe'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { Room } from 'generated/prisma'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'

@injectable()
class GetRoomUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({ code }: ICreateRoomDTO): Promise<Room> {
    const room = await this.roomsRepository.getRoomByCode(code!)

    return room!
  }
}

export { GetRoomUseCase }
