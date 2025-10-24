import { Player } from 'generated/prisma'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetAllPlayersByRoomCodeUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({ roomCode }: { roomCode: string }): Promise<Player[]> {
    const players = await this.playersRepository.findPlayersByRoomCode(roomCode)

    return players
  }
}

export { GetAllPlayersByRoomCodeUseCase }
