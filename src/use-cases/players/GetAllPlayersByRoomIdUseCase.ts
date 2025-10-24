import { Player } from 'generated/prisma'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetAllPlayersByRoomIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({ roomId }: { roomId: string }): Promise<Player[]> {
    const players = await this.playersRepository.findPlayersByRoomId(roomId)

    return players
  }
}

export { GetAllPlayersByRoomIdUseCase }
