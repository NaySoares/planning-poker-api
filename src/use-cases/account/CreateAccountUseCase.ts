import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { Account } from 'generated/prisma/wasm'
import { IAccountsRepository } from 'repositories/infra/accounts/IAccountsRepository'
import { ICreateAccountDTO } from 'dtos/ICreateAccountDTO'

@injectable()
class CreateAccountUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IAccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {
    /* nothing */
  }

  async execute({
    providerId,
    userId,
    password,
    accountId,
  }: ICreateAccountDTO): Promise<Account> {
    // const accountAlreadyExists =
    //   await this.accountsRepository.findByEmail(email)

    // if (accountAlreadyExists) {
    //   throw new AppError('Conta já existe!')
    // }

    const passwordHash = await hash(password, 8)

    const account = await this.accountsRepository.create({
      providerId,
      userId,
      accountId,
      password: passwordHash,
    })

    return account
  }
}

export { CreateAccountUseCase }
