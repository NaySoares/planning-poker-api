import { inject, injectable } from 'tsyringe'
import { randomBytes } from 'crypto'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { Room } from 'generated/prisma'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'

@injectable()
class CreateRoomUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({ masterId }: ICreateRoomDTO): Promise<Room> {
    const code = randomBytes(3).toString('hex').toUpperCase()

    const room = await this.roomsRepository.create({
      masterId,
      code,
    })

    return room
  }
}

export { CreateRoomUseCase }
