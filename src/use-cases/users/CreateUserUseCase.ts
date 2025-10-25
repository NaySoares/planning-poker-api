import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { ICreateUserDTO } from 'dtos/ICreateUserDTO'
import { IUsersRepository } from 'repositories/infra/users/IUsersRepository'
import { User } from 'generated/prisma'
import { IAccountsRepository } from 'repositories/infra/accounts/IAccountsRepository'

@injectable()
class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository,
    @inject('IAccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {
    /* nothing */
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('Usuário já existe!')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    console.log('Usuário criado:', user)

    const account = await this.accountsRepository.create({
      accountId: user.id,
      providerId: 'credential',
      password,
      userId: user.id,
    })

    console.log('Conta criada:', account)

    return user
  }
}

export { CreateUserUseCase }
