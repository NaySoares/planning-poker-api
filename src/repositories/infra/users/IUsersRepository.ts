import { ICreateUserDTO } from 'dtos/ICreateUserDTO'
import { User } from 'generated/prisma'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUsersRepository }
