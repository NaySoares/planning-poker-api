import { inject, injectable } from 'tsyringe'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'

@injectable()
class UpdateVoteUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({
    playerId,
    value,
  }: {
    playerId: string
    value: number
  }): Promise<void> {
    await this.playersRepository.updateVote(playerId, value)
  }
}
export { UpdateVoteUseCase }
