import { inject, injectable } from 'tsyringe'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'

@injectable()
class MarkPlayerAsOfflineUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({ socketId }: { socketId: string }): Promise<void> {
    await this.playersRepository.markAsOffline(socketId)
  }
}
export { MarkPlayerAsOfflineUseCase }
