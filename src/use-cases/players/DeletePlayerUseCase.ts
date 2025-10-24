import { inject, injectable } from 'tsyringe'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'

@injectable()
class DeletePlayerUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({ id }: { id: string }): Promise<void> {
    await this.playersRepository.delete(id)
  }
}

export { DeletePlayerUseCase }
