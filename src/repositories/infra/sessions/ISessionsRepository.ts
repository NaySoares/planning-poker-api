import { ICreateSessionDTO } from 'dtos/ICreateSessionDTO'
import { Session } from 'generated/prisma'

interface ISessionsRepository {
  create(data: ICreateSessionDTO): Promise<Session>
  findByUserId(userId: string): Promise<Session[]>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Session | null>
  deleteById(id: string): Promise<void>
}

export { ISessionsRepository }
