import { inject, injectable } from 'tsyringe'
import { Player } from 'generated/prisma'
import { ICreatePlayerDTO } from 'dtos/ICreatePlayerDTO'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'

@injectable()
class CreatePlayerUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IPlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    /* nothing */
  }

  async execute({
    name,
    avatar,
    isMaster,
    roomId,
    socketId,
  }: ICreatePlayerDTO): Promise<Player> {
    const player = await this.playersRepository.create({
      name,
      avatar,
      isMaster,
      roomId,
      socketId,
    })

    return player
  }
}

export { CreatePlayerUseCase }
