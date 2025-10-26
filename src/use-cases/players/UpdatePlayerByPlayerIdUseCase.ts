import { inject, injectable } from 'tsyringe'
import { Player } from 'generated/prisma'
import { ICreatePlayerDTO } from 'dtos/ICreatePlayerDTO'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'

@injectable()
class UpdatePlayerByPlayerIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({
    playerId,
    data,
  }: {
    playerId: string
    data: Partial<ICreatePlayerDTO>
  }): Promise<Player> {
    const player = await this.playersRepository.updateByPlayerId(playerId, data)

    return player
  }
}

export { UpdatePlayerByPlayerIdUseCase }
