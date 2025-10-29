import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class PromotePlayerToMasterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({
    oldMasterPlayerId,
    playerId,
    roomId,
  }: {
    oldMasterPlayerId: string
    playerId: string
    roomId: string
  }): Promise<void> {
    await this.roomsRepository.updateMasterId({
      roomId,
      masterId: playerId,
    })

    const dataUpdate = {
      isMaster: true,
      roomId,
    }

    await this.playersRepository.updateByPlayerId(playerId, dataUpdate)

    const dataResetOldMaster = {
      isMaster: false,
      roomId,
    }

    await this.playersRepository.updateByPlayerId(
      oldMasterPlayerId,
      dataResetOldMaster,
    )
  }
}

export { PromotePlayerToMasterUseCase }
