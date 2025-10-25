import { container, inject, injectable } from 'tsyringe'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { RoomWithRelations } from '@types'
import { AppError } from '@shared/errors/AppError'
import { CreatePlayerUseCase } from 'use-cases/players/CreatePlayerUseCase'

@injectable()
class JoinRoomUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({
    name,
    code,
  }: ICreateRoomDTO): Promise<RoomWithRelations | null> {
    const createPlayerUseCase = container.resolve(CreatePlayerUseCase)

    const room = await this.roomsRepository.getRoomByCode(code!)

    if (!room) {
      throw new AppError('Sala não encontrada')
    }

    if (room.players.length >= 10) {
      throw new AppError('Sala com número máximo de jogadores atingido')
    }

    if (room.players.find((player) => player.name === name)) {
      throw new AppError('Nome de jogador já está em uso na sala')
    }

    const player = await createPlayerUseCase.execute({
      name,
      avatar: null,
      isMaster: false,
      roomId: room.id,
      socketId: null,
    })

    const objectRetorn: RoomWithRelations = {
      ...room,
      playerId: player.id,
    }

    return objectRetorn
  }
}

export { JoinRoomUseCase }
