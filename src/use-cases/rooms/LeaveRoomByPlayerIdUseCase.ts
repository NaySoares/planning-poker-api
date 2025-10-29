import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'

@injectable()
class LeaveRoomByPlayerIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({
    roomCode,
    playerId,
  }: {
    roomCode: string
    playerId: string
  }): Promise<void> {
    await this.roomsRepository.leaveRoomByPlayerId(roomCode, playerId)
  }
}

export { LeaveRoomByPlayerIdUseCase }
