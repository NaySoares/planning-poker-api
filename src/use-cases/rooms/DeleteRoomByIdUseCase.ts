import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'

@injectable()
class DeleteRoomByIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({ id }: { id: string }): Promise<void> {
    await this.roomsRepository.deleteById(id)
  }
}

export { DeleteRoomByIdUseCase }
