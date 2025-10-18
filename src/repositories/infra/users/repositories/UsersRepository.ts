import { injectable } from 'tsyringe'
import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO } from 'dtos/ICreateUserDTO'
import { prisma } from 'lib/prisma'
import { User } from 'generated/prisma'

@injectable()
class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return user
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    })
  }
}

export { UsersRepository }
