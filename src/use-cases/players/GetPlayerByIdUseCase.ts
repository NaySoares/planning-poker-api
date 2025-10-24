import { Player } from 'generated/prisma'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetPlayerByIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({ id }: { id: string }): Promise<Player | null> {
    const player = await this.playersRepository.findPlayerById(id)

    return player
  }
}

export { GetPlayerByIdUseCase }
