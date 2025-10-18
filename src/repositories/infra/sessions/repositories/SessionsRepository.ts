import { ICreateSessionDTO } from 'dtos/ICreateSessionDTO'
import { Session } from 'generated/prisma'
import { injectable } from 'tsyringe'
import { ISessionsRepository } from '../ISessionsRepository'
import { prisma } from 'lib/prisma'

@injectable()
class SessionsRepository implements ISessionsRepository {
  async create({
    userId,
    token,
    expiresAt,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: ICreateSessionDTO): Promise<Session> {
    const session = await prisma.session.create({
      data: {
        id: crypto.randomUUID(),
        userId,
        token,
        expiresAt,
        createdAt,
        updatedAt,
      },
    })

    return session
  }

  async findByUserId(userId: string): Promise<Session[]> {
    const sessions = await prisma.session.findMany({
      where: { userId },
    })
    return sessions
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Session | null> {
    const session = await prisma.session.findFirst({
      where: { userId, token: refreshToken },
    })

    return session || null
  }

  async deleteById(id: string): Promise<void> {
    await prisma.session.delete({ where: { id } })
  }
}

export { SessionsRepository }
