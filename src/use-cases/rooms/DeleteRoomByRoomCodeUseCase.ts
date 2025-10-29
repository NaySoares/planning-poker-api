import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'

@injectable()
class DeleteRoomByRoomCodeUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({ roomCode }: { roomCode: string }): Promise<void> {
    await this.roomsRepository.deleteByRoomCode(roomCode)
  }
}

export { DeleteRoomByRoomCodeUseCase }
