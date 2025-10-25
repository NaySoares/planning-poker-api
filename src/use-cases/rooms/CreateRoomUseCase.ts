import { container, inject, injectable } from 'tsyringe'
import { randomBytes } from 'crypto'
import { ICreateRoomDTO } from 'dtos/ICreateRoomDTO'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { AuthenticateUserUseCase } from 'use-cases/users/AuthenticateUserUseCase'
import { Room } from 'generated/prisma'
import { CreatePlayerUseCase } from 'use-cases/players/CreatePlayerUseCase'

interface IResponse {
  token: string
  refreshToken: string
  masterId: string
  room: Room
  user: {
    id: string
    name: string
    email: string
  }
  playerId: string
}
@injectable()
class CreateRoomUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {
    /* nothing */
  }

  async execute({ email, password }: ICreateRoomDTO): Promise<IResponse> {
    //  autentica o usuário para criar uma sessão e obter o masterId
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const createPlayerUseCase = container.resolve(CreatePlayerUseCase)

    const dataReturn = await authenticateUserUseCase.execute({
      password,
      email,
    })

    const masterId = dataReturn.user.id
    const code = randomBytes(3).toString('hex').toUpperCase()

    const room = await this.roomsRepository.create({
      masterId,
      code,
    })

    const player = await createPlayerUseCase.execute({
      name: dataReturn.user.name,
      avatar: null,
      isMaster: true,
      roomId: room.id,
      socketId: null,
    })

    const response: IResponse = {
      token: dataReturn.token,
      refreshToken: dataReturn.refreshToken,
      masterId,
      room,
      user: {
        id: dataReturn.user.id,
        name: dataReturn.user.name,
        email: dataReturn.user.email,
      },
      playerId: player.id,
    }

    return response
  }
}

export { CreateRoomUseCase }
