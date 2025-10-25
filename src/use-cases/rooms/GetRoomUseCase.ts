import { inject, injectable } from 'tsyringe'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { RoomWithRelations } from '@types'
import { AppError } from '@shared/errors/AppError'

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

    if (!room) {
      throw new AppError('Sala não encontrada')
    }

    return room
  }
}

export { GetRoomUseCase }
